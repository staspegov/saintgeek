"use client";

import React from "react";
import { useCart } from "./useCart";

function CartIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.5 6.5h15l-1.3 7.2a2 2 0 0 1-2 1.6H9.1a2 2 0 0 1-2-1.6L5.3 3.5H2.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 21a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4ZM17.5 21a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function CartButton({ className = "" }: { className?: string }) {
  const { count, toggle } = useCart();

  return (
    <button
      type="button"
      onClick={toggle}
      className={
        "relative inline-flex items-center justify-center rounded-xl p-2 hover:bg-white/5 transition " +
        className
      }
      aria-label="Abrir carrito"
    >
      <CartIcon />

      {count > 0 && (
        <span
          className="
            absolute -top-1 -right-1
            min-w-[18px] h-[18px] px-1
            rounded-full
            text-[11px] font-extrabold
            flex items-center justify-center
            text-black
            border border-black/20
          "
          style={{ backgroundColor: "#C0FF03" }} // ✅ mismo color del botón Contactar
        >
          {count}
        </span>
      )}
    </button>
  );
}
