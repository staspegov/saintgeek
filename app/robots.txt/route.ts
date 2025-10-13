// app/robots.txt/route.ts
import { NextResponse } from "next/server"
import { site } from "@/lib/utils"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export function GET() {
  const base = (site.url ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://saintgeek.cl").replace(/\/+$/, "")
  return new NextResponse(
`User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "s-maxage=86400" } })
}
