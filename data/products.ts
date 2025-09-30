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
  name: "Teclado mecánico gamer AG61 Azul Claro RGB - Azul Switch",
  brand: "SaintGeek",
  subtitle: "Teclado mecánico gamer 60% RGB, Hot-Swap",
  status: "in_stock",
  priceRub: 32990,
  monthlyRub: 2749,
  model: "AG61",
  color: "Azul",
  colors: ["Negro", "Azul"],
  numpad: "No",
  switch: "Blue",
  switchType: "Mecánicos",
  description:
    "Teclado mecánico gamer 60% (61 teclas) con switches azules clicky (~50 g), hot-swap 3/5-pin, N-key rollover y anti-ghosting. Montaje con junta (gasket) con espuma de doble capa para menor ruido y mejor sensación; estabilizadores lubricados y calibrados en teclas grandes. Keycaps ABS de doble inyección resistentes al brillo. Retroiluminación RGB tipo arcoíris con 6 efectos dinámicos. Cable USB-C desmontable de 1,5 m. Carcasa ABS. Ideal para gaming y escritura.",
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
        { id: "ag61-azul",   label: "Azul",   url: "/images/tk61/blue-keycaps-1.png" },

        { id: "",  label: "",  url: "/images/ag61/blue-keyboard-2.webp" },
        { id: "",  label: "",  url: "/images/ag61/blue-keyboard-3.webp" },
        { id: "",  label: "",  url: "/images/ag61/blue-keyboard-4.webp" },
        { id: "",  label: "",  url: "/images/ag61/blue-keyboard-rgb-1.webp" },
        { id: "",  label: "",  url: "/images/ag61/blue-keycaps-1.webp" },
        
        { id: "",  label: "",  url: "/images/ag61/blue-keyclap-tool-1.webp" },
        { id: "",  label: "",  url: "/images/blue-switch-1.webp" },
        { id: "",  label: "",  url: "/images/blue-switch-2.webp" },
        
        
  ],
  mercadoLibreUrl:
    "https://articulo.mercadolibre.cl/MLC-3074094542-teclado-mecanico-60-ag61-azulclaro-espanol-gamer-rgbswitch-_JM"
}
,
 {
  slug: "ag61-black-rgb",
  name: "Teclado mecánico gamer AG61 Negro RGB - Azul Switch",
  brand: "SaintGeek",
  subtitle: "Teclado mecánico gamer 60% RGB, Hot-Swap",
  status: "in_stock",
  priceRub: 31990,
  monthlyRub: 2665,
  model: "AG61",
  color: "Negro",
  colors: ["Negro", "Azul"],
  numpad: "No",
  switch: "Blue",
  switchType: "Mecánicos",
  description:
    "Teclado mecánico gamer 60% (61 teclas) con switches azules clicky (~50 g), hot-swap 3/5-pin, N-key rollover y anti-ghosting. Montaje con junta (gasket) con espuma de doble capa para menor ruido y mejor sensación; estabilizadores lubricados y calibrados en teclas grandes. Keycaps ABS de doble inyección resistentes al brillo. Retroiluminación RGB tipo arcoíris con 6 efectos dinámicos. Cable USB-C desmontable de 1,5 m. Carcasa ABS. Ideal para gaming y escritura.",
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
        { id: "ag61-black",   label: "Black",   url: "/images/tk61/black-ag61.png" },
        { id: "ag61-black",   label: "",   url: "/images/blue-keycaps-ag61-4.webp" },
        { id: "ag61-black",   label: "",   url: "/images/black-ag61-leyboard-2.webp" },
        { id: "",  label: "",  url: "/images/tk61/Untitled-2.png" },
        { id: "",  label: "",  url: "/images/blue-switch-1.webp" },
        { id: "",  label: "",  url: "/images/blue-switch-2.webp" },
        
   
  ],
  mercadoLibreUrl:
    "https://articulo.mercadolibre.cl/MLC-1679399583-teclado-mecanico-60-ag61-negro-espanol-gamer-rgbblueswitch-_JM"
},

