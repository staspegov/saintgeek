"use client"

import { useMemo, useState } from "react"
import Script from "next/script"
import ProductCard from "@/components/ProductCard"
import SidebarFilters from "@/components/SidebarFilters"
import FaqSection from "@/components/FaqSection"
import {
  orgJsonLd,
  websiteJsonLd,
  faqJsonLd,
  productJsonLd,
  localBusinessJsonLd,
} from "@/lib/jsonld"
import type {
  KeyboardProduct,
  KeyboardModel,
  KeyboardSwitch,
  KeyboardSwitchType,
} from "@/data/products"

type Copy = {
  h1: string
  p: string
  faq?: { question: string; answer: string }[]
}

const uniq = <T,>(arr: T[]) => Array.from(new Set(arr))

export default function ClientTagPage({
  tag,
  copy,
  initialProducts,
}: {
  tag: string
  copy: Copy
  initialProducts: KeyboardProduct[]
}) {
  const [model, setModel] = useState<KeyboardModel | null>(null)
  const [numpad, setNumpad] = useState<"Sí" | "No" | null>(null)
  const [switchType, setSwitchType] = useState<KeyboardSwitchType | null>(null)
  const [switchName, setSwitchName] = useState<KeyboardSwitch | null>(null)
  const [open, setOpen] = useState(false)

  // ✅ options reales desde la data
  const sidebarOptions = useMemo(() => {
    const models = uniq(initialProducts.map((p) => p.model))
    const switches = uniq(initialProducts.map((p) => p.switch))
    const switchTypes = uniq(initialProducts.map((p) => p.switchType))
    const numpadOpt = uniq(initialProducts.map((p) => p.numpad))

    return {
      models: models as string[],
      switches: switches as string[],
      switchTypes: switchTypes as string[],
      numpad: numpadOpt.filter((x) => x === "Sí" || x === "No") as Array<"Sí" | "No">,
    }
  }, [initialProducts])

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
        color: "#e9e9ea",
      }}
    >
      {/* ✅ Tu contenedor principal que define el eje del SideFilters */}
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
            style={{ background: "#C0FF03", color: "#101010" }}
          >
            Saber más
          </button>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-6 items-start">
          <SidebarFilters
            category="teclados"
            onModel={setModel as any}
            onNumpad={setNumpad}
            onSwitch={setSwitchName as any}
            onSwitchType={setSwitchType as any}
            options={sidebarOptions}
          />

          <div className="space-y-10">
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p) => (
                <ProductCard key={p.slug} p={p} />
              ))}
            </section>
          </div>
        </div>

        {/* ✅ FAQ FULL WIDTH pero alineado al mismo eje (dentro del contenedor) */}
        {copy.faq && copy.faq.length > 0 && (
          <div className="mt-16">
            <FaqSection h1={copy.h1} faq={copy.faq} contained />
          </div>
        )}
      </div>

      {/* Modal */}
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
            <p>Compara modelos, numpad y switches para encontrar tu teclado ideal.</p>
          </div>
        </div>
      )}

      {/* JSON-LD */}
      <Script
        id="ld-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }}
      />
      <Script
        id="ld-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />
      <Script
        id="ld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
      />

      {copy.faq && copy.faq.length > 0 && (
        <Script
          id="ld-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(copy.faq)) }}
        />
      )}

      <Script
        id="ld-products"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(filtered.map((p) => productJsonLd(p))),
        }}
      />
    </div>
  )
}
