// Definición del tipo Product
export type Product = {
  slug: string
  name: string
  brand: string
  subtitle: string
  status: "in_stock" | "out_of_stock" | "pre_order"
  priceRub: number
  monthlyRub: number
  model: "AG61" | "TK68" | "TK61" | "AG51"
  color: string                 // color principal
  colors: string[]              // lista de colores disponibles
  numpad: "Sí" | "No"
  switch: "Blue" | "Red" | "Brown" | "Silent"
  switchType: "Mecánicos" | "De membrana"
  description: string
  keys: number
  switchPrice: number
  actuationForce: string
  lighting: string
  dimensions: string
  ancho: string
  alto: string
  largo: string
  weight: string
  images: {
    id: string
    label: string
    url: string
  }[]
  mercadoLibreUrl: string
}

// Lista de productos
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
    color: "Negro",
    colors: ["Negro", "Blanco", "Rojo", "Azul"],
    numpad: "No",
    switch: "Blue",
    switchType: "Mecánicos",
    description:
      "El teclado mecánico AG61 ofrece un diseño compacto del 60%, ideal para gaming y escritura. Equipado con switches azules que proporcionan un clic táctil y sonoro, retroiluminación RGB personalizable y construcción robusta.",
    keys: 61,
    switchPrice: 5000,
    actuationForce: "50 g",
    lighting: "RGB",
    dimensions: "292 × 102 × 38 mm",
    ancho: "292 mm",
    alto: "38 mm",
    largo: "102 mm",
    weight: "650 g",
    images: [
      { id: "ag61-negro", label: "Negro", url: "/images/blue-keyboard-3.png" },
      { id: "ag61-blanco", label: "Blanco", url: "/images/blue-keyboard-rgb-1.webp" },
      { id: "ag61-rojo", label: "Rojo", url: "/images/hyperpc-keyboard-tkl-color-green-and-grey.jpg" },
      { id: "ag61-azul", label: "Azul", url: "/images/templates.png" }
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
    model: "AG51",
    color: "Blanco",
    colors: ["Blanco", "Negro", "Azul"],
    numpad: "Sí",
    switch: "Red",
    switchType: "Mecánicos",
    description:
      "El TK68 combina versatilidad y rendimiento. Su diseño compacto del 65% incluye teclas de dirección y extras, switches rojos lineales silenciosos y retroiluminación RGB.",
    keys: 68,
    switchPrice: 6000,
    actuationForce: "45 g",
    lighting: "RGB",
    dimensions: "320 × 120 × 40 mm",
    ancho: "320 mm",
    alto: "40 mm",
    largo: "120 mm",
    weight: "720 g",
    images: [
      { id: "tk68-blanco", label: "Blanco", url: "/images/tk68-white.png" },
      { id: "tk68-negro", label: "Negro", url: "/images/tk68-black.png" },
      { id: "tk68-azul", label: "Azul", url: "/images/tk68-blue.png" }
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
    color: "Negro",
    colors: ["Negro", "Gris"],
    numpad: "No",
    switch: "Brown",
    switchType: "Mecánicos",
    description:
      "El TK61 de HyperX es un teclado compacto con switches marrones táctiles, perfecto para quienes quieren un equilibrio entre gaming y escritura. Incluye iluminación RGB y software de personalización.",
    keys: 61,
    switchPrice: 5500,
    actuationForce: "45 g",
    lighting: "RGB",
    dimensions: "293 × 103 × 39 mm",
    ancho: "293 mm",
    alto: "39 mm",
    largo: "103 mm",
    weight: "700 g",
    images: [
      { id: "tk61-negro", label: "Negro", url: "/images/tk61-black.png" },
      { id: "tk61-gris", label: "Gris", url: "/images/tk61-gray.png" }
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
    color: "Blanco",
    colors: ["Blanco", "Negro", "Verde"],
    numpad: "No",
    switch: "Silent",
    switchType: "Mecánicos",
    description:
      "El AG61 Silent Switch está diseñado para quienes prefieren un entorno silencioso. Equipado con switches silenciosos y formato 60%, mantiene la calidad de escritura y juego con retroiluminación RGB discreta.",
    keys: 61,
    switchPrice: 6500,
    actuationForce: "45 g",
    lighting: "RGB",
    dimensions: "292 × 102 × 38 mm",
    ancho: "292 mm",
    alto: "38 mm",
    largo: "102 mm",
    weight: "640 g",
    images: [
      { id: "ag61-blanco", label: "Blanco", url: "/images/ag61-white.png" },
      { id: "ag61-negro", label: "Negro", url: "/images/ag61-black.png" },
      { id: "ag61-verde", label: "Verde", url: "/images/ag61-green.png" }
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
    color: "Verde",
    colors: ["Verde", "Negro", "Morado"],
    numpad: "Sí",
    switch: "Red",
    switchType: "Mecánicos",
    description:
      "El TK68 Mechanical de Razer ofrece switches ópticos rojos ultrarrápidos, con durabilidad superior y formato compacto. Incluye retroiluminación RGB Chroma y software de personalización avanzada.",
    keys: 68,
    switchPrice: 8000,
    actuationForce: "40 g",
    lighting: "RGB Chroma",
    dimensions: "320 × 120 × 40 mm",
    ancho: "320 mm",
    alto: "40 mm",
    largo: "120 mm",
    weight: "730 g",
    images: [
      { id: "tk68-verde", label: "Verde", url: "/images/tk68-green.png" },
      { id: "tk68-negro", label: "Negro", url: "/images/tk68-black.png" },
      { id: "tk68-morado", label: "Morado", url: "/images/tk68-purple.png" }
    ],
    mercadoLibreUrl: "https://example.com/mercadolibre/tk68-razer"
  }
]
