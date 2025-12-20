// app/products/[slug]/page.tsx
import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import Link from "next/link"
import Script from "next/script"

import { products } from "@/data/products"
import { productJsonLd, breadcrumbJsonLd } from "@/lib/jsonld"
import { site } from "@/lib/utils"

import ProductGallery from "@/components/ProductGallery"
import ProductSpecs from "@/components/ProductSpecs"
import VideoSection from "@/components/VideoSection"
import ProductFeatures from "@/components/ProductFeatures"
import SelectorKeycaps from "@/components/SelectorKeycaps"
import TransferCheckoutButton from "@/components/TransferCheckoutButton"
import CreditCalcButton from "@/components/CreditCalcButton"
import Diagram from "@/components/Diagram"

type Props = { params: { slug: string } }

/* -------------------- Markov-SEO helpers (SSR determinísticos) -------------------- */
type Img = { url: string }
type MinimalProduct = {
  slug: string
  name: string
  brand?: string
  category?: string
  size?: string        // "60%", "65%", "TKL", etc.
  switchType?: string  // "red" | "blue" | ...
  color?: string
  priceRub?: number
  status?: "in_stock" | "preorder" | "out_of_stock"
  images?: Img[]
}

// scoring semántico simple (ajusta pesos según tu catálogo)
function semanticScore(a: MinimalProduct, b: MinimalProduct) {
  let s = 0
  if (a.brand && b.brand && a.brand === b.brand) s += 2.0
  if (a.size && b.size && a.size === b.size) s += 1.4
  if (a.switchType && b.switchType && a.switchType === b.switchType) s += 1.2
  if (a.category && b.category && a.category === b.category) s += 1.0
  if (a.color && b.color && a.color === b.color) s += 0.5

  const pa = a.priceRub ?? 0
  const pb = b.priceRub ?? 0
  if (pa && pb) {
    const diff = Math.abs(pa - pb)
    if (diff <= 10_000) s += 1.0
    else if (diff <= 20_000) s += 0.6
  }

  if (b.status === "in_stock") s += 0.6
  return s
}


function getExpressDeliveryText() {
  const chileTime = new Date().toLocaleString("en-US", { timeZone: "America/Santiago" });
  const now = new Date(chileTime);

  const day = now.getDay(); // 0 = Domingo, 1 = Lunes, ... 6 = Sábado
  const hour = now.getHours();

  // CASO: Domingo → siempre lunes
  if (day === 0) {
    return "Llega el lunes";
  }

  // CASO: Sábado después de 20:00 → lunes
  if (day === 6 && hour >= 20) {
    return "Llega el lunes";
  }

  // CASO: Viernes después de 20:00 → sábado
  if (day === 5 && hour >= 20) {
    return "Llega el sábado";
  }

  // Hora de corte general
  if (hour < 20) {
    return "Llega hoy";
  } else {
    return "Llega mañana";
  }
}


function getRelatedProducts(base: MinimalProduct, all: MinimalProduct[], count = 6) {
  // orden estable por score desc y tie-breaker por slug asc
  const scored = all
    .filter(x => x.slug !== base.slug)
    .map(x => ({ p: x, score: semanticScore(base, x) }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return a.p.slug.localeCompare(b.p.slug)
    })

  const picks = scored.slice(0, count).map(x => x.p)

  // fallback estable si hubiese pocos candidatos (cat/tamaño y luego alfabético)
  if (picks.length < count) {
    const fallback = all
      .filter(x => x.slug !== base.slug && !picks.some(y => y.slug === x.slug))
      .sort((a, b) => {
        const catA = a.category ?? ""
        const catB = b.category ?? ""
        if (catA !== catB) return catA.localeCompare(catB)
        return a.slug.localeCompare(b.slug)
      })
      .slice(0, count - picks.length)
    return [...picks, ...fallback]
  }
  return picks
}

