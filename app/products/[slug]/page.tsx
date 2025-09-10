import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { products } from "@/data/products"
import { productJsonLd, breadcrumbJsonLd } from "@/lib/jsonld"
import Script from "next/script"
import Link from "next/link"
import { site } from "@/lib/utils"
import ProductGallery from "@/components/ProductGallery"
import ProductSpecs from "@/components/ProductSpecs"
import VideoSection from "@/components/VideoSection"
import ProductFeatures from "@/components/ProductFeatures"
import SelectorKeycaps from "@/components/SelectorKeycaps"

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const p = products.find(x => x.slug === params.slug)
  if (!p) return {}
  const url = `${site.url}/products/${p.slug}`
  return {
    title: p.name,
    description: `${p.brand} — ${p.name}`,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: p.name,
      description: `${p.brand} — ${p.name}`,
      siteName: site.name,
      images: p.images?.length ? [{ url: p.images[0].url }] : undefined,
    },
  }
}

export default function ProductPage({ params }: Props) {
  const p = products.find(x => x.slug === params.slug)
  if (!p) return notFound()

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
              Precio: {p.priceRub}
            </div>
            <button className="inline-block rounded-lg border border-lime-400 px-4 py-2 text-sm text-lime-400 hover:bg-lime-400 hover:text-black transition">
              Calcular crédito
            </button>
          </div>

          {/* Comprar + Entrega */}
          <div className="space-y-3">
            <a
              href={p.mercadoLibreUrl}
              rel="sponsored nofollow"
              className="block w-full text-center rounded-lg bg-lime-400 px-4 py-3 font-bold text-black shadow-md hover:brightness-95"
            >
              Comprar en Mercadolibre
            </a>
            <button className="block w-full text-center rounded-lg border border-[#2c2c2f] px-4 py-3 text-sm hover:border-lime-400 transition">
              Entrega
            </button>
            <p className="text-sm text-[#9ea0a6]">En stock • Santiago</p>
          </div>

          {/* Métodos de envío */}
          <div className="border-t border-[#2c2c2f] pt-4 space-y-3">
            <h3 className="text-lg font-semibold text-white">
              Métodos de envío
            </h3>
            <div className="space-y-2 text-sm text-[#d4d4d8]">
              <div className="flex justify-between">
                <span>Envío express en 2 horas (Starken/Chilexpress)</span>
                <span className="text-white font-bold">desde $5.000</span>
              </div>
              <div className="flex justify-between">
                <span>Envío estándar — 3 a 5 días</span>
                <span className="text-white font-bold">desde $3.000</span>
              </div>
              <div className="flex justify-between">
                <span>Retiro en tienda</span>
                <span className="text-white font-bold">Gratis</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <VideoSection videoId="UPpDrkN-otQ" />
      <ProductSpecs product={p}/>
      <ProductFeatures />
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
    </div>
  )
}
