import type { Product } from "@/data/products"

const BASE_URL = "https://saintgeek.cl"

export function mapProductToMerchant(product: Product) {
  const images = product.images
    .map((img) => `${BASE_URL}${img.url}`)
    .filter(Boolean)

  return {
    offerId: product.slug,

    title: product.name,
    description: product.description,

    link: `${BASE_URL}/products/${product.slug}`,

    imageLink: images[0],
    additionalImageLinks: images.slice(1),

    contentLanguage: "es",
    targetCountry: "CL",
    channel: "online",

    availability:
      product.status === "in_stock"
        ? "in stock"
        : product.status === "out_of_stock"
        ? "out of stock"
        : "preorder",

    condition: "new",

    price: {
      value: product.priceRub.toString(),
      currency: "CLP",
    },

    brand: product.brand,
    mpn: `${product.model}-${product.color}-${product.switch}`.toUpperCase(),
    identifierExists: false,

    // ✅ Teclados
    googleProductCategory: "494",
  }
}
