// Definición del tipo Product
export type Product = {
  slug: string
  name: string
  brand: string
  subtitle: string
  status: "in_stock" | "out_of_stock" | "pre_order"
  priceRub: number
  monthlyRub: number
  model: "AG61" | "TK68" | "TK61" | "TK61"
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
  tags: string[]
}

// Lista de productos
export const products: Product[] = [ 
 {
  slug: "ag61-azul-rgb",
  name: "Teclado mecánico gamer AG61 Azul Claro RGB - Azul Switch",
  brand: "SaintGeek",
  subtitle: "Teclado mecánico gamer 60% RGB, Hot-Swap",
  status: "in_stock",
  priceRub: 35284,
  monthlyRub: 2940,
  model: "AG61",
  color: "Azul",
  colors: ["Negro", "Azul"],
  numpad: "No",
  switch: "Blue",
  switchType: "Mecánicos",
  description:
    "Teclado mecánico gamer 60% (61 teclas) con switches azules clicky (~50 g), hot-swap 3/5-pin, N-key rollover y anti-ghosting. Montaje con junta (gasket) con espuma de doble capa para menor ruido y mejor sensación; estabilizadores lubricados y calibrados en teclas grandes. Keycaps ABS de doble inyección resistentes al brillo. Retroiluminación RGB tipo arcoíris con 6 efectos dinámicos. Cable USB-C desmontable de 1,5 m. Carcasa ABS. Ideal para gaming y escritura. Envíos a todo Chile, retiro en Ñuñoa y garantía SaintGeek.",
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
        { id: "",  label: "Teclado mecánico gamer AG61 Azul Claro RGB - Azul Switch",  url: "/images/ag61/blue-keyboard-2.webp" },
        { id: "",  label: "Teclado mecánico gamer AG61 Azul Claro RGB - Azul Switch",  url: "/images/ag61/blue-keyboard-3.webp" },
        { id: "",  label: "Teclado mecánico gamer AG61 Azul Claro RGB - Azul Switch",  url: "/images/ag61/blue-keyboard-4.webp" },
        { id: "",  label: "Teclado mecánico gamer AG61 Azul Claro RGB - Azul Switch",  url: "/images/ag61/blue-keyboard-rgb-1.webp" },
        { id: "",  label: "Teclado mecánico gamer AG61 Azul Claro RGB - Azul Switch",  url: "/images/ag61/blue-keycaps-1.webp" },
        { id: "",  label: "Teclado mecánico gamer AG61 Azul Claro RGB - Azul Switch",  url: "/images/ag61/blue-keyclap-tool-1.webp" },
        { id: "",  label: "Teclado mecánico gamer AG61 Azul Claro RGB - Azul Switch",  url: "/images/blue-switch-1.webp" },
        { id: "",  label: "Teclado mecánico gamer AG61 Azul Claro RGB - Azul Switch",  url: "/images/blue-switch-2.webp" },
  ],
  mercadoLibreUrl:
    "https://articulo.mercadolibre.cl/MLC-3074094542-teclado-mecanico-60-ag61-azulclaro-espanol-gamer-rgbswitch-_JM",
    tags: [
  "mecanico-gamer-60","teclado-gamer-60","60-porciento","61-teclas","compacto","teclado-espanol",
  
  "teclado-mecanico-gamer"
],
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
    "Teclado mecánico gamer 60% (61 teclas) con switches azules clicky (~50 g), hot-swap 3/5-pin, N-key rollover y anti-ghosting. Montaje con junta (gasket) con espuma de doble capa para menor ruido y mejor sensación; estabilizadores lubricados y calibrados en teclas grandes. Keycaps ABS de doble inyección resistentes al brillo. Retroiluminación RGB tipo arcoíris con 6 efectos dinámicos. Cable USB-C desmontable de 1,5 m. Carcasa ABS. Ideal para gaming y escritura. Envíos a todo Chile, retiro en Ñuñoa y garantía SaintGeek.",
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

        { id: "ag61-negro",  label: "Negro",  url: "/images/ag61/ag-61-black-1.png" },
        { id: "ag61-azul",   label: "Azul",   url: "/images/tk61/blue-keycaps.png" },
        { id: "ag61-black",   label: "Black",   url: "/images/ag61/ag-61-black-2.png" },
        { id: "ag61-black",   label: "Teclado mecánico gamer AG61 Negro RGB - Azul Switch",   url: "/images/blue-keycaps-ag61-4.webp" },
        { id: "ag61-black",   label: "Teclado mecánico gamer AG61 Negro RGB - Azul Switch",   url: "/images/black-ag61-leyboard-2.webp" },
        { id: "",  label: "Teclado mecánico gamer AG61 Negro RGB - Azul Switch",  url: "/images/tk61/Untitled-2.png" },
        { id: "",  label: "Teclado mecánico gamer AG61 Negro RGB - Azul Switch",  url: "/images/blue-switch-1.webp" },
        { id: "",  label: "Teclado mecánico gamer AG61 Negro RGB - Azul Switch",  url: "/images/blue-switch-2.webp" },
        
   
  ],
  mercadoLibreUrl:
    "https://articulo.mercadolibre.cl/MLC-1679399583-teclado-mecanico-60-ag61-negro-espanol-gamer-rgbblueswitch-_JM",
    tags: [
  "mecanico-gamer-60","teclado-gamer-60","60-porciento",
  "teclado-mecanico-gamer"
],
},

