// Definición del tipo Product
export type Product = {
  slug: string
  name: string
  brand: string
  subtitle: string
  status: "in_stock" | "out_of_stock" | "pre_order"
  priceRub: number
  monthlyRub: number
  model: "AG61" | "TK68" | "TK61-1" | "TK61-2"
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
  slug: "tk61-azul-red-switch",
  name: "TK61 Azul Red Switch",
  brand: "Zifriend",
  subtitle: "Teclado mecánico 60% RGB, Hot-Swap",
  status: "in_stock",
  priceRub: 35990,
  monthlyRub: 4580,
  model: "TK61-1",
  color: "Negro",
  colors: ["Negro", "Blanco", "Azul"],
  numpad: "No",
  switch: "Red",
  switchType: "Mecánicos",
  description:
    "Teclado mecánico 60% (61 teclas) con switches rojos lineales (45 g), hot-swap, N-key rollover y anti-ghosting. Conexión USB 2.0 por cable desmontable de 1,6 m; keycaps ABS de doble inyección; retroiluminación RGB con software; resistente a derrames. Ideal para juegos y escritura. Distribución US.",
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
    { id: "tk61-azul",  label: "Azul",  url: "/images/tk61-azul.png" },
    { id: "tk61-negro",  label: "Negro",  url: "/images/tk61-black.png" },
    { id: "tk61-blanco", label: "Blanco", url: "/images/tk61-white.png" }
  ],
  mercadoLibreUrl: "https://example.com/mercadolibre/tk61-red"
},
 {
  slug: "tk61-negro-red-switch",
  name: "TK61 Negro Red Switch",
  brand: "Zifriend",
  subtitle: "Teclado mecánico 60% RGB, Hot-Swap",
  status: "in_stock",
  priceRub: 35990,
  monthlyRub: 4580,
  model: "TK61-2",
  color: "Blanco",
  colors: ["Negro", "Blanco", "Rojo"],
  numpad: "No",
  switch: "Red",
  switchType: "Mecánicos",
  description:
    "Teclado mecánico 60% (61 teclas) con switches rojos lineales (45 g), hot-swap, N-key rollover y anti-ghosting. Conexión USB 2.0 por cable desmontable de 1,6 m; keycaps ABS de doble inyección; retroiluminación RGB con software; resistente a derrames. Ideal para juegos y escritura. Distribución US.",
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
    
    { id: "tk61-negro",  label: "Rojo",  url: "/images/tk61-black.png" },
    { id: "tk61-negro",  label: "Negro",  url: "/images/tk61-black.png" },
    { id: "tk61-blanco", label: "Blanco", url: "/images/tk61-white.png" }
  ],
  mercadoLibreUrl: "https://example.com/mercadolibre/tk61-red"
},
  
]
