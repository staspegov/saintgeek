'use client'

import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import SidebarFilters from '@/components/SidebarFilters'
import Script from 'next/script'
import { orgJsonLd, websiteJsonLd, faqJsonLd, productJsonLd } from '@/lib/jsonld'
import { useMemo, useState } from 'react'

export default function Page() {
  const [model, setModel] = useState<string | null>(null)
  const filtered = useMemo(
    () => products.filter(p => !model || p.model === model),
    [model]
  )

  return (
    <div style={{ margin: 0, background: '#0e0e0f', color: '#e9e9ea' }}>
      <div className="max-w-[1450px] mx-auto px-6 pb-20 pt-10">

        {/* Header / Hero */}
        <div className="pt-2 pb-6">
          <h1 className="m-0 mb-3 text-[46px] leading-[1.1] tracking-[.2px] text-[#f4f4f5]">
            Игровые клавиатуры
          </h1>
          <p className="max-w-[860px] m-0 mb-4 text-[16px] leading-[1.6] text-[#b6b6b8]">
            Игровые клавиатуры — это особая компьютерная периферия, созданная для тех, кто увлекается играми.
            В отличие от стандартной офисной модели, данное устройство помогает получать больше удовольствия за счёт своего красивого внешнего вида,
            удобства использования и применения дополнительных функций.
          </p>
          <a
            href="#more"
            className="inline-block no-underline font-semibold text-[14px] px-4 py-2 rounded-full"
            style={{
              background: '#89ff00',
              color: '#101010',
              boxShadow: '0 8px 24px rgba(137,255,0,.25)',
            }}
          >
            Узнать больше
          </a>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-6 items-start">
          {/* Sidebar → arriba en mobile, lateral en desktop */}
          <SidebarFilters onModel={setModel} />

          {/* Product Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(p => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </section>
        </div>
      </div>

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
