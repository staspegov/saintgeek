// lib/cart/types.ts

export type Currency = "CLP" | "USD" | "EUR"

export type CartVariant = Record<string, string>

export type CartItem = {
  key: string

  productId?: string
  productSlug?: string
  productName: string
  productUrl?: string
  image?: string

  unitPrice: number
  currency: Currency

  quantity: number
  maxQuantity?: number

  variant?: CartVariant

  // legacy compat fields (read-only usage)
  id?: string
  slug?: string
  name?: string
  title?: string
  price?: number
  priceRub?: number
  qty?: number
}

export type CartState = {
  items: CartItem[]
  currency: Currency
  isOpen: boolean
  hydrated: boolean
}
