// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation"
import Script from "next/script"
import type { Metadata } from "next"
import remarkGfm from "remark-gfm"
import { compileMDX } from "next-mdx-remote/rsc"
import Image from "next/image"
import Link from "next/link"

import {
  getAllSlugs,
  getAllPosts,
  getPostBySlug,
  toMinimalPost,
  readingMinutes,
  type BlogPost,
} from "@/lib/blog"
import {
  blogPostingJsonLd,
  faqJsonLdFromItems,
  breadcrumbJsonLd,
  relatedItemListJsonLd,
} from "@/lib/jsonld"
import { site } from "@/lib/utils"
import { mdxComponents as mdxComponents } from "@/components/mdx-components"
import {
  getMarkovRelated,
  getMarkovRelatedPosts,
  type MinimalProduct,
} from "@/lib/markov"
import { products } from "@/data/products"

// -------- helpers de productos --------
function inferAttrsFromName(name: string) {
  const n = (name || "").toLowerCase()
  const size =
    n.includes("60%") ? "60%" :
    n.includes("65%") ? "65%" :
    n.includes("70%") ? "70%" :
    n.includes("75%") ? "75%" :
    n.includes("tkl") || n.includes("80%") ? "TKL" :
    n.includes("full") || n.includes("100%") ? "full" : undefined

  const switchType =
    n.includes("silent") ? "silent red" :
    /rojo|red|linear/.test(n) ? "red" :
    /azul|blue|click/.test(n) ? "blue" :
    /marr[oó]n|brown|t[aá]ctil/.test(n) ? "brown" : undefined

  const layout =
    /ansi/.test(n) ? "ANSI" :
    /iso/.test(n) ? "ISO" :
    /(latam|la|espanol|español|es)/.test(n) ? "ES" : undefined

  const connectivity =
    /(2\.4|dongle|hyperspeed|lightspeed)/.test(n) ? "2.4g" :
    /(bluetooth|bt)/.test(n) ? "bt" :
    /(al[aá]mbrico|wired|usb)/.test(n) ? "wired" : undefined

  const rgb = /(rgb|retroiluminaci[oó]n)/.test(n) || undefined
  const hotswap = /(hotswap|hot-swap|hot swap)/.test(n) || undefined

  const color =
    /blanco|white/.test(n) ? "white" :
    /negro|black/.test(n) ? "black" :
    /gris|gray/.test(n) ? "grey" : undefined

  const category = /teclado|keyboard/.test(n) ? "keyboard" : undefined
  return { size, switchType, layout, connectivity, rgb, hotswap, color, category }
}

function firstImage(p: any): string {
  const imgs = p?.images ?? []
  if (Array.isArray(imgs) && imgs.length) {
    const it = imgs[0]
    return typeof it === "string" ? it : it?.url ?? "/og.jpg"
  }
  return "/og.jpg"
}

import type { MinimalProduct as MP } from "@/lib/markov"

// 🔹 NUEVA FUNCIÓN: filtra solo productos con stock
function hasStock(p: any): boolean {
  if (!p) return false

  const status = typeof p.status === "string" ? p.status.toLowerCase() : ""

  if (status === "in_stock" || status === "instock" || status === "available") {
    return true
  }
  if (status === "out_of_stock" || status === "soldout" || status === "sold_out" || status === "unavailable") {
    return false
  }

  const stock =
    typeof p.stock === "number"
      ? p.stock
      : typeof p.quantity === "number"
      ? p.quantity
      : typeof p.qty === "number"
      ? p.qty
      : 0

  return stock > 0
}

function toMinimal(p: any): MP {
  const inf = inferAttrsFromName(p?.name ?? "")
  return {
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    category: inf.category ?? p.category,
    size: inf.size,
    switchType: inf.switchType,
    layout: inf.layout,
    connectivity: inf.connectivity,
    rgb: !!inf.rgb,
    hotswap: !!inf.hotswap,
    color: inf.color,
    priceRub: p.priceRub,
    status: p.status,
    images: Array.isArray(p.images)
      ? p.images.map((it: any) => (typeof it === "string" ? { url: it } : { url: it?.url ?? "" }))
      : [],
  }
}

