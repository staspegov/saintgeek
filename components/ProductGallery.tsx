'use client'

import { useState } from "react"
import Image from "next/image"

export default function ProductGallery({ images }: { images: { url: string; label: string }[] }) {
  const [i, setI] = useState(0)

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-950">
        <Image
          src={images[i].url}
          alt={images[i].label}
          width={1200}
          height={700}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, idx) => (
            <button
              key={img.url}
              onClick={() => setI(idx)}
              className={`rounded-lg border ${i === idx ? "border-lime-400" : "border-zinc-800"} bg-zinc-950`}
            >
              <Image src={img.url} alt={img.label} width={100} height={60} className="w-24 h-14 object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
