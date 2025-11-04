// lib/tags.ts
import { products } from "@/data/products"

/** ------------------------------
 * Helpers
 * ------------------------------ */
export function slugifyTag(s: string) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function humanizeTag(slug: string) {
  const h = (slug || "").replace(/-/g, " ")
  // Capitaliza primera letra y normaliza siglas comunes
  const firstUp = h.replace(/^\w/, (c) => c.toUpperCase())
  return firstUp
    .replace(/\b(rgb)\b/gi, "RGB")
    .replace(/\b(tkl)\b/gi, "TKL")
    .replace(/\b(es)\b/gi, "Español")
    .replace(/\b(latam)\b/gi, "LatAm")
    .replace(/\b(usb)\b/gi, "USB")
}

/** Devuelve SOLO los tags presentes en productos (para rutas y sitemap) */
export function getAllTagSlugs() {
  const set = new Set<string>()
  for (const p of products) {
    for (const t of p.tags || []) set.add(slugifyTag(t))
  }
  return Array.from(set)
}

/** ------------------------------
 * TAGS sugeridos (≈160)
 * Úsalos como catálogo para asignar en products[].tags
 * ------------------------------ */
export const SUGGESTED_TAGS = [
  // Formatos / tamaños
  "mecanico-gamer-60","mecanico-gamer-65","tkl-80","full-size-100",
  "61-teclas","68-teclas","87-teclas","104-teclas",
  "compacto","ultra-compacto","perfil-bajo","low-profile",
  "sin-numpad","con-numpad","layout-es","layout-espanol","layout-latam","ansi","iso",

  // Switches
  "switch-red","switch-blue","switch-brown","switch-silent",
  "switch-linear","switch-tactile","switch-clicky",
  "fuerza-45g","fuerza-50g",
  "hot-swap","hot-swap-3-pin","hot-swap-5-pin","compatible-3-5-pin",

  // Conectividad
  "inalambrico","bluetooth","con-cable","usb-c","2-4ghz",
  "multiplataforma","pc-mac","windows","macos","tablet","android","ipad","plug-and-play",

  // Iluminación / estilo
  "rgb","sin-rgb","rgb-dinamico","rgb-efectos","retroiluminado","estilo-gamer",
  "minimalista","setup-compacto","setup-blanco","setup-negro","setup-azul","silencioso","sonoro-clicky",

  // Construcción / materiales
  "gasket","espuma-doble","estabilizadores-lubricados","keycaps-abs","keycaps-pbt","doble-inyeccion",
  "perfil-oem","perfil-cherry","perfil-xda","carcasa-abs","cable-usb-c-desmontable",
  "anti-ghosting","n-key-rollover","win-lock","resistencia-derrame","atajos-multimedia","teclas-fn",
  "incluye-cable","incluye-extractor","extractor-keycaps","recambio-switches",

  // Uso / públicos
  "gaming","gaming-competitivo","shooters","moba","mmorpg",
  "oficina","teletrabajo","programadores","escritura","estudiantes",
  "streamers","creadores-contenido","edicion-video","diseno-grafico","modelado-3d","productividad",

  // Colores
  "negro","blanco","azul","azul-claro","rosado","morado","verde","rojo","gris",
  "blanco-y-negro","negro-y-azul","tema-azul",

  // Modelos / líneas
  "ag61","tk61","tk68","saintgeek","zifriend","teclado-gamer-60","teclado-gamer-65","60-porciento","65-porciento",

  // Función / experiencia
  "tecleo-suave","tecleo-rapido","respuesta-rapida","viaje-corto","feedback-tactil","click-audible",
  "perfiles-de-teclas","personalizacion-facil","modding-facil","sonido-equilibrado","sonido-profundoo",
  "estabilidad-teclas","precision-gaming","sin-lag",

  // Contexto / beneficios
  "para-escritorio-pequeno","para-mochila","setup-minimalista","setup-oficina","setup-gamer",
  "mejor-relacion-precio","mejor-calidad-precio","oferta",

  // Idioma / layout extendido
  "layout-espanol-con-n","con-n","teclado-espanol",

  // Extras
  "keycaps-doubleshot","keycaps-doubleshot-abs","switches-intercambiables","cable-desmontable",
  "modo-juego","bloqueo-windows","macro-atajos","anti-desgaste","durabilidad-alta",

  // Más granularidad (para alcanzar ~160)
  "compacto-61","compacto-68","compacto-87","compacto-104",
  "gaming-shooters","gaming-moba","gaming-mmorpg","gaming-general",
  "trabajo-remoto","oficina-silenciosa","escritura-larga","codificacion",
  "rgb-arciris","rgb-personalizable","rgb-brillo-alto","rgb-efecto-onda",
  "switch-rojo-lineal","switch-azul-clicky","switch-cafe-tactil","switch-silent-silent",
  "topes-de-ruido","amortiguacion-foam","diseno-compacto","teclas-altas",
  "acabado-mate","acabado-brillante","color-mate","color-brillante",
  "keycaps-resistentes","keycaps-reemplazo","switches-repuesto",
  "peso-ligero","peso-medio","peso-solido",
  "cable-1-5m","usb-2-0","compatibilidad-pc-mac",
  "sin-software","con-software","programable-por-fn",
  "ideal-escritorio-pequeno","ideal-streaming","ideal-estudio",
  "setup-negro-minimal","setup-blanco-clean","setup-azul-theme"
]

