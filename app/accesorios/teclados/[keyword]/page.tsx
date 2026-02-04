import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { products, isKeyboardProduct, type KeyboardProduct } from "@/data/products"
import { slugifyTag, getAllTagSlugs, getTagCopy } from "@/lib/tags"
import ClientTagPage from "./tag-client"

type Props = { params: { keyword: string } }

export async function generateStaticParams() {
  return getAllTagSlugs().map((slug) => ({ keyword: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = slugifyTag(params.keyword)
  const copy = getTagCopy(tag)
  const url = `https://saintgeek.cl/accesorios/teclados/${tag}`
  return { title: copy.title, description: copy.description, alternates: { canonical: url } }
}

export default function Page({ params }: Props) {
  const tag = slugifyTag(params.keyword)
  const copy = getTagCopy(tag)

  const list: KeyboardProduct[] = products.filter(
    (p): p is KeyboardProduct =>
      isKeyboardProduct(p) && (p.tags || []).map(slugifyTag).includes(tag)
  )

  if (list.length === 0) notFound()
  return <ClientTagPage tag={tag} copy={copy as any} initialProducts={list} />
}
