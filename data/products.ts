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
  numpad: "Sí" | "No"               // 👈 agregado
  switch: "Blue" | "Red" | "Brown" | "Silent" // 👈 agregado
  switchType: "Mecánicos" | "De membrana"     // 👈 agregado
  images: {
    id: string
    label: string
    url: string
  }[]
  mercadoLibreUrl: string
}

export const products: Product[] = [
  {
    slug: "ag61-blue-switch",
    name: "AG61 Keyboard Blue Switch",
    brand: "SAINTGEEK",
    subtitle: "SAINTGEEK KEYBOARD",
    status: "in_stock",
    priceRub: 35990,
    monthlyRub: 417,
    model: "AG61",
    color: "black",
    numpad: "No",
    switch: "Blue",
    switchType: "Mecánicos",
    images: [
      { id: "ag61a", label: "Front", url: "/images/templates.png" },
      { id: "ag61b", label: "Angle", url: "/images/blue-keyboard-rgb-1.webp" },
      { id: "ag61c", label: "Keys", url: "/images/blue-switch-1.webp" }
    ],
    mercadoLibreUrl: "https://example.com/mercadolibre/ag61-blue"
  },
  {
    slug: "ag61-blue-switch",
    name: "AG61 Keyboard Blue Switch",
    brand: "SAINTGEEK",
    subtitle: "SAINTGEEK KEYBOARD",
    status: "in_stock",
    priceRub: 35990,
    monthlyRub: 417,
    model: "AG61",
    color: "black",
    numpad: "No",
    switch: "Blue",
    switchType: "Mecánicos",
    images: [
      { id: "ag61a", label: "Front", url: "/images/templates.png" },
      { id: "ag61b", label: "Angle", url: "/images/blue-keyboard-rgb-1.webp" },
      { id: "ag61c", label: "Keys", url: "/images/blue-switch-1.webp" }
    ],
    mercadoLibreUrl: "https://example.com/mercadolibre/ag61-blue"
  },
  {
    slug: "ag61-blue-switch",
    name: "AG61 Keyboard Blue Switch",
    brand: "SAINTGEEK",
    subtitle: "SAINTGEEK KEYBOARD",
    status: "in_stock",
    priceRub: 35990,
    monthlyRub: 417,
    model: "AG61",
    color: "black",
    numpad: "No",
    switch: "Blue",
    switchType: "Mecánicos",
    images: [
      { id: "ag61a", label: "Front", url: "/images/templates.png" },
      { id: "ag61b", label: "Angle", url: "/images/blue-keyboard-rgb-1.webp" },
      { id: "ag61c", label: "Keys", url: "/images/blue-switch-1.webp" }
    ],
    mercadoLibreUrl: "https://example.com/mercadolibre/ag61-blue"
  },
  {
    slug: "ag61-blue-switch",
    name: "AG61 Keyboard Blue Switch",
    brand: "SAINTGEEK",
    subtitle: "SAINTGEEK KEYBOARD",
    status: "in_stock",
    priceRub: 35990,
    monthlyRub: 417,
    model: "AG61",
    color: "black",
    numpad: "No",
    switch: "Blue",
    switchType: "Mecánicos",
    images: [
      { id: "ag61a", label: "Front", url: "/images/templates.png" },
      { id: "ag61b", label: "Angle", url: "/images/blue-keyboard-rgb-1.webp" },
      { id: "ag61c", label: "Keys", url: "/images/blue-switch-1.webp" }
    ],
    mercadoLibreUrl: "https://example.com/mercadolibre/ag61-blue"
  },
  {
    slug: "ag61-blue-switch",
    name: "AG61 Keyboard Blue Switch",
    brand: "SAINTGEEK",
    subtitle: "SAINTGEEK KEYBOARD",
    status: "in_stock",
    priceRub: 35990,
    monthlyRub: 417,
    model: "AG61",
    color: "black",
    numpad: "No",
    switch: "Blue",
    switchType: "Mecánicos",
    images: [
      { id: "ag61a", label: "Front", url: "/images/templates.png" },
      { id: "ag61b", label: "Angle", url: "/images/blue-keyboard-rgb-1.webp" },
      { id: "ag61c", label: "Keys", url: "/images/blue-switch-1.webp" }
    ],
    mercadoLibreUrl: "https://example.com/mercadolibre/ag61-blue"
  },
  {
    slug: "ag61-blue-switch",
    name: "AG61 Keyboard Blue Switch",
    brand: "SAINTGEEK",
    subtitle: "SAINTGEEK KEYBOARD",
    status: "in_stock",
    priceRub: 35990,
    monthlyRub: 417,
    model: "AG61",
    color: "black",
    numpad: "No",
    switch: "Blue",
    switchType: "Mecánicos",
    images: [
      { id: "ag61a", label: "Front", url: "/images/templates.png" },
      { id: "ag61b", label: "Angle", url: "/images/blue-keyboard-rgb-1.webp" },
      { id: "ag61c", label: "Keys", url: "/images/blue-switch-1.webp" }
    ],
    mercadoLibreUrl: "https://example.com/mercadolibre/ag61-blue"
  },
  {
    slug: "ag61-blue-switch",
    name: "AG61 Keyboard Blue Switch",
    brand: "SAINTGEEK",
    subtitle: "SAINTGEEK KEYBOARD",
    status: "in_stock",
    priceRub: 35990,
    monthlyRub: 417,
    model: "AG61",
    color: "black",
    numpad: "No",
    switch: "Blue",
    switchType: "Mecánicos",
    images: [
      { id: "ag61a", label: "Front", url: "/images/templates.png" },
      { id: "ag61b", label: "Angle", url: "/images/blue-keyboard-rgb-1.webp" },
      { id: "ag61c", label: "Keys", url: "/images/blue-switch-1.webp" }
    ],
    mercadoLibreUrl: "https://example.com/mercadolibre/ag61-blue"
  },
  {
    slug: "ag61-blue-switch",
    name: "AG61 Keyboard Blue Switch",
    brand: "SAINTGEEK",
    subtitle: "SAINTGEEK KEYBOARD",
    status: "in_stock",
    priceRub: 35990,
    monthlyRub: 417,
    model: "AG61",
    color: "black",
    numpad: "No",
    switch: "Blue",
    switchType: "Mecánicos",
    images: [
      { id: "ag61a", label: "Front", url: "/images/templates.png" },
      { id: "ag61b", label: "Angle", url: "/images/blue-keyboard-rgb-1.webp" },
      { id: "ag61c", label: "Keys", url: "/images/blue-switch-1.webp" }
    ],
    mercadoLibreUrl: "https://example.com/mercadolibre/ag61-blue"
  },
  {
    slug: "tk68-red-switch",
    name: "TK68 Keyboard Red Switch",
    brand: "Redragon",
    subtitle: "Gaming Keyboard",
    status: "in_stock",
    priceRub: 42990,
    monthlyRub: 500,
    model: "TK68",
    color: "white",
    numpad: "Sí",
    switch: "Red",
    switchType: "Mecánicos",
    images: [
      { id: "tk68a", label: "Front", url: "/images/templates.png" },
      { id: "tk68b", label: "Side", url: "/images/blue-keyboard-rgb-1.webp" },
      { id: "tk68c", label: "Switches", url: "/images/blue-switch-1.webp" }
    ],
    mercadoLibreUrl: "https://example.com/mercadolibre/tk68-red"
  },
  {
    slug: "tk61-brown-switch",
    name: "TK61 Keyboard Brown Switch",
    brand: "HyperX",
    subtitle: "HyperX Alloy Origins",
    status: "in_stock",
    priceRub: 49990,
    monthlyRub: 600,
    model: "TK61",
    color: "black",
    numpad: "No",
    switch: "Brown",
    switchType: "Mecánicos",
    images: [
      { id: "tk61a", label: "Front", url: "/images/templates.png" },
      { id: "tk61b", label: "Close", url: "/images/blue-keyboard-rgb-1.webp" },
      { id: "tk61c", label: "Switches", url: "/images/blue-switch-1.webp" }
    ],
    mercadoLibreUrl: "https://example.com/mercadolibre/tk61-brown"
  },
  {
    slug: "ag61-silent-switch",
    name: "AG61 Keyboard Silent Switch",
    brand: "Logitech",
    subtitle: "Logitech Pro X",
    status: "pre_order",
    priceRub: 55990,
    monthlyRub: 670,
    model: "AG61",
    color: "white",
    numpad: "No",
    switch: "Silent",
    switchType: "Mecánicos",
    images: [
      { id: "ag61s1", label: "Front", url: "/images/templates.png" },
      { id: "ag61s2", label: "Profile", url: "/images/blue-keyboard-rgb-1.webp" }
    ],
    mercadoLibreUrl: "https://example.com/mercadolibre/ag61-silent"
  },
  {
    slug: "tk68-mechanical",
    name: "TK68 Keyboard Mechanical",
    brand: "Razer",
    subtitle: "Razer Huntsman Mini",
    status: "out_of_stock",
    priceRub: 69990,
    monthlyRub: 840,
    model: "TK68",
    color: "green",
    numpad: "Sí",
    switch: "Red",
    switchType: "Mecánicos",
    images: [
      { id: "tk68r1", label: "Front", url: "/images/templates.png" },
      { id: "tk68r2", label: "Side", url: "/images/blue-keyboard-rgb-1.webp" }
    ],
    mercadoLibreUrl: "https://example.com/mercadolibre/tk68-razer"
  }
]
