// /lib/blog.ts
import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { tokenize, type MinimalPost } from "./blog_tokens"

export type FAQItem = { question: string; answer: string }

export type BlogFrontmatter = {
  slug: string
  title: string
  summary?: string
  cover?: string
  tags?: string[]
  category?: string
  author?: string
  publishedAt: string
  updatedAt?: string
  draft?: boolean
  faq?: FAQItem[]
}

export type BlogPost = BlogFrontmatter & { content: string }

const POSTS_DIR = path.resolve(process.cwd(), "content", "blog")

function isMD(name: string) {
  return /\.mdx?$/i.test(name)
}

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((ent) => {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) return walk(p)
    return isMD(ent.name) ? [p] : []
  })
}

export function getAllSlugs(): string[] {
  return walk(POSTS_DIR)
    .map((abs) => path.relative(POSTS_DIR, abs).replace(/\\/g, "/"))
    .map((rel) => rel.replace(/\.mdx?$/i, ""))
}

// ---- Helpers de fechas y tabla ----

// Interpreta "YYYY-MM-DD" como medianoche Chile (-03:00). Si trae hora, respeta.
function normDate(d?: any): string | undefined {
  if (!d) return undefined
  if (typeof d === "string") {
    const hasTime = /\d{2}:\d{2}/.test(d)
    const iso = hasTime ? d : `${d}T00:00:00-03:00`
    const t = new Date(iso)
    return isNaN(t.getTime()) ? undefined : t.toISOString()
  }
  return undefined
}

// Extrae metadatos de una tabla Markdown al inicio del contenido:
// | title | slug | publishedAt | updatedAt | ...
// | ---   | ---  | ---         | ---       | ...
// | ...   | ...  | ...         | ...       | ...
function extractTableMeta(markdown: string): { meta: Record<string, string>, content: string } {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n")

  // Salta líneas en blanco iniciales
  let start = 0
  while (start < lines.length && lines[start].trim() === "") start++

  // Debe empezar con una fila de tabla y luego una fila separadora ---|---|---
  if (!lines[start] || !lines[start].trim().startsWith("|")) {
    return { meta: {}, content: markdown }
  }
  const header = lines[start]
  const sep = lines[start + 1] ?? ""
  if (!/-{3,}/.test(sep) || !sep.includes("|")) {
    return { meta: {}, content: markdown }
  }
  const dataRow = lines[start + 2] ?? ""
  if (!dataRow.includes("|")) {
    return { meta: {}, content: markdown }
  }

  const parseRow = (row: string) =>
    row
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim())

  const keys = parseRow(header).map((k) => k.replace(/`/g, "").trim())
  const vals = parseRow(dataRow)

  const meta: Record<string, string> = {}
  keys.forEach((k, i) => {
    const v = (vals[i] ?? "").trim()
    if (v) meta[k] = v
  })

  // Quita TODA la tabla inicial (header + sep + filas de datos contiguas)
  let end = start + 2
  while (end + 1 < lines.length && lines[end + 1].trim().startsWith("|")) end++
  const newContent = [...lines.slice(0, start), ...lines.slice(end + 1)].join("\n").replace(/^\s+/, "")

  return { meta, content: newContent }
}

export function getPostBySlug(slug: string): BlogPost | null {
  const mdx = path.join(POSTS_DIR, `${slug}.mdx`)
  const md = path.join(POSTS_DIR, `${slug}.md`)
  const file = fs.existsSync(mdx) ? mdx : fs.existsSync(md) ? md : null
  if (!file) return null

  const raw = fs.readFileSync(file, "utf8")

  // 1) Parse YAML front-matter si existe
  const { data, content: afterMatter } = matter(raw)

  // 2) Si no hay datos YAML, intenta leer tabla Markdown inicial (o combinar ambos)
  const { meta: tableMeta, content: body } = extractTableMeta(afterMatter)

  // YAML tiene prioridad; completa con tabla si faltan claves
  const meta: Record<string, any> = { ...tableMeta, ...data }

  const published =
    normDate(meta.publishedAt) ??
    normDate(meta.published) ??
    normDate(meta.date) ??
    new Date().toISOString()

  const updated =
    normDate(meta.updatedAt) ?? normDate(meta.updated) ?? published

  const fm: BlogFrontmatter = {
    slug: (meta.slug ?? slug) as string,
    title: (meta.title ?? slug) as string,
    summary: meta.summary ?? meta.description ?? "",
    cover: meta.cover ?? "",
    tags: (meta.tags ?? []) as string[],
    category: meta.category ?? "",
    author: (meta.author ?? "SaintGeek") as string,
    publishedAt: published!,
    updatedAt: updated,
    draft: Boolean(meta.draft),
    faq: (meta.faq ?? []) as FAQItem[],
  }

  return { ...fm, content: body }
}

export function getAllPosts(): BlogPost[] {
  const posts = getAllSlugs()
    .map((s) => getPostBySlug(s))
    .filter((p): p is BlogPost => Boolean(p) && !p!.draft)

  posts.sort((a, b) => {
    const ad = new Date(a.updatedAt ?? a.publishedAt).getTime()
    const bd = new Date(b.updatedAt ?? b.publishedAt).getTime()
    return bd - ad
  })

  return posts
}

// helpers existentes
export function wordsCount(markdown: string) {
  return markdown.replace(/\s+/g, " ").trim().split(" ").length
}
export function readingMinutes(markdown: string, wpm = 220) {
  return Math.max(1, Math.round(wordsCount(markdown) / wpm))
}
export function toMinimalPost(p: BlogPost): MinimalPost {
  return {
    slug: p.slug,
    title: p.title,
    tags: p.tags ?? [],
    category: p.category,
    publishedAt: p.publishedAt,
    tokens: tokenize(`${p.title} ${p.summary ?? ""} ${p.content.slice(0, 4000)}`),
  }
}
