'use client'

import { useState } from "react"
import Link from "next/link"

export default function Footer() {
  const [openPopup, setOpenPopup] = useState<null | "help" | "about" | "contact">(null)
  const [message, setMessage] = useState("")

  const handleSendWhatsApp = () => {
    const phone = "56912345678" // 👈 сюда свой WhatsApp
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <>
      <footer className="bg-[#0c0c0d] border-t border-[#1a1a1c] mt-20">
        <div className="max-w-[1450px] mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-[#a9abb0] text-sm">
          {/* Column 1 */}
          <div>
            <h3 className="text-white font-bold mb-3">SaintGeek</h3>
            <p>Игровые клавиатуры и аксессуары в Чили</p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-white font-bold mb-3">Навигация</h3>
            <ul className="space-y-1">
              <li><Link href="/" className="hover:text-white">Каталог</Link></li>
              <li><button onClick={() => setOpenPopup("about")} className="hover:text-white">О нас</button></li>
              <li><button onClick={() => setOpenPopup("help")} className="hover:text-white">Помощь</button></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-white font-bold mb-3">Контакты</h3>
            <p>Email: <a href="mailto:info@saintgeek.cl" className="hover:text-white">info@saintgeek.cl</a></p>
            <button
              onClick={() => setOpenPopup("contact")}
              className="hover:text-white"
            >
              WhatsApp: +56 9 1234 5678
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-[#666] py-4 border-t border-[#1a1a1c]">
          © {new Date().getFullYear()} SaintGeek. Все права защищены.
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
                <h2 className="text-xl font-bold mb-3">О нас</h2>
                <p className="text-sm text-[#b6b6b8]">
                  Мы — команда SaintGeek, занимаемся клавиатурами и игровой периферией.
                  Наша цель — сделать продукцию доступной в Чили с качественным сервисом и поддержкой.
                </p>
              </>
            )}

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
