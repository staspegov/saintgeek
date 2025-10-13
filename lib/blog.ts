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

function normDate(d?: any): string | undefined {
  if (!d) return undefined
  if (typeof d === "string") {
    const t = new Date(d)
    return isNaN(t.getTime()) ? undefined : t.toISOString()
  }
  return undefined
}

export function getPostBySlug(slug: string): BlogPost | null {
  const mdx = path.join(POSTS_DIR, `${slug}.mdx`)
  const md = path.join(POSTS_DIR, `${slug}.md`)
  const file = fs.existsSync(mdx) ? mdx : fs.existsSync(md) ? md : null
  if (!file) return null

  const raw = fs.readFileSync(file, "utf8")
  const { data, content } = matter(raw)

  const published =
    normDate(data.publishedAt) ?? normDate(data.published) ?? normDate(data.date) ?? new Date().toISOString()
  const updated =
    normDate(data.updatedAt) ?? normDate(data.updated) ?? published

  const fm: BlogFrontmatter = {
    slug: (data.slug ?? slug) as string,
    title: (data.title ?? slug) as string,
    summary: data.summary ?? "",
    cover: data.cover ?? "",
    tags: (data.tags ?? []) as string[],
    category: data.category ?? "",
    author: (data.author ?? "SaintGeek") as string,
    publishedAt: published!,
    updatedAt: updated,
    draft: Boolean(data.draft),
    faq: (data.faq ?? []) as FAQItem[],
  }

  return { ...fm, content }
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
