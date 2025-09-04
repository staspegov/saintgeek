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
    "teclados mecánicos",
    "teclado mecánico",
    "teclado gaming",
    "teclado para juegos",
    "hot-swap",
    "switches lineales",
    "switches táctiles",
    "switches clicky",
    "RGB",
    "N-Key Rollover",
    "anti-ghosting",
    "PBT",
    "keycaps",
    "layout ANSI",
    "layout latinoamericano",
    "60%",
    "65%",
    "TKL",
    "full size",
    "comparativas",
    "vitrina de teclados"
  ],
  title: {
    default: "Teclados mecánicos para gaming — Vitrina SaintGeek",
    template: "%s — Teclados mecánicos para gaming"
  },
  description:
    "Vitrina de teclados mecánicos para gaming (60%, 65%, TKL y full size) con RGB, hot-swap y switches lineales, táctiles y clicky. Guías, comparativas y precios.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: site.url,
    title: "Teclados mecánicos para gaming — Vitrina SaintGeek",
    description:
      "Explora teclados mecánicos para juegos: 60%, 65%, TKL y full size, con RGB, hot-swap y keycaps PBT. Reseñas, especificaciones y mejores precios.",
    siteName: site.name,
    locale: "es_CL",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teclados mecánicos para gaming — Vitrina SaintGeek",
    description:
      "Catálogo de teclados mecánicos: RGB, hot-swap y switches lineales/táctiles/clicky. Encuentra el formato ideal (60%, 65%, TKL, full size).",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
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
