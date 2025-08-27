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
      <body className="flex flex-col min-h-screen bg-[#0e0e0f] text-[#e9e9ea] ">
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
