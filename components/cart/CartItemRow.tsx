"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { UrlObject } from "url";

import type { CartItem } from "@/lib/cart/types";
import { useCart } from "./useCart";
import { formatMoney } from "@/lib/cart/money"; // ajusta si tu ruta real es distinta

export default function CartItemRow({ item }: { item: CartItem }) {
  const { removeItem, setQty, state } = useCart();

  const href: UrlObject = useMemo(() => {
    if (item.productUrl && item.productUrl.startsWith("/")) {
      return { pathname: item.productUrl };
    }
    return { pathname: "/products/[slug]", query: { slug: item.productSlug } };
  }, [item.productUrl, item.productSlug]);

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-3 flex gap-3">
      <div className="relative w-16 h-16 rounded-xl bg-black/5 overflow-hidden flex-shrink-0 border border-black/10">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.productName}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="flex-1 min-w-0">
        <Link href={href} className="font-semibold text-sm hover:underline block truncate text-black">
          {item.productName}
        </Link>

        {item.variant && Object.keys(item.variant).length > 0 && (
          <div className="mt-1 text-xs text-black/60">
            {Object.entries(item.variant)
              .filter(([, v]) => String(v ?? "").trim().length > 0)
              .map(([k, v]) => (
                <span key={k} className="mr-2">
                  {k}: <span className="font-semibold text-black">{v}</span>
                </span>
              ))}
          </div>
        )}

        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="text-sm font-semibold text-black">
            {formatMoney(item.unitPrice * item.quantity, state.currency)}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setQty(item.key, item.quantity - 1)}
              className="w-9 h-9 rounded-xl bg-white text-black border border-black/15 hover:bg-black/5 transition text-sm font-bold"
              aria-label="Disminuir"
            >
              -
            </button>

            <input
              value={item.quantity}
              onChange={(e) => {
                const next = Number(e.target.value);
                setQty(item.key, Number.isFinite(next) ? next : 1);
              }}
              className="w-12 h-9 rounded-xl border border-black/15 bg-white text-black text-center text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-black/20"
              inputMode="numeric"
            />

            <button
              type="button"
              onClick={() => setQty(item.key, item.quantity + 1)}
              className="w-9 h-9 rounded-xl bg-white text-black border border-black/15 hover:bg-black/5 transition text-sm font-bold"
              aria-label="Aumentar"
            >
              +
            </button>

            <button
              type="button"
              onClick={() => removeItem(item.key)}
              className="ml-1 rounded-xl px-3 h-9 text-sm font-semibold bg-white text-black border border-black/15 hover:bg-black/5 transition"
            >
              Quitar
            </button>
          </div>
        </div>

        <div className="mt-1 text-xs text-black/60">
          Unitario: <span className="text-black">{formatMoney(item.unitPrice, state.currency)}</span>
          {typeof item.maxQuantity === "number" ? ` · Máx: ${item.maxQuantity}` : ""}
        </div>
      </div>
    </div>
  );
}
