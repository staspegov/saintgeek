import { site } from "@/lib/utils"
import type { Product } from "@/data/products"

export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/logo.png`,
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }
}


export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#localbusiness`,
    name: site.name,
    url: site.url,
    image: [`${site.url}/og.jpg`],
    logo: `${site.url}/og.jpg`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CL",
      addressRegion: "RM",
      addressLocality: "Santiago"
    },
    areaServed: "CL",
    sameAs: [
      "https://www.instagram.com/saintgeek.cl"
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        opens: "10:00",
        closes: "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "10:00",
        closes: "14:00"
      }
    ]
  }
}
// lib/jsonld.ts
export function relatedItemListJsonLd(
  items: { name: string; url: string }[],
  listName = "Productos relacionados"
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: it.url,
      name: it.name
    }))
  }
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿En qué se diferencia un teclado mecánico de uno de membrana?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Los teclados mecánicos utilizan interruptores individuales bajo cada tecla, lo que ofrece una respuesta táctil más precisa, mayor durabilidad y una mejor experiencia al escribir o jugar.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué tipo de interruptores es mejor para jugar?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Depende de tus preferencias. Los interruptores lineales (como los rojos) son suaves y rápidos, ideales para juegos. Los táctiles (como los marrones) ofrecen una ligera resistencia, útiles para escribir y jugar.",
        },
      },
      {
        "@type": "Question",
        name: "¿Los teclados mecánicos hacen mucho ruido?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Algunos modelos, especialmente los de interruptores azules, pueden ser más ruidosos. Si prefieres algo silencioso, elige interruptores rojos o silent red.",
        },
      },
      {
        "@type": "Question",
        name: "¿Tienen retroiluminación RGB?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Sí, la mayoría de los teclados gamer modernos incluyen retroiluminación RGB personalizable, lo que permite ajustar colores y efectos de luz según tu estilo.",
        },
      },
      {
        "@type": "Question",
        name: "¿Se puede usar un teclado mecánico en Mac o consolas?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Sí, la mayoría son compatibles con Windows, macOS y consolas como PS5 o Xbox mediante conexión USB o Bluetooth. Revisa siempre la ficha técnica antes de comprar.",
        },
      },
      {
        "@type": "Question",
        name: "¿Los teclados mecánicos requieren mantenimiento?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Sí, se recomienda limpiar las teclas y la base de vez en cuando para evitar acumulación de polvo. También puedes reemplazar keycaps o lubricar los switches si lo deseas.",
        },
      },
      {
        "@type": "Question",
        name: "¿Tienen garantía los teclados mecánicos?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Sí, todos nuestros teclados cuentan con garantía oficial del fabricante. La duración varía según el modelo, generalmente entre 12 y 24 meses.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué es la función Anti-Ghosting?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Anti-Ghosting permite que el teclado detecte múltiples teclas presionadas al mismo tiempo sin errores, lo cual es esencial para juegos que requieren combinaciones rápidas.",
        },
      },
    ],
  }
}


export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.url,
    })),
  }
}

export function productJsonLd(p: Product) {
  // Construir URLs absolutas de imagen (máx. 6)
  const imagesAbs = (p.images ?? [])
    .map((img) => img?.url || "")
    .filter(Boolean)
    .map((u) => (u.startsWith("http") ? u : `${site.url}${u.startsWith("/") ? "" : "/"}${u}`))
    .slice(0, 6)

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    // Recomendados por Google:
    image: imagesAbs.length ? imagesAbs : [`${site.url}/og.jpg`], // fallback
    description: p.description || undefined,
    brand: { "@type": "Brand", name: p.brand },
    sku: (p.slug || "").toUpperCase(),
    url: `${site.url}/products/${p.slug}`,
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      url: `${site.url}/politica-de-devoluciones`, // tu URL en español
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "CLP",                              // cambia a "RUB" si corresponde
      price: Number(p.priceRub).toFixed(0),              // CLP sin decimales
      availability:
        p.status === "in_stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
      url: `${site.url}/products/${p.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "37",
    },
  }
}
