// lib/markov.ts
// Motor Markov determinístico para productos y posts
// - Incluye hash + PRNG determinístico
// - Scoring semántico avanzado
// - Muestreo ponderado con ligera aleatoriedad estable (jitter)

// ---------- Tipos compartidos ----------
export type Img = { url: string }

export type MinimalProduct = {
  slug: string
  name: string
  brand?: string
  category?: string
  size?: "60%" | "65%" | "70%" | "75%" | "TKL" | "full" | "100%" | string
  switchType?: "red" | "blue" | "brown" | "silent red" | string
  layout?: "ES" | "LA" | "ANSI" | "ISO" | string
  connectivity?: "wired" | "bt" | "2.4g" | "bt+2.4g" | string
  rgb?: boolean
  hotswap?: boolean
  color?: string
  priceRub?: number
  status?: "in_stock" | "preorder" | "out_of_stock"
  tags?: string[]            // opcional para orientar desde el blog
  images?: Img[]
}

export type MinimalPost = {
  slug: string
  title: string
  tags: string[]
  category?: string
  publishedAt?: string
  tokens?: string[]          // tokens normalizados de título/contenido
}

// ---------- Utils PRNG ----------
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

// ---------- Normalización texto ----------
function norm(s: string) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w%+]+/g, " ")
    .trim()
}
function tokenize(s: string) {
  return norm(s)
    .split(/\s+/)
    .filter(Boolean)
}

// ---------- Scoring productos ----------
export function semanticScoreProduct(a: MinimalProduct, b: MinimalProduct) {
  let s = 0

  // Coincidencias "fuertes"
  if (a.brand && b.brand && a.brand === b.brand) s += 2.0
  if (a.category && b.category && a.category === b.category) s += 1.4
  if (a.size && b.size && a.size === b.size) s += 1.2
  if (a.switchType && b.switchType && a.switchType === b.switchType) s += 1.1

  // Coincidencias "medias"
  if (a.layout && b.layout && a.layout === b.layout) s += 0.8
  if (a.connectivity && b.connectivity && a.connectivity === b.connectivity) s += 0.6
  if (a.color && b.color && a.color === b.color) s += 0.4
  if (a.rgb && b.rgb && a.rgb === b.rgb) s += 0.4
  if (a.hotswap && b.hotswap && a.hotswap === b.hotswap) s += 0.4

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

  // Afinidad por tags si el "seed" trae tags (desde el post)
  if (a.tags?.length && b.name) {
    const nameTokens = tokenize(b.name)
    for (const t of a.tags) {
      if (nameTokens.includes(norm(t))) s += 0.3
    }
  }

  return s
}

// ---------- Scoring posts ----------
export function semanticScorePost(a: MinimalPost, b: MinimalPost) {
  let s = 0

  // Tags overlap (Jaccard aproximado)
  const at = new Set((a.tags || []).map(norm))
  const bt = new Set((b.tags || []).map(norm))
  let inter = 0
  for (const t of at) if (bt.has(t)) inter++
  const union = new Set([...at, ...bt]).size || 1
  s += (inter / union) * 2.0 // máximo 2.0

  // Categoría
  if (a.category && b.category && norm(a.category) === norm(b.category)) s += 1.2

  // Título/Contenido tokens overlap (suave)
  const aTok = new Set((a.tokens || []).map(norm))
  const bTok = new Set((b.tokens || []).map(norm))
  let smallInter = 0
  for (const t of aTok) if (bTok.has(t)) smallInter++
  s += Math.min(0.8, smallInter * 0.05)

  // Frescura (bonus si ambos son recientes ~ 6 meses)
  const sixMonthsMs = 1000 * 60 * 60 * 24 * 30 * 6
  const now = Date.now()
  const ap = a.publishedAt ? new Date(a.publishedAt).getTime() : now
  const bp = b.publishedAt ? new Date(b.publishedAt).getTime() : now
  if (now - ap <= sixMonthsMs && now - bp <= sixMonthsMs) s += 0.4

  return s
}

// ---------- Muestreo ponderado ----------
function pickWeightedDistinct<T>(
  items: T[],
  weights: number[],
  k: number,
  rand: () => number
) {
  const chosen: T[] = []
  const pool = items.map((it, i) => ({ it, w: Math.max(0.0001, weights[i]) }))

  while (chosen.length < k && pool.length > 0) {
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

// ---------- Selectores Markov ----------
export function getMarkovRelated<T extends MinimalProduct>(
  base: T,
  all: T[],
  count = 6
): T[] {
  const seed = hashCode(base.slug)
  const rand = mulberry32(seed)

  const candidates = all.filter((x) => x.slug !== base.slug)
  const weights = candidates.map((c) => {
    let w = 0.1 + semanticScoreProduct(base, c)
    const jitter = 0.9 + rand() * 0.2 // ±10% determinístico
    return w * jitter
  })

  const picks = pickWeightedDistinct(candidates, weights, count, rand)
  return picks.sort((a, b) => {
    const ha = hashCode(a.slug + seed)
    const hb = hashCode(b.slug + seed)
    return ha - hb
  })
}

export function getMarkovRelatedPosts<T extends MinimalPost>(
  base: T,
  all: T[],
  count = 4
): T[] {
  const seed = hashCode("post-" + base.slug)
  const rand = mulberry32(seed)

  const candidates = all.filter((x) => x.slug !== base.slug)
  const weights = candidates.map((c) => {
    let w = 0.1 + semanticScorePost(base, c)
    const jitter = 0.9 + rand() * 0.2
    return w * jitter
  })

  const picks = pickWeightedDistinct(candidates, weights, count, rand)
  return picks.sort((a, b) => {
    const ha = hashCode(a.slug + seed)
    const hb = hashCode(b.slug + seed)
    return ha - hb
  })
}
