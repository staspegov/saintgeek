// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    outputFileTracingIncludes: {
      "app/sitemap.xml/route.ts": ["./content/blog/**/*"],
      "app/blog/[slug]/page.tsx": ["./content/blog/**/*"],
    },
  },
}
export default nextConfig
