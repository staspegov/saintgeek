"use client"

import React, { useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import CartItemRow from "./CartItemRow"
import CartSummary from "./CartSummary"
import { useCart } from "./useCart"

const TRANSFER_DISCOUNT = 0.16

function formatCLP(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Math.round(value))
}

function getQty(it: any): number {
  if (typeof it?.qty === "number") return it.qty
  if (typeof it?.quantity === "number") return it.quantity
  return 1
}

function getUnitPrice(it: any): number {
  // soporta distintos shapes de item (por si guardas product dentro del cart)
  if (typeof it?.price === "number") return it.price
  if (typeof it?.unitPrice === "number") return it.unitPrice
  if (typeof it?.priceRub === "number") return it.priceRub
  if (typeof it?.product?.priceRub === "number") return it.product.priceRub
  if (typeof it?.product?.price === "number") return it.product.price
  return 0
}

export default function CartPageClient() {
  const router = useRouter()
  const { items, clear } = useCart()

  const totalNormal = useMemo(() => {
    return items.reduce((acc, it) => acc + getUnitPrice(it) * getQty(it), 0)
  }, [items])

  const totalTransfer = useMemo(() => {
    return Math.round(totalNormal * (1 - TRANSFER_DISCOUNT))
  }, [totalNormal])

  const ahorroTransfer = Math.max(0, totalNormal - totalTransfer)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">Carrito</h1>
          <p className="text-sm text-white/60">
            Revisa tus productos antes de pagar.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/"
            className="rounded-xl px-4 py-2 text-sm font-semibold bg-black/5 hover:bg-black/10 transition"
          >
            Seguir comprando
          </Link>
          <button
            onClick={clear}
            disabled={items.length === 0}
            className="rounded-xl px-4 py-2 text-sm font-semibold bg-black/5 hover:bg-black/10 transition disabled:opacity-50"
          >
            Vaciar
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="rounded-2xl border p-6 text-sm text-black/70">
              Tu carrito está vacío.{" "}
              <Link href="/" className="underline font-semibold">
                Ir a productos
              </Link>
            </div>
          ) : (
            items.map((it) => <CartItemRow key={it.key} item={it} />)
          )}
        </div>

        <div className="lg:sticky lg:top-6 h-fit space-y-3">
          <CartSummary />

          {/* ✅ Precio transferencia (visible ANTES de ir a pagar) */}
          <div className="rounded-2xl border border-black/10 bg-black/[0.03] p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Total por transferencia (-16%)</span>
              <span className="font-extrabold" style={{ color: "#7aa800" }}>
                {formatCLP(totalTransfer)}
              </span>
            </div>
            <div className="mt-1 text-xs text-white/50">
              Ahorro aprox: {formatCLP(ahorroTransfer)}
            </div>
          </div>

          {/* 👉 Botón a la nueva página /pago */}
          <button
            disabled={items.length === 0}
            onClick={() => router.push("/pago")}
            className="
              w-full
              rounded-full
              px-6 py-4
              text-sm font-semibold
              text-black
              transition
              disabled:opacity-50
            "
            style={{
              backgroundColor: "#C0FF03",
            }}
          >
            Continuar al pago
          </button>

          
        </div>
      </div>
    </div>
  )
}