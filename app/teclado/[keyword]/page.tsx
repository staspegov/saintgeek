// app/teclado/[keyword]/page.tsx
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { products } from "@/data/products"
import { slugifyTag, getAllTagSlugs, getTagCopy } from "@/lib/tags"
import ClientTagPage from "./tag-client"
import { site } from "@/lib/utils" // si ya lo usas

type Props = { params: { keyword: string } }

export async function generateStaticParams() {
  return getAllTagSlugs().map((slug) => ({ keyword: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = slugifyTag(params.keyword)
  const copy = getTagCopy(tag)
  const url = `https://saintgeek.cl/teclado/${tag}`

  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: url },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url,
      siteName: "SaintGeek",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description
    }
  }
}

export default function Page({ params }: Props) {
  const tag = slugifyTag(params.keyword)
  const copy = getTagCopy(tag)

  const list = products.filter((p) =>
    (p.tags || []).map(slugifyTag).includes(tag)
  )

  if (list.length === 0) notFound()

  return (
    <ClientTagPage tag={tag} copy={copy} initialProducts={list} />
  )
}
