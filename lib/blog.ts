// lib/blog.ts
import fs from "fs"
import path from "path"
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

const POSTS_DIR = path.join(process.cwd(), "content", "blog")

function isMDX(name: string) {
  return name.endsWith(".mdx") || name.endsWith(".md")
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter(isMDX)
    .map((f) => f.replace(/\.(mdx|md)$/i, ""))
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  const altPath = path.join(POSTS_DIR, `${slug}.md`)
  const resolved = fs.existsSync(filePath) ? filePath : fs.existsSync(altPath) ? altPath : null
  if (!resolved) return null

  const raw = fs.readFileSync(resolved, "utf8")
  const { data, content } = matter(raw)

  const fm: BlogFrontmatter = {
    slug: (data.slug ?? slug) as string,
    title: (data.title ?? slug) as string,
    summary: data.summary ?? "",
    cover: data.cover ?? "",
    tags: (data.tags ?? []) as string[],
    category: data.category ?? "",
    author: data.author ?? "SaintGeek",
    publishedAt: (data.publishedAt ?? new Date().toISOString()) as string,
    updatedAt: (data.updatedAt ?? data.publishedAt ?? new Date().toISOString()) as string,
    draft: Boolean(data.draft),
    faq: (data.faq ?? []) as FAQItem[],
  }

  return { ...fm, content }
}

export function getAllPosts(): BlogPost[] {
  return getAllSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is BlogPost => Boolean(p) && !p!.draft)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}

// Lectura rápida
export function wordsCount(markdown: string) {
  return markdown.replace(/\s+/g, " ").trim().split(" ").length
}
export function readingMinutes(markdown: string, wpm = 220) {
  return Math.max(1, Math.round(wordsCount(markdown) / wpm))
}

// Export MinimalPost para Markov de posts
export function toMinimalPost(p: BlogPost): MinimalPost {
  return {
    slug: p.slug,
    title: p.title,
    tags: p.tags ?? [],
    category: p.category,
    publishedAt: p.publishedAt,
    tokens: tokenize(`${p.title} ${p.summary ?? ""} ${p.content.slice(0, 4000)}`), // tope para evitar exceso
  }
}
