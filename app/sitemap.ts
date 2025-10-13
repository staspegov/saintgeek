// /app/sitemap.ts
import type { MetadataRoute } from "next"
import { products } from "@/data/products"
import { site } from "@/lib/utils"
import { getAllPosts } from "@/lib/blog"

export const dynamic = "force-static"
// Metadata routes are built at build-time. Revalidate can hint caching,
// but new posts appear on redeploy (or switch to a route handler if you need runtime).
export const revalidate = 86400 // 24h

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const base = (site.url ?? process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/+$/, "")

  const posts = getAllPosts() // <-- now returns your MDX posts

  const blogIndexLastMod =
    posts.length
      ? new Date(posts[0].updatedAt ?? posts[0].publishedAt ?? now)
      : now

  return [
    // Home
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },

    // Blog index
    {
      url: `${base}/blog`,
      lastModified: blogIndexLastMod,
      changeFrequency: "daily",
      priority: 0.9,
    },

    // Blog posts
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      // fall back to 'now' if no dates found (prevents Invalid Date)
      lastModified: new Date(p.updatedAt ?? p.publishedAt ?? now),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),

    // Products
    ...products.map((p) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]
}
