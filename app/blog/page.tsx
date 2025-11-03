// app/blog/page.tsx
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import Script from "next/script"

import { getAllPosts } from "@/lib/blog"
import { blogCollectionJsonLd, relatedItemListJsonLd } from "@/lib/jsonld"
import { site } from "@/lib/utils"
import { getMarkovRelated, type MinimalProduct } from "@/lib/markov"
import { products } from "@/data/products"

// ---------- helpers productos ----------
function inferAttrsFromName(name: string) {
  const n = (name || "").toLowerCase()
  const size =
    n.includes("60%") ? "60%" :
    n.includes("65%") ? "65%" :
    n.includes("70%") ? "70%" :
    n.includes("75%") ? "75%" :
    n.includes("tkl") || n.includes("80%") ? "TKL" :
    n.includes("full") || n.includes("100%") ? "full" : undefined

  const switchType =
    n.includes("silent") ? "silent red" :
    /rojo|red|linear/.test(n) ? "red" :
    /azul|blue|click/.test(n) ? "blue" :
    /marr[oó]n|brown|t[aá]ctil/.test(n) ? "brown" : undefined

  const layout =
    /ansi/.test(n) ? "ANSI" :
    /iso/.test(n) ? "ISO" :
    /(latam|la|espanol|español|es)/.test(n) ? "ES" : undefined

  const connectivity =
    /(2\.4|dongle|hyperspeed|lightspeed)/.test(n) ? "2.4g" :
    /(bluetooth|bt)/.test(n) ? "bt" :
    /(al[aá]mbrico|wired|usb)/.test(n) ? "wired" : undefined

  const rgb = /(rgb|retroiluminaci[oó]n)/.test(n) || undefined
  const hotswap = /(hotswap|hot-swap|hot swap)/.test(n) || undefined

  const color =
    /blanco|white/.test(n) ? "white" :
    /negro|black/.test(n) ? "black" :
    /gris|gray/.test(n) ? "grey" : undefined

  const category = /teclado|keyboard/.test(n) ? "keyboard" : undefined
  return { size, switchType, layout, connectivity, rgb, hotswap, color, category }
}

function firstImage(p: any): string {
  const imgs = p?.images ?? []
  if (Array.isArray(imgs) && imgs.length) {
    const it = imgs[0]
    return typeof it === "string" ? it : it?.url ?? "/og.jpg"
  }
  return "/og.jpg"
}

function toMinimal(p: any): MinimalProduct {
  const inf = inferAttrsFromName(p?.name ?? "")
  return {
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    category: inf.category ?? p.category,
    size: inf.size,
    switchType: inf.switchType,
    layout: inf.layout,
    connectivity: inf.connectivity,
    rgb: !!inf.rgb,
    hotswap: !!inf.hotswap,
    color: inf.color,
    priceRub: p.priceRub,
    status: p.status,
    images: Array.isArray(p.images)
      ? p.images.map((it: any) => (typeof it === "string" ? { url: it } : { url: it?.url ?? "" }))
      : [],
  }
}

const BLOG_HOME_SEED: MinimalProduct = {
  slug: "blog-home-seed",
  name: "Gamer Seed",
  category: "keyboard",
  size: "TKL",
  switchType: "red",
  layout: "ES",
  connectivity: "2.4g",
  rgb: true,
  hotswap: true,
  color: "black",
  priceRub: 0,
  status: "in_stock",
  images: [],
}

export const metadata: Metadata = {
  title: `Blog gamer y guías | ${site.name}`,
  description: "Guías, comparativas y reviews de teclados mecánicos gamer en Chile.",
  alternates: { canonical: `${site.url}/blog` },
}

export default function BlogPage() {
  const posts = getAllPosts()

  // Markov picks (productos) — compact
  const minimals: MinimalProduct[] = products.map(toMinimal)
  const topPicks = getMarkovRelated(BLOG_HOME_SEED, minimals, 8)
  const topPicksFull = topPicks
    .map((m) => products.find((p: any) => p.slug === m.slug))
    .filter(Boolean) as any[]

  const topPicksLd = relatedItemListJsonLd(
    topPicksFull.map((p) => ({ name: p.name, url: `${site.url}/products/${p.slug}` })),
    "Top gamer picks del blog"
  )

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* JSON-LD */}
      <Script id="ld-blog" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionJsonLd(posts)) }} />
      <Script id="ld-top-picks" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(topPicksLd) }} />

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Blog SaintGeek</h1>
        <p className="text-zinc-400 mt-2">
          Contenidos <span className="font-medium text-lime-400">gamer</span> y guías para elegir tu teclado mecánico perfecto.
        </p>
      </header>

      {/* Top picks — compact cards estilo vitrina */}
{!!topPicksFull.length && (
  <section className="mb-10">
    <h2 className="text-2xl font-semibold mb-4">Top picks para gamers</h2>

    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {topPicksFull.map((p) => (
        <Link
          key={p.slug}
          href={`/products/${p.slug}`}
          className="group rounded-2xl border border-zinc-800 bg-gradient-to-b from-base-cardTop to-base-cardBottom hover:border-lime-400 transition-colors shadow-card overflow-hidden"
        >
          {/* Imagen compacta como en tu ejemplo */}
          <div className="relative h-28 md:h-32 w-full flex items-center justify-center bg-zinc-900/40">
            <Image
              src={firstImage(p)}
              alt={p.name}
              fill
              className="object-contain p-3"
              sizes="(min-width:1280px) 220px, (min-width:1024px) 210px, (min-width:768px) 33vw, 80vw"
            />
          </div>

          <div className="p-4">
            <p className="text-[11px] text-zinc-500">{p.brand || site.name}</p>
            <p className="mt-1 text-sm font-semibold leading-snug line-clamp-2 group-hover:text-lime-400">
              {p.name}
            </p>
            <p className="mt-2 text-sm font-extrabold tracking-tight">
              ${Number(p.priceRub ?? 0).toLocaleString("es-CL")} <span className="font-semibold text-zinc-400">CLP</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  </section>
)}

      {/* Lista de artículos */}
      <section>
        <h2 className="sr-only">Todos los artículos</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group rounded-xl border border-zinc-800 hover:border-lime-400 transition-colors overflow-hidden"
            >
              {p.cover ? (
                <Image
                  src={p.cover}
                  alt={p.title}
                  width={800}
                  height={520}
                  className="h-44 w-full object-cover"
                />
              ) : (
                <div className="h-44 w-full bg-zinc-900" />
              )}

              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  {p.category && (
                    <span className="rounded-full border border-zinc-700 px-2 py-0.5">
                      {p.category}
                    </span>
                  )}
         <span>{new Date(p.publishedAt).toLocaleDateString("es-CL")}</span>

                  
                </div>
                <h3 className="text-lg font-semibold group-hover:text-lime-400">
                  {p.title}
                </h3>
                {p.summary && (
                  <p className="text-sm text-zinc-400 line-clamp-3">{p.summary}</p>
                )}
                {!!p.tags?.length && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {p.tags.slice(0, 4).map((t: string) => (
                      <span
                        key={t}
                        className="text-xs text-zinc-400/90 border border-zinc-700 rounded px-2 py-0.5"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
