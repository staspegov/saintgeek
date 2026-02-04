import type { Route } from "next"
import type { UrlObject } from "url"
import Link from "next/link"
import Image from "next/image"

type CategoryCard = {
  title: string
  subtitle: string
  href?: UrlObject | Route
  image: string
  video?: string
}

const cards: CategoryCard[] = [
  {
    title: "TECLADOS",
    subtitle: "Tu setup empieza aquí",
    href: "/accesorios/teclados" as Route,
    image: "/images/testimage3.png",
    video: "/media/teclados/65-75/reverse.mp4",
  },
  {
    title: "RATONES",
    subtitle: "Control y precisión",
    href: "/accesorios/ratones" as Route,
    image: "/images/testimage9.png",
    video: "/media/ratones/reverse.mp4",
  },
]

function CategoryCardFull({ item, priority }: { item: CategoryCard; priority?: boolean }) {
  const href: UrlObject | Route = item.href ?? ("/" as Route)

  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-[32px] border border-zinc-800 shadow-[0_20px_60px_rgba(0,0,0,0.7)] transition-colors duration-300 hover:border-cyan-400/70"
      aria-label={`Ver ${item.title}`}
    >
      {/* ✅ MISMO comportamiento responsive que /teclado:
          - wrapper con rounded
          - bg + backlight
          - Image fill cover
          - video hover
          - texto arriba centrado
      */}
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
          priority={!!priority}
        />

        {/* VIDEO HOVER */}
        {item.video ? (
          <video
            src={item.video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none absolute inset-0 z-20 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        ) : null}

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
}

export default function HomeCategories() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      {/* ✅ misma grilla responsive que /teclado: */}
      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((c, idx) => (
          <CategoryCardFull key={c.title} item={c} priority={idx === 0} />
        ))}
      </div>
    </section>
  )
}
