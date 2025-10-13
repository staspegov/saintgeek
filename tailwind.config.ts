import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",      // <-- necessary to style your blog content
  ],
  theme: {
    extend: {
      colors: {
        base: {
          bg: "#0e0e0f",
          cardTop: "#141416",
          cardBottom: "#0f0f10",
          border: "#1a1a1c",
          text: "#e9e9ea",
          sub: "#b6b6b8",
          accent: "#89ff00",
        },
        // handy alias used in components/classes
        brand: { DEFAULT: "#89ff00" },
      },
      boxShadow: {
        card: "0 10px 28px rgba(0,0,0,.45)",
        cta: "0 8px 24px rgba(137,255,0,.25)",
      },
      borderRadius: { xl2: "18px" },
     typography: ({ theme }: { theme: (path: string) => any }) => ({
        invert: {
          css: {
            "--tw-prose-body": theme("colors.base.sub"),
            "--tw-prose-headings": theme("colors.base.text"),
            "--tw-prose-links": theme("colors.brand.DEFAULT"),
            "--tw-prose-bold": theme("colors.base.text"),
            "--tw-prose-counters": theme("colors.zinc.400"),
            "--tw-prose-bullets": theme("colors.zinc.500"),
            "--tw-prose-hr": theme("colors.base.border"),
            "--tw-prose-quotes": theme("colors.zinc.200"),
            "--tw-prose-code": theme("colors.zinc.200"),
            "--tw-prose-th-borders": theme("colors.base.border"),
            "--tw-prose-td-borders": theme("colors.zinc.800"),
            a: { textDecoration: "none", borderBottom: `1px dotted ${theme("colors.brand.DEFAULT")}` },
            "a:hover": { color: theme("colors.lime.300"), borderBottomStyle: "solid" },
            "h2,h3": { scrollMarginTop: "7rem", fontWeight: "700" },
            code: { background: theme("colors.zinc.900"), padding: "0.15rem 0.35rem", borderRadius: "0.375rem" },
            pre: { background: theme("colors.zinc.950"), border: `1px solid ${theme("colors.base.border")}`, padding: "1rem", borderRadius: "0.75rem" },
            table: { width: "100%" },
            "thead th": { background: theme("colors.zinc.900") },
            "tbody tr": { borderBottom: `1px solid ${theme("colors.base.border")}` },
            "td,th": { padding: "0.6rem 0.75rem" },
            img: { borderRadius: "0.75rem", border: `1px solid ${theme("colors.base.border")}` },
            blockquote: { borderLeftColor: theme("colors.brand.DEFAULT") },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
}

export default config
