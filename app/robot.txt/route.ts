import { NextResponse } from "next/server"
import { site } from "@/lib/utils"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  const base = (site.url ?? process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/+$/, "")
  return new NextResponse(
`User-agent: *
Allow: /

Sitemap: ${base}/server-sitemap.xml
`, { headers: { "content-type": "text/plain" } }
  )
}