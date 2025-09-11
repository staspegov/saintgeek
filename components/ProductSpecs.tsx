"use client"
import Image from "next/image"
import type { Product } from "@/data/products"

type Props = {
  product: Product
}

export default function ProductSpecs({ product }: Props) {
  return (
    <section className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* Lado izquierdo: texto + tarjetas de especificaciones */}
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold text-white mb-4 tracking-tight">
            Minimalismo
          </h2>
          <p className="text-[#c9c9c9] text-base leading-relaxed max-w-md">
            En el mundo moderno, donde cada centímetro de espacio en el escritorio
            es importante, el teclado compacto HYPERPC en formato TKL combina
            funcionalidad y estética. El diseño está inspirado en la filosofía
            japonesa minimalista: pureza, equilibrio y comodidad sin compromisos.
          </p>
        </div>

        {/* Tarjetas de especificaciones dinámicas */}
        <div className="flex flex-wrap gap-4">
          {[
            { label: "Ancho", value: product.ancho },
            { label: "Largo", value: product.largo },
            { label: "Alto", value: product.alto },
            { label: "Peso", value: product.weight },
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

      {/* Lado derecho: imagen */}
      <div className="relative h-72 md:h-full rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
        <Image
          src="/images/minimal.png"
          alt={`Vista del modelo ${product.model}`}
          fill
          className="object-cover scale-105 hover:scale-110 transition-transform duration-500"
        />
      </div>
    </section>
  )
}
