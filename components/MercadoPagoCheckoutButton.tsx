"use client";

import { useEffect, useRef, useState } from "react";
import CardPaymentBrick, { CardPaymentBrickHandle } from "./CardPaymentBrick";

type Props = {
  amount: number;
  description: string;
  payerEmail?: string;
  metadata?: Record<string, any>;
  buttonLabel?: string;
};

export default function MercadoPagoCheckoutButton({
  amount,
  description,
  payerEmail,
  metadata,
  buttonLabel = "Comprar con tarjeta (Mercado Pago)",
}: Props) {
  const brickRef = useRef<CardPaymentBrickHandle | null>(null);

  // mounted = existe en DOM; open = visible
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setMounted(true);
    setOpen(true);
  };

  const closeModal = async () => {
    // 1) Mantén el modal montado
    setOpen(false);
    // 2) Desmonta el Brick de forma segura
    await brickRef.current?.unmount?.();
    // 3) Recién ahora remueve el modal del DOM
    setMounted(false);
  };

  // ESC + lock scroll
  useEffect(() => {
    if (!mounted) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  return (
    <>
      <button
        onClick={openModal}
        className="block w-full text-center rounded-lg bg-[#1f4fff] text-white px-4 py-3 text-sm font-semibold hover:brightness-95 transition"
      >
        {buttonLabel}
      </button>

      {mounted && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 ${
            open ? "" : "pointer-events-none opacity-0"
          }`}
          aria-modal="true"
          role="dialog"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-[#1f1f20] bg-[#0f0f11] shadow-xl">
            <div className="flex items-start justify-between gap-4 p-5 border-b border-[#1f1f20]">
              <div>
                <h3 className="text-white text-lg font-semibold">Paga con tarjeta</h3>
                <p className="text-[#a9abb0] text-sm">Checkout seguro con Mercado Pago.</p>
              </div>
              <button
                aria-label="Cerrar"
                onClick={closeModal}
                className="rounded-lg p-2 hover:bg-white/5 text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-5">
              <CardPaymentBrick
                ref={brickRef}
                amount={amount}
                description={description}
                payerEmail={payerEmail}
                metadata={metadata}
              />

              <div className="mt-4 text-xs text-[#a9abb0]">
                En TEST usa tarjetas oficiales + una cuenta comprador de prueba (en “Cuentas de prueba” de MP).
              </div>

              <button
                onClick={closeModal}
                className="mt-4 w-full rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
