// /data/products.ts

/* ----------------------------- Types ----------------------------- */
export type ProductStatus = "in_stock" | "out_of_stock" | "pre_order"
export type ProductCategory = "teclados" | "ratones"

// Imágenes
export type ProductImage = {
  id: string
  label: string
  url: string
}

/**
 * Base común (teclados + ratones)
 * - Mantengo campos que ya usas en UI (precio, shipping, gallery, etc.)
 */
export type BaseProduct = {
  slug: string
  name: string
  brand: string
  subtitle: string
  status: ProductStatus
  category: ProductCategory

  priceRub: number
  monthlyRub: number

  color: string
  colors: string[]
  description: string

  lighting: string
  dimensions: string
  ancho: string
  alto: string
  largo: string
  weight: string

  images: ProductImage[]
  mercadoLibreUrl: string
  tags: string[]

  // útil para SEO/Markov, opcional
  size?: "60%" | "65%" | "mouse"
}

/* ----------------------------- Keyboards ----------------------------- */
export type KeyboardModel = "AG61" | "TK68" | "TK61"
export type KeyboardSwitch = "Blue" | "Red" | "Brown" | "Silent"
export type KeyboardSwitchType = "Mecánicos" | "De membrana"

export type KeyboardProduct = BaseProduct & {
  category: "teclados"
  model: KeyboardModel

  numpad: "Sí" | "No"
  switch: KeyboardSwitch
  switchType: KeyboardSwitchType

  keys: number
  switchPrice: number
  actuationForce: string
}

/* ----------------------------- Mice ----------------------------- */
export type MouseModel = "G13PRO" | "G11" | "G13" | "OTRO"

export type MouseProduct = BaseProduct & {
  category: "ratones"
  model: MouseModel

  sensor: string
  dpiMax: number
  buttons: number
  connectivity: string[] // ["2.4GHz", "Bluetooth", "Cable"]
  rechargeable: boolean

  // opcionales
  pollingRateHz?: number
  software?: "Sí" | "No"
  handedness?: "Ambidiestro" | "Derecha" | "Izquierda"
}

/* ----------------------------- Union ----------------------------- */
export type Product = KeyboardProduct | MouseProduct

export const isKeyboardProduct = (p: Product): p is KeyboardProduct =>
  p.category === "teclados"

export const isMouseProduct = (p: Product): p is MouseProduct =>
  p.category === "ratones"

