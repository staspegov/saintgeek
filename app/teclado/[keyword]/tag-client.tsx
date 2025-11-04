// app/teclado/[keyword]/tag-client.tsx
"use client"

import { useMemo, useState } from "react"
import Script from "next/script"
import ProductCard from "@/components/ProductCard"
import SidebarFilters from "@/components/SidebarFilters"
import { orgJsonLd, websiteJsonLd, faqJsonLd, productJsonLd, localBusinessJsonLd } from "@/lib/jsonld"
import type { Product } from "@/data/products"

type Copy = { h1: string; p: string }
export default function ClientTagPage({
  tag,
  copy,
  initialProducts
}: {
  tag: string
  copy: Copy
  initialProducts: Product[]
}) {
  // 🔹 estados de filtros (idénticos)
  const [model, setModel] = useState<string | null>(null)
  const [numpad, setNumpad] = useState<string | null>(null)
  const [switchType, setSwitchType] = useState<string | null>(null)
  const [switchName, setSwitchName] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  // 🔹 lógica de filtrado SOBRE el set ya filtrado por tag
  const filtered = useMemo(() => {
    return initialProducts.filter((p) => {
      if (model && p.model !== model) return false
      if (numpad && p.numpad !== numpad) return false
      if (switchName && p.switch !== switchName) return false
      if (switchType && p.switchType !== switchType) return false
      return true
    })
  }, [initialProducts, model, numpad, switchName, switchType])

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        background: `
          radial-gradient(circle at top right, rgba(141, 215, 223, 0), transparent 40%),
          linear-gradient(180deg, #0e0e0f 0%, #0a0a0b 100%)
        `,
        color: '#e9e9ea',
      }}
    >
      <div className="max-w-[1450px] mx-auto px-6 pb-20 pt-10">
        {/* Hero dinámico */}
        <div className="pt-2 pb-6">
          <h1 className="m-0 mb-3 text-[46px] leading-[1.1] tracking-[.2px] text-[#f4f4f5]">
            {copy.h1}
          </h1>
          <p className="max-w-[860px] m-0 mb-4 text-[16px] leading-[1.6] text-[#b6b6b8]">
            {copy.p}
          </p>
          <button
            onClick={() => setOpen(true)}
            className="inline-block font-semibold text-[14px] px-4 py-2 rounded-full"
            style={{
              background: '#89ff00',
              color: '#101010',
              boxShadow: '0 8px 24px rgba(137,255,0,.25)',
            }}
          >
            Saber más
          </button>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-6 items-start">
          <SidebarFilters
            onModel={setModel}
            onNumpad={setNumpad}
            onSwitch={setSwitchName}
            onSwitchType={setSwitchType}
          />
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </section>
        </div>
      </div>

      {/* Modal igual al tuyo */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-[#1a1a1c] rounded-xl max-w-3xl w-full p-6 text-[#e9e9ea] overflow-y-auto max-h-[80vh] relative"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setOpen(false)}
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">{copy.h1}</h2>

            <section>
              <h3 className="text-xl font-semibold mb-2">¿Qué son y por qué elegirlos?</h3>
              <p className="mb-4">
                Los teclados mecánicos gamer ofrecen mejor respuesta, durabilidad y personalización.
                Elige por formato (60/65/TKL), tipo de switch (Red/Blue/Brown) y funciones como RGB u Hot-Swap.
              </p>

              <h3 className="text-xl font-semibold mb-2">Juegos donde marcan la diferencia</h3>
              <ul className="list-disc list-inside mb-4 space-y-1 text-[#c9c9c9]">
                <li>Shooters competitivos (CS, Valorant, Battlefield)</li>
                <li>MMORPG y MOBAs (WOW, FFXIV, LoL, Dota 2)</li>
                <li>Single-player y productividad diaria</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2">Características clave</h3>
              <ul className="list-disc list-inside mb-4 space-y-1 text-[#c9c9c9]">
                <li><strong>Switches:</strong> hasta ~50M pulsaciones</li>
                <li><strong>Respuesta:</strong> rápida y consistente</li>
                <li><strong>RGB:</strong> visibilidad y estilo</li>
                <li><strong>Hot-Swap:</strong> cambia switches sin soldar</li>
              </ul>

              <p>Compara modelos y encuentra el que mejor se adapta a tu estilo.</p>
            </section>
          </div>
        </div>
      )}

      {/* JSON-LD dinámico */}
      <Script id="ld-org" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }} />
      <Script id="ld-local-business" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }} />
      <Script id="ld-website" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
      <Script id="ld-faq" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }} />
      <Script id="ld-products" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            filtered.map((p) => productJsonLd(p))
          ),
        }} />
    </div>
  )
}
