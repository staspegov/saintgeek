// app/sitemap.xml/route.ts
import { NextResponse } from "next/server";
import { site } from "@/lib/utils";
import { getAllPosts } from "@/lib/blog";
import { products } from "@/data/products";
import { slugifyTag } from "@/lib/tags";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

type SitemapEntry = {
  loc: string;
  changefreq: ChangeFreq;
  priority: string; // e.g. "0.85"
  lastmod?: string; // YYYY-MM-DD
};

// ✅ RUTAS REALES (las que pediste)
const KEYBOARD_INDEX = "/accesorios/teclados";
const MOUSE_INDEX = "/accesorios/ratones";

function normalizeBaseUrl(url: string) {
  return url.replace(/\/+$/, "");
}

function toISODate(input?: string) {
  if (!input) return undefined;
  try {
    return new Date(input).toISOString().slice(0, 10);
  } catch {
    return input.slice(0, 10);
  }
}

function escapeXml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function makeUrl(base: string, path: string) {
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}

function uniq<T>(arr: T[]) {
  return [...new Set(arr)];
}

/**
 * ✅ Detecta si el producto es teclado o ratón (tolerante y robusto)
 * Orden:
 * 1) href/path/url (si ya viene /accesorios/teclados/... o /accesorios/ratones/...)
 * 2) category/type/kind/section/collection (con includes para plural/variaciones)
 * 3) fallback por slug
 */
function getProductSection(p: any): "keyboard" | "mouse" | null {
  const href = String(p?.href ?? p?.path ?? p?.url ?? "");
  if (href === KEYBOARD_INDEX || href.startsWith(KEYBOARD_INDEX + "/")) return "keyboard";
  if (href === MOUSE_INDEX || href.startsWith(MOUSE_INDEX + "/")) return "mouse";

  const raw = String(
    p?.section ?? p?.kind ?? p?.type ?? p?.category ?? p?.collection ?? ""
  ).toLowerCase();

  if (raw.includes("teclad") || raw.includes("keyboard")) return "keyboard";
  if (raw.includes("raton") || raw.includes("ratón") || raw.includes("mouse") || raw.includes("mice"))
    return "mouse";

  const slug = String(p?.slug ?? "").toLowerCase();
  if (slug.includes("teclad") || slug.includes("keyboard")) return "keyboard";
  if (slug.includes("raton") || slug.includes("ratón") || slug.includes("mouse")) return "mouse";

  return null;
}

/**
 * ✅ Ruta pública real del producto:
 * - si viene href/path/url absoluto ("/..."), úsalo
 * - si no, fallback a "/products/[slug]" (si tu sitio lo tiene)
 */
function getProductPublicPath(p: any): string | null {
  const direct = p?.href ?? p?.path ?? p?.url;
  if (typeof direct === "string" && direct.startsWith("/")) return direct;

  if (p?.slug) return `/products/${p.slug}`;
  return null;
}

/**
 * ✅ Extrae tags/keywords del producto
 * (si tus teclados tienen tags en otro campo, agrégalo acá)
 */
function extractRawTags(p: any): string[] {
  if (Array.isArray(p?.tags)) return p.tags.map(String).filter(Boolean);
  if (Array.isArray(p?.keywords)) return p.keywords.map(String).filter(Boolean);
  return [];
}

/**
 * ✅ Construye slugs de keywords separados por sección
 */
function buildKeywordSlugsBySection() {
  const keyboard = new Set<string>();
  const mouse = new Set<string>();

  for (const p of products ?? []) {
    const section = getProductSection(p);
    if (!section) continue;

    const rawTags = extractRawTags(p);
    for (const t of rawTags) {
      const slug = slugifyTag(String(t));
      if (!slug) continue;

      if (section === "keyboard") keyboard.add(slug);
      if (section === "mouse") mouse.add(slug);
    }
  }

  return { keyboard: [...keyboard], mouse: [...mouse] };
}

export async function GET() {
  const base = normalizeBaseUrl(
    site.url ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://saintgeek.cl"
  );

  // ---- Static pages (solo las que EXISTEN) ----
  const staticUrls: SitemapEntry[] = [
    { loc: makeUrl(base, "/"), changefreq: "weekly", priority: "1.0" },
    { loc: makeUrl(base, "/blog"), changefreq: "daily", priority: "0.9" },
    { loc: makeUrl(base, KEYBOARD_INDEX), changefreq: "weekly", priority: "0.95" },
    { loc: makeUrl(base, MOUSE_INDEX), changefreq: "weekly", priority: "0.95" },
  ];

  // ---- Blog posts ----
  const posts = getAllPosts();
  const postUrls: SitemapEntry[] = (posts ?? [])
    .filter((p: any) => p?.slug)
    .map((p: any) => ({
      loc: makeUrl(base, `/blog/${p.slug}`),
      lastmod: toISODate(p.updatedAt ?? p.publishedAt),
      changefreq: "weekly",
      priority: "0.7",
    }));

  // ---- Products ----
  const productUrls: SitemapEntry[] = (products ?? [])
    .map((p: any) => getProductPublicPath(p))
    .filter(Boolean)
    .map((path) => ({
      loc: makeUrl(base, String(path)),
      changefreq: "weekly",
      priority: "0.8",
    }));

  // ---- Accessories keyword pages ----
  const { keyboard: keyboardKeywords, mouse: mouseKeywords } = buildKeywordSlugsBySection();

  const keyboardKeywordUrls: SitemapEntry[] = keyboardKeywords.map((kw) => ({
    loc: makeUrl(base, `${KEYBOARD_INDEX}/${kw}`),
    changefreq: "weekly",
    priority: "0.85",
  }));

  const mouseKeywordUrls: SitemapEntry[] = mouseKeywords.map((kw) => ({
    loc: makeUrl(base, `${MOUSE_INDEX}/${kw}`),
    changefreq: "weekly",
    priority: "0.85",
  }));

  const urls: SitemapEntry[] = uniq([
    ...staticUrls,
    ...postUrls,
    ...productUrls,
    ...keyboardKeywordUrls,
    ...mouseKeywordUrls,
  ]);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => {
    const loc = escapeXml(u.loc);
    const lastmod = u.lastmod ? `<lastmod>${escapeXml(u.lastmod)}</lastmod>` : "";
    return `<url>
  <loc>${loc}</loc>
  ${lastmod}
  <changefreq>${u.changefreq}</changefreq>
  <priority>${u.priority}</priority>
</url>`;
  })
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      // mientras pruebas: evita cache viejo
      "cache-control": "no-store, max-age=0",
    },
  });
}