/* ----------------------------- Products ----------------------------- */
export const products: Product[] = [
  /* ========================= TECLADOS ========================= */
  {
    category: "teclados",
    size: "60%",
    slug: "ag61-azul-rgb",
    name: "Teclado mecánico gamer AG61 Azul Claro RGB - Azul Switch",
    brand: "SaintGeek",
    subtitle: "Teclado mecánico gamer 60% RGB, Hot-Swap",
    status: "out_of_stock",
    priceRub: 31340,
    monthlyRub: 5223,
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
      { id: "ag61-azul", label: "Azul", url: "/images/tk61/blue-keycaps.png" },
      { id: "ag61-negro", label: "Negro", url: "/images/tk61/black-keycaps.png" },
      { id: "ag61-azul", label: "Azul", url: "/images/tk61/blue-keycaps-1.png" },
      {
        id: "",
        label: "Teclado mecánico gamer AG61 Azul Claro RGB - Azul Switch",
        url: "/images/ag61/blue-keyboard-2.webp",
      },
      {
        id: "",
        label: "Teclado mecánico gamer AG61 Azul Claro RGB - Azul Switch",
        url: "/images/ag61/blue-keyboard-3.webp",
      },
      {
        id: "",
        label: "Teclado mecánico gamer AG61 Azul Claro RGB - Azul Switch",
        url: "/images/ag61/blue-keyboard-4.webp",
      },
      {
        id: "",
        label: "Teclado mecánico gamer AG61 Azul Claro RGB - Azul Switch",
        url: "/images/ag61/blue-keyboard-rgb-1.webp",
      },
      {
        id: "",
        label: "Teclado mecánico gamer AG61 Azul Claro RGB - Azul Switch",
        url: "/images/ag61/blue-keycaps-1.webp",
      },
      {
        id: "",
        label: "Teclado mecánico gamer AG61 Azul Claro RGB - Azul Switch",
        url: "/images/ag61/blue-keyclap-tool-1.webp",
      },
      {
        id: "",
        label: "Teclado mecánico gamer AG61 Azul Claro RGB - Azul Switch",
        url: "/images/blue-switch-1.webp",
      },
      {
        id: "",
        label: "Teclado mecánico gamer AG61 Azul Claro RGB - Azul Switch",
        url: "/images/blue-switch-2.webp",
      },
    ],
    mercadoLibreUrl:
      "https://articulo.mercadolibre.cl/MLC-3074094542-teclado-mecanico-60-ag61-azulclaro-espanol-gamer-rgbswitch-_JM",
    tags: [
      "mecanico-gamer-60",
      "teclado-gamer-60",
      "60-porciento",
      "61-teclas",
      "compacto",
      "teclado-espanol",
      "teclado-mecanico-gamer",
      "teclado-mecanico-ag61",
    ],
  },

  {
    category: "teclados",
    size: "60%",
    slug: "ag61-black-rgb",
    name: "Teclado mecánico gamer AG61 Negro RGB - Azul Switch",
    brand: "SaintGeek",
    subtitle: "Teclado mecánico gamer 60% RGB, Hot-Swap",
    status: "out_of_stock",
    priceRub: 31990,
    monthlyRub: 5339,
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
      { id: "ag61-negro", label: "Negro", url: "/images/ag61/ag-61-black-1.png" },
      { id: "ag61-azul", label: "Azul", url: "/images/tk61/blue-keycaps.png" },
      { id: "ag61-black", label: "Black", url: "/images/ag61/ag-61-black-2.png" },
      {
        id: "ag61-black",
        label: "Teclado mecánico gamer AG61 Negro RGB - Azul Switch",
        url: "/images/blue-keycaps-ag61-4.webp",
      },
      {
        id: "ag61-black",
        label: "Teclado mecánico gamer AG61 Negro RGB - Azul Switch",
        url: "/images/black-ag61-leyboard-2.webp",
      },
      {
        id: "",
        label: "Teclado mecánico gamer AG61 Negro RGB - Azul Switch",
        url: "/images/tk61/Untitled-2.png",
      },
      {
        id: "",
        label: "Teclado mecánico gamer AG61 Negro RGB - Azul Switch",
        url: "/images/blue-switch-1.webp",
      },
      {
        id: "",
        label: "Teclado mecánico gamer AG61 Negro RGB - Azul Switch",
        url: "/images/blue-switch-2.webp",
      },
    ],
    mercadoLibreUrl:
      "https://articulo.mercadolibre.cl/MLC-1679399583-teclado-mecanico-60-ag61-negro-espanol-gamer-rgbblueswitch-_JM",
    tags: [
      "mecanico-gamer-60",
      "teclado-gamer-60",
      "60-porciento",
      "teclado-mecanico-gamer",
      "teclado-mecanico-ag61",
    ],
  },

  {
    category: "teclados",
    size: "65%",
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
    dimensions: "400 × 380 × 50 mm",
    ancho: "400 mm",
    alto: "50 mm",
    largo: "380 mm",
    weight: "800 g",
    images: [
      { id: "tk68-blanco-1", label: "Blanco", url: "/images/tk68/white-1.png" },
      { id: "tk68-negro-1", label: "Negro", url: "/images/tk68/black-1.png" },
      {
        id: "tk68-blanco-2",
        label: "Teclado mecánico gamer TK68 Blanco RGB - Red Switch",
        url: "/images/tk68/tk68-keyboard-1.webp",
      },
      {
        id: "tk68-blanco-2",
        label: "Teclado mecánico gamer TK68 Blanco RGB - Red Switch",
        url: "/images/tk68/tk68-keyboard-2.webp",
      },
      {
        id: "tk68-blanco-2",
        label: "Teclado mecánico gamer TK68 Blanco RGB - Red Switch",
        url: "/images/tk68/tk68-keyboard-usb-1.webp",
      },
      {
        id: "tk68-blanco-2",
        label: "Teclado mecánico gamer TK68 Blanco RGB - Red Switch",
        url: "/images/tk68/tk68-keyboard-keycap-1.webp",
      },
      {
        id: "tk68-blanco-2",
        label: "Teclado mecánico gamer TK68 Blanco RGB - Red Switch",
        url: "/images/tk68/tk68-keyboard-rgb-1.webp",
      },
      {
        id: "tk68-blanco-2",
        label: "Teclado mecánico gamer TK68 Blanco RGB - Red Switch",
        url: "/images/tk68/tk68-keyboard-rgb-2.webp",
      },
      {
        id: "tk68-blanco-2",
        label: "Teclado mecánico gamer TK68 Blanco RGB - Red Switch",
        url: "/images/tk68/tk68-keyboard-switch-1.webp",
      },
      {
        id: "tk68-blanco-2",
        label: "Teclado mecánico gamer TK68 Blanco RGB - Red Switch",
        url: "/images/tk68/tk68-keyboard-switch-2.webp",
      },
      {
        id: "tk68-blanco-2",
        label: "Teclado mecánico gamer TK68 Blanco RGB - Red Switch",
        url: "/images/tk68/tk68-keyboard-tool-1.webp",
      },
    ],
    mercadoLibreUrl:
      "https://articulo.mercadolibre.cl/MLC-3089243272-teclado-gamer-mecanico-70-abs-red-switches-espanol-rgb-_JM?has_official_store=false&highlight=false&searchVariation=184950318186&pdp_filters=seller_id%3A1952815992&headerTopBrand=false#polycard_client=search-nordic&searchVariation=184950318186&search_layout=stack&position=6&type=item&tracking_id=5d7af681-5e2c-4b2c-8b63-73d54ac5dcbb",
    tags: [
      "mecanico-gamer-65",
      "teclado-gamer-65",
      "65-porciento",
      "68-teclas",
      "sin-numpad",
      "layout-es",
      "teclado-mecanico-gamer",
      "teclado-mecanico-tk68",
    ],
  },

  {
    category: "teclados",
    size: "65%",
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
    dimensions: "400 × 380 × 50 mm",
    ancho: "400 mm",
    alto: "50 mm",
    largo: "380 mm",
    weight: "800 g",
    images: [
      { id: "tk68-negro-1", label: "Negro", url: "/images/tk68/black-1.png" },
      { id: "tk68-negro-2", label: "Negro", url: "/images/tk68/black-2.png" },
      {
        id: "tk68-rgb-1",
        label: "Teclado mecánico gamer TK68 Negro RGB - Red Switch",
        url: "/images/tk68/rgb-1.png",
      },
      {
        id: "tk68-keys-1",
        label: "Teclado mecánico gamer TK68 Negro RGB - Red Switch",
        url: "/images/tk68/keys-1.png",
      },
      {
        id: "red-switch-1",
        label: "Teclado mecánico gamer TK68 Negro RGB - Red Switch",
        url: "/images/switches/red-switch-1.webp",
      },
    ],
    mercadoLibreUrl:
      "https://articulo.mercadolibre.cl/MLC-3089243272-teclado-gamer-mecanico-70-abs-red-switches-espanol-rgb-_JM?has_official_store=false&highlight=false&searchVariation=184950318186&pdp_filters=seller_id%3A1952815992&headerTopBrand=false#polycard_client=search-nordic&searchVariation=184950318186&search_layout=stack&position=6&type=item&tracking_id=5d7af681-5e2c-4b2c-8b63-73d54ac5dcbb",
    tags: [
      "mecanico-gamer-65",
      "teclado-gamer-65",
      "65-porciento",
      "68-teclas",
      "teclado-mecanico-gamer",
      "teclado-mecanico-tk68",
    ],
  },

  {
    category: "teclados",
    size: "60%",
    slug: "tk61-blanco-rgb-red",
    name: "Teclado mecánico gamer TK61 Blanco RGB - Red Switch",
    brand: "Zifriend",
    subtitle: "Teclado mecánico 60% (61 teclas) RGB con cable USB-C desmontable",
    status: "out_of_stock",
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
      {
        id: "tk61-rgb-1",
        label: "Teclado mecánico gamer TK61 Blanco RGB - Red Switch",
        url: "/images/tk61/keyboatf-tk61-2.png",
      },
      {
        id: "tk61-keys-1",
        label: "Teclado mecánico gamer TK61 Blanco RGB - Red Switch",
        url: "/images/tk61/keyboatf-tk61-3.png",
      },
      {
        id: "tk61-keys-1",
        label: "Teclado mecánico gamer TK61 Blanco RGB - Red Switch",
        url: "/images/tk61/keyboatf-tk61-4.png",
      },
      {
        id: "tk61-keys-1",
        label: "Teclado mecánico gamer TK61 Blanco RGB - Red Switch",
        url: "/images/tk61/rgb-tk61-keyboard.png",
      },
    ],
    mercadoLibreUrl:
      "https://articulo.mercadolibre.cl/MLC-3108739144-teclado-mecanico-gamer-60-rgb-pcmac-blanconegro-espanol-_JM",
    tags: [
      "mecanico-gamer-60",
      "teclado-gamer-60",
      "60-porciento",
      "61-teclas",
      "teclado-mecanico-gamer",
      "teclado-mecanico-tk61",
    ],
  },

  {
    category: "teclados",
    size: "60%",
    slug: "tk61-negro-rgb-red",
    name: "Teclado mecánico gamer TK61 Negro RGB - Red Switch",
    brand: "Zifriend",
    subtitle: "Teclado mecánico 60% (61 teclas) RGB con cable USB-C desmontable",
    status: "out_of_stock",
    priceRub: 31340,
    monthlyRub: 5223,
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
      {
        id: "tk61-rgb-1",
        label: "Teclado mecánico gamer TK61 Negro RGB - Red Switch",
        url: "/images/tk61/keyboatf-tk61-2.png",
      },
      {
        id: "tk61-keys-1",
        label: "Teclado mecánico gamer TK61 Negro RGB - Red Switch",
        url: "/images/tk61/keyboatf-tk61-3.png",
      },
      {
        id: "tk61-keys-1",
        label: "Teclado mecánico gamer TK61 Negro RGB - Red Switch",
        url: "/images/tk61/keyboatf-tk61-4.png",
      },
      {
        id: "tk61-keys-1",
        label: "Teclado mecánico gamer TK61 Negro RGB - Red Switch",
        url: "/images/tk61/rgb-tk61-keyboard.png",
      },
    ],
    mercadoLibreUrl:
      "https://articulo.mercadolibre.cl/MLC-3108765400-teclado-mecanico-gamer-60-rgb-pcmac-negroblanco-espanol-_JM",
    tags: [
      "mecanico-gamer-60",
      "teclado-gamer-60",
      "60-porciento",
      "61-teclas",
      "teclado-mecanico-gamer",
      "teclado-mecanico-tk61",
    ],
  },

  /* ========================= RATONES (ejemplos, agrega los tuyos) ========================= */
{
  category: "ratones",
  size: "mouse",
  slug: "furycube-g11-paw3311-negro",
  name: "Mouse gamer inalámbrico FURYCUBE G11 PAW3311 Ultra Lightweight (Negro)",
  brand: "Furycube",
  subtitle:
    "Tri-Mode (2.4GHz + Bluetooth + cable), sensor PAW3311 12.000 DPI, 65g, Dual 1K polling, batería 400mAh",
  status: "in_stock",
  priceRub: 39990,
  monthlyRub: 6318,
  model: "G11",
  color: "Negro",
  colors: ["Negro", "Blanco"],
  description:
    "Mouse gamer ultra liviano (65g) diseñado para esports: carcasa aireada de 29 perforaciones para control rápido y cómodo. Integra sensor PAW3311 (hasta 12.000 DPI) y chipset BK3533 para respuesta estable y eficiente. Ofrece conexión Tri-Mode (2.4GHz + Bluetooth + cable) y Dual 1K polling para mínima latencia. Switches Huanyu con vida útil de 100.000.000+ clics (click ligero y suave). Batería de 400mAh con hasta 180+ horas de uso continuo. Ideal para gaming competitivo y uso diario.",
  sensor: "PAW3311",
  dpiMax: 12000,
  buttons: 6,
  connectivity: ["2.4GHz", "Bluetooth", "Cable"],
  rechargeable: true,
  software: "Sí",
  handedness: "Ambidiestro",
  lighting: "RGB",
  dimensions: "—",
  ancho: "—",
  alto: "—",
  largo: "—",
  weight: "65 g",
  images: [
    { id: "g11-1", label: "G11 Negro", url: "/images/mouse/g11/G11.png" },
    { id: "g11-1", label: "G11 Negro", url: "/images/mouse/g11/G11.png" },
    { id: "g11-1", label: "G11 Negro", url: "/images/mouse/g11/G11.png" },
    { id: "g11-rgb-1", label: "RGB 1", url: "/images/mouse/g11/rgb-g11.webp" },
    { id: "g11-rgb-2", label: "RGB 2", url: "/images/mouse/g11/rgb-g11-2.webp" },
    { id: "g11-front-1", label: "Frente", url: "/images/mouse/g11/frente-g11.webp" },
    { id: "g11-back-1", label: "Back 1", url: "/images/mouse/g11/back-g11.webp" },
    { id: "g11-back-3", label: "Back 3", url: "/images/mouse/g11/back-g11-2.webp" },
    { id: "g11-back-5", label: "Back 5", url: "/images/mouse/g11/back-g11-4.webp" },
  ],
  mercadoLibreUrl: "https://tu-url-de-ml.cl",
  tags: [
    "mouse-gamer-inalambrico",
    "tri-mode",
    "paw3311",
    "12000-dpi",
    "dual-1000hz",
    "bk3533",
    "mouse gamer",
    "ultraliviano-65g",
    "400mah",
    "recargable",
    "6-botones",
    "rgb",
  ],
},

  {
  category: "ratones",
  size: "mouse",
  slug: "furycube-g11-paw3311-blanco",
  name: "Mouse gamer inalámbrico FURYCUBE G11 PAW3311 Ultra Lightweight (Blanco)",
  brand: "Furycube",
  subtitle:
    "Tri-Mode (2.4GHz + Bluetooth + cable), sensor PAW3311 12.000 DPI, 65g, Dual 1K polling, batería 400mAh",
  status: "in_stock",
  priceRub: 39990,
  monthlyRub: 6318,
  model: "G11",
  color: "Blanco",
  colors: ["Blanco", "Negro"],
  description:
    "Mouse gamer ultra liviano (65g) diseñado para esports: carcasa aireada de 29 perforaciones para control rápido y cómodo. Integra sensor PAW3311 (hasta 12.000 DPI) y chipset BK3533 para respuesta estable y eficiente. Ofrece conexión Tri-Mode (2.4GHz + Bluetooth + cable) y Dual 1K polling para mínima latencia. Switches Huanyu con vida útil de 100.000.000+ clics (click ligero y suave). Batería de 400mAh con hasta 180+ horas de uso continuo. Ideal para gaming competitivo y uso diario.",
  sensor: "PAW3311",
  dpiMax: 12000,
  buttons: 6,
  connectivity: ["2.4GHz", "Bluetooth", "Cable"],
  rechargeable: true,
  software: "Sí",
  handedness: "Ambidiestro",
  lighting: "RGB",
  dimensions: "—",
  ancho: "—",
  alto: "—",
  largo: "—",
  weight: "65 g",
  images: [
    { id: "g11w-1", label: "G11 Blanco", url: "/images/mouse/g11-blanco/g11w.png" },
      { id: "g11w-1", label: "G11 Blanco", url: "/images/mouse/g11-blanco/g11w.png" },
        { id: "g11w-1", label: "G11 Blanco", url: "/images/mouse/g11-blanco/g11w.png" },
    { id: "g11w-9", label: "RGB 1", url: "/images/mouse/g11-blanco/g11w-9.png" },
    { id: "g11w-6", label: "RGB 2", url: "/images/mouse/g11-blanco/g11w-6.png" },
    { id: "g11w-7", label: "RGB 3", url: "/images/mouse/g11-blanco/g11w-7.png" },
    { id: "g11w-8", label: "RGB 4", url: "/images/mouse/g11-blanco/g11w-8.png" },
    { id: "g11w-2", label: "Vista 1", url: "/images/mouse/g11-blanco/g11w-2.png" },
    { id: "g11w-3", label: "Vista 2", url: "/images/mouse/g11-blanco/g11w-3.png" },
  ],
  mercadoLibreUrl: "https://tu-url-de-ml.cl",
  tags: [
    "mouse-gamer-inalambrico",
    "tri-mode",
    "paw3311",
     "mouse gamer",
    "12000-dpi",
    "dual-1000hz",
    "bk3533",
    "ultraliviano-65g",
    "400mah",
    "recargable",
    "6-botones",
    "rgb",
  ],
},
{
  category: "ratones",
  size: "mouse",
  slug: "furycube-g13pro-paw3311-blanco",
  name: "Mouse gamer inalámbrico FURYCUBE G13Pro PAW3311 Ultra Lightweight (Blanco)",
  brand: "Furycube",
  subtitle:
    "Wireless 2.4GHz, sensor PAW3311 hasta 22.000 DPI (OC), 55g, batería 400mAh, switches 100M, software driver",
  status: "in_stock",
  priceRub: 41990,
  monthlyRub: 6998,
  model: "G13PRO",
  color: "Blanco",
  colors: ["Blanco", "Negro"],
  description:
    "Mouse gamer ultra liviano (55g) pensado para FPS y esports. Sensor PAW3311 con control preciso, seguimiento rápido (hasta 750 IPS) y 50G de aceleración, con DPI personalizable hasta 22.000 (overclock). Batería de 400mAh para larga duración. Switches Mingweikai con vida útil de 100.000.000 clics: respuesta nítida, rebote rápido y actuación precisa. Incluye driver G13Pro para control profesional y ajustes totalmente personalizables.",
  sensor: "PAW3311",
  dpiMax: 22000,
  buttons: 6,
  connectivity: ["2.4GHz"],
  rechargeable: true,
  software: "Sí",
  handedness: "Ambidiestro",
  lighting: "—",
  dimensions: "—",
  ancho: "—",
  alto: "—",
  largo: "—",
  weight: "55 g",
  images: [
    // ⬇️ pega aquí tus fotos del G13Pro blanco
    { id: "g13pro-w-1", label: "G13Pro Blanco", url: "/images/mouse/g13-white/g13white-00.png" },
     { id: "g13pro-w-1", label: "G13Pro Blanco", url: "/images/mouse/g13-white/g13white-00.png" },
      { id: "g13pro-w-1", label: "G13Pro Blanco", url: "/images/mouse/g13-white/g13white-00.png" },
      { id: "g13pro-w-1", label: "G13Pro Blanco", url: "/images/mouse/g13-white/g13white-1.png" },
      { id: "g13pro-w-1", label: "G13Pro Blanco", url: "/images/mouse/g13-white/g13white-2.png" },
      { id: "g13pro-w-1", label: "G13Pro Blanco", url: "/images/mouse/g13-white/g13white-3.png" },
      { id: "g13pro-w-1", label: "G13Pro Blanco", url: "/images/mouse/g13-white/g13white-4.png" },
      { id: "g13pro-w-1", label: "G13Pro Blanco", url: "/images/mouse/g13-white/g13white-5.png" },
      { id: "g13pro-w-1", label: "G13Pro Blanco", url: "/images/mouse/g13-white/g13white-6.png" },
  ],
  mercadoLibreUrl: "https://tu-url-de-ml.cl",
  tags: [
    "mouse-gamer-inalambrico",
    "g13pro",
    "22000-dpi",
    "750-ips",
    "50g-aceleracion",
    "ultraliviano-55g",
    "400mah",
    "100m-clicks",
     "mouse gamer",
    "driver",
    "fps",
    "esports",
    
  ],
},

