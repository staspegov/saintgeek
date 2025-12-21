// app/teclado/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import { products } from "@/data/products"
import { slugifyTag, getTagCopy, getAllTagSlugs } from "@/lib/tags"

// ---------- TAG PRINCIPAL PARA TECLADOS ----------
const MAIN_KEYBOARD_TAG = slugifyTag("teclado mecanico gamer")

const copy = getTagCopy(MAIN_KEYBOARD_TAG)
const url = "https://saintgeek.cl/teclado"

export const metadata: Metadata = {
  title: copy.title,
  description: copy.description,
  alternates: { canonical: url },
  openGraph: {
    title: copy.title,
    description: copy.description,
    url,
    siteName: "SaintGeek",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: copy.title,
    description: copy.description,
  },
}

// ---------- UI TYPES ----------
type KeyboardHeroItem = {
  title: string
  subtitle: string
  image: string
  keyword: string // slug de /teclado/[keyword]
}

export default function TecladoIndexPage() {
  // 4 cards “hero” (ajusta textos/keywords a tu gusto)
  const heroItems: KeyboardHeroItem[] = [
    {
      title: "Teclados 60%",
      subtitle: "Compactos, rápidos y minimalistas",
      image: "/images/hero/teclados-60.jpg",
      keyword: slugifyTag("teclado 60"),
    },
    {
      title: "Hot-Swap",
      subtitle: "Cambia switches sin soldar",
      image: "/images/hero/hotswap.jpg",
      keyword: slugifyTag("hot swap"),
    },
    {
      title: "RGB Dinámico",
      subtitle: "Iluminación personalizable",
      image: "/images/hero/rgb.jpg",
      keyword: slugifyTag("rgb dinamico"),
    },
    {
      title: "Layout Español",
      subtitle: "Ideal para escribir en ES",
      image: "/images/hero/layout-es.jpg",
      keyword: slugifyTag("layout espanol"),
    },
  ]

  // Tags (ejemplo: toma algunos para mostrar “explorar”)
  const allTags = getAllTagSlugs()
  const topTags = allTags.slice(0, 18)

  // Productos destacados (simple: primeros 12)
  const featured = (products ?? []).filter((p: any) => p?.slug).slice(0, 12)

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      {/* Header */}
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">{copy.title}</h1>
        <p className="text-sm text-zinc-400 max-w-2xl">{copy.description}</p>

        <div className="pt-2">
          {/* ✅ typedRoutes-safe */}
          <Link
            href={{ pathname: "/teclado/[keyword]", query: { keyword: MAIN_KEYBOARD_TAG } }}
            className="inline-flex items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-medium text-zinc-100 hover:bg-zinc-900 transition"
            aria-label="Ver teclados mecánicos gamer"
          >
            Ver teclados mecánicos gamer
          </Link>
        </div>
      </header>

      {/* Hero grid */}
      <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {heroItems.map((item) => (
          <Link
            key={item.title}
            // ✅ typedRoutes-safe (UrlObject)
            href={{ pathname: "/teclado/[keyword]", query: { keyword: item.keyword } }}
            className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 transition"
            aria-label={`Ver ${item.title}`}
          >
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                className="object-cover opacity-90 group-hover:opacity-100 transition"
              />
            </div>
            <div className="p-5">
              <div className="text-base font-semibold text-zinc-100">{item.title}</div>
              <div className="mt-1 text-sm text-zinc-400">{item.subtitle}</div>
              <div className="mt-4 text-xs text-zinc-500">
                Explorar →
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Tags */}
      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold text-zinc-100">Explorar por tags</h2>

          {/* ✅ typedRoutes-safe */}
          <Link
            href={{ pathname: "/teclado/[keyword]", query: { keyword: MAIN_KEYBOARD_TAG } }}
            className="text-sm text-zinc-300 hover:text-zinc-100 transition"
          >
            Ver todos →
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {topTags.map((tag) => (
            <Link
              key={tag}
              // ✅ typedRoutes-safe
              href={{ pathname: "/teclado/[keyword]", query: { keyword: tag } }}
              className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs text-zinc-200 hover:bg-zinc-900 transition"
              aria-label={`Ver tag ${tag}`}
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-zinc-100">Productos destacados</h2>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {featured.map((p: any) => {
            const img = p?.images?.[0]?.url ?? "/placeholder.jpg"
            return (
              <Link
                key={p.slug}
                // ✅ typedRoutes-safe para /products/[slug]
                href={{ pathname: "/products/[slug]", query: { slug: p.slug } }}
                className="group rounded-2xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 transition overflow-hidden"
                aria-label={`Ver ${p.name ?? p.slug}`}
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={img}
                    alt={p.name ?? p.slug}
                    fill
                    sizes="(min-width:1024px) 16vw, (min-width:640px) 33vw, 50vw"
                    className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-3">
                  <div className="line-clamp-2 text-xs font-medium text-zinc-100">
                    {p.name ?? p.slug}
                  </div>
                  {typeof p.price === "number" && (
                    <div className="mt-2 text-xs text-zinc-400">
                      ${p.price.toLocaleString("es-CL")}
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}