{
  slug: "tk68-blanco-rgb-red",
  name: "Teclado mecánico gamer TK68 Blanco RGB - Red Switch",
  brand: "Zifriend",
  subtitle: "Teclado mecánico gamer 65% (68 teclas) RGB, con cable USB-C",
  status: "out_of_stock",
  priceRub: 32990,
  monthlyRub: 2749,
  model: "TK68",
  color: "Blanco",
  colors: ["Blanco", "Negro"],
  numpad: "No",
  switch: "Red",
  switchType: "Mecánicos",
  description:
    "Teclado mecánico gamer 65% (68 teclas) con retroiluminación RGB, conexión por cable USB-C (USB 2.0), anti-ghosting y tecla Win-Lock. Layout Español (LatAm) con Ñ impresa. Atajos multimedia por combinación. Carcasa y keycaps en ABS, resistente a derrames. Plug & play. No programable por software. Envíos a todo Chile, retiro en Ñuñoa y garantía SaintGeek.",
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
    { id: "tk68-negro-1", label: "Negro", url: "/images/tk68/black-1.png" },
    

    { id: "tk68-blanco-2", label: "Teclado mecánico gamer TK68 Blanco RGB - Red Switch", url: "/images/tk68/tk68-keyboard-1.webp" },
    { id: "tk68-blanco-2", label: "Teclado mecánico gamer TK68 Blanco RGB - Red Switch", url: "/images/tk68/tk68-keyboard-2.webp" },
    { id: "tk68-blanco-2", label: "Teclado mecánico gamer TK68 Blanco RGB - Red Switch", url: "/images/tk68/tk68-keyboard-usb-1.webp" },
    { id: "tk68-blanco-2", label: "Teclado mecánico gamer TK68 Blanco RGB - Red Switch", url: "/images/tk68/tk68-keyboard-keycap-1.webp" },
    { id: "tk68-blanco-2", label: "Teclado mecánico gamer TK68 Blanco RGB - Red Switch", url: "/images/tk68/tk68-keyboard-rgb-1.webp" },
    { id: "tk68-blanco-2", label: "Teclado mecánico gamer TK68 Blanco RGB - Red Switch", url: "/images/tk68/tk68-keyboard-rgb-2.webp" },
   
    { id: "tk68-blanco-2", label: "Teclado mecánico gamer TK68 Blanco RGB - Red Switch", url: "/images/tk68/tk68-keyboard-switch-1.webp" },
    { id: "tk68-blanco-2", label: "Teclado mecánico gamer TK68 Blanco RGB - Red Switch", url: "/images/tk68/tk68-keyboard-switch-2.webp" },
    { id: "tk68-blanco-2", label: "Teclado mecánico gamer TK68 Blanco RGB - Red Switch", url: "/images/tk68/tk68-keyboard-tool-1.webp" },
    
  ],
  mercadoLibreUrl:
    "https://articulo.mercadolibre.cl/MLC-3089243272-teclado-gamer-mecanico-70-abs-red-switches-espanol-rgb-_JM?has_official_store=false&highlight=false&searchVariation=184950318186&pdp_filters=seller_id%3A1952815992&headerTopBrand=false#polycard_client=search-nordic&searchVariation=184950318186&search_layout=stack&position=6&type=item&tracking_id=5d7af681-5e2c-4b2c-8b63-73d54ac5dcbb",
    tags: [
  "mecanico-gamer-65","teclado-gamer-65","65-porciento","68-teclas",
  "sin-numpad","layout-es",
  "teclado-mecanico-gamer"
],
},
{
  slug: "tk68-negro-rgb-red",
  name: "Teclado mecánico gamer TK68 Negro RGB - Red Switch",
  brand: "Zifriend",
  subtitle: "Teclado mecánico gamer 65% (68 teclas) RGB, con cable USB-C",
  status: "out_of_stock",
  priceRub: 32990,
  monthlyRub: 2749,
  model: "TK68",
  color: "Negro",
  colors: ["Blanco", "Negro"],
  numpad: "No",
  switch: "Red",
  switchType: "Mecánicos",
  description:
    "Teclado mecánico gamer 65% (68 teclas) con retroiluminación RGB, conexión por cable USB-C (USB 2.0), anti-ghosting y tecla Win-Lock. Layout Español (LatAm) con Ñ impresa. Atajos multimedia por combinación. Carcasa y keycaps en ABS, resistente a derrames. Plug & play. No programable por software. Envíos a todo Chile, retiro en Ñuñoa y garantía SaintGeek.",
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
    { id: "tk68-rgb-1",   label: "Teclado mecánico gamer TK68 Negro RGB - Red Switch",   url: "/images/tk68/rgb-1.png" },
    { id: "tk68-keys-1",  label: "Teclado mecánico gamer TK68 Negro RGB - Red Switch", url: "/images/tk68/keys-1.png" },
    { id: "red-switch-1", label: "Teclado mecánico gamer TK68 Negro RGB - Red Switch",   url: "/images/switches/red-switch-1.webp" }
  ],
  mercadoLibreUrl:
    "https://articulo.mercadolibre.cl/MLC-3089243272-teclado-gamer-mecanico-70-abs-red-switches-espanol-rgb-_JM?has_official_store=false&highlight=false&searchVariation=184950318186&pdp_filters=seller_id%3A1952815992&headerTopBrand=false#polycard_client=search-nordic&searchVariation=184950318186&search_layout=stack&position=6&type=item&tracking_id=5d7af681-5e2c-4b2c-8b63-73d54ac5dcbb",
    tags: [
  "mecanico-gamer-65","teclado-gamer-65","65-porciento","68-teclas","teclado-mecanico-gamer"
],
},

