"use client"

import React, { useMemo, useState } from "react"

type FaqItem = {
  question: string
  answer: string
  category?: string
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={cx(
        "h-5 w-5 shrink-0 text-white/70 transition-transform duration-200",
        open && "rotate-180"
      )}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function FaqSection({
  h1,
  faq,
  title = "¿Aún quedan preguntas?",
  subtitle = "Tenemos respuestas.",
  contained = true,
}: {
  h1?: string
  faq: FaqItem[]
  title?: string
  subtitle?: string
  /**
   * ✅ true = NO añade max-w / px internos.
   * Úsalo cuando lo renderizas dentro de tu layout max-w-[1450px] mx-auto px-6.
   */
  contained?: boolean
}) {
  const tabs = useMemo(() => {
    const set = new Set<string>()
    faq.forEach((f) => set.add((f.category?.trim() || "General").toLowerCase()))
    const keys = Array.from(set)

    const pretty = (k: string) =>
      k === "general"
        ? "General"
        : k
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ")

    return keys.map((k) => ({ key: k, label: pretty(k) }))
  }, [faq])

  const [activeTab, setActiveTab] = useState(tabs[0]?.key ?? "general")
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const filtered = useMemo(() => {
    return faq.filter(
      (f) => (f.category?.trim() || "General").toLowerCase() === activeTab
    )
  }, [faq, activeTab])

  return (
    <section
      className={cx(
        contained
          ? "w-full"
          : "relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-x-clip"
      )}
    >
      {/* ✅ Si contained=false, puedes meter gutters aquí; en tu caso: contained=true */}
      <div className={cx("w-full py-14 lg:py-16", !contained && "px-6 md:px-10 lg:px-14")}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[520px_1fr] lg:gap-14">
          {/* Left */}
          <div className="pt-1">
            <h2 className="text-[38px] font-semibold tracking-tight text-white leading-[1.06] lg:text-[52px]">
              {title}
            </h2>

            <p className="mt-2 text-[38px] font-semibold tracking-tight text-white/30 leading-[1.06] lg:text-[52px] lg:whitespace-nowrap">
              {subtitle}
            </p>

            {h1 ? (
              <p className="mt-6 max-w-[520px] text-[13px] leading-relaxed text-white/40">
                Preguntas frecuentes sobre{" "}
                <span className="text-white/65">{h1}</span>
              </p>
            ) : null}
          </div>

          {/* Right */}
          <div className="min-w-0">
            {/* Tabs */}
            <div role="tablist" aria-label="FAQ categories" className="flex flex-wrap gap-3">
              {tabs.map((t) => {
                const active = t.key === activeTab
                return (
                  <button
                    key={t.key}
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setActiveTab(t.key)
                      setOpenIdx(0)
                    }}
                    className={cx(
                      "rounded-full px-5 py-2 text-sm font-medium transition",
                      "border border-white/15 bg-white/5 text-white/85 hover:bg-white/10",
                      active && "bg-white text-black border-white hover:bg-white"
                    )}
                  >
                    {t.label}
                  </button>
                )
              })}
            </div>

            {/* Accordion */}
            <div className="mt-8 border-y border-white/10">
              {filtered.map((item, idx) => {
                const isOpen = openIdx === idx
                return (
                  <div
                    key={`${activeTab}-${idx}`}
                    className="border-t border-white/10 first:border-t-0"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                    >
                      {/* ✅ un poquito más grande */}
                      <span className="text-[16px] font-semibold text-white/90 lg:text-[17px]">
                        {item.question}
                      </span>
                      <Chevron open={isOpen} />
                    </button>

                    <div
                      className={cx(
                        "grid transition-[grid-template-rows] duration-200 ease-out",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <div className="overflow-hidden">
                        {/* ✅ respuesta un poco más grande */}
                        <p className="pb-6 text-[14px] leading-relaxed text-white/55 lg:text-[15px] lg:leading-[1.85]">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {filtered.length === 0 ? (
              <p className="mt-6 text-sm text-white/50">
                No hay preguntas en esta categoría.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
