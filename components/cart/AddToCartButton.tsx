"use client";

import React, { useMemo } from "react";
import { useCart } from "./useCart";
import type { CartVariant } from "@/lib/cart/types";
import { safeNumber } from "@/lib/cart/money"

type ProductLike = {
  slug: string;
  name: string;
  price?: number | string;     // tu campo puede ser number o string
  priceRub?: number | string;  // si tu dataset usa priceRub (ajusta si corresponde)
  images?: string[];
  image?: string;
};

function makeVariantKey(variant?: CartVariant) {
  if (!variant) return "";
  const entries = Object.entries(variant)
    .filter(([, v]) => String(v ?? "").trim().length > 0)
    .sort(([a], [b]) => a.localeCompare(b));
  if (!entries.length) return "";
  return entries.map(([k, v]) => `${k}:${v}`).join("|");
}

export default function AddToCartButton({
  product,
  quantity = 1,
  variant,
  maxQuantity,
  className = "",
  label = "Agregar al carrito",
}: {
  product: ProductLike;
  quantity?: number;
  variant?: CartVariant;
  maxQuantity?: number;
  className?: string;
  label?: string;
}) {
  const { addItem } = useCart();

  const unitPrice = useMemo(() => {
    // Prioriza price (si existe) y cae a priceRub
    const raw = product.price ?? product.priceRub ?? 0;
    return safeNumber(raw, 0);
  }, [product.price, product.priceRub]);

  const key = useMemo(() => {
    const vKey = makeVariantKey(variant);
    return vKey ? `${product.slug}__${vKey}` : product.slug;
  }, [product.slug, variant]);

  const image = product.image ?? product.images?.[0];

  return (
    <button
      type="button"
      onClick={() =>
        addItem({
          key,
          productSlug: product.slug,
          productName: product.name,
          productUrl: `/products/${product.slug}`,
          image,
          unitPrice,
          currency: "CLP",
          quantity,
          maxQuantity,
          variant,
        })
      }
      className={
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold " +
        "bg-black text-white hover:opacity-90 transition " +
        className
      }
    >
      {label}
    </button>
  );
}
