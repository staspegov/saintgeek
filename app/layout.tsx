import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/utils";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Игровые клавиатуры — Витрина",
    template: "%s — Игровые клавиатуры"
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: site.url,
    title: "Игровые клавиатуры — Витрина",
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Игровые клавиатуры — Витрина",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
     <body
  className="flex flex-col min-h-screen text-[#e9e9ea]"
  style={{
    background: `
      radial-gradient(circle at top right, rgba(141, 215, 223, 0), transparent 40%),
      linear-gradient(180deg, rgb(14, 14, 15) 0%, rgb(10, 10, 11) 100%)
    `
  }}
>

        {/* Always at the top */}
        <Topbar />

        {/* Main content expands to fill available height */}
        <main className="flex-1">{children}</main>

        {/* Always at bottom */}
        <Footer />
      </body>
    </html>
  );
}
