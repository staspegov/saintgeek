import Link from "next/link";
import type { Route } from "next";
import { getDB } from "@/lib/firebaseAdmin";

export const runtime = "nodejs"; // importante si usas firebase-admin

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) {
  const orderId = searchParams.orderId;
  if (!orderId) return <div className="p-8">Falta orderId.</div>;

  const db = getDB();
  const snap = await db.collection("orders").doc(orderId).get();

  if (!snap.exists) return <div className="p-8">Orden no encontrada.</div>;

  const order = { orderId: snap.id, ...(snap.data() as any) };
  const status = order.status;

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-semibold">
        {status === "approved"
          ? "Pago aprobado"
          : status === "rejected"
          ? "Pago rechazado"
          : status === "in_process"
          ? "Pago en revisión"
          : "Pago pendiente"}
      </h1>

      <div className="mt-4 rounded-xl border p-4">
        <div><b>Orden:</b> {orderId}</div>
        <div><b>Monto:</b> {order.amount} {order.currency}</div>
        <div><b>Email:</b> {order.customer?.email}</div>
        <div><b>MP Payment ID:</b> {order.mp?.paymentId ?? "-"}</div>
        <div><b>Detalle:</b> {order.status_detail ?? order.mp?.statusDetail ?? "-"}</div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link className="rounded-lg bg-black text-white px-4 py-2" href="/">
          Volver a la tienda
        </Link>

        <Link
          className="rounded-lg bg-neutral-200 px-4 py-2 text-black"
          href={( `/orders/${orderId}` as Route )}
        >
          Ver pedido
        </Link>
      </div>
    </main>
  );
}
