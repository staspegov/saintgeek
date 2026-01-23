"use client";

import Link from "next/link";
import { useState } from "react";
import CartButton from "@/components/cart/CartButton";

export default function Topbar() {
  const [openPopup, setOpenPopup] = useState<null | "help" | "about" | "contact">(null);
  const [message, setMessage] = useState("");

  const handleSendWhatsApp = () => {
    const phone = "56975682588";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0c0c0d] border-b border-[#1a1a1c]">
        <div className="max-w-[1450px] mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-[#C0FF03] font-extrabold text-lg no-underline">
            SaintGeek
          </Link>

          {/* Nav */}
          <nav className="flex gap-6 text-sm text-[#d4d4d8]">
            <button onClick={() => setOpenPopup("about")} className="hover:text-white">
              Sobre nosotros
            </button>
            <button onClick={() => setOpenPopup("help")} className="hover:text-white">
              Ayuda
            </button>
            <Link href="/blog" className="hover:text-white">
              Blog
            </Link>
          </nav>

          {/* CTA + Cart */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenPopup("contact")}
              className="hidden sm:inline-block bg-[#C0FF03] text-[#101010] px-3.5 py-1.5 rounded-full font-semibold text-sm shadow-md hover:brightness-95"
            >
              Contactar
            </button>

            {/* Carrito al lado del botón Contactar */}
            <CartButton className="text-[#e9e9ea]" />
          </div>
        </div>
      </header>

      {/* Popup overlay */}
      {openPopup && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1c] rounded-xl max-w-lg w-full p-6 text-[#e9e9ea] relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setOpenPopup(null)}
            >
              ✕
            </button>

            {/* About */}
            {openPopup === "about" && (
              <>
                <h2 className="text-xl font-bold mb-3">Sobre nosotros</h2>
                <p className="text-sm text-[#b6b6b8]">
                  Somos el equipo de SaintGeek, nos dedicamos a los teclados y a la periferia gamer.
                  Nuestro objetivo es hacer que los productos sean accesibles en Chile con un servicio y soporte de calidad.
                </p>
              </>
            )}

            {/* Help */}
            {openPopup === "help" && (
              <>
                <h2 className="text-xl font-bold mb-3">Ayuda / FAQ</h2>
                <ul className="list-disc pl-4 space-y-2 text-sm text-[#b6b6b8]">
                  <li>¿Cómo comprar? → Las compras se realizan en MercadoLibre.</li>
                  <li>¿Envíos? → Si compras en MercadoLibre, enviamos a todo Chile vía Chilexpress.</li>
                  <li>
                    ¿Transferencia bancaria? → Aceptada; por ahora la entrega es solo en Santiago. Próximamente habilitaremos
                    envíos a todo Chile para compras por transferencia.
                  </li>
                  <li>¿Garantía? → 6 meses (no cubre daño físico).</li>
                  <li>¿Pruebas de calidad? → Todos los teclados se prueban antes del despacho.</li>
                </ul>
              </>
            )}

            {/* Contact */}
            {openPopup === "contact" && (
              <>
                <h2 className="text-xl font-bold mb-3">Contacta con nosotros</h2>
                <p className="text-sm text-[#b6b6b8] mb-3">Escribe un mensaje y te responderemos por WhatsApp:</p>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tu mensaje..."
                  className="w-full h-28 p-2 rounded-md bg-[#0f0f11] border border-[#262629] text-white text-sm"
                />
                <button
                  onClick={handleSendWhatsApp}
                  disabled={!message.trim()}
                  className="mt-3 w-full bg-[#C0FF03] text-[#101010] py-2 rounded-full font-semibold text-sm shadow-md hover:brightness-95 disabled:opacity-50"
                >
                  Enviar a WhatsApp
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
