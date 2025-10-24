'use client'

import { useState } from "react"
import Link from "next/link"

export default function Footer() {
  const [openPopup, setOpenPopup] = useState<null | "help" | "about" | "contact">(null)
  const [message, setMessage] = useState("")

  const handleSendWhatsApp = () => {
    const phone = "56963335579" // 👈 aquí tu WhatsApp real
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <>
      <footer className="bg-[#0c0c0d] border-t border-[#1a1a1c] mt-20">
        <div className="max-w-[1450px] mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-[#a9abb0] text-sm">
          {/* Columna 1 */}
          <div>
            <h3 className="text-white font-bold mb-3">SaintGeek</h3>
            <p>Teclados mecánicos gamer y accesorios en Chile</p>
          </div>

          {/* Columna 2 */}
          <div>
            <h3 className="text-white font-bold mb-3">Navegación</h3>
            <ul className="space-y-1">
              <li><Link href="/" className="hover:text-white">Catálogo</Link></li>
              <li><button onClick={() => setOpenPopup("about")} className="hover:text-white">Sobre nosotros</button></li>
              <li><button onClick={() => setOpenPopup("help")} className="hover:text-white">Ayuda</button></li>
            </ul>
          </div>

          {/* Columna 3 */}
          <div>
            <h3 className="text-white font-bold mb-3">Contacto</h3>
            <p>Email: <a href="mailto:saintgeekventas@gmail.com" className="hover:text-white">info@saintgeek.cl</a></p>
            <button
              onClick={() => setOpenPopup("contact")}
              className="hover:text-white"
            >
              WhatsApp: +56 9 6333 5579
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-[#666] py-4 border-t border-[#1a1a1c]">
          © {new Date().getFullYear()} SaintGeek. Todos los derechos reservados.
        </div>
      </footer>

      {/* Popups */}
      {openPopup && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1c] rounded-xl max-w-lg w-full p-6 text-[#e9e9ea] relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setOpenPopup(null)}
            >
              ✕
            </button>

            {openPopup === "about" && (
              <>
                <h2 className="text-xl font-bold mb-3">Sobre nosotros</h2>
                <p className="text-sm text-[#b6b6b8]">
                  Somos el equipo de SaintGeek, nos dedicamos a teclados y periféricos gamer.
                  Nuestra meta es ofrecer productos en Chile con un servicio de calidad y soporte confiable.
                </p>
              </>
            )}

            {openPopup === "help" && (
              <>
                <h2 className="text-xl font-bold mb-3">Ayuda / Preguntas frecuentes</h2>
                <ul className="list-disc pl-4 space-y-2 text-sm text-[#b6b6b8]">
                  <li>¿Cómo comprar? → Las compras se realizan en MercadoLibre.</li>
  <li>¿Envíos? → Si compras en MercadoLibre, enviamos a todo Chile vía Chilexpress.</li>
  <li>¿Transferencia bancaria? → Aceptada; por ahora la entrega es solo en Santiago. Próximamente habilitaremos envíos a todo Chile para compras por transferencia.</li>
  <li>¿Garantía? → 6 meses (no cubre daño físico).</li>
  <li>¿Pruebas de calidad? → Todos los teclados se prueban antes del despacho.</li>
                </ul>
              </>
            )}

            {openPopup === "contact" && (
              <>
                <h2 className="text-xl font-bold mb-3">Contáctanos</h2>
                <p className="text-sm text-[#b6b6b8] mb-3">Escribe un mensaje y te responderemos en WhatsApp:</p>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tu mensaje..."
                  className="w-full h-28 p-2 rounded-md bg-[#0f0f11] border border-[#262629] text-white text-sm"
                />
                <button
                  onClick={handleSendWhatsApp}
                  disabled={!message.trim()}
                  className="mt-3 w-full bg-lime-400 text-[#101010] py-2 rounded-full font-semibold text-sm shadow-md hover:brightness-95 disabled:opacity-50"
                >
                  Enviar a WhatsApp
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
