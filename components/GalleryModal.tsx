'use client'

import { useState } from "react"

type Img = { id: string; label: string }

export default function GalleryModal({ images }: { images: Img[] }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)

  return (
    <div>
      <div
        className="relative h-64 rounded-xl"
        style={{
          background:
            "radial-gradient(120px 80px at 50% 0%, rgba(137,255,0,.18), rgba(137,255,0,0) 60%), linear-gradient(180deg,#1a1b1e 0%,#101113 100%)",
        }}
        onClick={() => setOpen(true)}
      >
        <div className="absolute inset-0 grid place-items-center">
          {/* Inline SVG keyboard */}
          <svg viewBox="0 0 360 100" className="opacity-90 w-11/12 h-3/4">
            <rect x="8" y="20" width="344" height="60" rx="10" fill="#0d0e10" />
            <g>
              <rect x="20" y="30" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="46" y="30" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="72" y="30" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="98" y="30" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="124" y="30" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="150" y="30" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="176" y="30" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="202" y="30" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="228" y="30" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="254" y="30" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="280" y="30" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="306" y="30" width="34" height="14" rx="3" fill="#2a2b2f"/>

              <rect x="20" y="48" width="26" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="50" y="48" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="76"  y="48" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="102" y="48" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="128" y="48" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="154" y="48" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="180" y="48" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="206" y="48" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="232" y="48" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="258" y="48" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="284" y="48" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="310" y="48" width="30" height="14" rx="3" fill="#2a2b2f"/>

              <rect x="20" y="66" width="34" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="58" y="66" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="84" y="66" width="104" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="192" y="66" width="22" height="14" rx="#2a2b2f"/>
              <rect x="218" y="66" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="244" y="66" width="22" height="14" rx="3" fill="#2a2b2f"/>
              <rect x="270" y="66" width="70" height="14" rx="3" fill="#2a2b2f"/>
            </g>
          </svg>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={()=>setOpen(false)}>
          <div className="bg-[#0f0f11] border border-[#1a1a1c] rounded-2xl max-w-3xl w-full p-4" onClick={(e)=>e.stopPropagation()}>
            <div className="flex gap-3 overflow-x-auto pb-2 mb-4">
              {images.map((img, idx)=>(
                <button
                  key={img.id}
                  onClick={()=>setActive(idx)}
                  className={"min-w-24 h-16 rounded-lg border " + (active===idx ? "border-[#C0FF03]" : "border-[#2a2a2d]")}
                  aria-label={img.label}
                >
                  <div className="w-full h-full grid place-items-center text-xs opacity-70">{img.label}</div>
                </button>
              ))}
            </div>

            <div className="relative group rounded-xl overflow-hidden border border-[#1a1a1c]">
              <div className="cursor-zoom-in group-hover:scale-110 transition-transform duration-300 ease-out">
                {/* Use a larger inline keyboard svg as the main preview */}
                <svg viewBox="0 0 360 100" className="w-full h-[380px]">
                  <rect x="8" y="20" width="344" height="60" rx="10" fill="#0d0e10" />
                  <g>
                    <rect x="20" y="30" width="320" height="14" rx="3" fill="#e9e9ea"/>
                    <rect x="20" y="48" width="280" height="14" rx="3" fill="#e9e9ea"/>
                    <rect x="20" y="66" width="220" height="14" rx="3" fill="#e9e9ea"/>
                  </g>
                </svg>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button onClick={()=>setOpen(false)} className="px-4 py-2 rounded-lg border border-[#2a2a2d] text-sm text-[#dcdcde]">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
