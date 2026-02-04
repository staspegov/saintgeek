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
        const res = await fetch("/api/blog-ticker", { cache: "force-cache" })
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
    return [...items, ...items]
  }, [items])

  // skeleton simple si aún carga
  if (loading && !items.length) {
    return (
      <section className="relative w-full bg-[#0a0a0b] py-12">
        <div className="flex gap-6 overflow-hidden px-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-[460px] shrink-0 overflow-hidden rounded-[22px] border border-white/10 bg-[#141416]"
              style={{ boxShadow: "0 30px 70px rgba(0,0,0,0.55)" }}
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
    <section className="relative w-full bg-[#0a0a0b] py-12">
    {/* ✅ Texto grande centrado (tipo HyperPC) */}
<div className="mx-auto max-w-[1180px] px-6 pb-6 text-center">
  <p className="text-[28px] md:text-[44px] font-extrabold tracking-tight text-white/95">
    Artículos, guías y novedades para gamers
  </p>
  <p className="mt-3 text-[14px] md:text-[16px] text-white/55">
    Reviews, comparativas y tips para elegir teclados mecánicos y ratones ultralivianos.
  </p>
</div>

      {/* fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-28 bg-gradient-to-r from-[#0a0a0b] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-28 bg-gradient-to-l from-[#0a0a0b] to-transparent" />

      <div className="ticker">
        <div className="ticker__track">
          {track.map((it, idx) => {
            const href = (`/blog/${it.slug}` as Route)
            const img = it.cover ?? "/og.jpg"

            return (
              <Link key={`${it.slug}-${idx}`} href={href} className="group ticker__card">
                <div className="ticker__imgWrap">
                  <img src={img} alt={it.title} className="ticker__img" loading="lazy" />

                  {/* botón hover */}
                  <div className="ticker__cta">
                    <span className="ticker__ctaBtn">Ver</span>
                  </div>

                  {/* barra inferior */}
                  <div className="ticker__bottom">
                    <div className="ticker__title">{it.title}</div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .ticker {
          overflow: hidden;
        }

        .ticker__track {
          display: flex;
          gap: 22px;
          width: max-content;
          padding: 0 22px;
          align-items: stretch;
          animation: marquee 100s linear infinite;
        }

        /* Pausar al hover */
        .ticker:hover .ticker__track {
          animation-play-state: paused;
        }

        /* Respeta reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .ticker__track {
            animation: none;
          }
        }

        .ticker__card {
          display: block;
          width: 460px;
        }

        .ticker__imgWrap {
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          background: #141416;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.55);
        }

        .ticker__img {
          width: 100%;
          height: 270px;
          object-fit: cover;
          display: block;
          transform: scale(1);
          transition: transform 220ms ease;
        }

        .group:hover .ticker__img {
          transform: scale(1.02);
        }

        .ticker__bottom {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          padding: 20px 20px 22px;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.82),
            rgba(0, 0, 0, 0.35),
            rgba(0, 0, 0, 0)
          );
        }

        .ticker__title {
          color: rgba(255, 255, 255, 0.92);
          font-weight: 800;
          font-size: 15px;
          letter-spacing: 0.01em;
          line-height: 1.25;
        }

        /* Hover button */
        .ticker__cta {
          position: absolute;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
          transition: opacity 160ms ease, transform 160ms ease;
          pointer-events: none;
        }

        .group:hover .ticker__cta {
          opacity: 1;
        }

        .ticker__ctaBtn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 38px;
          padding: 0 18px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.94);
          color: #111;
          font-weight: 800;
          font-size: 13px;
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.5);
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 640px) {
          .ticker__card {
            width: 340px;
          }
          .ticker__img {
            height: 220px;
          }
          .ticker__title {
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  )
}
