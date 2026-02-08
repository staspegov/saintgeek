// app/pago/exito/page.tsx
"use client"

import React, { useEffect, useMemo, useRef } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useCart } from "@/components/cart/useCart"

export default function Page() {
  const sp = useSearchParams()
  const { items, clear } = useCart()
  const didClear = useRef(false)

  // Limpia carrito 1 sola vez
  useEffect(() => {
    if (didClear.current) return
    didClear.current = true
    clear()
  }, [clear])

  const method = sp.get("method") // "transfer" | "mercadopago" (opcional)
  const status = sp.get("status") // MercadoPago: approved, rejected, etc.
  const paymentId = sp.get("payment_id")
  const merchantOrderId = sp.get("merchant_order_id")
  const preferenceId = sp.get("preference_id")

  const isTransfer = method === "transfer"
  const isApproved = status === "approved" || status === "authorized"

  const title = useMemo(() => {
    if (isTransfer) return "Solicitud recibida"
    if (isApproved) return "Pago confirmado"
    if (status) return "Estado del pago"
    return "Compra finalizada"
  }, [isTransfer, isApproved, status])

  const subtitle = useMemo(() => {
    if (isTransfer) {
      return "Te dejamos las instrucciones para completar la transferencia. Cuando se confirme, te contactamos."
    }
    if (isApproved) {
      return "Tu pago fue aprobado. Te enviaremos la confirmación y el detalle al correo."
    }
    if (status) {
      return "Revisa el estado del pago. Si hubo un problema, puedes intentar nuevamente o escribirnos."
    }
    return "Gracias por tu compra. Si tienes dudas, estamos para ayudarte."
  }, [isTransfer, isApproved, status])

  const pageBg =
    "bg-[radial-gradient(circle_at_top_right,rgba(192,255,3,0.10),transparent_45%),linear-gradient(180deg,#0e0e0f_0%,#0a0a0b_100%)]"
  const card =
    "rounded-2xl border border-white/10 bg-[#141416] shadow-[0_10px_28px_rgba(0,0,0,.45)]"
  const softCard = "rounded-2xl border border-white/10 bg-[#0f0f10]"
  const green = "#C0FF03"

  return (
    <div className={`min-h-screen ${pageBg} text-white`}>
      <div className="max-w-3xl mx-auto px-4 py-14">
        <div className={`${card} p-7`}>
          <div className="flex items-start gap-4">
            <div
              className="h-12 w-12 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(192,255,3,0.14)", border: "1px solid rgba(192,255,3,0.25)" }}
            >
              {/* Icono check */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M20 7L10 17l-5-5"
                  stroke={green}
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-extrabold">{title}</h1>
              <p className="mt-1 text-sm text-white/60">{subtitle}</p>

              {/* Meta / IDs */}
              {(paymentId || merchantOrderId || preferenceId || status) && (
                <div className={`${softCard} mt-4 p-4 text-xs text-white/70`}>
                  <div className="font-semibold text-white/80 mb-2">Detalles</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {status && (
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-white/50">Status</span>
                        <span className="font-semibold">{status}</span>
                      </div>
                    )}
                    {paymentId && (
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-white/50">payment_id</span>
                        <span className="font-semibold">{paymentId}</span>
                      </div>
                    )}
                    {merchantOrderId && (
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-white/50">merchant_order_id</span>
                        <span className="font-semibold">{merchantOrderId}</span>
                      </div>
                    )}
                    {preferenceId && (
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-white/50">preference_id</span>
                        <span className="font-semibold">{preferenceId}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Transferencia: caja de instrucciones */}
              {isTransfer && (
                <div className={`${softCard} mt-4 p-4 text-sm`}>
                  <div className="font-semibold text-white/85">Instrucciones de transferencia</div>
                  <p className="mt-1 text-white/60 text-xs">
                    Reemplaza estos datos por los reales. Idealmente agrega también un botón para “Enviar comprobante”.
                  </p>

                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/70">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-white/45">Banco</span>
                      <span className="font-semibold">_____</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-white/45">Nombre</span>
                      <span className="font-semibold">_____</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-white/45">RUT</span>
                      <span className="font-semibold">_____</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-white/45">Cuenta</span>
                      <span className="font-semibold">_____</span>
                    </div>
                    <div className="flex items-center justify-between gap-3 sm:col-span-2">
                      <span className="text-white/45">Email</span>
                      <span className="font-semibold">_____</span>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-white/45">
                    Glosa sugerida: <span className="text-white/70 font-semibold">“Pedido SaintGeek”</span>
                  </div>
                </div>
              )}

              {/* Acciones */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/"
                  className="w-full sm:w-auto rounded-full px-6 py-3 text-sm font-semibold text-black text-center hover:brightness-95 transition"
                  style={{ backgroundColor: green }}
                >
                  Volver a la tienda
                </Link>

                <Link
                  href="/cart"
                  className="w-full sm:w-auto rounded-full px-6 py-3 text-sm font-semibold text-white text-center bg-white/5 hover:bg-white/10 transition border border-white/10"
                >
                  Ver carrito
                </Link>
              </div>

              {/* Nota */}
              <p className="mt-4 text-xs text-white/40">
                (Debug) Items antes de limpiar: {items.length}
              </p>
            </div>
          </div>
        </div>

        <div className={`${softCard} mt-4 p-5 text-xs text-white/60`}>
          ¿Necesitas ayuda? Escríbenos y te guiamos con tu compra.
        </div>
      </div>
    </div>
  )
}