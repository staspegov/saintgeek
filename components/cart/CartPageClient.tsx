"use client";

import React from "react";
import Link from "next/link";
import CartItemRow from "./CartItemRow";
import CartSummary from "./CartSummary";
import { useCart } from "./useCart";

export default function CartPageClient() {
  const { items, clear } = useCart();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">Carrito</h1>
          <p className="text-sm text-black/60">Revisa tus productos antes de pagar.</p>
        </div>

        <div className="flex gap-2">
          <Link href="/" className="rounded-xl px-4 py-2 text-sm font-semibold bg-black/5 hover:bg-black/10 transition">
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

          {/* Aquí conectas tu checkout real (MercadoPago / Transferencia / etc.) */}
         <button
  disabled={items.length === 0}
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
    backgroundColor: "#C0FF03", // mismo verde SaintGeek
  }}
>
  Continuar al pago
</button>


          <div className="text-xs text-black/60">
            Si vas a implementar transferencia con descuento, aquí es donde conviene mostrar el “precio por transferencia”.
          </div>
        </div>
      </div>
    </div>
  );
}
