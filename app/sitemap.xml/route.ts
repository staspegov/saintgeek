// app/sitemap.xml/route.ts
import { NextResponse } from "next/server"
import { site } from "@/lib/utils"
import { getAllPosts } from "@/lib/blog"
import { products } from "@/data/products"
import { getAllTagSlugs } from "@/lib/tags" // 👈 NEW

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  const base = (site.url ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://saintgeek.cl").replace(/\/+$/, "")

  const posts = getAllPosts()
  const postUrls = posts.map((p) => ({
    loc: `${base}/blog/${p.slug}`,
    lastmod: (p.updatedAt ?? p.publishedAt).slice(0, 10),
    changefreq: "weekly",
    priority: "0.7",
  }))

  const productUrls = (products ?? [])
    .filter((p: any) => p?.slug)
    .map((p: any) => ({
      loc: `${base}/products/${p.slug}`,
      // lastmod: (p.updatedAt ?? new Date().toISOString()).slice(0, 10),
      changefreq: "weekly",
      priority: "0.8",
    }))

  // 👇 NEW: tag landing pages /teclado/[keyword]
  const tagUrls = getAllTagSlugs().map((tag) => ({
    loc: `${base}/teclado/${tag}`,
    // lastmod: new Date().toISOString().slice(0, 10),
    changefreq: "weekly",
    priority: "0.85",
  }))

  const urls = [
    { loc: `${base}/`, changefreq: "weekly", priority: "1.0" },
    { loc: `${base}/blog`, changefreq: "daily", priority: "0.9" },
    
    ...postUrls,
    ...tagUrls,        // 👈 include tags
    ...productUrls,    // 👈 include products
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `<url>
  <loc>${u.loc}</loc>
  ${"lastmod" in u ? `<lastmod>${(u as any).lastmod ?? ""}</lastmod>` : ""}
  <changefreq>${u.changefreq}</changefreq>
  <priority>${u.priority}</priority>
</url>`
  )
  .join("\n")}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "s-maxage=86400, stale-while-revalidate=604800",
    },
  })
}
