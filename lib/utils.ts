// lib/utils.ts
export function clsx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const DEFAULT_URL = "https://saintgeek.cl"; // canónico (sin www)
export const site = {
  name: "Teclados mecánicos gamer 60/70/80%",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_URL).replace(/\/+$/,''),
  description:
    "Tienda en Chile de teclados mecánicos gamer 60%, 70% y 80%. Layout en español, switches hot-swap, RGB y envío rápido. Compra online con garantía.",
  locale: "es-CL",
};
