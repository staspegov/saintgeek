"use client"

import { useEffect, useMemo, useState } from "react"

type Props = {
  amount: number | string // p.priceRub puede venir como número o string
}

export default function CreditCalcButton({ amount }: Props) {
  const [open, setOpen] = useState(false)

  // Parseo simple por si amount viene con símbolos (ej: "$129.990")
  const base = useMemo(() => {
    const n = Number(String(amount).replace(/[^\d.]/g, ""))
    return Number.isFinite(n) ? n : 0
  }, [amount])

  const cuota = useMemo(() => (base > 0 ? base / 6 : 0), [base])

  const formatCLP = (v: number) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(v)

  // Cerrar con ESC + bloquear scroll del body cuando está abierto
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-block rounded-lg border border-lime-400 px-4 py-2 text-sm text-lime-400 hover:bg-[#C0FF03] hover:text-black transition"
      >
        Calcular crédito
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
        >
          {/* Modal pequeño centrado */}
          <div className="w-full max-w-sm rounded-2xl border border-[#1f1f20] bg-[#0f0f11] p-4 shadow-xl">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-white text-base font-semibold">Crédito en 6 cuotas sin interés</h3>
              <button
                aria-label="Cerrar"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 hover:bg-white/5"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-[#a9abb0]">
              Precio: <span className="text-white font-semibold">{formatCLP(base)}</span>
            </p>
            <p className="text-sm text-[#a9abb0] mt-1">
              6 cuotas de:{" "}
              <span className="text-white font-semibold">{formatCLP(Math.round(cuota))}</span>
            </p>

            <div className="text-[11px] text-[#7d7f86] mt-3">
              *Cálculo referencial dividiendo el precio en 6 partes iguales. No incluye costos de
              financiamiento del banco o tarjeta.
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-[#2c2c2f] px-3 py-2 text-xs hover:border-lime-400 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
