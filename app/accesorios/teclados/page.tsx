// app/accesorios/teclados/page.tsx
import type { Metadata, Route } from "next"
import type { UrlObject } from "url"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import { products } from "@/data/products"
import { slugifyTag, getTagCopy } from "@/lib/tags"

// ✅ TAG PRINCIPAL PARA "TODOS LOS MODELOS"
const MAIN_KEYBOARD_TAG = slugifyTag("teclado mecanico gamer")

const copy = getTagCopy(MAIN_KEYBOARD_TAG)
const url = "https://saintgeek.cl/accesorios/teclados"

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
type KeyboardHeroItem = {
  slug?: string
  href?: UrlObject | Route
  title: string
  subtitle: string
  image: string
  video: string
}

const heroItems: KeyboardHeroItem[] = [
  {
    slug: "teclado-mecanico-tk68",
    title: "TK68",
    subtitle: "Teclados 60% compactos y potentes.",
    image: "/images/testimage2.png",
    video: "/media/teclados/60/reverse.mp4",
  },
  {
    slug: "teclado-mecanico-ag61",
    title: "AG61",
    subtitle: "Equilibrio entre tamaño y funcionalidad.",
    image: "/images/testimage.png",
    video: "/media/teclados/65-75/reverse.mp4",
  },
  {
    slug: "teclado-mecanico-tk61",
    title: "TK61",
    subtitle: "TKL para setups limpios y gaming competitivo.",
    image: "/images/testimage3.png",
    video: "/media/teclados/tkl/reverse.mp4",
  },

  // ✅ IMPORTANTÍSIMO: "Todos los modelos" -> /accesorios/teclados/[MAIN_KEYBOARD_TAG]
  {
    title: "Todos los modelos",
    subtitle: "Full size para máxima comodidad y productividad.",
    image: "/images/testimage5.png",
    video: "/media/teclados/full/reverse.mp4",
    href: (`/accesorios/teclados/${MAIN_KEYBOARD_TAG}` as Route),
  },
]

export default function Page() {
  // ✅ Si quieres validar que hay data para "todos los modelos"
  const list = products.filter(
    (p) =>
      p.category === "teclados" &&
      (p.tags || []).map(slugifyTag).includes(MAIN_KEYBOARD_TAG)
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
                El equilibrio perfecto entre precio y rendimiento en teclados
                mecánicos.
              </span>
            </h1>
          </header>

          {/* GRID */}
          <div className="grid gap-6 md:grid-cols-2">
            {heroItems.map((item) => {
              // ✅ DEFAULT: /accesorios/teclados/[keyword]
              const href: UrlObject | Route = item.href
                ? item.href
                : (`/accesorios/teclados/${item.slug}` as Route)

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
