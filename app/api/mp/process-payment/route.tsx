// app/api/mp/process-payment/route.ts
import { NextResponse } from "next/server"
import { MercadoPagoConfig, Payment } from "mercadopago"
import { getDB, admin } from "@/lib/firebaseAdmin"
import crypto from "crypto"
import { mapMpCategoryId } from "@/lib/mpCategory"

export const runtime = "nodejs"

type BrickPayload = {
  token: string
  issuer_id?: string | number
  payment_method_id: string
  transaction_amount: number | string
  installments: number | string
  description: string
  payer: { email: string; identification?: { type: string; number: string } }
  metadata?: Record<string, any>
}

type MpItem = {
  id: string
  title: string
  description?: string
  category_id?: string
  quantity: number
  unit_price: number
  picture_url?: string
}

function toOptionalNumber(v: unknown): number | undefined {
  if (v === undefined || v === null || v === "") return undefined
  const n = typeof v === "number" ? v : Number(v)
  return Number.isFinite(n) ? n : undefined
}

function toItemsFromMeta(metaItems: any[] | undefined): MpItem[] {
  if (!Array.isArray(metaItems)) return []
  const out: MpItem[] = []
  for (const it of metaItems) {
    const quantity = Math.max(1, Math.floor(Number(it?.quantity ?? it?.qty ?? 1)))
    const unitPrice = Number(it?.unit_price ?? it?.unit ?? it?.price ?? 0)
    if (!Number.isFinite(unitPrice) || unitPrice <= 0) continue
    const pictureUrl = String(it?.picture_url ?? it?.pictureUrl ?? "")
    out.push({
      id: String(it?.id ?? it?.productId ?? it?.productSlug ?? it?.slug ?? ""),
      title: String(it?.title ?? it?.name ?? "Producto"),
      description: String(it?.description ?? ""),
      category_id: mapMpCategoryId(it?.category_id ?? it?.categoryId),
      quantity,
      unit_price: Math.round(unitPrice),
      picture_url: pictureUrl && /^https?:\/\//.test(pictureUrl) ? pictureUrl : undefined,
    })
  }
  return out
}

function sanitizeForFirestore<T extends Record<string, any>>(obj: T): T {
  const out: Record<string, any> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue
    out[k] = v
  }
  return out as T
}

function sanitizeItemsForFirestore(items: any[] | undefined) {
  if (!Array.isArray(items)) return undefined
  return items.map((it) => sanitizeForFirestore(it))
}