{
  slug: "tk68-blanco-rgb-red",
  name: "Teclado mecánico gamer TK68 Blanco RGB - Red Switch",
  brand: "Zifriend",
  subtitle: "Teclado mecánico gamer 65% (68 teclas) RGB, con cable USB-C",
  status: "in_stock",
  priceRub: 34990,
  monthlyRub: 2916,
  model: "TK68",
  color: "Blanco",
  colors: ["Blanco", "Negro"],
  numpad: "No",
  switch: "Red",
  switchType: "Mecánicos",
  description:
    "Teclado mecánico gamer 65% (68 teclas) con retroiluminación RGB, conexión por cable USB-C (USB 2.0), anti-ghosting y tecla Win-Lock. Layout Español (LatAm) con Ñ impresa. Atajos multimedia por combinación. Carcasa y keycaps en ABS, resistente a derrames. Plug & play. No programable por software.",
  keys: 68,
  switchPrice: 5500,
  actuationForce: "45 g",
  lighting: "RGB",
  dimensions: "400 × 380 × 50 mm",  // tamaño del paquete
  ancho: "400 mm",
  alto: "50 mm",
  largo: "380 mm",
  weight: "800 g",
  images: [
    { id: "tk68-blanco-1", label: "Blanco", url: "/images/tk68/white-1.png" },
    { id: "tk68-blanco-2", label: "Blanco", url: "/images/tk68/white-2.png" },
    { id: "tk68-rgb-1",    label: "RGB",    url: "/images/tk68/rgb-1.png" },
    { id: "tk68-keys-1",   label: "Teclas", url: "/images/tk68/keys-1.png" },
    { id: "red-switch-1",  label: "Red",    url: "/images/switches/red-switch-1.webp" }
  ],
  mercadoLibreUrl:
    "https://articulo.mercadolibre.cl/MLC-3089243272-teclado-gamer-mecanico-70-abs-red-switches-espanol-rgb-_JM?has_official_store=false&highlight=false&searchVariation=184950318186&pdp_filters=seller_id%3A1952815992&headerTopBrand=false#polycard_client=search-nordic&searchVariation=184950318186&search_layout=stack&position=6&type=item&tracking_id=5d7af681-5e2c-4b2c-8b63-73d54ac5dcbb"
},
{
  slug: "tk68-negro-rgb-red",
  name: "Teclado mecánico gamer TK68 Negro RGB - Red Switch",
  brand: "Zifriend",
  subtitle: "Teclado mecánico gamer 65% (68 teclas) RGB, con cable USB-C",
  status: "out_of_stock",
  priceRub: 34990,
  monthlyRub: 2916,
  model: "TK68",
  color: "Negro",
  colors: ["Blanco", "Negro"],
  numpad: "No",
  switch: "Red",
  switchType: "Mecánicos",
  description:
    "Teclado mecánico gamer 65% (68 teclas) con retroiluminación RGB, conexión por cable USB-C (USB 2.0), anti-ghosting y tecla Win-Lock. Layout Español (LatAm) con Ñ impresa. Atajos multimedia por combinación. Carcasa y keycaps en ABS, resistente a derrames. Plug & play. No programable por software.",
  keys: 68,
  switchPrice: 5500,
  actuationForce: "45 g",
  lighting: "RGB",
  dimensions: "400 × 380 × 50 mm",  // tamaño del paquete
  ancho: "400 mm",
  alto: "50 mm",
  largo: "380 mm",
  weight: "800 g",
  images: [
    { id: "tk68-negro-1", label: "Negro", url: "/images/tk68/black-1.png" },
    { id: "tk68-negro-2", label: "Negro", url: "/images/tk68/black-2.png" },
    { id: "tk68-rgb-1",   label: "RGB",   url: "/images/tk68/rgb-1.png" },
    { id: "tk68-keys-1",  label: "Teclas", url: "/images/tk68/keys-1.png" },
    { id: "red-switch-1", label: "Red",   url: "/images/switches/red-switch-1.webp" }
  ],
  mercadoLibreUrl:
    "https://articulo.mercadolibre.cl/MLC-3089243272-teclado-gamer-mecanico-70-abs-red-switches-espanol-rgb-_JM?has_official_store=false&highlight=false&searchVariation=184950318186&pdp_filters=seller_id%3A1952815992&headerTopBrand=false#polycard_client=search-nordic&searchVariation=184950318186&search_layout=stack&position=6&type=item&tracking_id=5d7af681-5e2c-4b2c-8b63-73d54ac5dcbb"
}

  
]
