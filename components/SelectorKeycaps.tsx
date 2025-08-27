"use client"
import { useState } from "react"
import Image from "next/image"

const colors = [
  { id: "black", hex: "#000000", img: "/images/hyperpc-keyboard-tkl-color-green-and-grey.jpg" },
  { id: "white", hex: "#f3f4f6", img: "/images/keyboard-white.png" },
  { id: "green", hex: "#84cc16", img: "/images/keyboard-green.png" },
  { id: "blue", hex: "#3b82f6", img: "/images/keyboard-blue.png" },
  { id: "purple", hex: "#a855f7", img: "/images/keyboard-purple.png" },
  { id: "gray", hex: "#9ca3af", img: "/images/keyboard-gray.png" },
]

export default function KeycapColors() {
  const [selected, setSelected] = useState(colors[0])

  return (
    <section className="mt-16 bg-[#111] rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
      {/* Left side text (1/3) */}
      <div className="md:col-span-1 space-y-4">
        <h2 className="text-2xl font-bold text-white mb-3">
          ЦВЕТА, КОТОРЫЕ ГОВОРЯТ ЗА ВАС
        </h2>
        <p className="text-[#b6b6b8] text-sm leading-relaxed">
          Откройте новые горизонты персонализации с кейкапами, предлагающими
          уникальные цвета: черный, белый, серый, синий, фиолетовый и зеленый.
          Комбинируйте их, чтобы создать действительно уникальный аксессуар.
        </p>

        {/* Color selectors */}
        <div className="flex gap-3 flex-wrap">
          {colors.map(c => (
            <button
              key={c.id}
              onClick={() => setSelected(c)}
              aria-label={c.id}
              className={`w-8 h-8 rounded-full border-2 transition ${
                selected.id === c.id ? "border-lime-400 scale-110" : "border-gray-600"
              }`}
              style={{ background: c.hex }}
            />
          ))}
        </div>
      </div>

      {/* Right side image (2/3) */}
      <div className="md:col-span-2 relative flex items-center justify-center">
        <Image
          src={selected.img}
          alt={`Keyboard ${selected.id}`}
          width={1200}
          height={300}
          className="object-contain w-full h-auto rounded-xl transition-opacity duration-300"
        />
      </div>
    </section>
  )
}
