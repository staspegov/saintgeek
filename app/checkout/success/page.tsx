import Link from "next/link";
import type { Route } from "next";
import { getDB } from "@/lib/firebaseAdmin";
import ClearCartOnSuccess from "@/components/cart/ClearCartOnSuccess";

export const runtime = "nodejs"; // importante si usas firebase-admin

function formatCLP(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

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
  const shouldClear = status === "approved" || status === "authorized";
  const rawTotal =
    Number(order?.total ?? order?.amount ?? order?.amounts?.total ?? 0) || 0;
  const currency = String(order?.currency ?? order?.amounts?.currency ?? "CLP");
  const totalLabel = currency === "CLP" ? formatCLP(rawTotal) : `${rawTotal} ${currency}`;
  const statusLabel =
    status === "approved"
      ? "Pago aprobado"
      : status === "rejected"
      ? "Pago rechazado"
      : status === "in_process"
      ? "Pago en revisión"
      : "Pago pendiente";
  const statusTone =
    status === "approved"
      ? "bg-[#C0FF03]/15 text-[#C0FF03] border-[#C0FF03]/40"
      : status === "rejected"
      ? "bg-red-500/10 text-red-300 border-red-500/40"
      : status === "in_process"
      ? "bg-amber-500/10 text-amber-200 border-amber-500/40"
      : "bg-white/5 text-white/70 border-white/10";

  return (
    <main className="min-h-[70vh] bg-[radial-gradient(circle_at_top_right,rgba(192,255,3,0.10),transparent_45%),linear-gradient(180deg,#0e0e0f_0%,#0a0a0b_100%)]">
      <ClearCartOnSuccess enabled={shouldClear} />
      <div className="mx-auto max-w-4xl px-6 py-12 text-white">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs ${statusTone}`}>
              <span className="inline-block h-2 w-2 rounded-full bg-current" />
              {statusLabel}
            </div>
            <h1 className="text-3xl font-extrabold">Gracias por tu compra</h1>
            <p className="text-sm text-white/60">
              Te enviaremos un correo con el detalle del pedido y el estado del pago.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
            <div className="rounded-2xl border border-white/10 bg-[#141416] p-5 shadow-[0_10px_28px_rgba(0,0,0,.45)]">
              <div className="text-sm text-white/60">Orden</div>
              <div className="mt-1 text-lg font-semibold break-all">{orderId}</div>

              <div className="mt-4 grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2">
                  <span className="text-white/60">Monto</span>
                  <span className="font-semibold">{totalLabel}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2">
                  <span className="text-white/60">Email</span>
                  <span className="font-semibold">{order.customer?.email ?? "-"}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2">
                  <span className="text-white/60">MP Payment ID</span>
                  <span className="font-semibold">{order.mp?.paymentId ?? "-"}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2">
                  <span className="text-white/60">Detalle</span>
                  <span className="font-semibold">
                    {order.status_detail ?? order.mp?.statusDetail ?? "-"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#101013] p-5">
              <div className="text-sm font-semibold">Siguientes pasos</div>
              <ul className="mt-3 space-y-2 text-sm text-white/65">
                <li>Te confirmaremos por email cuando el pago quede aprobado.</li>
                <li>Si tu compra es con envío, te enviaremos el número de seguimiento.</li>
                <li>¿Necesitas ayuda? Escríbenos y te respondemos rápido.</li>
              </ul>
              <div className="mt-5 flex flex-col gap-2">
                <Link
                  className="rounded-full bg-[#C0FF03] px-4 py-2 text-center text-sm font-semibold text-black hover:brightness-95 transition"
                  href="/"
                >
                  Volver a la tienda
                </Link>
                <Link
                  className="rounded-full border border-white/15 px-4 py-2 text-center text-sm font-semibold text-white/90 hover:bg-white/5 transition"
                  href={( `/orders/${orderId}` as Route )}
                >
                  Ver pedido
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