{
  slug: "tk61-blanco-rgb-red",
  name: "Teclado mecánico gamer TK61 Blanco RGB - Red Switch",
  brand: "Zifriend",
  subtitle: "Teclado mecánico 60% (61 teclas) RGB con cable USB-C desmontable",
  status: "in_stock",
  priceRub: 32990,
  monthlyRub: 2749,
  model: "TK61",
  color: "Blanco",
  colors: ["Blanco", "Negro"],
  numpad: "No",
  switch: "Red",
  switchType: "Mecánicos",
  description:
    "Teclado mecánico compacto 60% (61 teclas) con retroiluminación RGB y cable USB-C desmontable. Ideal para gamers y oficina gracias a su tamaño reducido y switches mecánicos intercambiables en caliente (Hot-Swap). Carcasa de plástico ABS resistente, keycaps de doble inyección y funciones multimedia por combinación. Layout Español con Ñ impresa. Compatible con PC, Mac y tablet. Envíos a todo Chile, retiro en Ñuñoa y garantía SaintGeek.",
  keys: 61,
  switchPrice: 5500,
  actuationForce: "45 g",
  lighting: "RGB",
  dimensions: "400 × 200 × 70 mm",
  ancho: "400 mm",
  alto: "70 mm",
  largo: "200 mm",
  weight: "800 g",
  images: [
    { id: "tk61-blanco-1", label: "Blanco", url: "/images/tk61/tk-61-white.png" },
    { id: "tk61-negro-1", label: "Negro", url: "/images/tk61/tk-61-black.png" },
    { id: "tk61-blanco-2", label: "Blanco", url: "/images/tk61/tk-61-white-1.png" },
    { id: "tk61-rgb-1", label: "Teclado mecánico gamer TK61 Blanco RGB - Red Switch", url: "/images/tk61/keyboatf-tk61-2.png" },
    { id: "tk61-keys-1", label: "Teclado mecánico gamer TK61 Blanco RGB - Red Switch", url: "/images/tk61/keyboatf-tk61-3.png" },
   { id: "tk61-keys-1", label: "Teclado mecánico gamer TK61 Blanco RGB - Red Switch", url: "/images/tk61/keyboatf-tk61-4.png" },
   { id: "tk61-keys-1", label: "Teclado mecánico gamer TK61 Blanco RGB - Red Switch", url: "/images/tk61/rgb-tk61-keyboard.png" },
  ],
  mercadoLibreUrl:
    "https://articulo.mercadolibre.cl/MLC-3108739144-teclado-mecanico-gamer-60-rgb-pcmac-blanconegro-espanol-_JM",
    tags: [
  "mecanico-gamer-60","teclado-gamer-60","60-porciento","61-teclas", "teclado-mecanico-gamer"
],


},

