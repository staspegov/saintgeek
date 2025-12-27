import type { Product } from "@/data/products"

const BASE_URL = "https://saintgeek.cl"

// 🔹 Descuento por transferencia (16%)
const TRANSFER_DISCOUNT = 0.16

function applyTransferDiscount(price: number): number {
  return Math.round(price * (1 - TRANSFER_DISCOUNT))
}

export function mapProductToMerchant(product: Product) {
  // --- Imágenes ---
  const images = product.images
    .map((img) => `${BASE_URL}${img.url}`)
    .filter(Boolean)

  // --- Precios ---
  const basePrice = product.priceRub
  const transferPrice = applyTransferDiscount(basePrice)

  return {
    // IDs
    offerId: product.slug,

    // Contenido
    title: product.name,
    description: product.description,

    // Landing page
    link: `${BASE_URL}/products/${product.slug}`,

    // Imágenes
    imageLink: images[0],
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

    // 📅 Vigencia del descuento (larga para que sea “permanente”)
    salePriceEffectiveDate:
      "2025-01-01T00:00:00-03:00/2030-12-31T23:59:59-03:00",

    // Marca / Identificadores
    brand: product.brand,
    mpn: `${product.model}-${product.color}-${product.switch}`.toUpperCase(),
    identifierExists: false,

    // Categoría oficial Google (Keyboards)
    googleProductCategory: "494",
  }
}
