"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import type { Route } from "next"

type ApiPost = {
  slug: string
  title: string
  cover: string | null
}

export default function BlogTicker() {
  const [items, setItems] = useState<ApiPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true

    ;(async () => {
      try {
        const res = await fetch("/api/blog-ticker")
        const data = (await res.json()) as ApiPost[]
        if (!alive) return
        setItems(Array.isArray(data) ? data : [])
      } catch {
        if (!alive) return
        setItems([])
      } finally {
        if (!alive) return
        setLoading(false)
      }
    })()

    return () => {
      alive = false
    }
  }, [])

  const track = useMemo(() => {
    if (!items.length) return []
    // duplicamos para loop infinito (-50% en la animación)
    return [...items, ...items]
  }, [items])

  // Skeleton (Tailwind)
  if (loading && !items.length) {
    return (
      <section className="relative w-full bg-[#0a0a0b] py-12">
        <div className="flex gap-6 overflow-hidden px-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-[460px] shrink-0 overflow-hidden rounded-[22px] border border-white/10 bg-[#141416] shadow-[0_30px_70px_rgba(0,0,0,0.55)]"
            >
              <div className="h-[270px] w-full animate-pulse bg-white/5" />
              <div className="h-[86px] w-full animate-pulse bg-black/40" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (!track.length) return null

  return (
    <section className="group relative w-full bg-[#0a0a0b] py-12">
      {/* Texto */}
      <div className="mx-auto max-w-[1180px] px-6 pb-6 text-center">
        <p className="text-[28px] font-extrabold tracking-tight text-white/95 md:text-[44px]">
          Artículos, guías y novedades para gamers
        </p>
        <p className="mt-3 text-[14px] text-white/55 md:text-[16px]">
          Reviews, comparativas y tips para elegir teclados mecánicos y ratones ultralivianos.
        </p>
      </div>

      {/* Contenedor con fade edges */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-[#0a0a0b] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-[#0a0a0b] to-transparent" />

        {/* Track animado (Tailwind class animate-ticker) */}
        <div
          className="
            flex w-max items-stretch gap-[22px] px-[22px]
            animate-ticker motion-reduce:animate-none
            group-hover:[animation-play-state:paused]
            transform-gpu [will-change:transform] [backface-visibility:hidden]
          "
        >
          {track.map((it, idx) => {
            const href = (`/blog/${it.slug}` as Route)
            const img = it.cover ?? "/og.jpg"

            return (
              <Link
                key={`${it.slug}-${idx}`}
                href={href}
                className="group/card block w-[460px] shrink-0"
              >
                <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#141416] shadow-[0_30px_70px_rgba(0,0,0,0.55)]">
                  <img
                    src={img}
                    alt={it.title}
                    loading="lazy"
                    className="h-[270px] w-full object-cover transition-transform duration-200 ease-out group-hover/card:scale-[1.02]"
                  />

                  {/* CTA hover */}
                  <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-150 group-hover/card:opacity-100">
                    <span className="inline-flex h-[38px] items-center justify-center rounded-full bg-white/95 px-5 text-[13px] font-extrabold text-[#111] shadow-[0_14px_40px_rgba(0,0,0,0.5)]">
                      Ver
                    </span>
                  </div>

                  {/* Bottom gradient */}
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/35 to-transparent px-5 pb-6 pt-5">
                    <div className="text-[15px] font-extrabold leading-snug tracking-[0.01em] text-white/90">
                      {it.title}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Mobile tweaks */}
      <div className="hidden sm:block" />
      <style jsx global>{`
        /* Nada aquí: la animación va por Tailwind (ver tailwind.config abajo) */
        @media (max-width: 640px) {
          .group .w-\\[460px\\] {
            width: 340px;
          }
          .group img.h-\\[270px\\] {
            height: 220px;
          }
        }
      `}</style>
    </section>
  )
}