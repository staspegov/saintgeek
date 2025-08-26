"use client"
import Image from "next/image"

export default function ProductSpecs() {
  return (
    <section className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* Left side: text + spec cards */}
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold text-white mb-4 tracking-tight">
            ミニマリズム (Минимализм)
          </h2>
          <p className="text-[#c9c9c9] text-base leading-relaxed max-w-md">
            В современном мире, где каждый сантиметр рабочего пространства
            важен, компактная клавиатура HYPERPC в формате TKL сочетает
            функциональность и эстетику. Дизайн вдохновлён японской
            минималистичной философией — чистота, баланс и удобство без
            компромиссов.
          </p>
        </div>

        {/* Floating spec cards */}
        <div className="flex flex-wrap gap-4">
          {[
            { label: "Ширина", value: "360 мм" },
            { label: "Глубина", value: "135 мм" },
            { label: "Высота", value: "39 мм" },
            { label: "Вес", value: "1.2 кг" },
          ].map((spec, i) => (
            <div
              key={i}
              className="flex-1 min-w-[140px] bg-[#181818] text-center rounded-2xl p-5 shadow-[0_8px_24px_rgba(0,0,0,0.25)] border border-[#222]"
            >
              <div className="text-sm text-[#a7a7ab] mb-1">{spec.label}</div>
              <div className="text-xl text-white font-semibold">{spec.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side: image with soft shadow + rounded */}
      <div className="relative h-72 md:h-full rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
        <Image
          src="/images/blue-keyboard-3.png"
          alt="Минимализм"
          fill
          className="object-cover scale-105 hover:scale-110 transition-transform duration-500"
        />
      </div>
    </section>
  )
}
