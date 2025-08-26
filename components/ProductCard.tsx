"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import type { Product } from "@/data/products"

export default function ProductCard({ p }: { p: Product }) {
  const [idx, setIdx] = useState(0)
  const [open, setOpen] = useState(false)

  const statusDot = p.status === "in_stock" ? "#75ff00" : "#ffb02e"
  const statusText = p.status === "in_stock" ? "В наличии" : "Под заказ"

  const radial = {
    black: "rgba(137,255,0,.18)",
    purple: "rgba(156,124,255,.25)",
    green: "rgba(145,255,89,.28)",
    white: "rgba(255,255,255,.22)",
    grey: "rgba(200,200,200,.16)",
  }[p.color]

  const next = () => setIdx((i) => (i + 1) % p.images.length)
  const prev = () => setIdx((i) => (i - 1 + p.images.length) % p.images.length)

  return (
    <article
      className="relative overflow-hidden rounded-[18px] border border-[#1a1a1c] shadow-card p-4"
      style={{ background: "linear-gradient(180deg,#141416,#0f0f10)" }}
    >
      {/* Status */}
      <div className="flex items-center gap-2 text-xs text-[#9ea0a6]">
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{
            background: statusDot,
            boxShadow: `0 0 0 2px ${
              p.status === "in_stock"
                ? "rgba(117,255,0,.15)"
                : "rgba(255,176,46,.12)"
            }`,
          }}
        />
        {statusText}
      </div>

      {/* Carousel */}
      <div
        className="relative group h-60 my-3 rounded-xl flex items-center justify-center overflow-hidden cursor-zoom-in"
        style={{
          background: `radial-gradient(120px 80px at 50% 0%, ${radial}, rgba(0,0,0,0) 60%), linear-gradient(180deg,#1a1b1e 0%,#101113 100%)`,
        }}
        onClick={() => setOpen(true)}
      >
        <Image
          key={p.images[idx].id}
          src={p.images[idx].url}
          alt={p.images[idx].label}
          width={400}
          height={200}
          className="object-contain w-full h-full transition-opacity duration-300"
        />
        {/* Prev / Next only visible on hover */}
        {p.images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Info */}
      <div className="text-[13px] text-[#a9abb0] mb-1">
        {p.subtitle || p.brand}
      </div>
      <h3 className="text-[#f3f3f4] text-[16px] leading-tight mb-2">
        {p.name}
      </h3>

      {/* Price + CTA */}
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-white font-extrabold text-[18px]">
            {p.priceRub.toLocaleString("ru-RU")} ₽
          </div>
          <div className="text-[12px] text-[#8d8f95] mt-0.5">
            от {p.monthlyRub.toLocaleString("ru-RU")} ₽/мес.
          </div>
        </div>
        <Link
          href={`/products/${p.slug}`}
          className="inline-flex items-center gap-2 rounded-xl font-bold text-[13px] px-3.5 py-2 no-underline"
          style={{ background: "#89ff00", color: "#121313" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path
              fill="#121313"
              d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2m10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2M7.01 14l.94-2h8.44c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 21 2H5.21L4.27 0H1v2h2l3.6 7.59-1.35 2.44C4.52 12.37 5.48 14 7.01 14Z"
            />
          </svg>
          Купить
        </Link>
      </div>

      {/* Modal fullscreen zoom */}
      {open && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-5xl w-[90%] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-white text-2xl"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center"
            >
              ›
            </button>
            <Image
              src={p.images[idx].url}
              alt={p.images[idx].label}
              width={1200}
              height={900}
              className="object-contain w-full h-auto"
            />
          </div>
        </div>
      )}
    </article>
  )
}
