// app/api/orders/create/route.ts
import { NextResponse } from "next/server"
import { products } from "@/data/products"
import { getDB, admin } from "@/lib/firebaseAdmin"
import { mapMpCategoryId } from "@/lib/mpCategory"

export const runtime = "nodejs"

type Body = {
  items?: { productId?: string; productSlug?: string; qty?: number }[]
  customer?: {
    email?: string
    name?: string
    phone?: string
    rut?: string
    address?: string
    notes?: string
  }
}

function pickKey(it: { productId?: string; productSlug?: string }) {
  const slug = String(it.productSlug ?? "").trim()
  const id = String(it.productId ?? "").trim()
  return slug || id
}

function findProductByAny(key: string) {
  const k = String(key ?? "").trim()
  if (!k) return null

  return (
    (products as any[]).find((p) => String(p?.slug ?? "") === k) ||
    (products as any[]).find((p) => String(p?.id ?? "") === k) ||
    (products as any[]).find((p) => String(p?.productId ?? "") === k) ||
    null
  )
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body

    const items = Array.isArray(body.items) ? body.items : []
    if (!items.length) {
      return NextResponse.json({ error: "Carrito vacío" }, { status: 400 })
    }

    const normalized = items.map((it) => {
      const key = pickKey(it)
      const qty = Math.max(1, Math.floor(Number(it.qty ?? 1)))

      const product = findProductByAny(key)
      if (!product) throw new Error(`Product not found: ${key}`)

      const unit =
        Number(product?.priceRub ?? product?.price ?? product?.unitPrice ?? 0) || 0
      if (unit <= 0) {
        throw new Error(`Precio inválido para: ${String(product?.slug ?? "producto")}`)
      }

      const productSlug = String(product.slug)
      const pictureUrl = Array.isArray(product?.images)
        ? String(product?.images?.[0]?.url ?? "")
        : ""

      return {
        // ✅ AQUI: tu "productId" será el slug
        productId: productSlug,
        productSlug,
        title: String(product?.name ?? product?.title ?? productSlug),
        description: String(product?.subtitle ?? product?.description ?? product?.name ?? ""),
        categoryId: mapMpCategoryId((product as any)?.category),
        pictureUrl: pictureUrl || null,
        qty,
        unit: Math.round(unit),
        line: Math.round(unit) * qty,
      }
    })

    const total = normalized.reduce((acc, x) => acc + x.line, 0)

    const orderId =
      globalThis.crypto?.randomUUID?.() ??
      `sg_${Date.now()}_${Math.random().toString(16).slice(2)}`

    const db = getDB()

    // ✅ AQUI SE CREA LA ORDEN EN FIRESTORE
    await db.collection("orders").doc(orderId).set({
      orderId,
      status: "created",
      provider: "mercadopago",
      currency: "CLP",
      total,
      items: normalized,
      customer: body.customer ?? null,
      shipping: {
        required: Boolean(body.customer?.address),
        address: body.customer?.address ?? null,
        notes: body.customer?.notes ?? null,
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    })

    return NextResponse.json({
      orderId,
      total,
      items: normalized,
      customer: body.customer ?? null,
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Bad Request" },
      { status: 400 }
    )
  }
}
