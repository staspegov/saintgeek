// app/sitemap.ts
import type { MetadataRoute } from "next"
import { products } from "@/data/products"
import { site } from "@/lib/utils"
import { getAllPosts } from "@/lib/blog" // <- importa tus posts del FS

export const dynamic = "force-static"
export const revalidate = 86400 // 24h

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const base = site.url.replace(/\/+$/, "")
  const posts = getAllPosts()

  return [
    // Home
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1,
    },

    // Índice del blog
    {
      url: `${base}/blog`,
      lastModified: posts.length
        ? new Date(posts[0].updatedAt ?? posts[0].publishedAt)
        : now,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },

    // Posts del blog
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt ?? p.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),

    // Productos
    ...products.map((p) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ]
}
