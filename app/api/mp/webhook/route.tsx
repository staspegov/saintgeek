import { NextResponse } from "next/server";
import { getDB, admin } from "@/lib/firebaseAdmin";

async function fetchPayment(paymentId: string) {
  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) throw new Error("Missing MP_ACCESS_TOKEN");

  const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) throw new Error(`MP GET payment failed: ${res.status}`);
  return res.json();
}

function normalizeStatus(mpStatus?: string) {
  if (!mpStatus) return "pending";
  if (mpStatus === "approved") return "approved";
  if (mpStatus === "rejected") return "rejected";
  if (mpStatus === "in_process") return "in_process";
  if (mpStatus === "pending") return "pending";
  return "pending";
}

export async function POST(req: Request) {
  try {
    const db = getDB();

    // MP puede mandar querystring (data.id) o JSON; soportamos ambos
    const url = new URL(req.url);
    const qPaymentId = url.searchParams.get("data.id") || url.searchParams.get("id");

    let body: any = null;
    try {
      body = await req.json();
    } catch {}

    const paymentId =
      qPaymentId ||
      body?.data?.id ||
      body?.id ||
      body?.resource?.split("/")?.pop();

    if (!paymentId) {
      return NextResponse.json({ received: true, ignored: "no_payment_id" });
    }

    const payment = await fetchPayment(String(paymentId));

    const orderId =
      payment?.external_reference || payment?.metadata?.orderId || null;

    if (!orderId) {
      // sin enlace a orden, igual acusamos recibo
      return NextResponse.json({ received: true, ignored: "no_order_reference" });
    }

    const orderRef = db.collection("orders").doc(String(orderId));

    const status = normalizeStatus(payment.status);
    const status_detail = payment.status_detail ?? null;

    // Idempotencia básica: actualiza por paymentId/estado (merge)
    await orderRef.set(
      {
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        status,
        status_detail,
        mp: {
          paymentId: payment.id,
          status: payment.status,
          statusDetail: payment.status_detail ?? null,
          externalReference: payment.external_reference ?? String(orderId),
        },
      },
      { merge: true }
    );

    // Auditoría opcional (muy pro)
    await orderRef.collection("events").doc(`${payment.id}_${Date.now()}`).set({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      type: "mp_webhook",
      paymentId: payment.id,
      status: payment.status,
      status_detail: payment.status_detail ?? null,
    });

    return NextResponse.json({ received: true });
  } catch (e: any) {
    return NextResponse.json({ received: true, error: e?.message ?? "webhook error" });
  }
}
