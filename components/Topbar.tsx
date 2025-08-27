'use client'

import Link from "next/link"
import { useState } from "react"

export default function Topbar() {
  const [openPopup, setOpenPopup] = useState<null | "help" | "about" | "contact">(null)
  const [message, setMessage] = useState("")

  const handleSendWhatsApp = () => {
    const phone = "56912345678" // 👈 сюда вставь свой WhatsApp в международном формате (без +)
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0c0c0d] border-b border-[#1a1a1c]">
        <div className="max-w-[1450px] mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-lime-400 font-extrabold text-lg no-underline">
            SaintGeek
          </Link>

          {/* Nav */}
          <nav className="flex gap-6 text-sm text-[#d4d4d8]">
            <button onClick={() => setOpenPopup("about")} className="hover:text-white">О нас</button>
            <button onClick={() => setOpenPopup("help")} className="hover:text-white">Помощь</button>
          </nav>

          {/* CTA */}
          <button
            onClick={() => setOpenPopup("contact")}
            className="hidden sm:inline-block bg-lime-400 text-[#101010] px-3.5 py-1.5 rounded-full font-semibold text-sm shadow-md hover:brightness-95"
          >
            Связаться
          </button>
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
                <h2 className="text-xl font-bold mb-3">О нас</h2>
                <p className="text-sm text-[#b6b6b8]">
                  Мы — команда SaintGeek, занимаемся клавиатурами и игровой периферией. 
                  Наша цель — сделать продукцию доступной в Чили с качественным сервисом и поддержкой.
                </p>
              </>
            )}

            {/* Help */}
            {openPopup === "help" && (
              <>
                <h2 className="text-xl font-bold mb-3">Помощь / FAQ</h2>
                <ul className="list-disc pl-4 space-y-2 text-sm text-[#b6b6b8]">
                  <li>Как оформить заказ? → Добавьте товар в корзину и оформите покупку через сайт.</li>
                  <li>Какие способы доставки? → Отправляем по всему Чили курьером или через Starken/Chilexpress.</li>
                  <li>Есть ли гарантия? → Да, все товары с официальной гарантией 6–12 месяцев.</li>
                </ul>
              </>
            )}

            {/* Contact */}
            {openPopup === "contact" && (
              <>
                <h2 className="text-xl font-bold mb-3">Связаться с нами</h2>
                <p className="text-sm text-[#b6b6b8] mb-3">Напишите сообщение, и мы ответим в WhatsApp:</p>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ваше сообщение..."
                  className="w-full h-28 p-2 rounded-md bg-[#0f0f11] border border-[#262629] text-white text-sm"
                />
                <button
                  onClick={handleSendWhatsApp}
                  disabled={!message.trim()}
                  className="mt-3 w-full bg-lime-400 text-[#101010] py-2 rounded-full font-semibold text-sm shadow-md hover:brightness-95 disabled:opacity-50"
                >
                  Отправить в WhatsApp
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
