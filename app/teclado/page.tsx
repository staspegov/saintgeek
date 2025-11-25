// app/teclado/page.tsx
import type { Metadata, Route } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import { products } from "@/data/products"
import { slugifyTag, getTagCopy } from "@/lib/tags"
import ClientTagPage from "./[keyword]/tag-client"

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

// ---------- DATA HERO PLAY (4 CARDS) ----------
type KeyboardHeroItem = {
  slug: string // keyword para /teclado/[keyword]
  title: string
  subtitle: string
  image: string // imagen estática del teclado
  video: string // video ya exportado en reversa
}

const heroItems: KeyboardHeroItem[] = [
  {
    slug: "teclado-mecanico-60",
    title: "TK68",
    subtitle: "Teclados 60% compactos y potentes.",
    image: "/images/testimage2.png", // ideal ~1600x1600 (o 1600x1200 si no es cuadrado)
    video: "/media/teclados/60/reverse.mp4",
  },
  {
    slug: "teclado-mecanico-65-75",
    title: "AG61",
    subtitle: "Equilibrio entre tamaño y funcionalidad.",
    image: "/images/testimage.png",
    video: "/media/teclados/65-75/reverse.mp4",
  },
  {
    slug: "teclado-mecanico-tkl",
    title: "TK61",
    subtitle: "TKL para setups limpios y gaming competitivo.",
    image: "/images/testimage3.png",
    video: "/media/teclados/tkl/reverse.mp4",
  },
  {
    slug: "teclado-mecanico-full",
    title: "Todos los modelos",
    subtitle: "Full size para máxima comodidad y productividad.",
    image: "/images/testimage5.png",
    video: "/media/teclados/full/reverse.mp4",
  },
]

export default function Page() {
  const list = products.filter((p) =>
    (p.tags || []).map(slugifyTag).includes(MAIN_KEYBOARD_TAG)
  )

  if (list.length === 0) notFound()

  return (
    <>
      {/* ============ HERO ESTILO HYPERPC ============ */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          {/* Título central */}
          <header className="mb-10 md:mb-14 text-center">
            <h1 className="mt-3 text-3xl md:text-5xl font-semibold text-white">
              SAINTGEEK.{" "}
              <span className="text-zinc-300">
                El equilibrio perfecto entre precio y rendimiento en teclados
                mecánicos.
              </span>
            </h1>
          </header>

          {/* GRID 2x2 */}
          <div className="grid gap-6 md:grid-cols-2">
            {heroItems.map((item) => (
              <Link
                key={item.slug}
                href={`/teclado/${item.slug}` as Route}
                className="group relative block overflow-hidden rounded-[32px] border border-zinc-800 shadow-[0_20px_60px_rgba(0,0,0,0.7)] transition-colors duration-300 hover:border-cyan-400/70"
              >
                {/* Card con relación de aspecto fija; la imagen VA A CUBRIR TODA LA CARD */}
                <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden bg-[#111111]">
                  {/* TIFFANY LIGHT DETRÁS */}
                  <div
                    className="
                      absolute inset-0 z-0
                      bg-[radial-gradient(circle_at_80%_20%,#35F2FF_0%,#00D6FF_28%,transparent_60%),
                          radial-gradient(circle_at_0%_100%,#22E9FF_0%,#009EC5_30%,transparent_65%)]
                    "
                  />

                  {/* IMAGEN DE FONDO (CUBRE TODA LA CARD) */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="z-10 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(min-width:1024px) 540px, 100vw"
                  />

                  {/* VIDEO EN HOVER (TAMBIÉN CUBRE TODA LA CARD) */}
                  <video
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="pointer-events-none absolute inset-0 z-20 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  {/* TEXTO ARRIBA, COMO HYPERPC */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex flex-col items-center justify-start px-6 pt-6 md:px-8 md:pt-7">
                    <p className="text-xs md:text-sm text-zinc-100 text-center drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                      {item.subtitle}
                    </p>
                    <h3 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-[0.25em] text-white text-center drop-shadow-[0_0_12px_rgba(0,0,0,0.9)]">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LISTA NORMAL DE TECLADOS POR TAG ============ */}
      {/* (la de ClientTagPage, si quieres volver a usarla la dejas aquí) */}
      {/* <section className="mt-16">
        <ClientTagPage
          tag={MAIN_KEYBOARD_TAG}
          copy={copy}
          initialProducts={list}
        />
      </section> */}
    </>
  )
}
