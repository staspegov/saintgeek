import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
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
        }
      },
      boxShadow: {
        card: "0 10px 28px rgba(0,0,0,.45)",
        cta: "0 8px 24px rgba(137,255,0,.25)",
      },
      borderRadius: {
        'xl2': "18px"
      }
    },
  },
  plugins: [],
}

export default config