/** ------------------------------
 * COPY curado (hecho a mano para los tags más buscados)
 * ------------------------------ */
export const COPY: Record<string, { h1: string; p: string; title?: string; description?: string }> = {
  // Formatos clave
  "mecanico-gamer-60": {
    h1: "Teclados mecánicos gamer 60% (compactos)",
    p: "Teclados 60% para setups minimalistas: tamaño compacto (61 teclas), respuesta rápida y funciones gamer como RGB, anti-ghosting y hot-swap.",
    title: "Teclados mecánicos gamer 60% en Chile | SaintGeek",
    description: "Compra teclados 60% (61 teclas) con RGB y hot-swap. Switches Red/Blue. Envíos en Chile y garantía SaintGeek."
  },
  "mecanico-gamer-65": {
    h1: "Teclados mecánicos gamer 65% (68 teclas)",
    p: "Formato 65% con flechas dedicadas y diseño compacto. Balance ideal entre espacio y funcionalidad para gaming y oficina.",
    title: "Teclados mecánicos 65% (68 teclas) | SaintGeek",
    description: "Teclados 65% con RGB y switches intercambiables. Excelente para jugar y trabajar cómodamente."
  },
  "tkl-80": {
    h1: "Teclados mecánicos TKL (80%)",
    p: "Tenkeyless para ganar espacio sin perder teclas esenciales. Gran control del mouse y ergonomía para sesiones largas.",
    title: "Teclados TKL (80%) | SaintGeek",
    description: "Explora teclados TKL con RGB y switches mecánicos. Rendimiento y comodidad para gaming."
  },
  "full-size-100": {
    h1: "Teclados mecánicos Full Size (100%)",
    p: "Teclados completos con numpad para productividad, contabilidad y gaming. Robustez, estabilidad y máximo control.",
    title: "Teclados full size (100%) | SaintGeek",
    description: "Teclados completos con numpad, RGB y anti-ghosting. Ideales para trabajar y jugar."
  },
  "61-teclas": {
    h1: "61 teclas: compactos y portátiles",
    p: "El estándar 60% favorito. Portabilidad, minimalismo y precisión para gaming y escritura diaria.",
    title: "Teclados 61 teclas | SaintGeek",
    description: "Compactos, con RGB y hot-swap. Perfectos para escritorios pequeños."
  },
  "68-teclas": {
    h1: "68 teclas: 65% con flechas dedicadas",
    p: "Más comodidad que un 60% gracias a sus flechas, sin sacrificar compacidad ni estilo.",
    title: "Teclados 68 teclas | SaintGeek",
    description: "Elige 65% con RGB y switches mecánicos Red/Blue/Brown."
  },
  "sin-numpad": {
    h1: "Teclados mecánicos sin numpad",
    p: "Gana espacio para el mouse y mejora tu postura. Ideales para setups compactos y competitivos.",
    title: "Teclados sin numpad | SaintGeek",
    description: "60%, 65% y TKL con RGB, anti-ghosting y hot-swap."
  },
  "con-numpad": {
    h1: "Teclados mecánicos con numpad",
    p: "La mejor elección para productividad y data entry sin perder estilo gamer.",
    title: "Teclados con numpad | SaintGeek",
    description: "Full size con RGB y switches mecánicos. Estables y cómodos."
  },

  // Conectividad
  "inalambrico": {
    h1: "Teclados mecánicos inalámbricos",
    p: "Libertad de cables y escritorio limpio. Autonomía y estabilidad para jugar o trabajar.",
    title: "Teclados mecánicos inalámbricos | SaintGeek",
    description: "Conexión fiable y comodidad. Elige tu formato y tipo de switch."
  },
  "bluetooth": {
    h1: "Teclados mecánicos Bluetooth",
    p: "Conéctate a múltiples dispositivos y alterna en segundos. Ideal para laptop, tablet y escritorio.",
    title: "Teclados Bluetooth mecánicos | SaintGeek",
    description: "Compatibles con PC/Mac/tablet. Tamaños 60% y 65% con RGB."
  },
  "con-cable": {
    h1: "Teclados mecánicos con cable",
    p: "Latencia mínima y conexión estable. La opción clásica para eSports y oficina.",
    title: "Teclados mecánicos con cable | SaintGeek",
    description: "USB-C desmontable, anti-ghosting y N-key rollover."
  },
  "usb-c": {
    h1: "Teclados con USB-C desmontable",
    p: "Conexión moderna y práctica. Cambia cables y gestiona tu escritorio sin esfuerzo.",
    title: "Teclados USB-C | SaintGeek",
    description: "Compatibles con PC y Mac. Modelos compactos con RGB."
  },

  // Iluminación / estilo
  "rgb": {
    h1: "Teclados mecánicos con retroiluminación RGB",
    p: "Efectos dinámicos y brillo ajustable para jugar y trabajar con estilo, incluso de noche.",
    title: "Teclados mecánicos RGB | SaintGeek",
    description: "RGB con múltiples efectos. Switches Red/Blue. Envío a todo Chile."
  },
  "sin-rgb": {
    h1: "Teclados mecánicos sin RGB",
    p: "Minimalismo total y foco absoluto. Excelente para oficina o setups sobrios.",
    title: "Teclados sin RGB | SaintGeek",
    description: "Construcción sólida y switches fiables en formatos compactos."
  },
  "minimalista": {
    h1: "Teclados mecánicos minimalistas",
    p: "Diseños limpios y compactos que destacan por su funcionalidad.",
    title: "Teclados minimalistas | SaintGeek",
    description: "60% y 65% con switches de alto rendimiento."
  },

  // Construcción / materiales
  "hot-swap": {
    h1: "Teclados Hot-Swap (cambia tus switches sin soldar)",
    p: "Sockets 3/5-pin: personaliza sonido y sensación en segundos.",
    title: "Teclados Hot-Swap 3/5-pin | SaintGeek",
    description: "Modding fácil con RGB, anti-ghosting y N-key rollover."
  },
  "gasket": {
    h1: "Teclados con montaje gasket",
    p: "Sensación más suave y sonido controlado gracias al sistema de suspensión.",
    title: "Teclados mecánicos gasket | SaintGeek",
    description: "Teclas cómodas y consistentes para largas sesiones."
  },
  "espuma-doble": {
    h1: "Teclados con espuma interna (doble capa)",
    p: "Menos resonancia y mejor acústica sin mods complejos.",
    title: "Teclados con espuma interna | SaintGeek",
    description: "Sonido más agradable y escritura sólida."
  },
  "estabilizadores-lubricados": {
    h1: "Teclados con estabilizadores lubricados",
    p: "Barra espaciadora y teclas largas con menos traqueteo y mejor sensación.",
    title: "Estabilizadores lubricados | SaintGeek",
    description: "Experiencia premium al teclear."
  },
  "keycaps-abs": {
    h1: "Keycaps ABS de doble inyección",
    p: "Resistentes al brillo y al desgaste. Legibilidad por más tiempo.",
    title: "Keycaps ABS doubleshot | SaintGeek",
    description: "Mayor durabilidad y estética limpia."
  },
  "keycaps-pbt": {
    h1: "Keycaps PBT texturizadas",
    p: "Tacto más seco y alta durabilidad. Preferidas por entusiastas.",
    title: "Keycaps PBT | SaintGeek",
    description: "Calidad y longevidad para tu teclado."
  },
  "anti-ghosting": {
    h1: "Teclados con anti-ghosting",
    p: "Evita pulsaciones fantasma y gana precisión en juego.",
    title: "Anti-ghosting | SaintGeek",
    description: "Ideal para shooters y juegos competitivos."
  },
  "n-key-rollover": {
    h1: "Teclados con N-key rollover",
    p: "Registra múltiples teclas simultáneas sin errores.",
    title: "N-key rollover | SaintGeek",
    description: "Rendimiento fiable en partidas intensas."
  },

  // Switches
  "switch-red": {
    h1: "Teclados con switches Red (lineales)",
    p: "Lineales, suaves y rápidos (~45 g). Ideales para shooters y escritura prolongada.",
    title: "Teclados Red lineales | SaintGeek",
    description: "Velocidad y precisión para gaming competitivo."
  },
  "switch-blue": {
    h1: "Teclados con switches Blue (clicky)",
    p: "Click audible y tacto marcado (~50 g). Sensación clásica para quienes disfrutan feedback sonoro.",
    title: "Teclados Blue clicky | SaintGeek",
    description: "Respuesta nítida y durabilidad."
  },
  "switch-brown": {
    h1: "Teclados con switches Brown (táctiles)",
    p: "Golpe táctil sin click sonoro. Excelente equilibrio entre juego y oficina.",
    title: "Teclados Brown táctiles | SaintGeek",
    description: "Comodidad y control para todo uso."
  },
  "switch-silent": {
    h1: "Teclados con switches Silent",
    p: "Más silenciosos para espacios compartidos, sin sacrificar respuesta.",
    title: "Teclados Silent | SaintGeek",
    description: "Perfectos para oficina y teletrabajo."
  },

  // Uso
  "gaming": {
    h1: "Teclados mecánicos para gaming",
    p: "RGB, anti-ghosting y switches de respuesta rápida para jugar mejor.",
    title: "Teclados gamer mecánicos | SaintGeek",
    description: "Compactos 60/65, TKL y full size en Chile."
  },
  "gaming-competitivo": {
    h1: "Teclados para gaming competitivo",
    p: "Rendimiento y consistencia: lo que exige el juego profesional.",
    title: "Teclados eSports | SaintGeek",
    description: "Latencia baja, estabilidad y precisión."
  },
  "shooters": {
    h1: "Teclados para shooters (FPS)",
    p: "Rapidez y fiabilidad para Valorant, CS y más. Control absoluto del mouse con formatos compactos.",
    title: "Teclados para FPS | SaintGeek",
    description: "Switches Red y anti-ghosting para ganar ventaja."
  },
  "moba": {
    h1: "Teclados para MOBAs",
    p: "Combinaciones precisas y teclas consistentes para LoL y Dota 2.",
    title: "Teclados MOBA | SaintGeek",
    description: "N-key rollover y atajos prácticos."
  },
  "mmorpg": {
    h1: "Teclados para MMORPG",
    p: "Maratones cómodas con switches confiables y funciones de acceso rápido.",
    title: "Teclados MMORPG | SaintGeek",
    description: "Resistencia y ergonomía para el late game."
  },
  "oficina": {
    h1: "Teclados mecánicos para oficina",
    p: "Escritura cómoda y confiable. Elige tacto y sonido a tu gusto.",
    title: "Teclados para oficina | SaintGeek",
    description: "Opciones silenciosas y compactas."
  },
  "teletrabajo": {
    h1: "Teclados para teletrabajo",
    p: "Ergonomía, silencio y tamaño ideal para cualquier escritorio en casa.",
    title: "Teclados teletrabajo | SaintGeek",
    description: "Conecta a PC/Mac con USB-C o Bluetooth."
  },
  "programadores": {
    h1: "Teclados para programadores",
    p: "Precisión al teclear, perfiles cómodos y formatos que maximizan el flujo.",
    title: "Teclados para programar | SaintGeek",
    description: "60/65/TKL con switches que reducen fatiga."
  },
  "escritura": {
    h1: "Teclados para escritura",
    p: "Sensación consistente y sonido agradable para redactar sin distracciones.",
    title: "Teclados para escribir | SaintGeek",
    description: "Elige tacto (táctil/lineal) según tu estilo."
  },

  // Layout e idioma
  "layout-es": {
    h1: "Teclados con layout Español",
    p: "Distribución en Español con Ñ y tildes impresas. Listos para Chile.",
    title: "Teclados Español (con Ñ) | SaintGeek",
    description: "Compatibles con PC y Mac. Diferentes tamaños."
  },
  "layout-latam": {
    h1: "Teclados layout Español LatAm",
    p: "Distribución LatAm para escribir sin errores de mapeo.",
    title: "Teclados Español LatAm | SaintGeek",
    description: "Incluye Ñ y símbolos correctos."
  },
  "ansi": {
    h1: "Teclados ANSI",
    p: "Enter horizontal y distribución popular para gaming y trabajo.",
    title: "Teclados ANSI | SaintGeek",
    description: "Amplia compatibilidad y repuestos fáciles."
  },
  "iso": {
    h1: "Teclados ISO",
    p: "Enter vertical y disposición Europea. Preferida por algunos escritores.",
    title: "Teclados ISO | SaintGeek",
    description: "Opciones mecánicas con y sin RGB."
  },

  // Colores
  "negro": {
    h1: "Teclados mecánicos negros",
    p: "Elegantes, discretos y combinan con cualquier setup gamer u oficina.",
    title: "Teclados negros | SaintGeek",
    description: "60/65/TKL con RGB y switches mecánicos."
  },
  "blanco": {
    h1: "Teclados mecánicos blancos",
    p: "Look clean para setups minimalistas y estéticos.",
    title: "Teclados blancos | SaintGeek",
    description: "Compactos con RGB y USB-C."
  },
  "azul": {
    h1: "Teclados mecánicos azules",
    p: "Un toque de color sin perder rendimiento.",
    title: "Teclados azules | SaintGeek",
    description: "Con RGB y opciones hot-swap."
  },
  "azul-claro": {
    h1: "Teclados mecánicos azul claro",
    p: "Estética fresca y diferente para destacar tu escritorio.",
    title: "Teclados azul claro | SaintGeek",
    description: "Elige switches y formato ideal."
  },

  // Modelos que vendes
  "ag61": {
    h1: "SaintGeek AG61 (60%)",
    p: "Compacto con hot-swap, RGB y cable USB-C desmontable. Ideal para gaming y escritura.",
    title: "Teclado AG61 60% | SaintGeek",
    description: "61 teclas, switches Red/Blue y construcción sólida."
  },
  "tk61": {
    h1: "TK61 (60%)",
    p: "Formato 60% con RGB y cable USB-C. Balance perfecto entre precio y rendimiento.",
    title: "Teclado TK61 60% | SaintGeek",
    description: "Compacto, cómodo y listo para jugar."
  },
  "tk68": {
    h1: "TK68 (65%)",
    p: "65% con flechas dedicadas y retroiluminación RGB. Cómodo para jugar y trabajar.",
    title: "Teclado TK68 65% | SaintGeek",
    description: "68 teclas y conexión USB-C."
  }
}