function productSeedFromPost(post: { slug: string; category?: string; tags?: string[] }): MP {
  const lower = (post.tags ?? []).map((t) => t.toLowerCase())
  const size =
    lower.find((t) => ["60%","65%","70%","75%","80%","tkl","full","100%"].includes(t)) ||
    (post.category === "gamer" ? "TKL" : undefined)

  const switchType =
    lower.find((t) => /silent/.test(t)) ? "silent red" :
    lower.find((t) => /(rojo|red|linear)/.test(t)) ? "red" :
    lower.find((t) => /(azul|blue|click)/.test(t)) ? "blue" :
    lower.find((t) => /(marr[oó]n|brown|t[aá]ctil)/.test(t)) ? "brown" : undefined

  const layout =
    lower.find((t) => /(ansi|iso|es|latam|la|español)/.test(t))?.toUpperCase() as any

  return {
    slug: `seed-${post.slug}`,
    name: `Seed ${post.slug}`,
    category: post.category || "keyboard",
    size, switchType, layout,
    connectivity: undefined, rgb: undefined, hotswap: undefined, color: undefined,
    priceRub: 0, status: "in_stock", images: [],
    tags: post.tags,
  }
}

// -------- Next data --------
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | ${site.name}`,
    description: post.summary,
    alternates: { canonical: `${site.url}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.summary || undefined,
      url: `${site.url}/blog/${post.slug}`,
      images: post.cover ? [{ url: post.cover }] : undefined,
      type: "article",
    },
  }
}

