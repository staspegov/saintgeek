import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { getDB, admin } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

type BrickPayload = {
  token: string;
  issuer_id?: string | number;
  payment_method_id: string;
  transaction_amount: number | string;
  installments: number | string;
  description: string;
  payer: { email: string; identification?: { type: string; number: string } };
  metadata?: Record<string, any>;
};

function toOptionalNumber(v: unknown): number | undefined {
  if (v === undefined || v === null || v === "") return undefined;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : undefined;
}

export async function POST(req: Request) {
  try {
    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      return NextResponse.json({ error: "Missing MP_ACCESS_TOKEN" }, { status: 500 });
    }

    const data = (await req.json()) as Partial<BrickPayload>;

    if (!data.token || !data.payment_method_id || !data.payer?.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const orderId = String(data.metadata?.orderId ?? "");
    if (!orderId) {
      return NextResponse.json({ error: "Missing metadata.orderId" }, { status: 400 });
    }

    const db = getDB();
    const orderRef = db.collection("orders").doc(orderId);
    const orderSnap = await orderRef.get();
    if (!orderSnap.exists) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const order = orderSnap.data() as any;
    const expectedTotal = Number(order?.amounts?.total ?? 0);
    const incomingAmount = Number(data.transaction_amount ?? 0);

    // Anti-tamper: order total must match
    if (expectedTotal <= 0 || incomingAmount !== expectedTotal) {
      return NextResponse.json({ error: "Amount mismatch" }, { status: 400 });
    }

    const issuerId = toOptionalNumber(data.issuer_id);
    if (data.issuer_id !== undefined && issuerId === undefined) {
      return NextResponse.json({ error: "Invalid issuer_id" }, { status: 400 });
    }

    const client = new MercadoPagoConfig({ accessToken, options: { timeout: 8000 } });
    const payment = new Payment(client);

    const body = {
      token: data.token,
      issuer_id: issuerId,
      payment_method_id: data.payment_method_id,
      transaction_amount: incomingAmount,
      installments: Number(data.installments ?? 1),
      description: String(data.description ?? `Orden ${orderId} - SaintGeek`),
      payer: {
        email: data.payer.email,
        identification: data.payer.identification,
      },
      metadata: {
        ...(data.metadata ?? {}),
        orderId,
      },
    };

    // Idempotency: one payment attempt per orderId
    const result = await payment.create({
      body,
      requestOptions: { idempotencyKey: orderId },
    });

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
        },
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    // Optional audit event
    await orderRef.collection("events").add({
      type: "mp_payment_create",
      mpPaymentId: result.id ?? null,
      status: result.status ?? null,
      status_detail: result.status_detail ?? null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      id: result.id,
      status: result.status,
      status_detail: result.status_detail,
      orderId,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "MP payment error" }, { status: 500 });
  }
}