{
  category: "ratones",
  size: "mouse",
  slug: "furycube-g13pro-paw3311-negro",
  name: "Mouse gamer inalámbrico FURYCUBE G13Pro PAW3311 Ultra Lightweight (Negro)",
  brand: "Furycube",
  subtitle:
    "Wireless 2.4GHz, sensor PAW3311 hasta 22.000 DPI (OC), 55g, batería 400mAh, switches 100M, software driver",
  status: "in_stock",
  priceRub: 41990,
  monthlyRub: 6998,
  model: "G13PRO",
  color: "Negro",
  colors: ["Negro", "Blanco"],
  description:
    "Mouse gamer ultra liviano (55g) pensado para FPS y esports. Sensor PAW3311 con control preciso, seguimiento rápido (hasta 750 IPS) y 50G de aceleración, con DPI personalizable hasta 22.000 (overclock). Batería de 400mAh para larga duración. Switches Mingweikai con vida útil de 100.000.000 clics: respuesta nítida, rebote rápido y actuación precisa. Incluye driver G13Pro para control profesional y ajustes totalmente personalizables.",
  sensor: "PAW3311",
  dpiMax: 22000,
  buttons: 6,
  connectivity: ["2.4GHz"],
  rechargeable: true,
  software: "Sí",
  handedness: "Ambidiestro",
  lighting: "—",
  dimensions: "—",
  ancho: "—",
  alto: "—",
  largo: "—",
  weight: "55 g",
  images: [
    // ⬇️ pega aquí tus fotos del G13Pro negro
     { id: "g13pro-w-1", label: "G13Pro Blanco", url: "/images/mouse/g13-black/g13black-00.png" },
     { id: "g13pro-w-1", label: "G13Pro Blanco", url: "/images/mouse/g13-black/g13black-00.png" },
      { id: "g13pro-w-1", label: "G13Pro Blanco", url: "/images/mouse/g13-black/g13black-00.png" },
      { id: "g13pro-w-1", label: "G13Pro Blanco", url: "/images/mouse/g13-black/g13black-1.png" },
      { id: "g13pro-w-1", label: "G13Pro Blanco", url: "/images/mouse/g13-black/g13black-2.png" },
      { id: "g13pro-w-1", label: "G13Pro Blanco", url: "/images/mouse/g13-black/g13black-3.png" },
      { id: "g13pro-w-1", label: "G13Pro Blanco", url: "/images/mouse/g13-black/g13black-4.png" },
      { id: "g13pro-w-1", label: "G13Pro Blanco", url: "/images/mouse/g13-black/g13black-6.png" },
      { id: "g13pro-w-1", label: "G13Pro Blanco", url: "/images/mouse/g13-black/g13black-8.png" },
      { id: "g13pro-w-1", label: "G13Pro Blanco", url: "/images/mouse/g13-black/g13black-7.png" },
  ],
  mercadoLibreUrl: "https://tu-url-de-ml.cl",
  tags: [
    "mouse-gamer-inalambrico",
    "g13pro",
    "22000-dpi",
    "750-ips",
     "mouse gamer",
    "50g-aceleracion",
    "ultraliviano-55g",
    "400mah",
    "100m-clicks",
    "driver",
    "fps",
    "esports",
  ],
},
]