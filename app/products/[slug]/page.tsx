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
      {/* Breadcrumbs */}
      <nav className="text-sm text-[#a9abb0] mb-4">
        <Link href="/" className="hover:text-white">
          Главная
        </Link>{" "}
        / <span>{p.name}</span>
      </nav>

      {/* Gallery + Right info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <ProductGallery images={p.images} />

        <div className="space-y-5">
          {/* Title + Description */}
          <div>
            <h1 className="text-3xl text-white font-semibold">
              HYPERPC KEYBOARD TKL Black G3MS Sapphire
            </h1>
            <p className="text-sm text-[#b6b6b8] mt-2 leading-relaxed">
              Линейные переключатели G3ms обладают стандартным ходом и усилием
              нажатия. Это золотой стандарт механических клавиатур. На него
              ориентируются почти все современные производители. Переключатели
              G3ms – это отличный вариант для тех, кто только знакомится с миром
              механических клавиатур.
            </p>
          </div>

          {/* Price + Credit */}
          <div>
            <div className="text-white font-extrabold text-[26px] mb-1">
              Цена: 11 200 ₽
            </div>
            <button className="inline-block rounded-lg border border-lime-400 px-4 py-2 text-sm text-lime-400 hover:bg-lime-400 hover:text-black transition">
              Рассчитать кредит
            </button>
          </div>

          {/* Buy + Pickup */}
          <div className="space-y-3">
            <a
              href={p.mercadoLibreUrl}
              rel="sponsored nofollow"
              className="block w-full text-center rounded-lg bg-lime-400 px-4 py-3 font-bold text-black shadow-md hover:brightness-95"
            >
              Купить
            </a>
            <button className="block w-full text-center rounded-lg border border-[#2c2c2f] px-4 py-3 text-sm hover:border-lime-400 transition">
              Забрать из магазина сегодня
            </button>
            <button className="block w-full text-center rounded-lg border border-[#2c2c2f] px-4 py-3 text-sm hover:border-lime-400 transition">
              Выбрать магазин
            </button>
            <p className="text-sm text-[#9ea0a6]">В наличии • Москва</p>
          </div>

          {/* Delivery */}
          <div className="border-t border-[#2c2c2f] pt-4 space-y-3">
            <h3 className="text-lg font-semibold text-white">
              Способы доставки
            </h3>
            <div className="space-y-2 text-sm text-[#d4d4d8]">
              <div className="flex justify-between">
                <span>Срочная доставка за 2 часа (Yandex.Go)</span>
                <span className="text-white font-bold">от 1 500 ₽</span>
              </div>
              <div className="flex justify-between">
                <span>Стандартная доставка — 27 августа</span>
                <span className="text-white font-bold">от 350 ₽</span>
              </div>
              <div className="flex justify-between">
                <span>Получить в пункте выдачи — 27 августа</span>
                <span className="text-white font-bold">350 ₽</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <VideoSection videoId="UPpDrkN-otQ" />
<ProductSpecs />

<div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Характеристики</h2>
        <div className="overflow-x-auto rounded-xl border border-[#1f1f20] bg-[#0f0f11]">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-[#1f1f20]">
                <td className="p-3 text-[#a9abb0]">Модель</td>
                <td className="p-3">{p.model}</td>
              </tr>
              <tr className="border-b border-[#1f1f20]">
                <td className="p-3 text-[#a9abb0]">Цвет</td>
                <td className="p-3">{p.color}</td>
              </tr>
              <tr className="border-b border-[#1f1f20]">
                <td className="p-3 text-[#a9abb0]">Клавиш</td>
                <td className="p-3">87</td>
              </tr>
              <tr className="border-b border-[#1f1f20]">
                <td className="p-3 text-[#a9abb0]">Переключатели</td>
                <td className="p-3">G3MS Sapphire</td>
              </tr>
              <tr className="border-b border-[#1f1f20]">
                <td className="p-3 text-[#a9abb0]">Тип переключателя</td>
                <td className="p-3">Линейный</td>
              </tr>
              <tr className="border-b border-[#1f1f20]">
                <td className="p-3 text-[#a9abb0]">Сила нажатия</td>
                <td className="p-3">50 г</td>
              </tr>
              <tr className="border-b border-[#1f1f20]">
                <td className="p-3 text-[#a9abb0]">Подсветка</td>
                <td className="p-3">RGB</td>
              </tr>
              <tr>
                <td className="p-3 text-[#a9abb0]">Габариты</td>
                <td className="p-3">360×135×39 мм</td>
              </tr>
              <tr>
                <td className="p-3 text-[#a9abb0]">Вес</td>
                <td className="p-3">1200 г</td>
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
              { name: "Главная", url: site.url },
              { name: "Клавиатуры", url: site.url + "/" },
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
