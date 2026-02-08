"use client"

import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import CardPaymentBrick from "@/components/CardPaymentBrick"
import { useCart } from "@/components/cart/useCart"

type Draft = {
  orderId: string
  createdAt: number
  amount: number
  description: string
  payerEmail: string
  form: any
  items: Array<{ key: string; qty: number; unit: number; name: string }>
}

function formatCLP(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Math.round(value))
}

export default function MercadoPagoCardPageClient() {
  const router = useRouter()
  const { clear } = useCart()

  const [draft, setDraft] = useState<Draft | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem("sg_checkout_draft")
    if (!raw) return
    try {
      const parsed = JSON.parse(raw) as Draft
      setDraft(parsed)
    } catch {
      setDraft(null)
    }
  }, [])

  const pageBg =
    "bg-[radial-gradient(circle_at_top_right,rgba(192,255,3,0.10),transparent_45%),linear-gradient(180deg,#0e0e0f_0%,#0a0a0b_100%)]"
  const card =
    "rounded-2xl border border-white/10 bg-[#141416] shadow-[0_10px_28px_rgba(0,0,0,.45)]"
  const softCard = "rounded-2xl border border-white/10 bg-[#0f0f10]"
  const green = "#C0FF03"

  // ✅ AQUÍ: metadata.orderId SIEMPRE presente
  const metadata = useMemo(() => {
    if (!draft) return undefined
    return {
      orderId: draft.orderId, // <- lo que te faltaba
      payer: draft.form,
      items: draft.items,
      createdAt: draft.createdAt,
    }
  }, [draft])

  if (!draft) {
    return (
      <div className={`min-h-screen ${pageBg} text-white`}>
        <div className="max-w-3xl mx-auto px-4 py-14">
          <div className={`${card} p-6`}>
            <h1 className="text-xl font-extrabold">No hay un pago iniciado</h1>
            <p className="mt-2 text-sm text-white/60">
              Vuelve al checkout y selecciona MercadoPago nuevamente.
            </p>
            <Link
              href="/pago"
              className="mt-5 inline-block rounded-full px-6 py-3 text-sm font-semibold text-black"
              style={{ backgroundColor: green }}
            >
              Volver a pago
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${pageBg} text-white`}>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold">Pago con tarjeta</h1>
            <p className="text-sm text-white/60">Checkout seguro con MercadoPago.</p>
            <p className="mt-1 text-xs text-white/45">Order ID: {draft.orderId}</p>
          </div>

          <button
            onClick={() => router.push("/pago")}
            className="rounded-xl px-4 py-2 text-sm font-semibold bg-white/5 hover:bg-white/10 transition text-white border border-white/10"
          >
            Volver
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          <div className={`${card} p-5`}>
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-white/85">
                Total: <span className="text-white">{formatCLP(draft.amount)}</span>
              </div>
              <div className="text-xs text-white/50">
                {draft.payerEmail ? `Email: ${draft.payerEmail}` : ""}
              </div>
            </div>

            <div className="mt-4">
              <CardPaymentBrick
                amount={draft.amount}
                description={draft.description}
               
                metadata={metadata}
              />
            </div>

            <div className="mt-4 text-xs text-white/50">
              En TEST usa tarjetas oficiales + una cuenta comprador de prueba.
            </div>

            <button
              onClick={() => {
                clear()
                localStorage.removeItem("sg_checkout_draft")
                router.push(`/checkout/success?orderId=${encodeURIComponent(draft.orderId)}`)
              }}
              className="mt-4 w-full rounded-full px-6 py-3 text-sm font-semibold text-black hover:brightness-95 transition"
              style={{ backgroundColor: green }}
            >
              Ir a confirmación (debug)
            </button>
          </div>

          <div className="space-y-3 lg:sticky lg:top-6 h-fit">
            <div className={`${card} p-5`}>
              <h2 className="font-extrabold">Resumen</h2>

              <div className="mt-3 space-y-2 text-sm">
                {draft.items.map((it) => (
                  <div key={it.key} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold truncate text-white/90">{it.name}</div>
                      <div className="text-xs text-white/50">
                        {it.qty} × {formatCLP(it.unit)}
                      </div>
                    </div>
                    <div className="font-semibold text-white/90">
                      {formatCLP(it.qty * it.unit)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-white/10 pt-4 text-sm flex items-center justify-between">
                <span className="text-white/60">Total</span>
                <span className="font-extrabold text-white">{formatCLP(draft.amount)}</span>
              </div>
            </div>

            <div className={`${softCard} p-5 text-xs text-white/60`}>
              ¿Problemas pagando? Escríbenos y te ayudamos.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
