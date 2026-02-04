import { NextResponse } from "next/server"
import { getAllPosts } from "@/lib/blog"

export const revalidate = 3600

export async function GET() {
  const posts = getAllPosts()
    .slice(0, 10)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      cover: p.cover ?? null,
    }))

  return NextResponse.json(posts, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
