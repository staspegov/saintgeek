import { site } from "@/lib/utils"
import type { Product } from "@/data/products"

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": site.name,
    "url": site.url,
    "logo": site.url + "/logo.png",
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": site.name,
    "url": site.url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": site.url + "/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Чем игровые клавиатуры отличаются от офисных?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Игровые клавиатуры имеют улучшенную эргономику, эффектную подсветку и функции для игр (например, Anti‑Ghosting)."
        }
      },
      {
        "@type": "Question",
        "name": "Есть ли гарантия?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Да, предоставляется гарантия производителя. Условия зависят от модели."
        }
      }
    ]
  }
}

export function breadcrumbJsonLd(items: { name: string, url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((it, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": it.name,
      "item": it.url
    }))
  }
}

export function productJsonLd(p: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": p.name,
    "brand": { "@type": "Brand", "name": p.brand },
    "sku": p.slug.toUpperCase(),
    "offers": {
      "@type": "Offer",
      "priceCurrency": "RUB",
      "price": p.priceRub.toFixed(2),
      "availability": p.status === "in_stock" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      "url": site.url + "/products/" + p.slug
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "37"
    }
  }
}