/** ------------------------------
 * buildCopy(): Generador automático de H1/Title/Description para cualquier tag
 * ------------------------------ */
type Copy = { h1: string; p: string; title: string; description: string }

export function buildCopy(slug: string): Copy {
  const s = slugifyTag(slug)
  const human = humanizeTag(s)

  // Detección básica
  const has = (k: string) => s.includes(k)

  // Tamaño / enfoque
  let size = ""
  if (has("60") || has("61-teclas")) size = "60% (61 teclas)"
  else if (has("65") || has("68-teclas")) size = "65% (68 teclas)"
  else if (has("tkl") || has("80")) size = "TKL (80%)"
  else if (has("full") || has("104-teclas") || has("100")) size = "Full size (100%)"

  // Switch
  let switchDesc = ""
  if (has("switch-red") || has("rojo")) switchDesc = "con switches Red (lineales)"
  else if (has("switch-blue") || has("azul-") || has("clicky")) switchDesc = "con switches Blue (clicky)"
  else if (has("switch-brown") || has("cafe") || has("tactil")) switchDesc = "con switches Brown (táctiles)"
  else if (has("switch-silent") || has("silent")) switchDesc = "con switches Silent"

  // Conectividad / features
  const feat: string[] = []
  if (has("rgb")) feat.push("RGB")
  if (has("hot-swap")) feat.push("Hot-Swap 3/5-pin")
  if (has("anti-ghosting")) feat.push("anti-ghosting")
  if (has("n-key-rollover")) feat.push("N-key rollover")
  if (has("bluetooth")) feat.push("Bluetooth")
  if (has("inalambrico")) feat.push("inalámbrico")
  if (has("usb-c")) feat.push("USB-C")

  // Color
  const colorMap: Record<string,string> = {
    "negro": "negro",
    "blanco": "blanco",
    "azul-claro": "azul claro",
    "azul": "azul",
    "rosado": "rosado",
    "morado": "morado",
    "verde": "verde",
    "gris": "gris",
  }
  const colorHit = Object.keys(colorMap).find(k => has(k))
  const colorStr = colorHit ? ` en color ${colorMap[colorHit]}` : ""

  // Construye piezas
  const h1Core = size ? `Teclados mecánicos ${size}` : `Teclados mecánicos ${human}`
  const h1 = `${h1Core}${colorStr}${switchDesc ? " " + switchDesc : ""}`.trim()

  const featLine = feat.length ? `, ${feat.join(", ")}` : ""
  const p = `Elige tu teclado mecánico${size ? ` ${size}` : ""}${colorStr} ${switchDesc ? ` ${switchDesc}` : ""}${featLine ? ` con ${feat.join(", ")}` : ""}. Diseñados para gaming y oficina con excelente relación precio-rendimiento.`.replace(/\s+/g, " ").trim()

  const baseHuman = human[0].toUpperCase() + human.slice(1)
  const title = `Teclados ${baseHuman} en Chile | SaintGeek`
  const description = `Compra teclados ${baseHuman}${size ? ` ${size}` : ""}${colorStr}. Opciones con ${feat.length ? feat.join(", ") : "switches mecánicos de calidad"}. Despacho en Chile y garantía SaintGeek.`

  return { h1, p, title, description }
}

/** ------------------------------
 * API principal: getTagCopy()
 * ------------------------------ */
export function getTagCopy(slug: string) {
  const s = slugifyTag(slug)
  const curated = COPY[s]
  if (curated) return curated
  return buildCopy(s)
}
