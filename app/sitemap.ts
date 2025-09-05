// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { products } from '@/data/products'
import { site } from '@/lib/utils'

export const dynamic = 'force-static'
export const revalidate = 86400

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const base = site.url.replace(/\/+$/,'') // sin slash final

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,  // 👈 aquí
      priority: 1,
    },
    ...products.map(p => ({
      url: `${base}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,  // 👈 aquí también
      priority: 0.8,
    })),
  ]
}
