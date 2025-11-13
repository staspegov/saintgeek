import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/utils";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import GAProvider from "@/lib/ga-provider";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-62TCFZY6NZ";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  keywords: [
    "teclados mecánicos", "teclado mecánico", "teclados gamer",
    "teclado gamer", "teclados para juegos",
    "60%", "65%", "70%", "75%", "80%", "TKL", "full size",
    "layout en español", "layout latinoamericano", "layout ANSI", "ISO",
    "hot-swap", "RGB", "keycaps PBT", "N-Key Rollover", "anti-ghosting",
    "switches lineales", "switches táctiles", "switches clicky",
    "tienda de teclados", "teclados en Chile", "envío rápido", "garantía"
  ],
  title: {
    default: "Teclados mecánicos gamer 60/70/80% — SaintGeek",
    template: "%s — Teclados mecánicos gamer"
  },
  description:
    "Teclados mecánicos gamer en Chile — SaintGeek: tamaños 60/65/80% y TKL, layout español, RGB y hot-swap. Switches lineales, táctiles o clicky. Envío rápido y garantía local.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: site.url,
    title: "Teclados mecánicos gamer 60/70/80% — SaintGeek",
    description:
      "Explora teclados mecánicos en español: 60/65/70/80% y TKL, RGB, hot-swap, keycaps PBT y más. Especificaciones, reseñas y mejores precios en Chile.",
    siteName: site.name,
    locale: "es_CL",
    images: [{ url: `${site.url}/og.jpg` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teclados mecánicos gamer 60/70/80% — SaintGeek",
    description:
      "Teclados mecánicos en español con RGB, hot-swap y switches lineales/táctiles/clicky. Formatos 60/65/70/80% y TKL. Compra online en Chile.",
    images: [`${site.url}/og.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* ✅ Explicit favicon for Googlebot */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        {/* ✅ Comprehensive favicon set */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon_io/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon_io/android-chrome-512x512.png" />
        <link rel="manifest" href="/favicon_io/site.webmanifest" />
        <meta name="theme-color" content="#0C0D0E" />
      </head>
      <body className="flex flex-col min-h-screen bg-[#0C0D0E] text-[#e9e9ea] ">
        {/* Always at the top */}
        <Topbar />

        {/* Vercel tooling */}
        <SpeedInsights />
        <Analytics />

        {/* Main content expands to fill available height */}
        <main className="flex-1">{children}</main>

        {/* Always at bottom */}
        <Footer />

        {/* ---------- GA4 (gtag.js) ---------- */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { page_path: window.location.pathname });
          `}
        </Script>

        {/* Send page_view on client-side route changes */}
        <GAProvider gaId={GA_ID} />
      </body>
    </html>
  );
}
