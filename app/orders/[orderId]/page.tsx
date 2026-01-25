import Link from "next/link";
import type { Route } from "next";
import { getDB } from "@/lib/firebaseAdmin";

export const runtime = "nodejs";

export default async function OrderPage({
  params,
}: {
  params: { orderId: string };
}) {
  const orderId = params.orderId;

  const db = getDB();
  const snap = await db.collection("orders").doc(orderId).get();

  if (!snap.exists) {
    return <div className="p-8">Orden no encontrada.</div>;
  }

  const order = { orderId: snap.id, ...(snap.data() as any) };
  const status = order.status;

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-semibold">Pedido</h1>

      <div className="mt-4 rounded-xl border p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-neutral-500">Orden</div>
            <div className="font-mono text-sm">{orderId}</div>
          </div>

          <span className="rounded-full border px-3 py-1 text-sm">
            {status === "approved"
              ? "Aprobado"
              : status === "rejected"
              ? "Rechazado"
              : status === "in_process"
              ? "En revisión"
              : status === "pending"
              ? "Pendiente"
              : String(status ?? "—")}
          </span>
        </div>

        <hr className="my-4 opacity-20" />

        <div className="space-y-2 text-sm">
          <div>
            <b>Monto:</b> {order.amount} {order.currency ?? "CLP"}
          </div>
          <div>
            <b>Email:</b> {order.customer?.email ?? "—"}
          </div>
          <div>
            <b>MP Payment ID:</b> {order.mp?.paymentId ?? "—"}
          </div>
          <div>
            <b>Detalle:</b> {order.status_detail ?? order.mp?.statusDetail ?? "—"}
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link className="rounded-lg bg-black text-white px-4 py-2" href="/">
          Volver a la tienda
        </Link>

        <Link
          className="rounded-lg bg-neutral-200 px-4 py-2 text-black"
          href={( `/checkout/success?orderId=${orderId}` as Route )}
        >
          Ver comprobante
        </Link>
      </div>
    </main>
  );
}
