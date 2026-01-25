"use client";

import React, { useMemo } from "react";
import { useCart } from "./useCart";
import { formatMoney } from "@/lib/cart/money"; // ajusta si tu ruta real es distinta

export default function CartSummary({
  shipping = 0,
  shippingHint,
}: {
  shipping?: number;
  shippingHint?: string;
}) {
  const { subtotal, state, items } = useCart();

  const total = useMemo(() => subtotal + shipping, [subtotal, shipping]);

  return (
    <div className="rounded-2xl bg-white border border-black/10 p-4 text-black">
      <div className="flex items-center justify-between text-sm">
        <span className="text-black/70">Subtotal</span>
        <span className="font-semibold text-black">
          {formatMoney(subtotal, state.currency)}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-black/70">Envío</span>
        <span className="font-semibold text-black">
          {formatMoney(shipping, state.currency)}
        </span>
      </div>

      <div className="mt-3 pt-3 border-t border-black/10 flex items-center justify-between">
        <span className="text-sm font-semibold text-black">Total</span>
        <span className="text-lg font-extrabold text-black">
          {formatMoney(total, state.currency)}
        </span>
      </div>

      {(shippingHint || items.length > 0) && (
        <div className="mt-2 text-xs text-black/60">
          {shippingHint ?? "El total puede variar según método de envío y comuna."}
        </div>
      )}
    </div>
  );
}
