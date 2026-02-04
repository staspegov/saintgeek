// app/accesorios/ratones/[keyword]/page.tsx
import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { products, isMouseProduct, type MouseProduct } from "@/data/products"
import { slugifyTag } from "@/lib/tags"
import ClientTagPage from "./tag-client"
import { getMouseTagCopy } from "@/lib/mouse-tag"

type Props = { params: { keyword: string } }

const ALL_MICE_KEYWORD = "todos"

// ✅ slugs SOLO desde ratones (escalable y no mezcla con teclados)
function getAllMouseTagSlugs(): string[] {
  const tags = new Set<string>()
  products
    .filter(isMouseProduct)
    .forEach((p) => (p.tags || []).forEach((t) => tags.add(slugifyTag(t))))
  return Array.from(tags)
}

export async function generateStaticParams() {
  return [...getAllMouseTagSlugs(), ALL_MICE_KEYWORD].map((slug) => ({ keyword: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const keyword = slugifyTag(params.keyword)
  const copy = getMouseTagCopy(keyword)
  const url = `https://saintgeek.cl/accesorios/ratones/${keyword}`

  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: url },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url,
      siteName: "SaintGeek",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
    },
  }
}

export default function Page({ params }: Props) {
  const keyword = slugifyTag(params.keyword)
  const copy = getMouseTagCopy(keyword)

  const list: MouseProduct[] =
    keyword === ALL_MICE_KEYWORD
      ? products.filter((p): p is MouseProduct => isMouseProduct(p))
      : products.filter(
          (p): p is MouseProduct =>
            isMouseProduct(p) && (p.tags || []).map(slugifyTag).includes(keyword)
        )

  if (list.length === 0) notFound()

  return <ClientTagPage tag={keyword} copy={copy} initialProducts={list} />
}
