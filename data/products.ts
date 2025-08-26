export type Product = {
  slug: string
  name: string
  brand: string
  subtitle: string
  status: "in_stock" | "out_of_stock" | "pre_order"
  priceRub: number
  monthlyRub: number
  model: "AG61" | "TK68" | "TK61"
  color: string
  images: {
    id: string
    label: string
    url: string   // 👈 add this
  }[]
  mercadoLibreUrl: string
}


export const products: Product[] = [
{
  slug: "ag61-blue-white-blue-switch",
  name: "ag61 keyboard blue switch",
  brand: "SAINTGEEK",
  subtitle: "SAINTGEEK KEYBOARD",
  status: "in_stock",
  priceRub: 35990,
  monthlyRub: 417,
  model: "TK61",
  color: "black",
  images: [
    { id: "kbd1a", label: "Front", url: "/images/templates.png" },
    { id: "kbd1b", label: "Angle", url: "/images/blue-keyboard-rgb-1.webp" },
    { id: "kbd1c", label: "Keys", url: "/images/blue-switch-1.webp" },
    { id: "kbd1c", label: "Keys", url: "/images/blue-switch-1.webp" },
    
  ],
  mercadoLibreUrl: "https://example.com/mercadolibre/black"
}
,
  {
  slug: "ag61-blue-white-blue-switch",
  name: "ag61 keyboard blue switch",
  brand: "SAINTGEEK",
  subtitle: "SAINTGEEK KEYBOARD",
  status: "in_stock",
  priceRub: 35990,
  monthlyRub: 417,
  model: "TK61",
  color: "black",
  images: [
    { id: "kbd1a", label: "Front", url: "/images/templates.png" },
    { id: "kbd1b", label: "Angle", url: "/images/blue-keyboard-rgb-1.webp" },
    { id: "kbd1c", label: "Keys", url: "/images/blue-switch-1.webp" },
    { id: "kbd1c", label: "Keys", url: "/images/blue-switch-1.webp" },
    
  ],
  mercadoLibreUrl: "https://example.com/mercadolibre/black"
}
,
{
  slug: "ag61-blue-white-blue-switch",
  name: "ag61 keyboard blue switch",
  brand: "SAINTGEEK",
  subtitle: "SAINTGEEK KEYBOARD",
  status: "in_stock",
  priceRub: 35990,
  monthlyRub: 417,
  model: "TK61",
  color: "black",
  images: [
    { id: "kbd1a", label: "Front", url: "/images/templates.png" },
    { id: "kbd1b", label: "Angle", url: "/images/blue-keyboard-rgb-1.webp" },
    { id: "kbd1c", label: "Keys", url: "/images/blue-switch-1.webp" },
    { id: "kbd1c", label: "Keys", url: "/images/blue-switch-1.webp" },
    
  ],
  mercadoLibreUrl: "https://example.com/mercadolibre/black"
}
,
];
