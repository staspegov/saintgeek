// lib/markov.ts
type Img = { url: string }
export type MinimalProduct = {
  slug: string
  name: string
  brand?: string
  category?: string
  size?: string          // "60%", "65%", "TKL", etc.
  switchType?: string    // "red", "blue", "brown"...
  color?: string
  priceRub?: number
  status?: "in_stock" | "preorder" | "out_of_stock"
  images?: Img[]
}

// --- Utils: hash + PRNG determinístico (sin mismatches CSR/SSR)
function hashCode(str: string) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i)
    h |= 0
  }
  return h >>> 0
}
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Scoring semántico básico (ajusta pesos a tu catálogo)
function semanticScore(a: MinimalProduct, b: MinimalProduct) {
  let s = 0
  if (a.brand && b.brand && a.brand === b.brand) s += 2.0
  if (a.size && b.size && a.size === b.size) s += 1.4
  if (a.switchType && b.switchType && a.switchType === b.switchType) s += 1.2
  if (a.color && b.color && a.color === b.color) s += 0.6
  if (a.category && b.category && a.category === b.category) s += 1.2

  // Cercanía de precio (bucket)
  const pa = a.priceRub ?? 0
  const pb = b.priceRub ?? 0
  if (pa && pb) {
    const diff = Math.abs(pa - pb)
    if (diff <= 10000) s += 1.0
    else if (diff <= 20000) s += 0.6
  }

  // Bonus stock
  if (b.status === "in_stock") s += 0.8

  return s
}

// Muestreo ponderado determinístico
function pickWeightedDistinct<T>(
  items: T[],
  weights: number[],
  k: number,
  rand: () => number
) {
  const chosen: T[] = []
  const pool = items.map((it, i) => ({ it, w: Math.max(0.0001, weights[i]) }))

  while (chosen.length < k && pool.length > 0) {
    // ruleta
    const total = pool.reduce((acc, x) => acc + x.w, 0)
    let r = rand() * total
    let idx = 0
    for (; idx < pool.length; idx++) {
      r -= pool[idx].w
      if (r <= 0) break
    }
    const pick = pool[Math.min(idx, pool.length - 1)]
    chosen.push(pick.it)
    pool.splice(Math.min(idx, pool.length - 1), 1)
  }
  return chosen
}

/**
 * Devuelve N productos relacionados de forma determinística (seed por slug)
 */
export function getMarkovRelated<T extends MinimalProduct>(
  base: T,
  all: T[],
  count = 6
): T[] {
  const seed = hashCode(base.slug)
  const rand = mulberry32(seed)

  const candidates = all.filter(x => x.slug !== base.slug)
  const weights = candidates.map(c => {
    // peso base de 0.1 para que todos tengan chance
    let w = 0.1 + semanticScore(base, c)
    // pequeña aleatoriedad estable para diversificar (±10%)
    const jitter = 0.9 + rand() * 0.2
    return w * jitter
  })

  const picks = pickWeightedDistinct(candidates, weights, count, rand)
  // Reordenado final también determinístico (por nombre + seed)
  return picks.sort((a, b) => {
    const ha = hashCode(a.slug + seed)
    const hb = hashCode(b.slug + seed)
    return ha - hb
  })
}
