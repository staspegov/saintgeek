// lib/utils.ts
export function clsx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const DEFAULT_URL = "https://saintgeek.cl"; // canónico (sin www)
export const site = {
  name: "Teclados gaming",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_URL).replace(/\/+$/,''),
  description:
    "Los teclados gaming son periféricos especiales para quienes disfrutan de los videojuegos. Ofrecen un diseño atractivo, comodidad y funciones adicionales.",
  locale: "es-CL",
};
