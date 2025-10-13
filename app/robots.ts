import { site } from "@/lib/utils"

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: site.url + '/sitemap.xml',
  }
}