{
  slug: "tk61-negro-rgb-red",
  name: "Teclado mecánico gamer TK61 Negro RGB - Red Switch",
  brand: "Zifriend",
  subtitle: "Teclado mecánico 60% (61 teclas) RGB con cable USB-C desmontable",
  status: "in_stock",
  priceRub: 32990,
  monthlyRub: 2749,
  model: "TK61",
  color: "Negro",
  colors: ["Blanco", "Negro"],
  numpad: "No",
  switch: "Red",
  switchType: "Mecánicos",
  description:
    "Teclado mecánico gamer compacto 60% (61 teclas) con iluminación RGB y cable USB-C desmontable. Diseño minimalista, carcasa ABS resistente y switches mecánicos intercambiables en caliente (Hot-Swap). Soporta anti-ghosting, tecla Win-Lock y atajos multimedia. Layout Español (LatAm) con Ñ impresa. Ideal para gaming, oficina o trabajo diario. Envíos a todo Chile, retiro en Ñuñoa y garantía SaintGeek.",
  keys: 61,
  switchPrice: 5500,
  actuationForce: "45 g",
  lighting: "RGB",
  dimensions: "400 × 200 × 70 mm",
  ancho: "400 mm",
  alto: "70 mm",
  largo: "200 mm",
  weight: "800 g",
  images: [
    { id: "tk61-negro-1", label: "Negro", url: "/images/tk61/tk-61-black.png" },
    { id: "tk61-blanco-1", label: "Blanco", url: "/images/tk61/tk-61-white.png" },
    { id: "tk61-negro-1", label: "Negro", url: "/images/tk61/tk-61-black-1.png" },
    { id: "tk61-rgb-1", label: "Teclado mecánico gamer TK61 Negro RGB - Red Switch", url: "/images/tk61/keyboatf-tk61-2.png" },
    { id: "tk61-keys-1", label: "Teclado mecánico gamer TK61 Negro RGB - Red Switch", url: "/images/tk61/keyboatf-tk61-3.png" },
    { id: "tk61-keys-1", label: "Teclado mecánico gamer TK61 Negro RGB - Red Switch", url: "/images/tk61/keyboatf-tk61-4.png" },
    { id: "tk61-keys-1", label: "Teclado mecánico gamer TK61 Negro RGB - Red Switch", url: "/images/tk61/rgb-tk61-keyboard.png" },
    
  ],
  mercadoLibreUrl:
    "https://articulo.mercadolibre.cl/MLC-3108765400-teclado-mecanico-gamer-60-rgb-pcmac-negroblanco-espanol-_JM",
    tags: [
  "mecanico-gamer-60","teclado-gamer-60","60-porciento","61-teclas", "teclado-mecanico-gamer"
  
]
}



  
]
