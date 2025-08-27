'use client'

import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import SidebarFilters from '@/components/SidebarFilters'
import Script from 'next/script'
import { orgJsonLd, websiteJsonLd, faqJsonLd, productJsonLd } from '@/lib/jsonld'
import { useMemo, useState } from 'react'

export default function Page() {
  // 🔹 estados de filtros
  const [model, setModel] = useState<string | null>(null)
  const [numpad, setNumpad] = useState<string | null>(null)
  const [switchType, setSwitchType] = useState<string | null>(null)
  const [switchName, setSwitchName] = useState<string | null>(null)

  const [open, setOpen] = useState(false) // modal

  // 🔹 lógica de filtrado
  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (model && p.model !== model) return false
      if (numpad && p.numpad !== numpad) return false
      if (switchName && p.switch !== switchName) return false
      if (switchType && p.switchType !== switchType) return false
      return true
    })
  }, [model, numpad, switchName, switchType])

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
        {/* Hero */}
        <div className="pt-2 pb-6">
          <h1 className="m-0 mb-3 text-[46px] leading-[1.1] tracking-[.2px] text-[#f4f4f5]">
            Игровые клавиатуры
          </h1>
          <p className="max-w-[860px] m-0 mb-4 text-[16px] leading-[1.6] text-[#b6b6b8]">
            Игровые клавиатуры – это особая компьютерная периферия, созданная для тех, кто увлекается играми.
            В отличие от стандартной/офисной модели, данное устройство помогают получать гораздо больше
            удовольствия за счёт своего красивого внешнего вида, удобства использования и применения
            дополнительных функций.
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
            Узнать больше
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

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-[#1a1a1c] rounded-xl max-w-3xl w-full p-6 text-[#e9e9ea] overflow-y-auto max-h-[80vh] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Игровые клавиатуры</h2>
            <p className="mb-4">
              Игровые клавиатуры – это особая компьютерная периферия, созданная для тех, кто увлекается играми. 
              В отличие от стандартной/офисной модели, данное устройство помогают получать гораздо больше 
              удовольствия за счёт своего красивого внешнего вида, удобства использования и применения 
              дополнительных функций.
            </p>
          </div>
        </div>
      )}

      {/* JSON-LD */}
      <Script id="ld-org" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }} />
      <Script id="ld-website" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
      <Script id="ld-faq" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }} />
      <Script id="ld-products" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(products.map(p => productJsonLd(p))),
        }} />
    </div>
  )
}
