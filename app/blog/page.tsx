import Link from "next/link"
import Image from "next/image"
import { getAllPosts } from "@/lib/blog"


export const revalidate = 3600 // ISR: re-gen every hour


export const metadata = {
title: "Blog | SaintGeek",
description: "Guías, noticias y lanzamientos para gamers en Chile.",
}


export default async function BlogPage() {
const posts = getAllPosts()


return (
<main className="mx-auto max-w-6xl px-4 py-12">
<h1 className="mb-6 text-3xl font-bold">Blog</h1>
<p className="mb-10 text-neutral-400">
Noticias, guías y lanzamientos del ecosistema gamer/creator.
</p>


<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
{posts.map((p) => (
<article key={p.slug} className="group overflow-hidden rounded-2xl border border-neutral-800 bg-[#121214]">
<Link href={`/blog/${p.slug}`} className="block">
<div className="relative aspect-video w-full overflow-hidden">
{p.cover ? (
<Image
src={p.cover}
alt={p.title}
fill
sizes="(min-width:1024px) 33vw, 100vw"
className="object-cover transition-transform group-hover:scale-[1.03]"
/>
) : (
<div className="flex h-full w-full items-center justify-center bg-neutral-900">📰</div>
)}
</div>
<div className="space-y-2 p-4">
<h2 className="line-clamp-2 text-lg font-semibold">{p.title}</h2>
{p.summary && <p className="line-clamp-3 text-sm text-neutral-400">{p.summary}</p>}
<div className="pt-1 text-xs text-neutral-500">{new Date(p.publishedAt).toLocaleDateString()}</div>
</div>
</Link>
</article>
))}
</div>
</main>
)
}