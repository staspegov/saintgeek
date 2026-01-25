"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "./useCart";
import CartItemRow from "./CartItemRow";
import CartSummary from "./CartSummary";

type Fulfillment = "pickup" | "delivery";

type DeliveryAddress = {
  region: string;
  comuna: string;
  address1: string;
  number: string;
  depto: string;
  postalCode: string;
};

const LS_MODE_KEY = "sg_cart_fulfillment";
const LS_ADDR_KEY = "sg_cart_delivery_address";

const defaultAddress: DeliveryAddress = {
  region: "Región Metropolitana",
  comuna: "",
  address1: "",
  number: "",
  depto: "",
  postalCode: "",
};

export default function CartDrawer() {
  const { state, close, items, clear, subtotal } = useCart();

  const [fulfillment, setFulfillment] = useState<Fulfillment>("pickup");
  const [address, setAddress] = useState<DeliveryAddress>(defaultAddress);

  // (futuro) aquí guardarás el resultado de tu cotizador Chilexpress
  const [shippingCost, setShippingCost] = useState<number>(0);

  // Load persisted selection
  useEffect(() => {
    try {
      const mode = (localStorage.getItem(LS_MODE_KEY) as Fulfillment) || "pickup";
      if (mode === "pickup" || mode === "delivery") setFulfillment(mode);

      const raw = localStorage.getItem(LS_ADDR_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setAddress({ ...defaultAddress, ...parsed });
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist selection
  useEffect(() => {
    try {
      localStorage.setItem(LS_MODE_KEY, fulfillment);
      localStorage.setItem(LS_ADDR_KEY, JSON.stringify(address));
    } catch {
      // ignore
    }
  }, [fulfillment, address]);

  // UX: Escape closes
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (state.isOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [state.isOpen, close]);

  // Hint para el resumen
  const shippingHint = useMemo(() => {
    if (fulfillment === "pickup") return "Retiro en tienda: envío $0.";
    return "Delivery: el envío se cotizará con Chilexpress según comuna y dirección.";
  }, [fulfillment]);

  // Total (hoy shippingCost = 0; luego lo setearás con Chilexpress)
  const total = useMemo(() => subtotal + (fulfillment === "pickup" ? 0 : shippingCost), [
    subtotal,
    fulfillment,
    shippingCost,
  ]);

  const deliveryOpen = fulfillment === "delivery";

  return (
    <>
      {/* Overlay */}
      <div
        onClick={close}
        className={
          "fixed inset-0 z-40 bg-black/50 transition-opacity " +
          (state.isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")
        }
      />

      {/* Drawer */}
      <aside
        className={
          "fixed right-0 top-0 z-50 h-full w-full sm:w-[420px] bg-white shadow-2xl " +
          "transition-transform duration-300 " +
          (state.isOpen ? "translate-x-0" : "translate-x-full")
        }
        aria-hidden={!state.isOpen}
      >
        <div className="h-full flex flex-col text-black">
          {/* Header */}
          <div className="p-4 border-b border-black/10 flex items-center justify-between">
            <div>
              <div className="text-base font-semibold">Carrito</div>
              <div className="text-xs text-black/60">{items.length} producto(s)</div>
            </div>

            <button
              onClick={close}
              className="rounded-xl px-3 py-2 text-sm font-semibold bg-white text-black border border-black/15 hover:bg-black/5 transition"
            >
              Cerrar
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {/* Entrega (Retiro / Delivery) */}
            <section className="rounded-2xl bg-white border border-black/10 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Entrega</h3>
                <span className="text-xs text-black/60">
                  {fulfillment === "pickup" ? "Retiro" : "Delivery"}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFulfillment("pickup");
                    setShippingCost(0); // por ahora
                  }}
                  className={
                    "h-10 rounded-xl text-sm font-semibold border transition " +
                    (fulfillment === "pickup"
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-black/15 hover:bg-black/5")
                  }
                >
                  Retiro
                </button>

                <button
                  type="button"
                  onClick={() => setFulfillment("delivery")}
                  className={
                    "h-10 rounded-xl text-sm font-semibold border transition " +
                    (fulfillment === "delivery"
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-black/15 hover:bg-black/5")
                  }
                >
                  Delivery
                </button>
              </div>

              {/* Div dinámico (delivery form) */}
              <div
                className={
                  "overflow-hidden transition-all duration-300 " +
                  (deliveryOpen ? "max-h-[520px] opacity-100 mt-3" : "max-h-0 opacity-0 mt-0")
                }
              >
                <div className="pt-3 border-t border-black/10 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      value={address.region}
                      onChange={(e) => setAddress((a) => ({ ...a, region: e.target.value }))}
                      placeholder="Región"
                      className="h-10 px-3 rounded-xl border border-black/15 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                    />
                    <input
                      value={address.comuna}
                      onChange={(e) => setAddress((a) => ({ ...a, comuna: e.target.value }))}
                      placeholder="Comuna"
                      className="h-10 px-3 rounded-xl border border-black/15 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <input
                      value={address.address1}
                      onChange={(e) => setAddress((a) => ({ ...a, address1: e.target.value }))}
                      placeholder="Calle / Dirección"
                      className="col-span-2 h-10 px-3 rounded-xl border border-black/15 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                    />
                    <input
                      value={address.number}
                      onChange={(e) => setAddress((a) => ({ ...a, number: e.target.value }))}
                      placeholder="N°"
                      className="h-10 px-3 rounded-xl border border-black/15 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      value={address.depto}
                      onChange={(e) => setAddress((a) => ({ ...a, depto: e.target.value }))}
                      placeholder="Depto / Oficina (opcional)"
                      className="h-10 px-3 rounded-xl border border-black/15 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                    />
                    <input
                      value={address.postalCode}
                      onChange={(e) => setAddress((a) => ({ ...a, postalCode: e.target.value }))}
                      placeholder="Código postal (opcional)"
                      className="h-10 px-3 rounded-xl border border-black/15 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                    />
                  </div>

                  {/* Botón placeholder para Chilexpress */}
                  <button
                    type="button"
                    disabled
                    className="w-full h-10 rounded-xl bg-white text-black border border-black/15 opacity-60 cursor-not-allowed"
                    title="Próximamente: cotización Chilexpress"
                  >
                    Cotizar Chilexpress (próximamente)
                  </button>

                  <p className="text-xs text-black/60">
                    Esta dirección se usará para la cotización de envío con Chilexpress en el siguiente paso.
                  </p>
                </div>
              </div>
            </section>

            {/* Items */}
            {items.length === 0 ? (
              <div className="text-sm text-black/70">
                Tu carrito está vacío.
                <div className="mt-3">
                  <Link href="/" onClick={close} className="underline font-semibold text-black">
                    Ver productos
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((it) => (
                  <CartItemRow key={it.key} item={it} />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-black/10 p-4 space-y-3">
            <CartSummary
              shipping={fulfillment === "pickup" ? 0 : shippingCost}
              shippingHint={shippingHint}
            />

            <div className="flex gap-2">
              <Link
                href="/cart"
                onClick={close}
                className="flex-1 rounded-full px-6 py-4 text-sm font-semibold text-center text-black transition disabled:opacity-50"
                style={{ backgroundColor: "#C0FF03" }} // mismo verde SaintGeek
              >
                Ir a pagar
              </Link>

              <button
                type="button"
                onClick={clear}
                disabled={items.length === 0}
                className="rounded-xl px-4 py-3 text-sm font-semibold bg-white text-black border border-black/15 hover:bg-black/5 transition disabled:opacity-50"
              >
                Vaciar
              </button>
            </div>

            {/* (Opcional) Debug total */}
            <div className="text-[11px] text-black/50">
              Total actual: {total.toLocaleString("es-CL")} CLP
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