export async function POST(req: Request) {
  try {
    const accessToken = process.env.MP_ACCESS_TOKEN
    if (!accessToken) {
      return NextResponse.json({ error: "Missing MP_ACCESS_TOKEN" }, { status: 500 })
    }

    const data = (await req.json()) as Partial<BrickPayload>

    if (!data.token || !data.payment_method_id || !data.payer?.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const incomingAmount = Number(data.transaction_amount ?? 0)
    if (!Number.isFinite(incomingAmount) || incomingAmount <= 0) {
      return NextResponse.json({ error: "Invalid transaction_amount" }, { status: 400 })
    }

    const db = getDB()
    let orderId = String(data.metadata?.orderId ?? "").trim()
    let orderRef
    let expectedTotal = incomingAmount
    let orderItems: any[] = []

    if (!orderId) {
      orderId = crypto.randomUUID()
      orderRef = db.collection("orders").doc(orderId)

      await orderRef.set({
        orderId,
        status: "created",
        status_detail: null,
        provider: "mercadopago",
        currency: "CLP",
        total: incomingAmount,
        customer: {
          email: data.payer.email,
          name: null,
          phone: null,
        },
        items: [
          {
            productId: null,
            productSlug: null,
            title: String(data.description ?? "Compra SaintGeek"),
            qty: 1,
            unit: incomingAmount,
            line: incomingAmount,
          },
        ],
        metadata: {
          channel: "web",
          env: process.env.MP_ACCESS_TOKEN?.startsWith("TEST-") ? "test" : "prod",
          source: "mp_brick",
        },
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      })
    } else {
      orderRef = db.collection("orders").doc(orderId)
      const orderSnap = await orderRef.get()
      if (!orderSnap.exists) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 })
      }

      const order = orderSnap.data() as any
      expectedTotal = Number(order?.total ?? 0)
      orderItems = Array.isArray(order?.items) ? order.items : []
    }

    // Anti-tamper: order total must match
    if (expectedTotal <= 0 || incomingAmount !== expectedTotal) {
      return NextResponse.json({ error: "Amount mismatch" }, { status: 400 })
    }

    const issuerId = toOptionalNumber(data.issuer_id)
    if (data.issuer_id !== undefined && issuerId === undefined) {
      return NextResponse.json({ error: "Invalid issuer_id" }, { status: 400 })
    }

    const client = new MercadoPagoConfig({ accessToken, options: { timeout: 8000 } })
    const payment = new Payment(client)

    const metaItems = toItemsFromMeta(data.metadata?.items)
    const orderItemsMapped: MpItem[] = Array.isArray(orderItems)
      ? orderItems
          .map((it: any) => {
            const quantity = Math.max(1, Math.floor(Number(it?.qty ?? it?.quantity ?? 1)))
            const unitPrice = Number(it?.unit ?? it?.unitPrice ?? it?.price ?? 0)
            if (!Number.isFinite(unitPrice) || unitPrice <= 0) return null
            const pictureUrl = String(it?.pictureUrl ?? it?.picture_url ?? "")
            return {
              id: String(it?.productId ?? it?.productSlug ?? it?.slug ?? ""),
              title: String(it?.title ?? it?.name ?? "Producto"),
              description: String(it?.description ?? ""),
              category_id: mapMpCategoryId(it?.categoryId ?? it?.category_id),
              quantity,
              unit_price: Math.round(unitPrice),
              picture_url: pictureUrl && /^https?:\/\//.test(pictureUrl) ? pictureUrl : undefined,
            } as MpItem
          })
          .filter((it): it is MpItem => Boolean(it))
      : []

    const itemsForMP = orderItemsMapped.length ? orderItemsMapped : metaItems

    const rawNotificationUrl =
      process.env.MP_NOTIFICATION_URL ||
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/mp/webhook`

    let notificationUrl: string | undefined
    try {
      const u = new URL(rawNotificationUrl)
      if (u.protocol === "https:") notificationUrl = u.toString()
    } catch {
      notificationUrl = undefined
    }

    const additionalInfoItems = itemsForMP.length ? itemsForMP : undefined
    const additionalInfoItemsForDb = sanitizeItemsForFirestore(additionalInfoItems)

    const body = {
      token: data.token,
      issuer_id: issuerId,
      payment_method_id: data.payment_method_id,
      transaction_amount: incomingAmount,
      installments: Number(data.installments ?? 1),
      description: String(data.description ?? `Orden ${orderId} - SaintGeek`),
      statement_descriptor:
        process.env.MP_STATEMENT_DESCRIPTOR?.trim() || "SAINTGEEK",
      external_reference: orderId,
      notification_url: notificationUrl,
      payer: {
        email: data.payer.email,
        identification: data.payer.identification,
      },
      additional_info: additionalInfoItems ? { items: additionalInfoItems } : undefined,
      metadata: {
        ...(data.metadata ?? {}),
        orderId,
      },
    }

    // Idempotency: one payment attempt per orderId
    const result = await payment.create({
      body,
      requestOptions: { idempotencyKey: orderId },
    })

    await orderRef.set(
      {
        status: result.status ?? "pending",
        status_detail: result.status_detail ?? null,
        mp: {
          paymentId: result.id ?? null,
          status: result.status ?? null,
          statusDetail: result.status_detail ?? null,
          paymentMethodId: data.payment_method_id ?? null,
          installments: Number(data.installments ?? 1),
          additionalInfoItems: additionalInfoItemsForDb ?? null,
        },
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    )

    await orderRef.collection("events").add({
      type: "mp_payment_create",
      mpPaymentId: result.id ?? null,
      status: result.status ?? null,
      status_detail: result.status_detail ?? null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })

    return NextResponse.json({
      id: result.id,
      status: result.status,
      status_detail: result.status_detail,
      orderId,
    })
  } catch (err: any) {
    const details =
      err?.cause ||
      err?.response ||
      err?.error ||
      err?.message ||
      err

    console.error("MP payment error:", details)

    return NextResponse.json(
      { error: err?.message ?? "MP payment error", details },
      { status: 500 }
    )
  }
}
