// lib/blog_tokens.ts
export function norm(s: string) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w%+]+/g, " ")
    .trim()
}
export function tokenize(s: string) {
  return norm(s)
    .split(/\s+/)
    .filter(Boolean)
}

export type MinimalPost = {
  slug: string
  title: string
  tags: string[]
  category?: string
  publishedAt?: string
  tokens?: string[]
}
