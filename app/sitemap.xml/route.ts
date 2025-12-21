// app/sitemap.xml/route.ts
import { NextResponse } from "next/server"
import { site } from "@/lib/utils"
import { getAllPosts } from "@/lib/blog"
import { products } from "@/data/products"
import { getAllTagSlugs } from "@/lib/tags"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0

type SitemapEntry = {
  loc: string
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority: string
  lastmod?: string
}

function toISODate(input?: string) {
  if (!input) return undefined
  // expects ISO-like strings; safe fallback
  try {
    return new Date(input).toISOString().slice(0, 10)
  } catch {
    // if it's already YYYY-MM-DD or similar, keep first 10 chars
    return input.slice(0, 10)
  }
}

function escapeXml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
}

export async function GET() {
  const base = (site.url ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://saintgeek.cl").replace(/\/+$/, "")

  // ---- Blog posts ----
  const posts = getAllPosts()
  const postUrls: SitemapEntry[] = posts
    .filter((p: any) => p?.slug)
    .map((p: any) => ({
      loc: `${base}/blog/${p.slug}`,
      lastmod: toISODate(p.updatedAt ?? p.publishedAt),
      changefreq: "weekly",
      priority: "0.7",
    }))

  // ---- Products ----
  const productUrls: SitemapEntry[] = (products ?? [])
    .filter((p: any) => p?.slug)
    .map((p: any) => ({
      loc: `${base}/products/${p.slug}`,
      // If you have updatedAt on products, you can enable lastmod:
      // lastmod: toISODate(p.updatedAt ?? new Date().toISOString()),
      changefreq: "weekly",
      priority: "0.8",
    }))

  // ---- Tag landing pages /teclado/[keyword] ----
  const tagUrls: SitemapEntry[] = getAllTagSlugs()
    .filter(Boolean)
    .map((tag) => ({
      loc: `${base}/teclado/${tag}`,
      // lastmod: new Date().toISOString().slice(0, 10),
      changefreq: "weekly",
      priority: "0.85",
    }))

  // ✅ IMPORTANT: include /teclado index itself
  const urls: SitemapEntry[] = [
    { loc: `${base}/`, changefreq: "weekly", priority: "1.0" },
    { loc: `${base}/blog`, changefreq: "daily", priority: "0.9" },
    { loc: `${base}/teclado`, changefreq: "weekly", priority: "0.95" }, // 👈 add this

    ...postUrls,
    ...tagUrls,
    ...productUrls,
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => {
    const loc = escapeXml(u.loc)
    const lastmod = u.lastmod ? `<lastmod>${escapeXml(u.lastmod)}</lastmod>` : ""
    return `<url>
  <loc>${loc}</loc>
  ${lastmod}
  <changefreq>${u.changefreq}</changefreq>
  <priority>${u.priority}</priority>
</url>`
  })
  .join("\n")}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      // you can keep this or remove it since you are force-dynamic + revalidate=0
      "cache-control": "s-maxage=86400, stale-while-revalidate=604800",
    },
  })
}
