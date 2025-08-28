"use client"
import { useState } from "react"
import Image from "next/image"
import type { Product } from "@/data/products"

type Props = {
  product: Product
}

export default function KeycapColors({ product }: Props) {
  // tomamos el primer color como seleccionado por defecto
  const [selected, setSelected] = useState(product.colors[0])

  // buscamos la imagen que corresponde al color seleccionado
  const selectedImage =
    product.images.find(img => img.label.toLowerCase() === selected.toLowerCase()) ||
    product.images[0]

  return (
    <section className="mt-16 bg-[#111] rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
      {/* Lado izquierdo (texto) */}
      <div className="md:col-span-1 space-y-4">
        <h2 className="text-2xl font-bold text-white mb-3">
          COLORES DISPONIBLES
        </h2>
        <p className="text-[#b6b6b8] text-sm leading-relaxed">
  Descubre nuevos horizontes de personalización con el modelo{" "}
  <span className="font-semibold text-white">{product.model}</span>, 
  disponible en colores: {product.colors.join(", ")}. 
  Combínalos y crea un accesorio único que refleje tu estilo y personalidad. 
  Desde la sobriedad del negro hasta la frescura del verde, cada color aporta su propia energía.
</p>


        {/* Selectores de color */}
        <div className="flex gap-3 flex-wrap">
          {product.colors.map(c => (
            <button
              key={c}
              onClick={() => setSelected(c)}
              aria-label={c}
              className={`w-8 h-8 rounded-full border-2 transition ${
                selected === c ? "border-lime-400 scale-110" : "border-gray-600"
              }`}
              style={{ background: getColorHex(c) }}
            />
          ))}
        </div>
      </div>

      {/* Imagen lado derecho */}
      <div className="md:col-span-2 relative flex items-center justify-center">
        <Image
          src={selectedImage.url}
          alt={`Teclado ${product.model} en color ${selected}`}
          width={1200}
          height={300}
          className="object-contain w-full h-auto rounded-xl transition-opacity duration-300"
        />
      </div>
    </section>
  )
}

// 👇 helper para convertir nombres a HEX
function getColorHex(name: string) {
  const map: Record<string, string> = {
    Negro: "#000000",
    Blanco: "#f3f4f6",
    Verde: "#84cc16",
    Azul: "#3b82f6",
    Morado: "#a855f7",
    Gris: "#9ca3af",
    Rojo: "#ef4444",
  }
  return map[name] ?? "#d1d5db" // fallback gris
}
