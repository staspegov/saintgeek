import { products } from "@/data/products"
import { site } from "@/lib/utils"

export default async function sitemap() {
  const now = new Date().toISOString()
  const entries = [
    {
      url: site.url,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    ...products.map(p => ({
      url: `${site.url}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  ]
  return entries
}
