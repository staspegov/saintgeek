import fs from "fs"
import path from "path"
import matter from "gray-matter"


export type BlogFrontmatter = {
slug: string
title: string
summary?: string
cover?: string
tags?: string[]
author?: string
publishedAt: string
updatedAt?: string
draft?: boolean
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


const fm = {
slug: (data.slug ?? slug) as string,
title: (data.title ?? slug) as string,
summary: data.summary ?? "",
cover: data.cover ?? "",
tags: (data.tags ?? []) as string[],
author: data.author ?? "SaintGeek",
publishedAt: (data.publishedAt ?? new Date().toISOString()) as string,
updatedAt: (data.updatedAt ?? data.publishedAt ?? new Date().toISOString()) as string,
draft: Boolean(data.draft),
}


return { ...fm, content }
}


export function getAllPosts(): BlogPost[] {
return getAllSlugs()
.map((slug) => getPostBySlug(slug))
.filter((p): p is BlogPost => Boolean(p) && !p!.draft)
.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}