// JSON-LD ItemList para la sección de relacionados
function relatedItemListJsonLd(
  items: { name: string; url: string }[],
  listName = "Productos relacionados"
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: it.url,
      name: it.name,
    })),
  }
}
/* ---------------------------------------------------------------------------------- */

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const p = products.find(x => x.slug === params.slug)
  if (!p) return {}
  const url = `${site.url}/products/${p.slug}`
  return {
    title: p.name,
    description: `${p.brand} — ${p.description}`,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: p.name,
      description: `${p.brand} — ${p.description}`,
      siteName: site.name,
      images: p.images?.length ? [{ url: p.images[0].url }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: p.name,
      description: `${p.brand} — ${p.description}`,
      images: p.images?.length ? [p.images[0].url] : undefined,
    },
  }
}

export default function ProductPage({ params }: Props) {
  const p = products.find(x => x.slug === params.slug)
  if (!p) return notFound()

  const productUrl = `${site.url}/products/${p.slug}`

  // Relacionados SSR (determinísticos, SEO friendly)
  const related = getRelatedProducts(p as MinimalProduct, products as MinimalProduct[], 6)

  return (
    <div className="max-w-[1300px] mx-auto px-6 pb-20 pt-10 text-[#e9e9ea]">
      {/* Migas de pan */}
      <nav className="text-sm text-[#a9abb0] mb-4">
        <Link href="/" className="hover:text-white">
          Inicio
        </Link>{" "}
        / <span>{p.name}</span>
      </nav>

      {/* Galería + Info derecha */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <ProductGallery images={p.images} />

        <div className="space-y-5">
          {/* Título + Descripción */}
          <div>
            <h1 className="text-3xl text-white font-semibold">{p.name}</h1>
            <p className="text-sm text-[#b6b6b8] mt-2 leading-relaxed">
              {p.description}
            </p>
          </div>

          {/* Precio + Crédito */}
          <div>
            <div className="text-white font-extrabold text-[26px] mb-1">
              Precio: {Number(p.priceRub).toLocaleString("es-CL")} CLP
            </div>
            <div className="text-white text-[13px] mb-2 mt-1">
              Precio transferencia: {(Number(p.priceRub) * 0.9).toLocaleString("es-CL")} CLP
            </div>

            <CreditCalcButton amount={p.priceRub} />
          </div>

          {/* Comprar + Entrega */}
          <div className="space-y-3">
            <a
              href={p.mercadoLibreUrl}
              rel="sponsored nofollow"
              className="block w-full text-center rounded-lg bg-[#C0FF03] px-4 py-3 font-bold text-black shadow-md hover:brightness-95"
            >
              Comprar en Mercadolibre
            </a>

            <TransferCheckoutButton
              productName={p.name}
              productUrl={productUrl}
              priceLabel={p.priceRub}
            />

            <div className="flex items-center gap-2 text-sm text-[#9ea0a6]">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{
                  backgroundColor: p.status === "in_stock" ? "#75ff00" : "#ffb02e",
                }}
              />
              <span>
                {p.status === "in_stock" ? "Disponible" : "Por pedido"} • Santiago
              </span>
            </div>
          </div>

          {/* Métodos de envío */}
     
<div className="border-t border-[#2c2c2f] pt-4 space-y-3">
  <h3 className="text-lg font-semibold text-white">
    Métodos de entrega RM (Compras por transferencia)
  </h3>

  <div className="space-y-2 text-sm text-[#d4d4d8]">

    <div className="flex justify-between">
      <span>Envío express ({getExpressDeliveryText()})</span>
      <span className="text-white font-bold">$2.500</span>
    </div>

    <div className="flex justify-between">
      <span>Envío estándar — 3 a 5 días</span>
      <span className="text-white font-bold">Gratis</span>
    </div>

    <div className="flex justify-between">
      <span>Retiro en tienda</span>
      <span className="text-white font-bold">Gratis</span>
    </div>

  </div>
</div>

        </div>
      </div>

      <VideoSection videoId="MCRfz4EJz0o" />
      <ProductSpecs product={p} />
      <ProductFeatures />
       <Diagram />
      <SelectorKeycaps product={p} />

      {/* Características */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Características</h2>
        <div className="overflow-x-auto rounded-xl border border-[#1f1f20] bg-[#0f0f11]">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-[#1f1f20]">
                <td className="p-3 text-[#a9abb0]">Modelo</td>
                <td className="p-3">{p.model}</td>
              </tr>
              <tr className="border-b border-[#1f1f20]">
                <td className="p-3 text-[#a9abb0]">Color</td>
                <td className="p-3">{p.color}</td>
              </tr>
              <tr className="border-b border-[#1f1f20]">
                <td className="p-3 text-[#a9abb0]">Teclas</td>
                <td className="p-3">{p.keys}</td>
              </tr>
              <tr className="border-b border-[#1f1f20]">
                <td className="p-3 text-[#a9abb0]">Switches</td>
                <td className="p-3">{p.switch}</td>
              </tr>
              <tr className="border-b border-[#1f1f20]">
                <td className="p-3 text-[#a9abb0]">Tipo de switch</td>
                <td className="p-3">{p.switchType}</td>
              </tr>
              <tr className="border-b border-[#1f1f20]">
                <td className="p-3 text-[#a9abb0]">Fuerza de actuación</td>
                <td className="p-3">{p.actuationForce}</td>
              </tr>
              <tr className="border-b border-[#1f1f20]">
                <td className="p-3 text-[#a9abb0]">Iluminación</td>
                <td className="p-3">{p.lighting}</td>
              </tr>
              <tr className="border-b border-[#1f1f20]">
                <td className="p-3 text-[#a9abb0]">Dimensiones</td>
                <td className="p-3">{p.dimensions}</td>
              </tr>
              <tr>
                <td className="p-3 text-[#a9abb0]">Peso</td>
                <td className="p-3">{p.weight}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* --------- Productos relacionados (Markov SEO) --------- */}
    {/*
<section className="mt-12">
  <h2 className="text-xl font-semibold mb-4">
    También te puede interesar
  </h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
    {related.map((rp) => {
      const img = rp.images?.[0]?.url ?? "/placeholder.jpg"

      return (
        <Link
          key={rp.slug}
          href={`/products/${rp.slug}`}
          className="group rounded-xl border border-[#1f1f20] bg-[#0f0f11] hover:border-[#2a2a2d] hover:bg-[#141416] transition"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-t-xl">
            <Image
              src={img}
              alt={rp.name}
              fill
              sizes="(min-width:1024px) 500px, 33vw"
              className="object-contain scale-90 transition-transform duration-300"
            />
          </div>

          <div className="p-3">
            <div className="text-xs text-[#a9abb0] mb-1 line-clamp-1">
              {rp.brand ?? "—"}
            </div>

            <div className="text-sm text-white font-medium line-clamp-2">
              {rp.name}
            </div>

            {typeof rp.priceRub === "number" && (
              <div className="mt-1 text-[13px] text-white font-semibold">
                ${rp.priceRub.toLocaleString("es-CL")} CLP
              </div>
            )}
          </div>
        </Link>
      )
    })}
  </div>
</section>
*/}

      {/* -------------------------------------------------------- */}

      {/* JSON-LD */}
      <Script
        id="ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Inicio", url: site.url },
              { name: "Teclados", url: site.url + "/" },
              { name: p.name, url: `${site.url}/products/${p.slug}` },
            ])
          ),
        }}
      />
      <Script
        id="ld-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd(p)),
        }}
      />
      {/* JSON-LD: ItemList de relacionados */}
      <Script
        id="ld-related"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            relatedItemListJsonLd(
              related.map(rp => ({
                name: rp.name,
                url: `${site.url}/products/${rp.slug}`,
              })),
              "Productos relacionados"
            )
          ),
        }}
      />
    </div>
  )
}
