'use client'

import { useMemo, useState } from "react"
import Image from "next/image"

type Img = { url: string; label: string }

export default function ProductGallery({ images }: { images: Img[] }) {
  // Exclude first two images (indices 0 and 1)
  const filtered = useMemo(() => images.filter((_, idx) => idx > 1), [images])

  // Start at 0 within the filtered list
  const [i, setI] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [thumbLoaded, setThumbLoaded] = useState<Record<number, boolean>>({})

  // Fallback if filtered is empty (show nothing)
  if (!filtered.length) {
    return null
  }

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-950 relative">
        {/* Skeleton shimmer while loading */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 animate-pulse" />
        )}

        <Image
          src={filtered[i].url}
          alt={filtered[i].label}
          width={1200}
          height={700}
          className={`w-full h-auto object-contain transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          priority
          onLoadingComplete={() => setIsLoaded(true)}
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
              } bg-zinc-950 relative`}
            >
              {/* Thumbnail skeleton shimmer */}
              {!thumbLoaded[idx] && (
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 animate-pulse rounded-lg" />
              )}
              <Image
                src={img.url}
                alt={img.label}
                width={100}
                height={60}
                className={`w-24 h-14 object-contain transition-opacity duration-500 ${
                  thumbLoaded[idx] ? "opacity-100" : "opacity-0"
                }`}
                onLoadingComplete={() =>
                  setThumbLoaded((prev) => ({ ...prev, [idx]: true }))
                }
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
