// /lib/merchantMapper.ts
// (ajusta la ruta si tu archivo vive en otro lado)

import type { Product } from "@/data/products"
import { isKeyboardProduct } from "@/data/products"

const BASE_URL = "https://saintgeek.cl"

// 🔹 Descuento por transferencia (16%)
const TRANSFER_DISCOUNT = 0.16

function applyTransferDiscount(price: number): number {
  return Math.round(price * (1 - TRANSFER_DISCOUNT))
}

/**
 * Construye un MPN estable según tipo de producto.
 * - Teclados: MODEL-COLOR-SWITCH
 * - Ratones:  MODEL-COLOR-SENSOR
 */
function buildMpn(product: Product): string {
  if (isKeyboardProduct(product)) {
    return `${product.model}-${product.color}-${product.switch}`.toUpperCase()
  }
  return `${product.model}-${product.color}-${product.sensor}`.toUpperCase()
}

/**
 * Ajusta estas rutas a tus páginas reales:
 * - Teclados: /accesorios/teclados/[slug]
 * - Ratones:  /accesorios/ratones/[slug]
 *
 * Si tú usas otra ruta (ej: /products/[slug]), cámbialo acá.
 */
function buildLink(product: Product): string {
  if (product.category === "teclados") {
    return `${BASE_URL}/accesorios/teclados/${product.slug}`
  }
  return `${BASE_URL}/accesorios/ratones/${product.slug}`
}

/**
 * Google Product Category (IDs típicos):
 * - Keyboards: 494
 * - Computer mice: 2878
 *
 * Si prefieres, puedes dejar un único valor para todos.
 */
function buildGoogleCategory(product: Product): string {
  return product.category === "teclados" ? "494" : "2878"
}

/**
 * Opcional: arma un "productType" interno (no es el googleProductCategory).
 * A veces ayuda para reporting/filtros.
 */
function buildProductType(product: Product): string {
  if (isKeyboardProduct(product)) {
    // Ej: "Teclados > 60% > Mecánicos"
    return `Teclados > ${product.size ?? "—"} > ${product.switchType}`
  }
  // Ej: "Ratones > Wireless"
  const conn = product.connectivity?.includes("2.4GHz") ? "Wireless" : "Mouse"
  return `Ratones > ${conn}`
}

export function mapProductToMerchant(product: Product) {
  // --- Imágenes ---
  const images = (product.images ?? [])
    .map((img) => `${BASE_URL}${img.url}`)
    .filter((u): u is string => Boolean(u))

  // --- Precios ---
  const basePrice = product.priceRub
  const transferPrice = applyTransferDiscount(basePrice)

  return {
    // IDs
    offerId: product.slug,

    // Contenido
    title: product.name,
    description: product.description,

    // Landing page (✅ ajustada a tus rutas reales por categoría)
    link: buildLink(product),

    // Imágenes
    imageLink: images[0] ?? `${BASE_URL}/images/placeholder.webp`,
    additionalImageLinks: images.slice(1),

    // Mercado
    contentLanguage: "es",
    targetCountry: "CL",
    channel: "online",

    // Stock
    availability:
      product.status === "in_stock"
        ? "in stock"
        : product.status === "out_of_stock"
        ? "out of stock"
        : "preorder",

    condition: "new",

    // 💰 Precio normal
    price: {
      value: basePrice.toString(),
      currency: "CLP",
    },

    // 🔥 Precio con descuento (transferencia)
    salePrice: {
      value: transferPrice.toString(),
      currency: "CLP",
    },

    // 📅 Vigencia del descuento
    salePriceEffectiveDate:
      "2025-01-01T00:00:00-03:00/2030-12-31T23:59:59-03:00",

    // Marca / Identificadores
    brand: product.brand,
    mpn: buildMpn(product),

    // Si no tienes GTIN/EAN/UPC reales, déjalo así:
    identifierExists: false,

    // Categoría oficial Google
    googleProductCategory: buildGoogleCategory(product),

    // Opcional (pero útil)
    productType: buildProductType(product),
  }
}