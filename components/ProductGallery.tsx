'use client'

import { useMemo, useState } from "react"
import Image from "next/image"

type Img = { url: string; label: string }

export default function ProductGallery({ images }: { images: Img[] }) {
  // Exclude first two images (indices 0 and 1)
  const filtered = useMemo(() => images.filter((_, idx) => idx > 1), [images])

  // Start at 0 within the filtered list
  const [i, setI] = useState(0)

  // Fallback if filtered is empty (show nothing)
  if (!filtered.length) {
    return null
  }

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-950">
        <Image
          src={filtered[i].url}
          alt={filtered[i].label}
          width={1200}
          height={700}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      {filtered.length > 1 && (
        <div className="flex gap-2">
          {filtered.map((img, idx) => (
            <button
              key={img.url}
              onClick={() => setI(idx)}
              className={`rounded-lg border ${
                i === idx ? "border-lime-400" : "border-zinc-800"
              } bg-zinc-950`}
            >
              <Image
                src={img.url}
                alt={img.label}
                width={100}
                height={60}
                className="w-24 h-14 object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
