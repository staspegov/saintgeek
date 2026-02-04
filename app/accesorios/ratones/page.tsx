// app/accesorios/ratones/page.tsx
import type { Metadata, Route } from "next"
import type { UrlObject } from "url"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import { products } from "@/data/products"
import { slugifyTag, getTagCopy } from "@/lib/tags"

// ✅ TAG PRINCIPAL PARA "TODOS LOS MODELOS" (debe existir en tags de TODOS los ratones)
const MAIN_MOUSE_TAG = slugifyTag("mouse gamer")

const copy = getTagCopy(MAIN_MOUSE_TAG)
const url = "https://saintgeek.cl/accesorios/ratones"

export const metadata: Metadata = {
  title: "Ratones gamer ultralivianos — SaintGeek",
  description:
    "Ratones gamer ultralivianos en Chile: inalámbricos, con cable y sensores PAW. Filtra por sensor, peso y conectividad para encontrar tu modelo ideal.",
  alternates: { canonical: url },
  openGraph: {
    title: "Ratones gamer ultralivianos — SaintGeek",
    description:
      "Explora ratones gamer ultralivianos: inalámbricos, con cable y sensores PAW para precisión competitiva. Modelos para FPS y esports con baja latencia.",
    url,
    siteName: "SaintGeek",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ratones gamer ultralivianos — SaintGeek",
    description:
      "Ratones gamer ultralivianos con sensores PAW, baja latencia y gran control. Filtra por peso, sensor y conectividad. Compra online en Chile.",
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
    slug: "paw3311",
    title: "PAW3311",
    subtitle: "Precisión competitiva para FPS y esports.",
    image: "/images/mouse/3.png",
    video: "/media/ratones/reverse.mp4",
  },
  {
    slug: "g13pro",
    title: "G13 PRO",
    subtitle: "Ultra liviano para reacciones rápidas.",
    image: "/images/mouse/1.png",
    video: "/media/ratones/reverse.mp4",
  },

  // ✅ IMPORTANTÍSIMO: "Todos los modelos" -> /accesorios/ratones/[MAIN_MOUSE_TAG]
  {
    title: "Todos los modelos",
    subtitle: "Explora todo el catálogo de ratones SaintGeek.",
    image: "/images/mouse/5.png",
    video: "/media/ratones/reverse.mp4",
    href: (`/accesorios/ratones/${MAIN_MOUSE_TAG}` as Route),
  },
]

export default function Page() {
  // ✅ Validamos que exista data para "Todos los modelos"
  // (esto requiere que TODOS los ratones tengan el tag MAIN_MOUSE_TAG)
  const list = products.filter(
    (p) =>
      p.category === "ratones" &&
      (p.tags || []).map(slugifyTag).includes(MAIN_MOUSE_TAG)
  )

  if (list.length === 0) notFound()

  return (
    <>
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <header className="mb-10 md:mb-14 text-center">
            <h1 className="mt-3 text-3xl md:text-5xl font-semibold text-white">
              SAINTGEEK.{" "}
              <span className="text-zinc-300">
                Ratones gamer ultra livianos para rendimiento competitivo.
              </span>
            </h1>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {heroItems.map((item) => {
              // ✅ DEFAULT: /accesorios/ratones/[keyword]
              // (aseguramos slug limpio usando slugifyTag)
              const href: UrlObject | Route = item.href
                ? item.href
                : (`/accesorios/ratones/${slugifyTag(item.slug || "")}` as Route)

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
                      <h3 className="mt-2 text-2xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-[0.2em] text-white drop-shadow-[0_0_12px_rgba(0,0,0,0.9)]">
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
