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
  slug: "ag61-azul-rgb",
  name: "AG61 Azul Claro RGB Azul Switch",
  brand: "Zifriend",
  subtitle: "Teclado mecánico 60% RGB, Hot-Swap",
  status: "in_stock",
  priceRub: 31980,
  monthlyRub: 4580,
  model: "AG61",
  color: "Azul",
  colors: ["Negro", "Azul"],
  numpad: "No",
  switch: "Blue",
  switchType: "Mecánicos",
  description:
    "Teclado mecánico 60% (61 teclas) con switches azules clicky (~50 g), hot-swap 3/5-pin, N-key rollover y anti-ghosting. Montaje con junta (gasket) con espuma de doble capa para menor ruido y mejor sensación; estabilizadores lubricados y calibrados en teclas grandes. Keycaps ABS de doble inyección resistentes al brillo. Retroiluminación RGB tipo arcoíris con 6 efectos dinámicos. Cable USB-C desmontable de 1,5 m. Carcasa ABS. Ideal para gaming y escritura.",
  keys: 61,
  switchPrice: 5500,
  actuationForce: "50 g",
  lighting: "RGB",
  dimensions: "293 × 103 × 39 mm",
  ancho: "293 mm",
  alto: "39 mm",
  largo: "103 mm",
  weight: "800 g",
  images: [
        { id: "ag61-azul",   label: "Azul",   url: "/images/tk61/blue-keycaps.png" },
        { id: "ag61-negro",  label: "Negro",  url: "/images/tk61/black-keycaps.png" },
        { id: "",  label: "",  url: "/images/tk61/Untitled-2.png" },
        { id: "",  label: "",  url: "/images/blue-switch-1.webp" },
   { id: "",  label: "",  url: "/images/tk61/Untitled-2.png" },
        { id: "",  label: "",  url: "/images/blue-switch-1.webp" },
        
  ],
  mercadoLibreUrl:
    "https://articulo.mercadolibre.cl/MLC-3074094542-teclado-mecanico-60-ag61-azulclaro-espanol-gamer-rgbswitch-_JM"
}
,
 {
  slug: "ag61-black-rgb",
  name: "AG61 Negro RGB Azul Switch",
  brand: "Zifriend",
  subtitle: "Teclado mecánico 60% RGB, Hot-Swap",
  status: "in_stock",
  priceRub: 35990,
  monthlyRub: 4580,
  model: "AG61",
  color: "Negro",
  colors: ["Negro", "Azul"],
  numpad: "No",
  switch: "Blue",
  switchType: "Mecánicos",
  description:
    "Teclado mecánico 60% (61 teclas) con switches azules clicky (~50 g), hot-swap 3/5-pin, N-key rollover y anti-ghosting. Montaje con junta (gasket) con espuma de doble capa para menor ruido y mejor sensación; estabilizadores lubricados y calibrados en teclas grandes. Keycaps ABS de doble inyección resistentes al brillo. Retroiluminación RGB tipo arcoíris con 6 efectos dinámicos. Cable USB-C desmontable de 1,5 m. Carcasa ABS. Ideal para gaming y escritura.",
  keys: 61,
  switchPrice: 5500,
  actuationForce: "50 g",
  lighting: "RGB",
  dimensions: "293 × 103 × 39 mm",
  ancho: "293 mm",
  alto: "39 mm",
  largo: "103 mm",
  weight: "800 g",
  images: [
        { id: "ag61-negro",  label: "Negro",  url: "/images/tk61/black-keycaps.png" },
        { id: "ag61-azul",   label: "Azul",   url: "/images/tk61/blue-keycaps.png" },
         { id: "ag61-azul",   label: "Azul",   url: "/images/tk61/blue-keycaps-1.png" },
        { id: "",  label: "",  url: "/images/tk61/Untitled-2.png" },
        { id: "",  label: "",  url: "/images/blue-switch-1.webp" },
        
   
  ],
  mercadoLibreUrl:
    "https://articulo.mercadolibre.cl/MLC-1679399583-teclado-mecanico-60-ag61-negro-espanol-gamer-rgbblueswitch-_JM"
}
  
]