// -------- Page --------
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return notFound()

  // MDX server-safe + GFM
  const { content: MDXContent } = await compileMDX({
    source: post.content,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
    components: mdxComponents as any,
  })

  const readMins = readingMinutes(post.content)

  // JSON-LD
  const imagesAbs = post.cover
    ? [post.cover.startsWith("http") ? post.cover : `${site.url}${post.cover.startsWith("/") ? "" : "/"}${post.cover}`]
    : []
  const articleLd = blogPostingJsonLd(post, imagesAbs)
  const faqLd = post.faq?.length ? faqJsonLdFromItems(post.faq) : null
  const breadcrumb = breadcrumbJsonLd([
    { name: "Inicio", url: site.url },
    { name: "Blog", url: `${site.url}/blog` },
    { name: post.title, url: `${site.url}/blog/${post.slug}` },
  ])

  // Markov productos
  const seedProduct = productSeedFromPost(post)
  const minimals: MinimalProduct[] = products.map(toMinimal)
  const relatedProducts = getMarkovRelated(seedProduct, minimals, 6)
  const relatedProductsFull = relatedProducts
    .map((m) => products.find((p: any) => p.slug === m.slug))
    .filter(Boolean)
    .filter(hasStock) as any[] // 🔹 solo productos con stock

  const relatedProductsLd = relatedItemListJsonLd(
    relatedProductsFull.map((p) => ({ name: p.name, url: `${site.url}/products/${p.slug}` })),
    "Productos recomendados para gamers"
  )

  // Markov posts
  const allPosts = getAllPosts()
  const seedPost = toMinimalPost(post)
  const minimalPosts = allPosts.map(toMinimalPost)
  const relatedPosts = getMarkovRelatedPosts(seedPost, minimalPosts, 4)
  const relatedPostsFull: BlogPost[] = relatedPosts
    .map((m) => allPosts.find((pp) => pp.slug === m.slug))
    .filter(Boolean) as BlogPost[]

  const relatedPostsLd = relatedItemListJsonLd(
    relatedPostsFull.map((p) => ({ name: p.title, url: `${site.url}/blog/${p.slug}` })),
    "Artículos relacionados"
  )

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      {/* JSON-LD */}
      <Script id="ld-article" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <Script id="ld-breadcrumb" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faqLd && (
        <Script id="ld-faq" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}
      {!!relatedProductsFull.length && (
        <Script id="ld-related-products" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(relatedProductsLd) }} />
      )}
      {!!relatedPostsFull.length && (
        <Script id="ld-related-posts" type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(relatedPostsLd) }} />
      )}

      {/* HERO */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("es-CL")}
          </time>
          <span className="select-none">•</span>
          <span>{readMins} min de lectura</span>
          {post.category && (
            <>
              <span className="select-none">•</span>
              <span className="rounded-full border border-zinc-700/80 px-2 py-0.5 text-[11px] uppercase tracking-wide text-zinc-300">
                {post.category}
              </span>
            </>
          )}
        </div>

        <h1 className="mt-3 text-3xl/tight md:text-4xl/tight font-extrabold tracking-[-0.015em] text-zinc-50">
          {post.title}
        </h1>

        {!!post.summary && (
          <p className="mt-3 text-zinc-300/90 max-w-3xl">
            {post.summary}
          </p>
        )}

        {!!post.tags?.length && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="text-xs text-zinc-300/90 border border-zinc-700 rounded-full px-2 py-0.5">#{t}</span>
            ))}
          </div>
        )}

        {post.cover && (
          <div className="relative mt-6 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/40">
            <Image
              src={post.cover}
              alt={post.title}
              width={1600}
              height={900}
              priority
              className="h-auto w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
          </div>
        )}
      </header>

      {/* CONTENIDO */}
    <div
  className="prose prose-saint prose-invert md:prose-lg max-w-none
             leading-relaxed
             prose-headings:scroll-mt-28
             prose-a:text-[var(--brand,#C0FF03)] hover:prose-a:text-lime-300
             prose-p:my-4 prose-li:my-2 prose-ul:my-4 prose-ol:my-4
             prose-code:break-words
             prose-img:rounded-xl prose-img:border prose-img:border-zinc-800
             prose-hr:my-10
             prose-pre:max-w-full prose-pre:overflow-x-auto
             prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800"
>
  {MDXContent}
</div>


      {/* RELATED POSTS */}
      {!!relatedPostsFull.length && (
        <section className="mt-14">
          <h2 className="text-xl font-semibold mb-4">Artículos relacionados</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {relatedPostsFull.map((rp) => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}`}
                className="group border border-zinc-800 rounded-xl overflow-hidden hover:border-[var(--brand,#C0FF03)] transition-colors"
              >
                {rp.cover ? (
                  <div className="relative h-32 w-full overflow-hidden">
                    <Image
                      src={rp.cover}
                      alt={rp.title}
                      fill
                      sizes="(min-width:768px) 360px, 100vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform"
                    />
                  </div>
                ) : (
                  <div className="h-32 w-full bg-zinc-900" />
                )}
                <div className="p-4">
                  <p className="text-sm font-medium line-clamp-2 group-hover:text-[var(--brand,#C0FF03)]">
                    {rp.title}
                  </p>
                  {!!rp.tags?.length && (
                    <p className="text-xs text-zinc-400 mt-1">
                      {rp.tags.slice(0, 3).map((t) => `#${t}`).join(" · ")}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

 {/*
  {!!relatedProductsFull.length && (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">
        También te puede interesar
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {relatedProductsFull.map((p) => (
          <Link
            key={p.slug}
            href={`/products/${p.slug}`}
            className="group rounded-2xl border border-zinc-800 bg-gradient-to-b from-base-cardTop to-base-cardBottom hover:border-[var(--brand,#C0FF03)] transition-colors shadow-card overflow-hidden"
          >
            <div className="relative h-28 md:h-32 w-full flex items-center justify-center bg-zinc-900/40">
              <Image
                src={firstImage(p)}
                alt={p.name}
                fill
                className="object-contain p-3"
                sizes="(min-width:1280px) 220px, (min-width:1024px) 210px, (min-width:768px) 33vw, 80vw"
              />
            </div>

            <div className="p-4">
              <p className="text-[11px] text-zinc-500">
                {p.brand || site.name}
              </p>
              <p className="mt-1 text-sm font-semibold leading-snug line-clamp-2 group-hover:text-[var(--brand,#C0FF03)]">
                {p.name}
              </p>
              <p className="mt-2 text-sm font-extrabold tracking-tight">
                ${Number(p.priceRub ?? 0).toLocaleString("es-CL")}
                <span className="font-semibold text-zinc-400"> CLP</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )}
*/}



      {/* SHARE */}
      <div className="mt-12 flex flex-wrap gap-2 text-sm">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${site.url}/blog/${post.slug}`)}&text=${encodeURIComponent(post.title)}`}
          target="_blank" rel="noopener noreferrer"
          className="rounded border border-zinc-800 px-3 py-1 hover:border-[var(--brand,#C0FF03)]"
        >
          Compartir en X
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${site.url}/blog/${post.slug}`)}`}
          target="_blank" rel="noopener noreferrer"
          className="rounded border border-zinc-800 px-3 py-1 hover:border-[var(--brand,#C0FF03)]"
        >
          Compartir en Facebook
        </a>
      </div>
    </article>
  )
}
