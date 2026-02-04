"use client"

import Script from "next/script"
import { products } from "@/data/products"
import {
  orgJsonLd,
  websiteJsonLd,
  faqJsonLd,
  productJsonLd,
  localBusinessJsonLd,
} from "@/lib/jsonld"

import HomeHeroVideo from "@/components/home/HomeHeroVideo"
import HomeCategories from "@/components/home/HomeCategories"
import BlogTicker from "@/components/home/BlogTicker"
import Footer from "@/components/Footer"

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        background: `
          radial-gradient(circle at top right, #141414, transparent 40%),
          linear-gradient(180deg, #0e0e0f 0%, #0a0a0b 100%)
        `,
        color: "#e9e9ea",
      }}
    >
      {/* ✅ HERO full-bleed (como HyperPC) */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <HomeHeroVideo
          videoSrc="/images/video/video.webm"
          title="SAINTGEEK"
          subtitle="Accesorios gamer premium"
        />
      </div>

      {/* ✅ resto centrado */}
      <HomeCategories />

      {/* ✅ BlogTicker ahora fetchea posts desde /api/blog-ticker */}
      <BlogTicker />

    

      {/* JSON-LD (NO TOCAR) */}
      <Script
        id="ld-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }}
      />
      <Script
        id="ld-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />
      <Script
        id="ld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
      />
      <Script
        id="ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <Script
        id="ld-products"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(products.map((p) => productJsonLd(p))),
        }}
      />
    </div>
  )
}
