// app/mouse/page.tsx
import type { Metadata, Route } from "next"
import type { UrlObject } from "url"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import { products } from "@/data/products"
import { slugifyTag, getTagCopy } from "@/lib/tags"

// ---------- TAG PRINCIPAL PARA MOUSE GAMER ----------
const MAIN_MOUSE_TAG = slugifyTag("mouse gamer")

const copy = getTagCopy(MAIN_MOUSE_TAG)
const url = "https://saintgeek.cl/mouse"

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

// ---------- HERO DATA ----------
type MouseHeroItem = {
  slug?: string
  href?: UrlObject | Route
  title: string
  subtitle: string
  image: string
  video: string
}

const heroItems: MouseHeroItem[] = [
  {
    slug: "mouse-gamer-superlight",
    title: "Superlight",
    subtitle: "Peso mínimo para máxima velocidad y precisión.",
    image: "/images/mouse/superlight.png",
    video: "/media/mouse/superlight/reverse.mp4",
  },
  {
    slug: "mouse-gamer-fps",
    title: "FPS",
    subtitle: "Sensores precisos para shooters competitivos.",
    image: "/images/mouse/fps.png",
    video: "/media/mouse/fps/reverse.mp4",
  },
  {
    slug: "mouse-gamer-rgb",
    title: "RGB",
    subtitle: "Estética gamer con rendimiento confiable.",
    image: "/images/mouse/rgb.png",
    video: "/media/mouse/rgb/reverse.mp4",
  },
  {
    title: "Todos los modelos",
    subtitle: "Desde gaming casual hasta eSports.",
    image: "/images/mouse/all.png",
    video: "/media/mouse/all/reverse.mp4",
    href: { pathname: "https://saintgeek.cl" },
  },
]

export default function Page() {
  const list = products.filter((p) =>
    (p.tags || []).map(slugifyTag).includes(MAIN_MOUSE_TAG)
  )

  if (list.length === 0) notFound()

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          {/* HEADER */}
          <header className="mb-10 md:mb-14 text-center">
            <h1 className="mt-3 text-3xl md:text-5xl font-semibold text-white">
              SAINTGEEK.{" "}
              <span className="text-zinc-300">
                Precisión, ligereza y control total en mouse gamer.
              </span>
            </h1>
          </header>

          {/* GRID */}
          <div className="grid gap-6 md:grid-cols-2">
            {heroItems.map((item) => {
              const href: UrlObject | Route = item.href
                ? item.href
                : (`/mouse/${item.slug}` as Route)

              return (
                <Link
                  key={item.title}
                  href={href}
                  className="group relative block overflow-hidden rounded-[32px] border border-zinc-800 shadow-[0_20px_60px_rgba(0,0,0,0.7)] transition-colors duration-300 hover:border-cyan-400/70"
                  aria-label={`Ver ${item.title}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] bg-[#111111]">
                    {/* BACKLIGHT */}
                    <div
                      className="
                        absolute inset-0 z-0
                        bg-[radial-gradient(circle_at_80%_20%,#35F2FF_0%,#00D6FF_28%,transparent_60%),
                            radial-gradient(circle_at_0%_100%,#22E9FF_0%,#009EC5_30%,transparent_65%)]
                      "
                    />

                    {/* IMAGE */}
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="z-10 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(min-width:1024px) 540px, 100vw"
                      priority
                    />

                    {/* VIDEO HOVER */}
                    <video
                      src={item.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="pointer-events-none absolute inset-0 z-20 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />

                    {/* TEXT */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex flex-col items-center px-6 pt-6 md:px-8 md:pt-7 text-center">
                      <p className="text-xs md:text-sm text-zinc-100 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                        {item.subtitle}
                      </p>
                      <h3 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-[0.25em] text-white drop-shadow-[0_0_12px_rgba(0,0,0,0.9)]">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
