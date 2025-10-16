import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/utils";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  keywords: [
    // core
    "teclados mecánicos", "teclado mecánico", "teclados gamer",
    "teclado gamer", "teclados para juegos",
    // tamaños / form factor
    "60%", "65%", "70%", "75%", "80%", "TKL", "full size",
    // layout / idioma
    "layout en español", "layout latinoamericano", "layout ANSI", "ISO",
    // features
    "hot-swap", "RGB", "keycaps PBT", "N-Key Rollover", "anti-ghosting",
    "switches lineales", "switches táctiles", "switches clicky",
    // intención de compra / local
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
    // útil para vistas enriquecidas en Google Imágenes
    // y evitar recortes pobres en previas
    // (opcional, puedes quitar si no lo necesitas)
    // 'max-image-preview': 'large'
  }
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* ✅ Explicit favicon for Googlebot */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className="flex flex-col min-h-screen bg-[#0C0D0E] text-[#e9e9ea] ">
      
        {/* Always at the top */}
        <Topbar />
        <SpeedInsights/>
        <Analytics/>
        {/* Main content expands to fill available height */}
        <main className="flex-1">{children}</main>

        {/* Always at bottom */}
        <Footer />
      </body>
    </html>
  );
}
