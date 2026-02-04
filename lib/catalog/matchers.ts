import type { Product } from "@/data/products"
import { slugifyTag } from "@/lib/tags"

function normalize(v: unknown) {
  return String(v ?? "").toLowerCase().trim()
}

export function getTags(p: Product): string[] {
  const t = (p as any).tags
  return Array.isArray(t) ? t.map(String) : []
}

function tagsBlob(p: Product) {
  return getTags(p).map(normalize).join(" ")
}

export function isKeyboard(p: Product) {
  const c = normalize((p as any).category ?? (p as any).type ?? (p as any).kind)
  if (["keyboard", "keyboards", "teclado", "teclados"].includes(c)) return true
  const blob = tagsBlob(p)
  return blob.includes("teclado") || blob.includes("keyboard")
}

export function isMouse(p: Product) {
  const c = normalize((p as any).category ?? (p as any).type ?? (p as any).kind)
  if (["mouse", "mice", "raton", "ratón", "ratones"].includes(c)) return true
  const blob = tagsBlob(p)
  return blob.includes("mouse") || blob.includes("raton") || blob.includes("ratón")
}

export function getTagSlugsForCategory(all: Product[], predicate: (p: Product) => boolean) {
  const set = new Set<string>()
  for (const p of all) {
    if (!predicate(p)) continue
    for (const t of getTags(p)) set.add(slugifyTag(t))
  }
  return Array.from(set)
}

export function filterByTagWithinCategory(
  all: Product[],
  tagSlug: string,
  predicate: (p: Product) => boolean
) {
  return all.filter((p) => {
    if (!predicate(p)) return false
    return getTags(p).map(slugifyTag).includes(tagSlug)
  })
}
