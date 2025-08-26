'use client'

import { useEffect, useMemo } from "react"
import { products } from "@/data/products"

type Matrix = Record<string, Record<string, number>>

const KEY = "markovTransitions"
const LAST = "markovLastSlug"

function loadMatrix(): Matrix {
  if (typeof window === "undefined") return {}
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}")
  } catch {
    return {}
  }
}

function saveMatrix(m: Matrix) {
  if (typeof window === "undefined") return
  localStorage.setItem(KEY, JSON.stringify(m))
}

export function useMarkov(currentSlug: string) {
  useEffect(() => {
    const last = localStorage.getItem(LAST)
    const m = loadMatrix()
    if (last && last !== currentSlug) {
      m[last] = m[last] || {}
      m[last][currentSlug] = (m[last][currentSlug] || 0) + 1
      saveMatrix(m)
    }
    localStorage.setItem(LAST, currentSlug)
  }, [currentSlug])

  const recs = useMemo(() => {
    const m = loadMatrix()
    const row = m[currentSlug] || {}
    const sorted = Object.entries(row).sort((a,b)=>b[1]-a[1]).map(([slug])=>slug)
    const knownSlugs = new Set(products.map(p=>p.slug))
    const candidates = sorted.filter(s=>knownSlugs.has(s) && s!==currentSlug)
    if (candidates.length < 3) {
      const rest = products.map(p=>p.slug).filter(s=>s!==currentSlug && !candidates.includes(s))
      while (candidates.length < 3 && rest.length) {
        const r = rest.splice(Math.floor(Math.random()*rest.length),1)[0]
        candidates.push(r)
      }
    }
    return candidates.slice(0,3)
  }, [currentSlug])

  return recs
}
