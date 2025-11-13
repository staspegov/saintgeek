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
 * Tipos + helper para FAQs
 * ------------------------------ */
export type TagFaq = {
  question: string
  answer: string
}

export type TagCopy = {
  h1: string
  p: string
  title: string
  description: string
  faq: TagFaq[]
}

/** Fallback genérico SOLO para tags no curados */
const defaultFaq = (label: string): TagFaq[] => [
  {
    question: `¿Qué significa la etiqueta ${label} en un teclado mecanico gamer?`,
    answer: `La etiqueta ${label} indica una característica concreta del teclado mecanico gamer, como su formato, tipo de switch o uso recomendado. Sirve para que identifiques más rápido qué modelo encaja mejor con tu forma de jugar, trabajar o estudiar.`
  },
  {
    question: `¿Para quién es recomendable un teclado mecanico gamer ${label}?`,
    answer: `Un teclado mecanico gamer ${label} suele estar pensado para un tipo de usuario específico: por ejemplo, alguien que necesita un formato compacto, una sensación de tecleo concreta o una función especial. Revisar la ficha del producto te ayuda a ver si coincide con tu perfil de uso.`
  },
  {
    question: `¿Qué debo revisar antes de comprar un teclado mecanico gamer ${label}?`,
    answer: `Antes de comprar un teclado mecanico gamer ${label} revisa el tipo de switch, la conexión (USB-C, Bluetooth, inalámbrico), el formato y extras como RGB, anti-ghosting o N-key rollover. Así te aseguras de que el periférico realmente resuelve lo que necesitas.`
  },
  {
    question: `¿Un teclado mecanico gamer ${label} sirve también fuera del gaming?`,
    answer: `Sí, un teclado mecanico gamer ${label} se puede usar perfectamente para oficina, estudio o creación de contenido. Lo importante es que el nivel de ruido, el tamaño y la distribución de teclas sean cómodos para tu día a día.`
  }
]

/** ------------------------------
 * COPY curado (hecho a mano para los tags más buscados)
 * ------------------------------ */
export const COPY: Record<string, TagCopy> = {
  // Formatos clave
  "mecanico-gamer-60": {
    h1: "Teclados mecánicos gamer 60% (compactos)",
    p: "Los teclados mecánicos gamer 60% concentran lo esencial en 61 teclas, liberando espacio para el mouse y ofreciendo una experiencia de teclado mecanico gamer rápida y precisa. Son ideales para setups minimalistas, escritorios pequeños y jugadores que necesitan máximo movimiento del mouse en shooters y juegos competitivos.",
    title: "Teclado mecanico gamer 60% (61 teclas) en Chile | SaintGeek",
    description: "Encuentra tu teclado mecanico gamer 60% (61 teclas) con switches mecánicos de alto rendimiento, iluminación RGB y diseño compacto. Perfecto para gaming competitivo, escritura diaria y setups minimalistas, con envío a todo Chile y garantía SaintGeek en cada teclado mecánico gamer.",
    faq: [
      {
        question: "¿Qué gano y qué sacrifico al elegir un teclado mecanico gamer 60%?",
        answer: "Con un teclado mecanico gamer 60% ganas mucho espacio para el mouse, una postura más centrada y un escritorio más limpio. A cambio, sacrificas el pad numérico y algunas teclas dedicadas, que pasan a estar en combinaciones con la tecla Fn."
      },
      {
        question: "¿Es buena idea un teclado mecanico gamer 60% si juego shooters competitivos?",
        answer: "Sí, el formato 60% es uno de los favoritos en FPS competitivos porque reduce el ancho del teclado y libera movimiento para el mouse. Un teclado mecanico gamer 60% bien construido te da más control y comodidad en sesiones largas de juego."
      },
      {
        question: "¿Puedo usar un teclado mecanico gamer 60% para trabajar o estudiar todos los días?",
        answer: "Puedes usarlo sin problema si te adaptas a las funciones en capas. Un teclado mecanico gamer 60% sigue teniendo todas las teclas necesarias, solo que algunas se acceden con combinaciones. Es ideal si tu escritorio es pequeño o quieres un setup minimalista."
      },
      {
        question: "¿En qué debo fijarme antes de comprar un teclado mecanico gamer 60%?",
        answer: "Revisa el tipo de switches, si es hot-swap, el tipo de conexión (solo cable, Bluetooth o inalámbrico), la calidad de la carcasa y si permite personalizar RGB y macros. Eso marcará la diferencia en la experiencia diaria con tu teclado mecanico gamer 60%."
      }
    ]
  },
  "mecanico-gamer-65": {
    h1: "Teclados mecánicos gamer 65% (68 teclas)",
    p: "El formato 65% agrega flechas dedicadas y algunas teclas extra sin perder el espíritu compacto del teclado mecanico gamer. Es la opción perfecta si quieres un teclado mecánico gamer cómodo para escribir, programar y jugar, manteniendo el espacio libre en el escritorio.",
    title: "Teclado mecanico gamer 65% (68 teclas) en Chile | SaintGeek",
    description: "Compra tu teclado mecanico gamer 65% (68 teclas) con flechas dedicadas, iluminación RGB y switches mecánicos intercambiables. Este formato equilibra muy bien productividad y gaming, ideal para setups pequeños que necesitan un teclado mecánico gamer versátil para todo uso.",
    faq: [
      {
        question: "¿En qué se diferencia un teclado mecanico gamer 65% de uno 60%?",
        answer: "Un teclado mecanico gamer 65% añade flechas dedicadas y algunas teclas de navegación respecto al 60%, manteniendo el cuerpo compacto. Es muy cómodo si usas a menudo las flechas para escribir, navegar por código o editar texto."
      },
      {
        question: "¿Es buena opción un teclado mecanico gamer 65% para programar?",
        answer: "Sí. Muchos desarrolladores prefieren un teclado mecanico gamer 65% porque ofrece flechas, tecla Delete y navegación básica sin ocupar tanto espacio como un TKL. Es un equilibrio cómodo entre funcionalidad y compacidad."
      },
      {
        question: "¿Un teclado mecanico gamer 65% sirve para cualquier tipo de juego?",
        answer: "En la práctica sí: un teclado mecanico gamer 65% funciona muy bien para shooters, MOBAs y MMORPG. Tienes suficientes teclas para habilidades y macros, y más espacio que con un full size para mover el mouse."
      },
      {
        question: "¿Qué debo considerar antes de elegir un teclado mecanico gamer 65%?",
        answer: "Fíjate en el tipo de switches, si las flechas son físicas o en capa Fn, el layout (Español/LatAm) y la conectividad. Un buen teclado mecanico gamer 65% debe sentirse sólido, estable y ofrecer una distribución cómoda para tu día a día."
      }
    ]
  },
  "tkl-80": {
    h1: "Teclados mecánicos TKL (80%)",
    p: "Los teclados mecánicos TKL (tenkeyless) eliminan el pad numérico para ganar espacio y ergonomía, sin renunciar a las teclas de función y navegación. Son una opción de teclado mecanico gamer muy popular entre jugadores y creadores que necesitan equilibrio entre tamaño, confort y rendimiento.",
    title: "Teclado mecanico gamer TKL (80%) en Chile | SaintGeek",
    description: "Elige tu teclado mecanico gamer TKL (80%) con switches mecánicos de alta calidad, anti-ghosting, N-key rollover y, según el modelo, retroiluminación RGB. Estos teclados mecánicos gamer ofrecen una posición más cómoda del mouse y un layout completo para jugar y trabajar a diario.",
    faq: [
      {
        question: "¿Qué ventajas tiene un teclado mecanico gamer TKL frente a uno full size?",
        answer: "Un teclado mecanico gamer TKL elimina el pad numérico, lo que reduce el ancho total y mejora la postura de hombros y muñecas. Sigues teniendo F1–F12 y teclas de navegación, pero con más espacio para el mouse y un escritorio menos saturado."
      },
      {
        question: "¿Un teclado mecanico gamer TKL es suficiente para trabajo de oficina?",
        answer: "Sí, salvo que dependas mucho del pad numérico. Para la mayoría de tareas de oficina, un teclado mecanico gamer TKL ofrece todas las teclas necesarias y suma una experiencia de escritura más cómoda y precisa que un teclado de membrana."
      },
      {
        question: "¿Es un buen formato de teclado mecanico gamer para eSports?",
        answer: "Muchos jugadores competitivos usan formato TKL porque equilibra espacio para el mouse y acceso a todas las teclas principales. Si no usas el numpad para jugar, un teclado mecanico gamer TKL es una opción excelente para eSports."
      },
      {
        question: "¿Qué debo revisar antes de comprar un teclado mecanico gamer TKL?",
        answer: "Revisa el tipo de switch, la calidad de construcción, si incluye anti-ghosting y N-key rollover, y la conectividad (USB-C, inalámbrico o ambas). Un buen teclado mecanico gamer TKL debe sentirse robusto y ofrecer respuesta consistente en cada pulsación."
      }
    ]
  },
  "full-size-100": {
    h1: "Teclados mecánicos Full Size (100%)",
    p: "Los teclados mecánicos full size incluyen bloque numérico completo, ideal para contabilidad, hojas de cálculo y gaming donde se valoran todas las teclas. Son el formato clásico para quien busca un teclado mecanico gamer robusto, estable y listo para largas jornadas de uso intensivo.",
    title: "Teclado mecanico gamer Full Size (100%) en Chile | SaintGeek",
    description: "Compra tu teclado mecanico gamer full size (100%) con pad numérico, switches mecánicos duraderos y opciones con retroiluminación RGB. Este tipo de teclado mecánico gamer es perfecto para trabajo de oficina, edición, streaming y gaming, manteniendo siempre máxima comodidad y control.",
    faq: [
      {
        question: "¿Cuándo conviene elegir un teclado mecanico gamer full size y no uno compacto?",
        answer: "Conviene cuando trabajas mucho con números, usas atajos extendidos o simplemente prefieres tener todas las teclas dedicadas. Un teclado mecanico gamer full size te da el máximo control a costa de ocupar más espacio en el escritorio."
      },
      {
        question: "¿Un teclado mecanico gamer full size es incómodo para jugar FPS?",
        answer: "No es incómodo, pero deja menos espacio lateral para el mouse que un formato 60%, 65% o TKL. Si tienes un escritorio amplio, un teclado mecanico gamer full size sigue siendo muy válido para shooters y otros géneros."
      },
      {
        question: "¿Es mejor un teclado mecanico gamer full size para Excel y trabajo financiero?",
        answer: "Sí. El pad numérico de un teclado mecanico gamer full size acelera mucho el ingreso de datos, especialmente en hojas de cálculo y software contable. Es la elección natural si combinas gaming con trabajo numérico intenso."
      },
      {
        question: "¿Qué debo considerar al comprar un teclado mecanico gamer full size?",
        answer: "Fíjate en el tipo de switches, la calidad de construcción, la distribución del layout y si el cable es USB-C desmontable. Un buen teclado mecanico gamer full size debe ser estable, cómodo y soportar muchas horas de uso sin problemas."
      }
    ]
  },
  "61-teclas": {
    h1: "61 teclas: compactos y portátiles",
    p: "Un teclado de 61 teclas concentra las funciones principales en un formato súper compacto, ideal para llevar en mochila o usar en escritorios muy pequeños. Si buscas un teclado mecanico gamer fácil de transportar y con espacio máximo para el mouse, este número de teclas es el estándar 60%.",
    title: "Teclado mecanico gamer de 61 teclas en Chile | SaintGeek",
    description: "Descubre tu teclado mecanico gamer de 61 teclas con conexión USB-C, iluminación RGB y switches mecánicos cómodos para escribir y jugar. Este tipo de teclado mecánico gamer es perfecto para setups minimalistas, streamers y gamers que priorizan el movimiento del mouse y la portabilidad.",
    faq: [
      {
        question: "¿Por qué muchos teclados mecanico gamer 60% tienen 61 teclas?",
        answer: "Porque 61 teclas es la distribución mínima que mantiene letras, números y teclas modificadoras principales. Un teclado mecanico gamer de 61 teclas ofrece todas las funciones básicas, moviendo algunas a combinaciones con la tecla Fn."
      },
      {
        question: "¿Es práctico un teclado mecanico gamer de 61 teclas para uso diario?",
        answer: "Sí, siempre que te acostumbres a sus capas. Una vez memorizadas las combinaciones, un teclado mecanico gamer de 61 teclas es muy cómodo y te deja un escritorio mucho más ordenado y despejado."
      },
      {
        question: "¿Qué ventajas tiene un teclado mecanico gamer de 61 teclas para streamers?",
        answer: "Al ser compacto, un teclado mecanico gamer de 61 teclas deja espacio para micrófono, interfaz de audio y otros periféricos. Además, la cámara suele encuadrar mejor el setup, mostrando más mousepad y menos teclado."
      },
      {
        question: "¿Con qué tipo de usuario no se recomienda un teclado mecanico gamer de 61 teclas?",
        answer: "No es lo ideal para quienes dependen mucho de teclas de función dedicadas o prefieren ver todo mapeado de manera directa. Si no te gustan las combinaciones Fn, puede que un 65% o TKL sea un mejor teclado mecanico gamer para ti."
      }
    ]
  },
  "68-teclas": {
    h1: "68 teclas: 65% con flechas dedicadas",
    p: "Los teclados de 68 teclas añaden flechas y algunas teclas de navegación a un cuerpo compacto, muy apreciado por quienes usan el teclado mecanico gamer tanto para jugar como para trabajar. Entregan una experiencia cómoda en escritura, gaming y uso diario sin ocupar demasiado espacio.",
    title: "Teclado mecanico gamer de 68 teclas en Chile | SaintGeek",
    description: "Encuentra tu teclado mecanico gamer de 68 teclas (formato 65%) con switches mecánicos, RGB y cable USB-C desmontable. Este teclado mecánico gamer ofrece el balance ideal entre compacidad y funcionalidad para gaming, programación, estudio y trabajo remoto.",
    faq: [
      {
        question: "¿Qué aporta un teclado mecanico gamer de 68 teclas frente a uno de 61?",
        answer: "Un teclado mecanico gamer de 68 teclas suma flechas dedicadas y algunas teclas extra, lo que hace más cómodo editar texto, navegar por código y jugar, sin crecer demasiado en tamaño."
      },
      {
        question: "¿Es un buen punto medio un teclado mecanico gamer de 68 teclas?",
        answer: "Sí. Ofrece más funcionalidad que un 60% y sigue siendo bastante compacto. Por eso, un teclado mecanico gamer de 68 teclas es un formato muy popular entre usuarios que combinan gaming y productividad."
      },
      {
        question: "¿Un teclado mecanico gamer de 68 teclas es suficiente para MMORPG y MOBAs?",
        answer: "En la mayoría de casos sí. Un teclado mecanico gamer de 68 teclas tiene espacio para atajos, habilidades y teclas de función básicas, manteniendo la comodidad y el control en partidas largas."
      },
      {
        question: "¿Qué debo revisar antes de elegir un teclado mecanico gamer de 68 teclas?",
        answer: "Revisa el layout (Español/LatAm), el tipo de switches, si es hot-swap y la calidad del cable o conexión inalámbrica. Así te aseguras de que el teclado mecanico gamer de 68 teclas encaje perfecto con tu setup."
      }
    ]
  },
  "teclado-mecanico-gamer": {
    h1: "Teclados mecánicos gamer",
    p: "Bajo la etiqueta teclado mecanico gamer agrupamos teclados con switches mecánicos, mejor respuesta, mayor durabilidad y funciones pensadas para jugar: anti-ghosting, N-key rollover, RGB y más. Son ideales para quienes quieren subir de nivel desde un teclado de membrana y mejorar su experiencia en cada partida.",
    title: "Teclado mecanico gamer en Chile | SaintGeek",
    description: "Explora nuestra selección de teclado mecanico gamer en formatos 60%, 65%, TKL y full size, con distintos tipos de switches, iluminación RGB y diseños para todo tipo de setup. Elige el teclado mecánico gamer perfecto para Valorant, CS, LoL, trabajo de oficina o estudio, con envíos a todo Chile.",
    faq: [
      {
        question: "¿Qué ventajas ofrece un teclado mecanico gamer frente a un teclado de membrana?",
        answer: "Un teclado mecanico gamer ofrece mejor respuesta, mayor precisión y una vida útil mucho más larga gracias a sus switches individuales. Además, suele incluir funciones específicas para jugar, como anti-ghosting, N-key rollover y personalización de iluminación."
      },
      {
        question: "¿Qué tipo de switch debería elegir en un teclado mecanico gamer?",
        answer: "Si priorizas velocidad y suavidad, los switches Red suelen ser la mejor opción. Para una sensación táctil equilibrada, los Brown funcionan muy bien; y si te gusta el clic sonoro clásico, puedes optar por Blue. Todo depende del ruido que toleres y de tu estilo de juego y escritura."
      },
      {
        question: "¿Un teclado mecanico gamer es solo para gaming?",
        answer: "No. Un teclado mecanico gamer se disfruta igual o más en tareas de oficina, estudio, programación y creación de contenido. La comodidad y la precisión que aporta se notan en cualquier actividad donde escribas mucho."
      },
      {
        question: "¿Cómo cuidar mi teclado mecanico gamer para que dure más años?",
        answer: "Evita comer encima del teclado, limpia el polvo de forma periódica, utiliza aire comprimido o un pincel suave y, si es hot-swap, reemplaza switches dañados en lugar de seguir usándolos forzados. Así tu teclado mecanico gamer se mantiene fino durante mucho tiempo."
      }
    ]
  },
  "sin-numpad": {
    h1: "Teclados mecánicos sin numpad",
    p: "Los teclados mecánicos sin numpad liberan espacio a la derecha para mover mejor el mouse y adoptar una postura más cómoda. Son una opción de teclado mecanico gamer muy valorada en gaming competitivo y setups minimalistas donde se prioriza la ergonomía y el control.",
    title: "Teclado mecanico gamer sin numpad en Chile | SaintGeek",
    description: "Compra tu teclado mecanico gamer sin numpad en formatos 60%, 65% o TKL, con switches mecánicos de calidad y, según el modelo, RGB y funciones avanzadas. Este tipo de teclado mecánico gamer es ideal para quienes casi no usan el pad numérico y buscan un escritorio más limpio y cómodo.",
    faq: [
      {
        question: "¿Quién se beneficia más de un teclado mecanico gamer sin numpad?",
        answer: "Se benefician los jugadores que necesitan mucho espacio para el mouse, los usuarios con escritorios pequeños y quienes quieren una postura más centrada frente a la pantalla. Un teclado mecanico gamer sin numpad ayuda a aliviar tensión en hombros y muñecas."
      },
      {
        question: "¿Perder el numpad en un teclado mecanico gamer complica el trabajo diario?",
        answer: "Solo si trabajas continuamente con números, contabilidad o Excel avanzado. Para la mayoría de usuarios, un teclado mecanico gamer sin numpad sigue siendo más que suficiente para tareas de oficina, estudio y gaming."
      },
      {
        question: "¿Un teclado mecanico gamer sin numpad es mejor para eSports?",
        answer: "Muchos jugadores competitivos lo prefieren precisamente por el espacio adicional para el mouse. Un teclado mecanico gamer sin numpad permite movimientos amplios con menos choque entre periféricos."
      },
      {
        question: "¿Hay algo que deba revisar antes de elegir un teclado mecanico gamer sin numpad?",
        answer: "Revisa el formato (60%, 65% o TKL), el tipo de switches, el layout y la calidad de construcción. Un teclado mecanico gamer sin numpad debe ofrecerte buena estabilidad en el escritorio y una distribución cómoda de las teclas que sí usas a diario."
      }
    ]
  },
  "con-numpad": {
    h1: "Teclados mecánicos con numpad",
    p: "Los teclados mecánicos con pad numérico son perfectos para quienes trabajan con números, hojas de cálculo o software de contabilidad, sin dejar de ser un excelente teclado mecanico gamer. Entregan máxima funcionalidad y comodidad tanto en gaming como en productividad diaria.",
    title: "Teclado mecanico gamer con numpad en Chile | SaintGeek",
    description: "Encuentra tu teclado mecanico gamer con numpad, ideal para oficina, estudios y juegos donde necesitas todas las teclas a la mano. Con switches mecánicos duraderos, opciones con RGB y construcción sólida, estos teclados mecánicos gamer ofrecen la experiencia más completa en tu escritorio.",
    faq: [
      {
        question: "¿Qué tipo de usuario debería elegir un teclado mecanico gamer con numpad?",
        answer: "Debería elegirlo quien trabaja intensivamente con números, hojas de cálculo, contabilidad o edición de vídeo donde el pad numérico acelera el flujo. Un teclado mecanico gamer con numpad también es cómodo si estás acostumbrado al formato clásico de escritorio."
      },
      {
        question: "¿Un teclado mecanico gamer con numpad ocupa demasiado espacio para jugar?",
        answer: "Ocupa más que un 60%, 65% o TKL, pero si tu escritorio es amplio no será un problema. Un teclado mecanico gamer con numpad puede usarse perfectamente para gaming, solo debes ajustar la posición del mouse y la alfombrilla."
      },
      {
        question: "¿Es buena idea un teclado mecanico gamer con numpad para uso mixto oficina/gaming?",
        answer: "Sí, es una de las opciones más versátiles. Tendrás la comodidad del pad numérico para trabajar y todas las ventajas de un teclado mecanico gamer para jugar, como switches de calidad y mejor respuesta en cada pulsación."
      },
      {
        question: "¿En qué debo fijarme antes de comprar un teclado mecanico gamer con numpad?",
        answer: "Revisa el tipo de switch, la calidad de los estabilizadores en las teclas largas, el tipo de iluminación y si el cable es desmontable. Un buen teclado mecanico gamer con numpad debe sentirse sólido, estable y cómodo para muchas horas de uso."
      }
    ]
  },

  // Conectividad
  "inalambrico": {
    h1: "Teclados mecánicos inalámbricos",
    p: "Un teclado mecánico inalámbrico te permite tener un escritorio limpio y sin cables, manteniendo la respuesta y sensación de un teclado mecanico gamer. Son ideales para setups minimalistas, espacios compartidos y usuarios que alternan entre varios dispositivos sin complicaciones.",
    title: "Teclado mecanico gamer inalámbrico en Chile | SaintGeek",
    description: "Elige tu teclado mecanico gamer inalámbrico con batería de larga duración, conexión estable y switches mecánicos cómodos para escribir y jugar. Estos teclados mecánicos gamer son perfectos para teletrabajo, gaming en notebook y setups donde la estética sin cables es prioridad.",
    faq: [
      {
        question: "¿Un teclado mecanico gamer inalámbrico tiene más latencia que uno con cable?",
        answer: "La latencia es ligeramente mayor en comparación con un cable directo, pero en modelos modernos con 2.4 GHz la diferencia suele ser mínima. Para la mayoría de jugadores, un buen teclado mecanico gamer inalámbrico ofrece una experiencia muy fluida."
      },
      {
        question: "¿Cuánta autonomía debería tener un teclado mecanico gamer inalámbrico?",
        answer: "Idealmente, varios días de uso intensivo o semanas si desactivas RGB. Un teclado mecanico gamer inalámbrico con buena batería te evita estar cargando a cada rato y hace más cómodo el teletrabajo o gaming casual."
      },
      {
        question: "¿Es seguro usar un teclado mecanico gamer inalámbrico en entornos profesionales?",
        answer: "Sí, siempre que uses modelos con cifrado y dongles de confianza. Un teclado mecanico gamer inalámbrico de marca reconocida reduce mucho el riesgo de interferencias o conexiones no deseadas."
      },
      {
        question: "¿Qué debo revisar al comprar un teclado mecanico gamer inalámbrico?",
        answer: "Revisa si incluye modo 2.4 GHz además de Bluetooth, la duración de batería con y sin RGB, el tipo de switches y la estabilidad de la conexión. Así eliges un teclado mecanico gamer inalámbrico que no te deje tirado a mitad de partida o reunión."
      }
    ]
  },
  "bluetooth": {
    h1: "Teclados mecánicos Bluetooth",
    p: "Los teclados mecánicos Bluetooth permiten conectar tu teclado mecanico gamer a PC, Mac, tablet y hasta celular, muchas veces con emparejamiento multi-dispositivo. Son la opción perfecta para quienes cambian de equipo a lo largo del día sin querer perder la sensación mecánica al teclear.",
    title: "Teclado mecanico gamer Bluetooth en Chile | SaintGeek",
    description: "Compra tu teclado mecanico gamer Bluetooth compatible con múltiples sistemas operativos, con switches mecánicos de calidad y opciones con RGB. Este tipo de teclado mecánico gamer es ideal para escritorio híbrido, trabajo remoto y setups donde alternas entre notebook, tablet y PC.",
    faq: [
      {
        question: "¿Un teclado mecanico gamer Bluetooth sirve para jugar shooters competitivos?",
        answer: "Puede servir, pero si buscas el menor input-lag posible es mejor usarlo por cable o 2.4 GHz. El modo Bluetooth en un teclado mecanico gamer está pensado principalmente para productividad y uso general en varios dispositivos."
      },
      {
        question: "¿Cuántos dispositivos puede manejar un teclado mecanico gamer Bluetooth a la vez?",
        answer: "Depende del modelo, pero muchos teclados mecanico gamer Bluetooth permiten enlazar hasta 3 dispositivos y cambiar entre ellos con una combinación de teclas. Es ideal para trabajar con notebook, tablet y PC sin desconectar nada."
      },
      {
        question: "¿Hay diferencia de autonomía usando Bluetooth frente a 2.4 GHz en un teclado mecanico gamer?",
        answer: "Suele haber pequeñas diferencias según el fabricante, pero en general Bluetooth es eficiente en consumo. Lo que más afecta la batería de un teclado mecanico gamer Bluetooth es el uso de iluminación RGB a alto brillo."
      },
      {
        question: "¿Qué debo revisar antes de comprar un teclado mecanico gamer Bluetooth?",
        answer: "Asegúrate de que sea compatible con los sistemas que usas (Windows, macOS, Android, iOS), revisa la cantidad de dispositivos que soporta y la calidad de los switches. Así tienes un teclado mecanico gamer Bluetooth realmente útil en tu ecosistema."
      }
    ]
  },
  "con-cable": {
    h1: "Teclados mecánicos con cable",
    p: "La conexión por cable sigue siendo la preferida en eSports y gaming competitivo por su estabilidad y baja latencia. Un teclado mecanico gamer con cable USB ofrece respuesta inmediata, sin depender de batería, ideal para quienes priorizan rendimiento por sobre movilidad.",
    title: "Teclado mecanico gamer con cable en Chile | SaintGeek",
    description: "Descubre tu teclado mecanico gamer con cable USB o USB-C, con switches mecánicos precisos y opciones con retroiluminación RGB. Estos teclados mecánicos gamer son ideales para jugar FPS, MOBAs y títulos competitivos donde cada milisegundo de respuesta cuenta.",
    faq: [
      {
        question: "¿Por qué muchos jugadores siguen prefiriendo un teclado mecanico gamer con cable?",
        answer: "Porque un teclado mecanico gamer con cable ofrece la latencia más baja y una conexión muy estable sin depender de batería. Es la opción más segura para partidas competitivas y sesiones largas de juego."
      },
      {
        question: "¿Un teclado mecanico gamer con cable se puede usar igual con notebook?",
        answer: "Sí, solo necesitas un puerto USB disponible (o USB-C según el modelo). Un teclado mecanico gamer con cable funciona perfecto con notebooks y PC de escritorio, sin configuraciones especiales."
      },
      {
        question: "¿Es molesto el cable en un teclado mecanico gamer?",
        answer: "Si organizas bien tu escritorio y usas un cable flexible o enrutado por detrás, el cable prácticamente deja de notarse. Muchos teclados mecanico gamer modernos incluyen cables desmontables para facilitar la gestión."
      },
      {
        question: "¿Qué debo revisar al elegir un teclado mecanico gamer con cable?",
        answer: "Verifica si el cable es USB-C desmontable, la calidad del recubrimiento (trenzado o no), la longitud y la salida del conector en el teclado. Un buen cable mejora mucho la experiencia de uso del teclado mecanico gamer."
      }
    ]
  },
  "usb-c": {
    h1: "Teclados con USB-C desmontable",
    p: "Un teclado mecanico gamer con cable USB-C desmontable facilita el transporte, el reemplazo del cable y la gestión de tu escritorio. Es una característica moderna muy valorada en teclados mecánicos gamer compactos y setups donde la organización y el modding importan.",
    title: "Teclado mecanico gamer con USB-C en Chile | SaintGeek",
    description: "Compra tu teclado mecanico gamer con cable USB-C desmontable, ideal para conectar en PC, notebook y otros dispositivos. Este tipo de teclado mecánico gamer ofrece comodidad para transporte, facilidad para cambiar el cable y compatibilidad con la mayoría de setups actuales.",
    faq: [
      {
        question: "¿Qué ventajas tiene un teclado mecanico gamer con USB-C desmontable?",
        answer: "Te permite cambiar el cable si se daña, usar uno más largo o corto según tu escritorio y guardar el teclado de forma más cómoda. Además, el estándar USB-C es el más usado actualmente, lo que hace más versátil tu teclado mecanico gamer."
      },
      {
        question: "¿Puedo usar cualquier cable con mi teclado mecanico gamer USB-C?",
        answer: "En general sí, mientras sea un cable USB-C de buena calidad y datos. Sin embargo, algunos teclados mecanico gamer pueden tener carcasas con ranuras ajustadas, por lo que los conectores muy gruesos pueden no encajar bien."
      },
      {
        question: "¿Un teclado mecanico gamer con USB-C funciona igual en PC y notebook?",
        answer: "Sí, funciona exactamente igual. Basta con conectar el cable USB-C a un puerto disponible (directamente o mediante adaptador) y tu teclado mecanico gamer quedará listo para usarse en cualquier equipo compatible."
      },
      {
        question: "¿Qué debo revisar antes de comprar un teclado mecanico gamer con USB-C?",
        answer: "Comprueba que el puerto sea robusto, que el cable incluido tenga buena calidad y que la salida esté bien ubicada para tu gestión de cables. Un teclado mecanico gamer con USB-C bien diseñado hace tu setup más ordenado y fácil de mantener."
      }
    ]
  },

  // Iluminación / estilo
  "rgb": {
    h1: "Teclados mecánicos con retroiluminación RGB",
    p: "Los teclados mecánicos RGB permiten personalizar colores, efectos y niveles de brillo, dando identidad propia a tu setup. Un teclado mecanico gamer con RGB no solo se ve bien, también ayuda a identificar teclas, jugar de noche y crear ambientes únicos para streaming y contenido.",
    title: "Teclado mecanico gamer RGB en Chile | SaintGeek",
    description: "Explora tu próximo teclado mecanico gamer RGB con múltiples efectos, perfiles y brillo ajustable, combinado con switches mecánicos de alto rendimiento. Estos teclados mecánicos gamer son ideales para gamers, streamers y creadores que quieren un escritorio vistoso y funcional a la vez.",
    faq: [
      {
        question: "¿La iluminación de un teclado mecanico gamer RGB afecta al rendimiento?",
        answer: "No. La iluminación es principalmente estética y de comodidad visual. Un teclado mecanico gamer RGB no rinde más por tener luces, pero sí puede hacer más agradable jugar o trabajar con poca luz."
      },
      {
        question: "¿Un teclado mecanico gamer RGB consume mucha batería en modo inalámbrico?",
        answer: "La iluminación RGB es uno de los factores que más batería consume. Si quieres alargar la autonomía de tu teclado mecanico gamer RGB inalámbrico, puedes bajar el brillo o usar efectos más simples."
      },
      {
        question: "¿Se puede apagar el RGB de un teclado mecanico gamer si me distrae?",
        answer: "Sí, prácticamente todos los teclados mecanico gamer RGB permiten apagar la iluminación o dejar un color fijo discreto. Puedes usar RGB solo cuando lo quieras para gaming o streaming."
      },
      {
        question: "¿Qué debo revisar al comprar un teclado mecanico gamer RGB?",
        answer: "Revisa si los efectos se controlan por software o combinaciones Fn, la intensidad del brillo y la uniformidad en las teclas. Un buen teclado mecanico gamer RGB debe ofrecerte opciones sin volverse complicado de configurar."
      }
    ]
  },
  "sin-rgb": {
    h1: "Teclados mecánicos sin RGB",
    p: "Si prefieres un look sobrio y minimalista, un teclado mecánico sin RGB es perfecto. Sigues disfrutando de la sensación y rendimiento de un teclado mecanico gamer, pero con una estética limpia para oficina, estudio o setups donde la iluminación no es prioridad.",
    title: "Teclado mecanico gamer sin RGB en Chile | SaintGeek",
    description: "Encuentra tu teclado mecanico gamer sin RGB con diseño limpio, switches mecánicos silenciosos o táctiles y construcción resistente. Estos teclados mecánicos gamer son ideales para entornos de trabajo, salas compartidas y usuarios que quieren foco total sin luces llamativas.",
    faq: [
      {
        question: "¿Por qué elegir un teclado mecanico gamer sin RGB?",
        answer: "Porque ofrece toda la sensación y precisión de un teclado mecanico gamer sin añadir luces que puedan distraerte o chocar con el entorno. Es ideal para oficinas, espacios compartidos o setups minimalistas."
      },
      {
        question: "¿Un teclado mecanico gamer sin RGB suele ser más barato?",
        answer: "Muchas veces sí, al prescindir de LEDs y controladores de iluminación. Eso hace que un teclado mecanico gamer sin RGB pueda ofrecer muy buena calidad de construcción a un precio más contenido."
      },
      {
        question: "¿Un teclado mecanico gamer sin RGB es mejor para oficinas?",
        answer: "Suele ser mejor recibido en ambientes profesionales, ya que mantiene un aspecto serio y discreto. Un teclado mecanico gamer sin RGB encaja mejor en escritorios de trabajo donde no quieres llamar la atención."
      },
      {
        question: "¿Qué debo revisar antes de comprar un teclado mecanico gamer sin RGB?",
        answer: "Fíjate especialmente en la calidad de switches, estabilizadores y materiales, ya que el foco estará en la experiencia de tecleo. Un teclado mecanico gamer sin RGB debe destacar por cómo se siente al escribir."
      }
    ]
  },
  "minimalista": {
    h1: "Teclados mecánicos minimalistas",
    p: "Los teclados mecánicos minimalistas reducen al máximo elementos visuales y se centran en líneas limpias, colores neutros y formato compacto. Un teclado mecanico gamer minimalista encaja perfecto en setups estéticos, de productividad y gaming donde buscas un estilo más pulcro.",
    title: "Teclado mecanico gamer minimalista en Chile | SaintGeek",
    description: "Compra tu teclado mecanico gamer minimalista con diseño limpio, formato 60% o 65% y switches mecánicos cómodos para largas sesiones. Estos teclados mecánicos gamer combinan estética cuidada, buena sensación de tecleo y rendimiento sólido para jugar y trabajar.",
    faq: [
      {
        question: "¿Qué caracteriza a un teclado mecanico gamer minimalista?",
        answer: "Se caracteriza por un diseño limpio, sin elementos decorativos excesivos, con colores neutros y, muchas veces, formato compacto. Un teclado mecanico gamer minimalista busca integrarse al setup sin robar todo el protagonismo visual."
      },
      {
        question: "¿Un teclado mecanico gamer minimalista puede tener RGB?",
        answer: "Sí, puede tener RGB, aunque suele usarse en tonos más suaves o configuraciones discretas. La idea de un teclado mecanico gamer minimalista es que la iluminación no domine la estética del escritorio."
      },
      {
        question: "¿Es buena idea un teclado mecanico gamer minimalista para oficina y gaming?",
        answer: "Es una excelente idea si quieres un solo periférico para todo. Un teclado mecanico gamer minimalista luce profesional en reuniones y, al mismo tiempo, ofrece muy buen rendimiento en juegos."
      },
      {
        question: "¿Qué debo revisar al elegir un teclado mecanico gamer minimalista?",
        answer: "Comprueba que el layout te resulte cómodo, que los materiales sean de calidad y que el color combine con tu setup. En un teclado mecanico gamer minimalista los detalles de acabado marcan mucha diferencia."
      }
    ]
  },

  // Construcción / materiales
  "hot-swap": {
    h1: "Teclados Hot-Swap (cambia tus switches sin soldar)",
    p: "Los teclados mecánicos hot-swap permiten cambiar los switches sin soldador, simplemente retirándolos y colocándolos a presión. Si te gusta personalizar el sonido y la sensación de tu teclado mecanico gamer, esta característica es casi obligatoria para experimentar con distintos switches.",
    title: "Teclado mecanico gamer Hot-Swap en Chile | SaintGeek",
    description: "Descubre tu teclado mecanico gamer hot-swap compatible con switches 3/5-pin, ideal para quienes quieren modificar el sonido y la sensación de cada tecla. Este tipo de teclado mecánico gamer facilita el modding, alargando la vida del periférico y permitiendo ajustar la experiencia a tu gusto.",
    faq: [
      {
        question: "¿Qué ventajas tiene un teclado mecanico gamer hot-swap?",
        answer: "La principal ventaja es poder cambiar switches sin soldar, probando distintas sensaciones y sonidos. Un teclado mecanico gamer hot-swap te permite ajustar el periférico con el tiempo en lugar de comprar uno nuevo."
      },
      {
        question: "¿Es complicado cambiar switches en un teclado mecanico gamer hot-swap?",
        answer: "No. Solo necesitas un extractor y un poco de cuidado al alinear los pines. En cuestión de minutos puedes cambiar switches en tu teclado mecanico gamer hot-swap sin herramientas avanzadas."
      },
      {
        question: "¿Un teclado mecanico gamer hot-swap es recomendable para principiantes?",
        answer: "Sí, siempre que sigas las instrucciones básicas de extracción y colocación. Un teclado mecanico gamer hot-swap es perfecto para aprender sobre switches sin el riesgo de arruinar la PCB con soldadura."
      },
      {
        question: "¿Qué debo revisar antes de comprar un teclado mecanico gamer hot-swap?",
        answer: "Fíjate en si acepta switches 3-pin, 5-pin o ambos, en la calidad de los sockets y en la compatibilidad con las marcas de switches que te interesan. Eso determinará cuán flexible será tu teclado mecanico gamer a futuro."
      }
    ]
  },
  "gasket": {
    h1: "Teclados con montaje gasket",
    p: "El montaje gasket utiliza piezas de goma o espuma para suspender la placa, logrando una sensación más suave y un sonido más controlado. Un teclado mecanico gamer con montaje gasket se siente más acolchado al escribir y suele ser muy apreciado por entusiastas que buscan un perfil sonoro agradable.",
    title: "Teclado mecanico gamer con montaje gasket en Chile | SaintGeek",
    description: "Compra tu teclado mecanico gamer con montaje gasket para disfrutar de una experiencia de escritura más suave, silenciosa y refinada. Estos teclados mecánicos gamer están pensados para quienes valoran tanto el rendimiento como la acústica y la sensación premium al teclear.",
    faq: [
      {
        question: "¿Qué se siente distinto en un teclado mecanico gamer con montaje gasket?",
        answer: "Se siente un tecleo más suave, con menos vibraciones y un sonido más controlado. Un teclado mecanico gamer con montaje gasket suele dar una experiencia más acolchada que los montajes tradicionales."
      },
      {
        question: "¿Un teclado mecanico gamer gasket es siempre más silencioso?",
        answer: "No siempre, pero suele reducir resonancias y pings metálicos. El resultado final depende también de los switches y keycaps, pero el montaje gasket ayuda mucho a mejorar el perfil sonoro del teclado mecanico gamer."
      },
      {
        question: "¿Vale la pena pagar más por un teclado mecanico gamer con montaje gasket?",
        answer: "Si valoras la sensación premium y el sonido refinado, sí. Un teclado mecanico gamer con gasket se acerca más a la experiencia de un teclado custom, algo muy apreciado por entusiastas y usuarios exigentes."
      },
      {
        question: "¿Qué debo revisar al comprar un teclado mecanico gamer gasket?",
        answer: "Revisa el tipo de materiales usados en las tiras gasket, la rigidez del chasis y si incluye espuma interna. Todo esto contribuye a que tu teclado mecanico gamer tenga un resultado acústico coherente y agradable."
      }
    ]
  },
  "espuma-doble": {
    h1: "Teclados con espuma interna (doble capa)",
    p: "Agregar espuma en distintas capas del teclado ayuda a reducir resonancias y ping metálico. Un teclado mecanico gamer con doble capa de espuma ofrece un sonido más controlado y un tacto más sólido, sin necesidad de mods complejos hechos por el usuario.",
    title: "Teclado mecanico gamer con espuma interna en Chile | SaintGeek",
    description: "Encuentra tu teclado mecanico gamer con espuma interna de doble capa para lograr un sonido más limpio y agradable. Estos teclados mecánicos gamer vienen mejor afinados de fábrica, ideales para quienes quieren buena acústica sin invertir tiempo en modificaciones.",
    faq: [
      {
        question: "¿Qué hace realmente la espuma interna en un teclado mecanico gamer?",
        answer: "La espuma interna absorbe parte de las vibraciones y resonancias, reduciendo ecos metálicos dentro de la carcasa. Así, tu teclado mecanico gamer suena más lleno, controlado y menos estridente al teclear."
      },
      {
        question: "¿Es mejor un teclado mecanico gamer con doble capa de espuma que uno sin espuma?",
        answer: "En la mayoría de casos sí, especialmente si te importa el sonido. Un teclado mecanico gamer con doble capa de espuma suele venir más afinado de fábrica y necesita menos mods caseros."
      },
      {
        question: "¿La espuma de un teclado mecanico gamer afecta a la sensación al escribir?",
        answer: "Puede aportar una leve sensación más sólida y amortiguada, pero el cambio principal se nota en el sonido. Los switches siguen marcando la mayor parte de la sensación de tu teclado mecanico gamer."
      },
      {
        question: "¿Qué debo revisar al elegir un teclado mecanico gamer con espuma interna?",
        answer: "Comprueba que la espuma esté bien distribuida (entre placa y PCB, y en la base) y que el resto de la construcción acompañe. Un buen teclado mecanico gamer con espuma interna debe sentirse y sonar coherente, no apagado en exceso."
      }
    ]
  },
  "estabilizadores-lubricados": {
    h1: "Teclados con estabilizadores lubricados",
    p: "Los estabilizadores lubricados reducen el traqueteo y ruido en teclas largas como barra espaciadora, Enter o Shift. Un teclado mecanico gamer con buenos estabilizadores mejora mucho la sensación general, dando una experiencia más premium y consistente al escribir o jugar.",
    title: "Teclado mecanico gamer con estabilizadores lubricados en Chile | SaintGeek",
    description: "Elige tu teclado mecanico gamer con estabilizadores lubricados para disfrutar de una barra espaciadora y teclas grandes más estables y silenciosas. Estos teclados mecánicos gamer son ideales para usuarios exigentes que buscan una experiencia cercana a la de teclados custom sin tener que modificarlos ellos mismos.",
    faq: [
      {
        question: "¿Por qué son importantes los estabilizadores en un teclado mecanico gamer?",
        answer: "Porque se encargan de que las teclas largas se pulsen de forma uniforme, sin traqueteos ni ruidos raros. Un teclado mecanico gamer con buenos estabilizadores se siente mucho más sólido y agradable al teclear."
      },
      {
        question: "¿Qué mejora aporta la lubricación en los estabilizadores de un teclado mecanico gamer?",
        answer: "La lubricación reduce la fricción y el ruido interno, dando una barra espaciadora y teclas grandes más suaves y silenciosas. En un teclado mecanico gamer bien lubricado se nota especialmente al escribir rápido."
      },
      {
        question: "¿Un teclado mecanico gamer con estabilizadores lubricados hace menos ruido?",
        answer: "En general sí, sobre todo en las teclas largas, que dejan de sonar huecas o metálicas. No convierte el teclado en silencioso por sí solo, pero mejora mucho el perfil sonoro global."
      },
      {
        question: "¿Qué debo revisar al comprar un teclado mecanico gamer con estabilizadores lubricados?",
        answer: "Comprueba que la barra espaciadora y las teclas largas no tengan juego lateral excesivo ni sonidos de traqueteo. Si el fabricante destaca la lubricación de fábrica, tu teclado mecanico gamer debería sentirse muy consistente desde el primer uso."
      }
    ]
  },
  "keycaps-abs": {
    h1: "Keycaps ABS de doble inyección",
    p: "Las keycaps ABS doubleshot permiten que las leyendas no se borren con el tiempo, manteniendo el aspecto del teclado mecanico gamer por más años. Son una opción popular por su buena relación entre tacto, resistencia y precio, ideal para uso diario intenso.",
    title: "Teclado mecanico gamer con keycaps ABS en Chile | SaintGeek",
    description: "Compra tu teclado mecanico gamer con keycaps ABS de doble inyección, resistentes al brillo y al desgaste. Estos teclados mecánicos gamer mantienen las leyendas legibles por mucho más tiempo, incluso con sesiones largas de juego, estudio o trabajo.",
    faq: [
      {
        question: "¿Qué significa que un teclado mecanico gamer tenga keycaps ABS de doble inyección?",
        answer: "Significa que las leyendas se moldean como una segunda pieza en lugar de imprimirse encima. Así, en tu teclado mecanico gamer las letras no se borran aunque uses el teclado durante años."
      },
      {
        question: "¿Las keycaps ABS de un teclado mecanico gamer se ponen brillantes con el tiempo?",
        answer: "Con mucho uso pueden tomar algo de brillo, pero la doble inyección ayuda a que sigan viéndose bien. En cualquier caso, es menos problemático que la desaparición de letras en teclados más básicos."
      },
      {
        question: "¿Son peores las keycaps ABS que las PBT en un teclado mecanico gamer?",
        answer: "No necesariamente, simplemente ofrecen una sensación algo diferente. Las PBT suelen ser más texturizadas, mientras que las ABS pueden sentirse más suaves. Lo importante es que tu teclado mecanico gamer use plásticos de buena calidad."
      },
      {
        question: "¿Qué debo revisar al comprar un teclado mecanico gamer con keycaps ABS?",
        answer: "Mira el grosor de las teclas, la nitidez de las leyendas y si se iluminan bien con RGB. Un buen teclado mecanico gamer con keycaps ABS de doble inyección se ve y se siente sólido al tacto."
      }
    ]
  },
  "keycaps-pbt": {
    h1: "Keycaps PBT texturizadas",
    p: "Las keycaps PBT ofrecen un tacto más seco y una resistencia superior al desgaste y al brillo. Un teclado mecanico gamer con keycaps PBT se siente más premium y mantiene mejor su apariencia con el uso intensivo a lo largo de los años.",
    title: "Teclado mecanico gamer con keycaps PBT en Chile | SaintGeek",
    description: "Encuentra tu teclado mecanico gamer con keycaps PBT texturizadas, ideales para quienes quieren máxima durabilidad y un tacto firme al teclear. Estos teclados mecánicos gamer soportan mejor el uso intensivo, manteniendo color y textura incluso con muchas horas de juego.",
    faq: [
      {
        question: "¿Qué diferencia hay entre keycaps PBT y ABS en un teclado mecanico gamer?",
        answer: "Las PBT suelen ser más resistentes al brillo y ofrecen un tacto más texturizado, mientras que las ABS pueden sentirse más suaves. En un teclado mecanico gamer con PBT, las teclas se ven mejor por más tiempo."
      },
      {
        question: "¿Un teclado mecanico gamer con keycaps PBT es siempre más caro?",
        answer: "No siempre, pero los PBT de buena calidad suelen situarse en gamas algo más altas. A cambio, obtienes un teclado mecanico gamer con keycaps que resisten mejor el desgaste diario."
      },
      {
        question: "¿Las keycaps PBT afectan el sonido de un teclado mecanico gamer?",
        answer: "Sí, suelen aportar un sonido algo más grave y sólido frente a ABS finas. En un teclado mecanico gamer con PBT, el timbre general puede resultar más agradable al oído."
      },
      {
        question: "¿Qué debo revisar al comprar un teclado mecanico gamer con keycaps PBT?",
        answer: "Fíjate en el grosor de las teclas, la calidad de la impresión o doble inyección y el ajuste sobre los switches. Un buen teclado mecanico gamer con PBT transmite robustez desde la primera pulsación."
      }
    ]
  },
  "anti-ghosting": {
    h1: "Teclados con anti-ghosting",
    p: "El anti-ghosting permite que múltiples teclas se registren correctamente cuando se presionan a la vez. En un teclado mecanico gamer esto es clave para ejecutar combos rápidos en juegos sin perder pulsaciones, especialmente en títulos competitivos.",
    title: "Teclado mecanico gamer con anti-ghosting en Chile | SaintGeek",
    description: "Compra tu teclado mecanico gamer con tecnología anti-ghosting para evitar pulsaciones fantasma y ganar precisión en partidas intensas. Estos teclados mecánicos gamer son imprescindibles para shooters, MOBAs y juegos donde se usan muchas teclas al mismo tiempo.",
    faq: [
      {
        question: "¿Qué es exactamente el anti-ghosting en un teclado mecanico gamer?",
        answer: "Es una tecnología que evita que se registren pulsaciones fantasma cuando presionas varias teclas simultáneamente. Así tu teclado mecanico gamer responde solo a las teclas que realmente pulsas."
      },
      {
        question: "¿En qué juegos se nota más el anti-ghosting de un teclado mecanico gamer?",
        answer: "Se nota mucho en shooters, juegos de lucha y MOBAs, donde es habitual combinar varias teclas al mismo tiempo. Un teclado mecanico gamer con buen anti-ghosting reduce errores en estos contextos."
      },
      {
        question: "¿Todos los teclados mecanico gamer tienen el mismo nivel de anti-ghosting?",
        answer: "No, algunos tienen anti-ghosting parcial y otros full-key. En un teclado mecanico gamer de buena calidad, el fabricante suele indicar cuántas teclas simultáneas admite sin problemas."
      },
      {
        question: "¿Qué debo revisar al comprar un teclado mecanico gamer con anti-ghosting?",
        answer: "Busca información sobre la cantidad de teclas que puede registrar a la vez y si especifica zonas optimizadas (por ejemplo, WASD). Así sabrás que tu teclado mecanico gamer no te dejará tirado en momentos críticos."
      }
    ]
  },
  "n-key-rollover": {
    h1: "Teclados con N-key rollover",
    p: "El N-key rollover garantiza que cada tecla se registre de forma independiente, aunque presiones muchas a la vez. Un teclado mecanico gamer con N-key rollover ofrece máxima fiabilidad en situaciones de juego o escritura donde se requieren atajos y combinaciones complejas.",
    title: "Teclado mecanico gamer con N-key rollover en Chile | SaintGeek",
    description: "Descubre tu teclado mecanico gamer con N-key rollover para asegurar que todas tus pulsaciones se registren sin errores. Estos teclados mecánicos gamer son ideales para jugadores competitivos, editores, creadores y programadores que dependen de atajos de teclado rápidos.",
    faq: [
      {
        question: "¿Qué significa que un teclado mecanico gamer tenga N-key rollover?",
        answer: "Significa que cada tecla se registra por separado aunque pulses muchas a la vez. Tu teclado mecanico gamer no se confunde ni bloquea combinaciones complejas de teclas."
      },
      {
        question: "¿En qué se diferencia el N-key rollover del anti-ghosting en un teclado mecanico gamer?",
        answer: "El anti-ghosting evita pulsaciones fantasma; el N-key rollover garantiza que todas las teclas presionadas se registren correctamente. En un teclado mecanico gamer, ambos conceptos se complementan para ofrecer la mejor respuesta posible."
      },
      {
        question: "¿Realmente necesito N-key rollover en mi teclado mecanico gamer?",
        answer: "Si juegas competitivo, usas muchos atajos o tocas varias teclas al mismo tiempo, sí. Un teclado mecanico gamer con N-key rollover te asegura que cada comando llegará al juego o aplicación como corresponde."
      },
      {
        question: "¿Qué debo revisar al comprar un teclado mecanico gamer con N-key rollover?",
        answer: "Verifica que el N-key rollover funcione tanto por USB como por PS/2 (si aplica) y que el fabricante especifique claramente esta característica. Así sabrás que tu teclado mecanico gamer ofrece el nivel de respuesta que necesitas."
      }
    ]
  },
  // Switches
  "switch-red": {
    h1: "Teclados con switches Red (lineales)",
    p: "Los switches Red son lineales, suaves y requieren menos fuerza de activación, por lo que se sienten muy ligeros al presionar. Un teclado mecanico gamer con switches Red es ideal para shooters, juegos rápidos y usuarios que escriben mucho y buscan reducir la fatiga en los dedos.",
    title: "Teclado mecanico gamer con switches Red en Chile | SaintGeek",
    description: "Elige tu teclado mecanico gamer con switches Red lineales, perfectos para gaming competitivo y escritura cómoda. Estos teclados mecánicos gamer ofrecen una sensación suave, rápida y predecible, ideal para apuntar, moverse y reaccionar con precisión en tus partidas.",
    faq: [
      {
        question: "¿Para qué tipo de jugador es ideal un teclado mecanico gamer con switches Red?",
        answer: "Un teclado mecanico gamer con switches Red es ideal para jugadores de shooters y títulos rápidos que necesitan accionar teclas muchas veces por segundo con el menor esfuerzo posible. También es muy cómodo para quienes escriben mucho y buscan reducir fatiga en los dedos."
      },
      {
        question: "¿Los switches Red en un teclado mecanico gamer hacen mucho ruido?",
        answer: "Los switches Red suelen ser más silenciosos que los Blue porque no tienen clic sonoro. En un teclado mecanico gamer con switches Red escucharás el sonido de la barra espaciadora y el contacto con la keycap, pero sin el clic marcado de los switches clicky."
      },
      {
        question: "¿Un teclado mecanico gamer con switches Red es recomendable para escribir textos largos?",
        answer: "Sí, siempre que te guste una sensación lineal sin punto táctil marcado. Un teclado mecanico gamer con switches Red se siente muy suave y ligero, lo que ayuda a escribir rápido y con menos cansancio, aunque a algunos usuarios les gusta más tener un pequeño feedback táctil."
      },
      {
        question: "¿Qué debo revisar antes de elegir un teclado mecanico gamer con switches Red?",
        answer: "Revisa el peso de actuación aproximado (en gramos), la calidad de la construcción del teclado, si es hot-swap y el tipo de keycaps. Así te aseguras de que tu teclado mecanico gamer con switches Red no solo sea rápido, sino también cómodo y duradero."
      }
    ]
  },
  "switch-blue": {
    h1: "Teclados con switches Blue (clicky)",
    p: "Los switches Blue entregan un clic audible y un punto táctil muy marcado. Un teclado mecanico gamer con switches Blue es perfecto para quienes disfrutan de un feedback fuerte al escribir, sintiendo claramente cada pulsación tanto en gaming como en redacción.",
    title: "Teclado mecanico gamer con switches Blue en Chile | SaintGeek",
    description: "Compra tu teclado mecanico gamer con switches Blue clicky, con sonido marcado y sensación clásica de máquina de escribir. Estos teclados mecánicos gamer son ideales para usuarios que disfrutan del clic audible y quieren una respuesta muy definida al presionar cada tecla.",
    faq: [
      {
        question: "¿En qué se diferencian los switches Blue de otros switches en un teclado mecanico gamer?",
        answer: "Los switches Blue combinan un punto táctil claro con un clic sonoro muy marcado. En un teclado mecanico gamer esto se traduce en una sensación parecida a una máquina de escribir, ideal para quienes disfrutan escuchar cada pulsación."
      },
      {
        question: "¿Un teclado mecanico gamer con switches Blue es adecuado para oficina compartida?",
        answer: "No suele ser la mejor opción para entornos compartidos, porque el clic es bastante ruidoso y puede molestar a otras personas. Si necesitas silencio, es mejor buscar un teclado mecanico gamer con switches Brown o Silent."
      },
      {
        question: "¿Los switches Blue son buenos para escribir mucho en un teclado mecanico gamer?",
        answer: "Si te gusta el feedback fuerte, sí. Un teclado mecanico gamer con switches Blue puede ser muy cómodo para escribir, ya que sientes claramente el punto de activación. Pero si eres sensible al ruido, puede volverse cansador."
      },
      {
        question: "¿Qué debo considerar antes de comprar un teclado mecanico gamer con switches Blue?",
        answer: "Ten en cuenta el nivel de ruido, el lugar donde lo usarás y tu tolerancia al clic. Si vas a usar el teclado mecanico gamer en casa o en un espacio donde el ruido no moleste, los Blue pueden ser una experiencia muy satisfactoria."
      }
    ]
  },
  "switch-brown": {
    h1: "Teclados con switches Brown (táctiles)",
    p: "Los switches Brown ofrecen un punto táctil suave sin clic sonoro fuerte, equilibrando silencio y feedback. Un teclado mecanico gamer con switches Brown es una gran opción híbrida para jugar y trabajar, especialmente en entornos donde el ruido debe mantenerse bajo.",
    title: "Teclado mecanico gamer con switches Brown en Chile | SaintGeek",
    description: "Encuentra tu teclado mecanico gamer con switches Brown táctiles, que ofrecen una sensación equilibrada entre lineal y clicky. Estos teclados mecánicos gamer son ideales para oficina, teletrabajo y gaming, entregando comodidad y control sin demasiado ruido.",
    faq: [
      {
        question: "¿Por qué los switches Brown son considerados equilibrados en un teclado mecanico gamer?",
        answer: "Porque aportan un punto táctil suave sin añadir un clic sonoro fuerte. En un teclado mecanico gamer con switches Brown sientes cuándo se acciona la tecla, pero con un nivel de ruido moderado que funciona bien tanto para jugar como para trabajar."
      },
      {
        question: "¿Un teclado mecanico gamer con switches Brown es adecuado para teletrabajo?",
        answer: "Sí, es una de las mejores opciones. Un teclado mecanico gamer con Brown ofrece comodidad y feedback sin generar tanto ruido como un Blue, por lo que encaja muy bien en videollamadas y entornos compartidos."
      },
      {
        question: "¿Los switches Brown sirven para gaming competitivo?",
        answer: "Sí, funcionan muy bien. Aunque los jugadores más hardcore a veces prefieren Red, un teclado mecanico gamer con Brown ofrece buen tiempo de respuesta y un punto táctil que ayuda a no accionar teclas por accidente."
      },
      {
        question: "¿Qué debo revisar antes de elegir un teclado mecanico gamer con switches Brown?",
        answer: "Revisa el peso de actuación, la sensación del tacto (más suave o más marcado según el fabricante) y el uso principal que le darás. Si quieres un teclado mecanico gamer para todo, Brown suele ser una apuesta muy segura."
      }
    ]
  },
  "switch-silent": {
    h1: "Teclados con switches Silent",
    p: "Los switches Silent están diseñados para reducir al máximo el ruido de la pulsación, integrando amortiguadores internos. Un teclado mecanico gamer con switches Silent es perfecto para espacios compartidos, oficinas abiertas y jugadores que quieren jugar de noche sin molestar.",
    title: "Teclado mecanico gamer con switches Silent en Chile | SaintGeek",
    description: "Compra tu teclado mecanico gamer con switches Silent para disfrutar de una experiencia mecánica con el menor ruido posible. Estos teclados mecánicos gamer son ideales para teletrabajo, estudio y gaming nocturno, manteniendo buena respuesta sin sacrificar la tranquilidad del entorno.",
    faq: [
      {
        question: "¿Qué hace diferentes a los switches Silent en un teclado mecanico gamer?",
        answer: "Incorporan amortiguadores internos o topes de goma que suavizan el golpe al fondo y el retorno de la tecla. En un teclado mecanico gamer con switches Silent se reduce bastante el ruido sin renunciar por completo a la sensación mecánica."
      },
      {
        question: "¿Un teclado mecanico gamer con switches Silent es realmente silencioso?",
        answer: "Es mucho más silencioso que un Blue y, en muchos casos, que un Red estándar. Aun así, seguirá habiendo un leve sonido de tecleo, pero en un nivel mucho más amigable para entornos compartidos o uso nocturno."
      },
      {
        question: "¿Se pierde sensación al usar un teclado mecanico gamer con switches Silent?",
        answer: "La sensación puede ser un poco más acolchada, pero sigues notando claramente el recorrido de la tecla. Si vienes de membrana, un teclado mecanico gamer Silent igual se sentirá más definido y preciso."
      },
      {
        question: "¿Qué debo revisar antes de comprar un teclado mecanico gamer con switches Silent?",
        answer: "Comprueba el tipo de switch Silent (lineal o táctil), el nivel de ruido según el fabricante y, si es posible, escucha pruebas de sonido. Así eliges un teclado mecanico gamer que realmente encaje con el nivel de silencio que buscas."
      }
    ]
  },

  // Uso
  "gaming": {
    h1: "Teclados mecánicos para gaming",
    p: "Los teclados mecánicos para gaming están pensados para ofrecer mejor respuesta, precisión y durabilidad que un teclado de membrana. Un buen teclado mecanico gamer combina switches de calidad, anti-ghosting, N-key rollover y, muchas veces, RGB para acompañar tu setup.",
    title: "Teclado mecanico gamer para gaming en Chile | SaintGeek",
    description: "Explora nuestra selección de teclado mecanico gamer para gaming en formatos 60%, 65%, TKL y full size. Estos teclados mecánicos gamer están diseñados para soportar largas sesiones de juego, ofreciendo comodidad, precisión y funciones avanzadas en cada partida.",
    faq: [
      {
        question: "¿Por qué un teclado mecanico gamer es mejor para gaming que uno de membrana?",
        answer: "Porque cada tecla tiene su propio switch mecánico, lo que mejora la precisión, la respuesta y la durabilidad. En un teclado mecanico gamer, las pulsaciones se sienten más definidas y se registran con mayor consistencia, algo clave en juegos exigentes."
      },
      {
        question: "¿Qué características clave debe tener un buen teclado mecanico gamer para gaming?",
        answer: "Debe ofrecer switches de calidad, anti-ghosting, N-key rollover y una construcción sólida que no se flexione. Extras como RGB, macros o teclas multimedia mejoran la experiencia, pero la base es siempre la respuesta y la fiabilidad de las teclas."
      },
      {
        question: "¿Qué formato de teclado mecanico gamer es mejor para juegos: 60%, 65%, TKL o full size?",
        answer: "Depende de tu espacio y estilo. 60% y 65% liberan más espacio para el mouse, TKL es un punto medio muy popular, y full size es ideal si usas numpad. Todos pueden ser excelentes teclados mecanico gamer para gaming si la calidad de switches y construcción es buena."
      },
      {
        question: "¿Es necesario que un teclado mecanico gamer tenga RGB para jugar mejor?",
        answer: "No, el RGB es estético. Lo que mejora tu rendimiento es la calidad de los switches, el anti-ghosting, la ergonomía y la práctica. Un teclado mecanico gamer sin RGB puede rendir igual o mejor que uno con muchas luces."
      }
    ]
  },
  "gaming-competitivo": {
    h1: "Teclados para gaming competitivo",
    p: "En gaming competitivo cada detalle cuenta, por eso se buscan teclados con switches rápidos, baja latencia y construcción sólida. Un teclado mecanico gamer para juego competitivo te da la seguridad de que cada pulsación se registra con precisión en momentos clave.",
    title: "Teclado mecanico gamer para gaming competitivo en Chile | SaintGeek",
    description: "Compra tu teclado mecanico gamer orientado al gaming competitivo, con switches de alto rendimiento, anti-ghosting y N-key rollover. Estos teclados mecánicos gamer son ideales para eSports, ranked y jugadores que exigen máxima consistencia y confiabilidad en cada partida.",
    faq: [
      {
        question: "¿Qué diferencia a un teclado mecanico gamer competitivo de uno normal?",
        answer: "Un teclado mecanico gamer para competitivo prioriza switches rápidos, estabilizadores firmes, baja latencia y una construcción muy sólida. Todo está orientado a que no pierdas ninguna pulsación en situaciones límite."
      },
      {
        question: "¿Qué switches son más habituales en teclados mecanico gamer para gaming competitivo?",
        answer: "Se suelen usar switches lineales rápidos (como Red o variantes speed) por su activación ligera y consistente. Un teclado mecanico gamer con este tipo de switches facilita reacciones rápidas y precisas en ranked y torneos."
      },
      {
        question: "¿Importa el formato del teclado mecanico gamer en gaming competitivo?",
        answer: "Sí, muchos jugadores competitivos prefieren 60%, 65% o TKL porque dejan más espacio al mouse. Menos ancho en el teclado mecanico gamer significa una postura más cómoda y movimientos más amplios."
      },
      {
        question: "¿Qué debo revisar al elegir un teclado mecanico gamer para gaming competitivo?",
        answer: "Fíjate en la latencia (si es inalámbrico, que tenga 2.4 GHz), el tipo de switches, la estabilidad de la base y el anti-ghosting/N-key rollover. Un buen teclado mecanico gamer competitivo tiene que ser fiable en cada ronda."
      }
    ]
  },
  "shooters": {
    h1: "Teclados para shooters (FPS)",
    p: "Los shooters en primera persona exigen rapidez en movimientos y cambios de arma. Un teclado mecanico gamer para FPS suele privilegiar formatos compactos, switches lineales y buena estabilidad, para coordinar WASD y macros sin perder control del mouse.",
    title: "Teclado mecanico gamer para shooters (FPS) en Chile | SaintGeek",
    description: "Encuentra tu teclado mecanico gamer optimizado para shooters como Valorant, CS o Apex, con switches lineales rápidos, anti-ghosting y N-key rollover. Estos teclados mecánicos gamer están pensados para darte precisión y reacción inmediata en cada enfrentamiento.",
    faq: [
      {
        question: "¿Qué características hacen bueno a un teclado mecanico gamer para shooters (FPS)?",
        answer: "Se valora un formato compacto (60%, 65% o TKL), switches lineales o rápidos, anti-ghosting y N-key rollover. Un teclado mecanico gamer para FPS debe permitirte moverte con WASD sin perder ninguna pulsación."
      },
      {
        question: "¿Es mejor un teclado mecanico gamer 60% para shooters?",
        answer: "Muchos jugadores lo prefieren porque deja más espacio para movimientos de mouse amplios. Si te sientes cómodo con funciones en capas, un teclado mecanico gamer 60% es excelente para Valorant, CS o Apex."
      },
      {
        question: "¿Importan las macros en un teclado mecanico gamer para shooters?",
        answer: "No tanto como en MMORPG, pero pueden ser útiles para acciones repetitivas o binds específicos. Lo principal en un teclado mecanico gamer para FPS sigue siendo la precisión de WASD y la comodidad en movimientos rápidos."
      },
      {
        question: "¿Qué switches son recomendables en un teclado mecanico gamer para shooters?",
        answer: "Habitualmente switches lineales Red o variantes speed, por su activación rápida y sensación suave. Un teclado mecanico gamer con estos switches facilita strafe, bunny hops y cambios de arma frecuentes sin fatiga."
      }
    ]
  },
  "moba": {
    h1: "Teclados para MOBAs",
    p: "En MOBAs necesitas ejecutar combinaciones de habilidades rápidas y precisas. Un teclado mecanico gamer para MOBAs te ofrece teclas consistentes, buena distribución y funciones como macros o atajos para reaccionar en cada teamfight sin errores.",
    title: "Teclado mecanico gamer para MOBAs en Chile | SaintGeek",
    description: "Compra tu teclado mecanico gamer para MOBAs como LoL o Dota 2, con switches mecánicos fiables y anti-ghosting. Estos teclados mecánicos gamer facilitan la ejecución de combos, habilidades y macros sin pérdidas de pulsaciones, mejorando tu rendimiento en cada partida.",
    faq: [
      {
        question: "¿Qué debe tener un buen teclado mecanico gamer para MOBAs?",
        answer: "Teclas consistentes en QWER, número y modificadores, anti-ghosting, N-key rollover y una distribución cómoda. En un teclado mecanico gamer para MOBA es clave no perder habilidades en medio de una teamfight."
      },
      {
        question: "¿Son útiles las macros en un teclado mecanico gamer para MOBAs?",
        answer: "Pueden ayudar en combinaciones repetitivas, aunque muchos jugadores competitivos no las usan por reglas de torneos. Aun así, un teclado mecanico gamer con macros puede facilitar acciones fuera de partida o en juegos casuales."
      },
      {
        question: "¿Qué formato de teclado mecanico gamer es recomendable para MOBAs?",
        answer: "Cualquier formato puede servir, pero 65% y TKL son muy populares porque equilibran espacio y funcionalidad. Un teclado mecanico gamer compacto te deja moverte mejor y mantiene todas las teclas necesarias al alcance."
      },
      {
        question: "¿Qué switches funcionan bien en un teclado mecanico gamer para MOBAs?",
        answer: "Red lineales para máxima velocidad, Brown para un equilibrio entre tacto y ruido, o incluso Silent si juegas de noche. Lo importante es que tu teclado mecanico gamer te permita pulsar con confianza sin errores."
      }
    ]
  },
  "mmorpg": {
    h1: "Teclados para MMORPG",
    p: "Los MMORPG suelen requerir muchas teclas, atajos y barras de habilidades. Un teclado mecanico gamer para MMORPG puede ser full size o TKL, con teclas programables y una sensación cómoda para largas sesiones de farmeo, raids y contenido PvP.",
    title: "Teclado mecanico gamer para MMORPG en Chile | SaintGeek",
    description: "Encuentra tu teclado mecanico gamer orientado a MMORPG, con switches duraderos, anti-ghosting y opciones de macros. Estos teclados mecánicos gamer soportan maratones de juego, permitiéndote ejecutar muchas habilidades sin fatiga ni errores de registro.",
    faq: [
      {
        question: "¿Qué formato de teclado mecanico gamer es mejor para MMORPG?",
        answer: "Muchos jugadores prefieren full size por el pad numérico y más teclas asignables, aunque un buen TKL también funciona bien. Lo importante es que tu teclado mecanico gamer tenga espacio suficiente para binds y macros."
      },
      {
        question: "¿Son importantes las teclas macro en un teclado mecanico gamer para MMORPG?",
        answer: "Pueden ser muy útiles para rotaciones, atajos y combinaciones complejas. Un teclado mecanico gamer con teclas programables te permite automatizar acciones repetitivas dentro del límite de las normas del juego."
      },
      {
        question: "¿Qué switches elegir en un teclado mecanico gamer para largas sesiones de MMORPG?",
        answer: "Switches Brown o lineales suaves suelen ser una buena opción para evitar fatiga en farmeos largos. Un teclado mecanico gamer con switches muy pesados puede cansar los dedos tras varias horas."
      },
      {
        question: "¿Qué más debo revisar en un teclado mecanico gamer para MMORPG?",
        answer: "Revisa la calidad del descanso de muñecas (si incluye), la estabilidad del chasis, la iluminación para identificar grupos de teclas y la configuración de software. Todo suma para una experiencia cómoda en raids largas."
      }
    ]
  },
  "oficina": {
    h1: "Teclados mecánicos para oficina",
    p: "Cada vez más personas usan un teclado mecánico también en el trabajo por su comodidad y precisión. Un teclado mecanico gamer para oficina suele optar por switches menos ruidosos y diseños discretos que combinen productividad y ergonomía en la mesa de trabajo.",
    title: "Teclado mecanico gamer para oficina en Chile | SaintGeek",
    description: "Compra tu teclado mecanico gamer para oficina con switches silenciosos o táctiles y diseño sobrio. Estos teclados mecánicos gamer ofrecen una experiencia de escritura más cómoda y precisa que un teclado de membrana, ayudando a reducir errores y fatiga en jornadas largas.",
    faq: [
      {
        question: "¿Tiene sentido usar un teclado mecanico gamer en oficina?",
        answer: "Sí, tiene mucho sentido. Un teclado mecanico gamer ofrece mejor sensación de escritura y precisión que uno de membrana, ayudando a reducir errores y fatiga en jornadas largas de trabajo frente al computador."
      },
      {
        question: "¿Qué switches son recomendables en un teclado mecanico gamer para oficina?",
        answer: "Lo ideal son switches Brown o Silent, que ofrecen buena sensación con menos ruido. Así puedes disfrutar de tu teclado mecanico gamer sin molestar a compañeros ni en reuniones online."
      },
      {
        question: "¿Un teclado mecanico gamer para oficina debe tener RGB?",
        answer: "No es necesario. De hecho, muchos usuarios prefieren un teclado mecanico gamer sin RGB o con iluminación muy discreta para no distraer en entornos profesionales."
      },
      {
        question: "¿Qué características extra pueden ayudar en un teclado mecanico gamer de oficina?",
        answer: "Teclas multimedia, rueda de volumen, buena inclinación y, si se puede, reposamuñecas. Un teclado mecanico gamer con estas funciones hace más cómodo el día a día en el trabajo."
      }
    ]
  },
  "teletrabajo": {
    h1: "Teclados para teletrabajo",
    p: "En teletrabajo pasas muchas horas frente al computador, por lo que un teclado cómodo marca la diferencia. Un teclado mecanico gamer bien elegido mejora la postura de manos y la calidad de escritura, pudiendo combinarlo con formatos compactos para espacios reducidos.",
    title: "Teclado mecanico gamer para teletrabajo en Chile | SaintGeek",
    description: "Elige tu teclado mecanico gamer para teletrabajo con buen tacto, formato adecuado a tu escritorio y, si lo necesitas, conectividad inalámbrica o Bluetooth. Estos teclados mecánicos gamer permiten alternar entre trabajo, estudio y gaming sin cambiar de periférico.",
    faq: [
      {
        question: "¿Qué aporta un teclado mecanico gamer en teletrabajo frente a uno básico?",
        answer: "Aporta una escritura más cómoda, precisa y agradable, reduciendo la fatiga en manos y muñecas. Un buen teclado mecanico gamer en teletrabajo mejora tu experiencia al estar tantas horas frente al PC."
      },
      {
        question: "¿Es mejor un teclado mecanico gamer compacto para teletrabajo?",
        answer: "Si tu escritorio es pequeño o compartes espacio, un formato 60%, 65% o TKL puede ayudarte mucho. Un teclado mecanico gamer compacto deja sitio para el mouse, la libreta y otros accesorios."
      },
      {
        question: "¿Qué switches elegir en un teclado mecanico gamer para teletrabajo?",
        answer: "Switches Brown o Silent son ideales por su equilibrio entre comodidad y bajo ruido. Así puedes usar tu teclado mecanico gamer en videollamadas y reuniones sin generar demasiadas distracciones."
      },
      {
        question: "¿Importa la conectividad en un teclado mecanico gamer para teletrabajo?",
        answer: "Sí, si trabajas con notebook o varios dispositivos, Bluetooth o 2.4 GHz pueden ser muy útiles. Un teclado mecanico gamer con cable USB-C también es excelente si prefieres máxima estabilidad."
      }
    ]
  },
  "programadores": {
    h1: "Teclados para programadores",
    p: "Los programadores pasan muchas horas escribiendo código, por lo que valoran la comodidad y la precisión. Un teclado mecanico gamer para programar suele tener formato compacto o TKL, switches equilibrados y construcción sólida para soportar largas sesiones sin cansancio.",
    title: "Teclado mecanico gamer para programadores en Chile | SaintGeek",
    description: "Encuentra tu teclado mecanico gamer para programadores con layout cómodo, buena estabilidad y switches mecánicos que reducen la fatiga. Estos teclados mecánicos gamer ayudan a mantener velocidad y precisión al escribir, mejorando la experiencia en el día a día de desarrollo.",
    faq: [
      {
        question: "¿Qué busca normalmente un programador en un teclado mecanico gamer?",
        answer: "Busca comodidad en sesiones largas, distribución lógica de teclas, buena respuesta y estabilidad. Un teclado mecanico gamer para programar debe ayudar a escribir código con precisión sin cansar las manos."
      },
      {
        question: "¿Qué formato de teclado mecanico gamer es más habitual entre programadores?",
        answer: "Muchos programadores usan 65% o TKL porque ofrecen flechas y navegación sin ocupar demasiado espacio. Un teclado mecanico gamer en estos formatos deja sitio para el mouse y otros periféricos en el escritorio."
      },
      {
        question: "¿Qué switches son recomendables en un teclado mecanico gamer para programar?",
        answer: "Switches Brown o lineales suaves (como Red) son muy populares. Un teclado mecanico gamer con estos switches permite escribir rápido sin excesivo ruido ni fatiga."
      },
      {
        question: "¿Es importante el layout en un teclado mecanico gamer para programadores?",
        answer: "Sí, mucho. Un teclado mecanico gamer con layout Español o LatAm bien configurado, junto con teclas como Esc, Ctrl, Alt y símbolos accesibles, hace más fluido el trabajo con atajos y terminal."
      }
    ]
  },
  "escritura": {
    h1: "Teclados para escritura",
    p: "Si escribes textos largos, artículos o trabajos, un buen teclado mecánico puede marcar mucha diferencia. Un teclado mecanico gamer orientado a escritura ofrece una sensación consistente, un sonido agradable y un formato que se adapte bien a tu postura de trabajo.",
    title: "Teclado mecanico gamer para escritura en Chile | SaintGeek",
    description: "Compra tu teclado mecanico gamer para escritura prolongada, con switches táctiles o lineales que facilitan un tecleo cómodo y estable. Estos teclados mecánicos gamer son ideales para redactores, estudiantes y profesionales que pasan horas escribiendo frente al computador.",
    faq: [
      {
        question: "¿Qué características debe tener un buen teclado mecanico gamer para escritura?",
        answer: "Debe ofrecer una sensación consistente, estabilizadores sólidos en teclas largas, un perfil sonoro agradable y un layout cómodo. Un teclado mecanico gamer con estas cualidades hace más llevadero escribir durante muchas horas."
      },
      {
        question: "¿Qué switches son mejores para escritura en un teclado mecanico gamer?",
        answer: "Muchos redactores prefieren Brown por su feedback suave, aunque algunos disfrutan de Blue por su clic marcado. Si priorizas silencio, un teclado mecanico gamer con switches Silent también puede ser una gran opción."
      },
      {
        question: "¿Qué formato de teclado mecanico gamer conviene para escritura prolongada?",
        answer: "Si escribes mucho, un TKL o full size con un buen ángulo de inclinación y, si es posible, reposamuñecas, suele ser más cómodo. Aun así, un teclado mecanico gamer compacto también puede funcionar si te adaptas bien al layout."
      },
      {
        question: "¿Influye el sonido del teclado mecanico gamer en la concentración al escribir?",
        answer: "Depende de cada persona. Algunos se inspiran con el clic rítmico; otros se concentran mejor con un teclado mecanico gamer más silencioso. Lo importante es que el perfil sonoro no te resulte molesto a ti ni a quienes te rodean."
      }
    ]
  },

  // Layout e idioma
  "layout-es": {
    h1: "Teclados con layout Español",
    p: "El layout Español incluye la tecla Ñ y las tildes impresas, facilitando mucho la escritura en nuestro idioma. Un teclado mecanico gamer con esta distribución evita errores de mapeo y hace más cómodo escribir chats, correos y trabajos en español.",
    title: "Teclado mecanico gamer layout Español en Chile | SaintGeek",
    description: "Encuentra tu teclado mecanico gamer con layout Español (con Ñ y tildes) en distintos formatos y tipos de switches. Estos teclados mecánicos gamer están listos para usarse en Chile sin tener que adaptar la distribución ni memorizar posiciones de símbolos.",
    faq: [
      {
        question: "¿Por qué es importante el layout Español en un teclado mecanico gamer?",
        answer: "Porque tener la Ñ y las tildes impresas evita errores de escritura y combinaciones incómodas. Un teclado mecanico gamer con layout Español simplifica chatear, trabajar y estudiar en nuestro idioma."
      },
      {
        question: "¿En qué se diferencia un teclado mecanico gamer Español de uno US (ANSI)?",
        answer: "Cambian la posición de algunas teclas, la incorporación de Ñ y la forma de ciertos símbolos. Un teclado mecanico gamer con layout Español te permite escribir en castellano de manera más natural."
      },
      {
        question: "¿Un teclado mecanico gamer con layout Español sirve para programar?",
        answer: "Sí, solo necesitas acostumbrarte a la posición de algunos símbolos. Muchos desarrolladores en Chile usan teclado mecanico gamer con layout Español sin problemas en su día a día."
      },
      {
        question: "¿Qué debo revisar al comprar un teclado mecanico gamer con layout Español?",
        answer: "Verifica que realmente tenga Ñ física, que el sistema operativo esté configurado en Español y que el layout impreso coincida con el que estás usando. Así evitas confusiones entre lo que ves y lo que escribe tu teclado mecanico gamer."
      }
    ]
  },
  "layout-latam": {
    h1: "Teclados layout Español LatAm",
    p: "El layout Español LatAm adapta la distribución de teclas para los países de la región, incluyendo Ñ y símbolos frecuentes. Un teclado mecanico gamer con layout LatAm facilita escribir correctamente sin tener que recordar combinaciones extrañas para caracteres especiales.",
    title: "Teclado mecanico gamer layout Español LatAm en Chile | SaintGeek",
    description: "Compra tu teclado mecanico gamer con layout Español LatAm, ideal para escribir en español sin problemas de mapeo. Estos teclados mecánicos gamer ofrecen comodidad al teclear y son compatibles con los sistemas de distribución más usados en la región.",
    faq: [
      {
        question: "¿Qué diferencia hay entre layout Español LatAm y Español España en un teclado mecanico gamer?",
        answer: "Cambian algunos símbolos y la distribución de teclas como la tilde o signos especiales. Un teclado mecanico gamer con layout LatAm está optimizado para la forma en que usamos el teclado en América Latina."
      },
      {
        question: "¿Un teclado mecanico gamer con layout LatAm funciona bien en Chile?",
        answer: "Sí, es la opción más natural para la mayoría de usuarios de la región. Un teclado mecanico gamer LatAm facilita escribir en español sin ajustes raros de configuración."
      },
      {
        question: "¿Puedo usar un teclado mecanico gamer LatAm con sistema operativo en Español (Chile)?",
        answer: "Sí, solo debes seleccionar el mismo layout en la configuración del sistema. Así tu teclado mecanico gamer LatAm escribirá exactamente lo que ves impreso en las teclas."
      },
      {
        question: "¿Qué debo revisar antes de comprar un teclado mecanico gamer con layout LatAm?",
        answer: "Comprueba que la distribución coincida con la de tu sistema operativo y que simbolos como @, # y tildes estén donde los esperas. De esta forma tu teclado mecanico gamer LatAm se sentirá natural desde el primer día."
      }
    ]
  },
  "ansi": {
    h1: "Teclados ANSI",
    p: "El layout ANSI es el estándar más común en teclados mecánicos, con Enter horizontal y una distribución popular en la escena gamer. Un teclado mecanico gamer ANSI facilita encontrar keycaps de repuesto y accesorios, además de ser familiar para muchos jugadores.",
    title: "Teclado mecanico gamer layout ANSI en Chile | SaintGeek",
    description: "Encuentra tu teclado mecanico gamer con layout ANSI, ideal si estás acostumbrado a este tipo de distribución y quieres compatibilidad con la mayoría de sets de keycaps. Estos teclados mecánicos gamer son muy comunes en la comunidad entusiasta y de gaming.",
    faq: [
      {
        question: "¿Qué caracteriza al layout ANSI en un teclado mecanico gamer?",
        answer: "Se reconoce por la tecla Enter horizontal y una distribución muy usada en Estados Unidos y la escena gamer internacional. Un teclado mecanico gamer ANSI facilita encontrar keycaps y configuraciones compatibles."
      },
      {
        question: "¿Es problema usar un teclado mecanico gamer ANSI en Chile?",
        answer: "No, mientras ajustes el layout de tu sistema y te acostumbres a la posición de algunos símbolos. Muchos entusiastas usan teclado mecanico gamer ANSI justamente por la disponibilidad de keycaps y modelos."
      },
      {
        question: "¿Un teclado mecanico gamer ANSI trae Ñ física?",
        answer: "La mayoría no, a menos que esté adaptado específicamente. Si necesitas Ñ dedicada, es mejor buscar un teclado mecanico gamer con layout Español o LatAm."
      },
      {
        question: "¿Qué ventajas tiene un teclado mecanico gamer ANSI para entusiastas?",
        answer: "Principalmente la enorme oferta de keycaps y accesorios compatibles. Si te gusta personalizar, un teclado mecanico gamer ANSI te abre un catálogo mucho más amplio de mods."
      }
    ]
  },
  "iso": {
    h1: "Teclados ISO",
    p: "El layout ISO se reconoce por su tecla Enter vertical y una distribución distinta en algunas teclas modificadoras. Un teclado mecanico gamer ISO puede resultar más cómodo para ciertos usuarios europeos o quienes prefieren esta organización de teclas.",
    title: "Teclado mecanico gamer layout ISO en Chile | SaintGeek",
    description: "Compra tu teclado mecanico gamer con layout ISO si te sientes más cómodo con la tecla Enter vertical y la disposición europea. Estos teclados mecánicos gamer son una buena opción para quienes ya vienen de teclados ISO y no quieren cambiar de distribución.",
    faq: [
      {
        question: "¿Qué diferencia hay entre un teclado mecanico gamer ISO y ANSI?",
        answer: "La tecla Enter es vertical en ISO, cambia la posición de algunas teclas como Shift izquierdo y ciertos símbolos. Si estás acostumbrado a uno, el otro se sentirá diferente al principio. Elige el teclado mecanico gamer que coincida con tu costumbre."
      },
      {
        question: "¿Tiene sentido comprar un teclado mecanico gamer ISO en Chile?",
        answer: "Solo si ya estás acostumbrado a ese formato o vienes de un teclado europeo. Si no, es más natural optar por layout Español LatAm o ANSI para que tu teclado mecanico gamer se sienta familiar."
      },
      {
        question: "¿Es fácil encontrar keycaps para un teclado mecanico gamer ISO?",
        answer: "Hay menos variedad que para ANSI, pero aún existe una oferta decente. Si planeas hacer mods, revisa que el set de keycaps que te gusta soporte layout ISO antes de comprarlo para tu teclado mecanico gamer."
      },
      {
        question: "¿Qué debo revisar al comprar un teclado mecanico gamer ISO?",
        answer: "Comprueba que el layout coincida con el de tu sistema operativo y que te sientas cómodo con Enter vertical y la posición de signos. Un teclado mecanico gamer ISO puede ser muy cómodo si ya vienes de esa distribución."
      }
    ]
  },

  // Colores
  "negro": {
    h1: "Teclados mecánicos negros",
    p: "Los teclados mecánicos negros combinan bien con prácticamente cualquier setup, desde gamer hasta oficina. Un teclado mecanico gamer negro ofrece una estética discreta pero elegante, ideal para quienes quieren algo sobrio sin perder prestaciones para jugar.",
    title: "Teclado mecanico gamer negro en Chile | SaintGeek",
    description: "Elige tu teclado mecanico gamer negro con switches mecánicos de alto rendimiento y opciones con RGB o sin iluminación. Estos teclados mecánicos gamer se adaptan tanto a setups de trabajo como de gaming, manteniendo una apariencia limpia y profesional.",
    faq: [
      {
        question: "¿Por qué son tan populares los teclados mecanico gamer negros?",
        answer: "Porque combinan con casi cualquier setup, desde el más minimalista hasta el más cargado de RGB. Un teclado mecanico gamer negro se ve profesional en oficina y agresivo en un escritorio gamer, según cómo lo ilumines."
      },
      {
        question: "¿Un teclado mecanico gamer negro se ensucia mucho?",
        answer: "Oculta bien la suciedad ligera, pero puede mostrar polvo si no limpias el escritorio con frecuencia. Aun así, un teclado mecanico gamer negro suele lucir ordenado con un mantenimiento básico."
      },
      {
        question: "¿El color negro afecta la visibilidad de la iluminación RGB en un teclado mecanico gamer?",
        answer: "Al contrario, resalta los colores. Un teclado mecanico gamer negro con RGB suele ofrecer un contraste muy atractivo, especialmente en habitaciones con poca luz."
      },
      {
        question: "¿Qué tipo de usuario debería elegir un teclado mecanico gamer negro?",
        answer: "Casi cualquiera: desde quien quiere un setup sobrio hasta quien busca un escritorio lleno de luces. Un teclado mecanico gamer negro es la opción más versátil y fácil de combinar."
      }
    ]
  },
  "blanco": {
    h1: "Teclados mecánicos blancos",
    p: "Los teclados mecánicos blancos aportan un look limpio y luminoso al escritorio, muy popular en setups minimalistas. Un teclado mecanico gamer blanco destaca en la mesa, combinando estética cuidada con todo el rendimiento de un buen teclado mecánico.",
    title: "Teclado mecanico gamer blanco en Chile | SaintGeek",
    description: "Compra tu teclado mecanico gamer blanco con formato compacto, TKL o full size, y switches mecánicos cómodos. Estos teclados mecánicos gamer son ideales para setups estéticos, con o sin RGB, donde el color blanco es protagonista del escritorio.",
    faq: [
      {
        question: "¿Un teclado mecanico gamer blanco se ensucia más que uno negro?",
        answer: "Se nota un poco más el polvo o manchas, pero con una limpieza periódica luce espectacular. Si cuidas tu escritorio, un teclado mecanico gamer blanco puede mantenerse impecable por mucho tiempo."
      },
      {
        question: "¿Cómo se ve el RGB en un teclado mecanico gamer blanco?",
        answer: "La iluminación se difunde de forma más suave sobre el fondo claro, generando un efecto limpio y brillante. Un teclado mecanico gamer blanco con RGB suele verse muy bien en setups minimalistas o de tonos pastel."
      },
      {
        question: "¿Es buena idea usar un teclado mecanico gamer blanco en oficina?",
        answer: "Sí, transmite una imagen ordenada y moderna. Un teclado mecanico gamer blanco puede darle un toque diferente a tu escritorio profesional sin dejar de ser un periférico de alto rendimiento."
      },
      {
        question: "¿Qué debo revisar al comprar un teclado mecanico gamer blanco?",
        answer: "Fíjate en la calidad de los plásticos, el acabado (mate o brillante) y la facilidad para limpiar. Un buen teclado mecanico gamer blanco no debería amarillearse fácilmente ni perder su estética con el uso."
      }
    ]
  },
  "azul": {
    h1: "Teclados mecánicos azules",
    p: "Un teclado mecánico azul añade un toque de color al setup sin dejar de lado el rendimiento. Ya sea en la carcasa, keycaps o detalles, un teclado mecanico gamer azul puede darle personalidad a tu escritorio combinando buen diseño y funcionalidad.",
    title: "Teclado mecanico gamer azul en Chile | SaintGeek",
    description: "Encuentra tu teclado mecanico gamer azul con switches mecánicos de calidad, opciones de RGB y diferentes formatos. Estos teclados mecánicos gamer son perfectos para quienes quieren un setup con identidad propia sin sacrificar comodidad ni rendimiento.",
    faq: [
      {
        question: "¿Para quién es ideal un teclado mecanico gamer azul?",
        answer: "Para quien quiere un setup con más personalidad sin irse a colores demasiado llamativos. Un teclado mecanico gamer azul añade un toque distintivo y sigue combinando bien con periféricos negros o blancos."
      },
      {
        question: "¿El color azul en un teclado mecanico gamer afecta a la visibilidad del RGB?",
        answer: "Los tonos oscuros de azul mantienen buen contraste con la iluminación, mientras que los azules claros difunden un poco más la luz. En ambos casos, un teclado mecanico gamer azul puede verse muy atractivo con RGB bien configurado."
      },
      {
        question: "¿Un teclado mecanico gamer azul es adecuado para oficina?",
        answer: "Puede serlo si el tono es moderado. Un teclado mecanico gamer azul en un color sobrio puede dar un toque de diseño sin parecer excesivamente gamer en entornos profesionales."
      },
      {
        question: "¿Qué debo revisar al comprar un teclado mecanico gamer azul?",
        answer: "Fíjate en que el acabado del color sea uniforme, que los materiales sean resistentes y que combine con el resto de tu setup. Un techo... perdón, un teclado mecanico gamer azul bien elegido puede convertirse en el protagonista visual de tu escritorio."
      }
    ]
  },
  "azul-claro": {
    h1: "Teclados mecánicos azul claro",
    p: "Los teclados mecánicos azul claro aportan una estética fresca y distinta al escritorio, alejándose del típico negro. Un teclado mecanico gamer azul claro combina diseño llamativo con una experiencia mecánica cómoda para escribir y jugar.",
    title: "Teclado mecanico gamer azul claro en Chile | SaintGeek",
    description: "Compra tu teclado mecanico gamer azul claro con switches mecánicos agradables, formato compacto o TKL y, según el modelo, iluminación RGB. Estos teclados mecánicos gamer son ideales para setups creativos y estéticos donde el color azul claro es protagonista.",
    faq: [
      {
        question: "¿Qué tipo de setup combina bien con un teclado mecanico gamer azul claro?",
        answer: "Combina especialmente bien con setups de tonos pastel, escritorios blancos o temas inspirados en cielo y mar. Un teclado mecanico gamer azul claro encaja perfecto en espacios creativos y luminosos."
      },
      {
        question: "¿Se ve bien el RGB en un teclado mecanico gamer azul claro?",
        answer: "Sí, la luz se proyecta de forma suave y agradable. Un teclado mecanico gamer azul claro con RGB ofrece un efecto más difuso y estético, ideal si no te gustan las transiciones de color demasiado agresivas."
      },
      {
        question: "¿Un teclado mecanico gamer azul claro se ensucia fácilmente?",
        answer: "La suciedad puede notarse un poco más que en uno negro, pero menos que en uno blanco puro. Con una limpieza ocasional, tu teclado mecanico gamer azul claro se mantendrá muy presentable."
      },
      {
        question: "¿Qué debo revisar al elegir un teclado mecanico gamer azul claro?",
        answer: "Verifica que el tono de azul esté bien aplicado y que los materiales no se vean translúcidos de forma indeseada. Un buen teclado mecanico gamer azul claro debe verse sólido y uniforme en todo el chasis."
      }
    ]
  },

  // Modelos que vendes
  "ag61": {
    h1: "SaintGeek AG61 (60%)",
    p: "El AG61 es un teclado mecánico 60% con 61 teclas, perfecto para quienes quieren un teclado mecanico gamer compacto pero completo. Incluye hot-swap, RGB y cable USB-C desmontable, ofreciendo una experiencia óptima tanto para gaming como para escritura diaria.",
    title: "Teclado mecanico gamer SaintGeek AG61 60% en Chile | SaintGeek",
    description: "Descubre el teclado mecanico gamer SaintGeek AG61 60% con 61 teclas, switches mecánicos intercambiables, retroiluminación RGB y cable USB-C desmontable. Este teclado mecánico gamer es ideal para setups minimalistas, gaming competitivo y uso diario en escritorio o notebook.",
    faq: [
      {
        question: "¿Qué hace especial al teclado mecanico gamer SaintGeek AG61?",
        answer: "El SaintGeek AG61 combina formato 60%, hot-swap, cable USB-C desmontable y RGB en un cuerpo compacto. Es un teclado mecanico gamer pensado para quienes quieren dar el salto a mecánico con un modelo moderno y versátil."
      },
      {
        question: "¿El AG61 es cómodo para usar como teclado mecanico gamer principal?",
        answer: "Sí, siempre que te acostumbres a las funciones en capas. El AG61 ofrece todas las teclas esenciales en formato 60%, ideal como teclado mecanico gamer principal para escritorio pequeño o setup minimalista."
      },
      {
        question: "¿Qué tipo de switches trae el SaintGeek AG61 como teclado mecanico gamer?",
        answer: "Según versión, puede venir con distintos tipos de switches lineales o táctiles. La ventaja es que, al ser hot-swap, puedes cambiarlos con el tiempo y ajustar tu teclado mecanico gamer a la sensación que más te guste."
      },
      {
        question: "¿El teclado mecanico gamer AG61 es buena opción para llevar en mochila?",
        answer: "Sí, su tamaño 60% y cable desmontable lo hacen muy fácil de transportar. El SaintGeek AG61 es un teclado mecanico gamer compacto ideal para mover entre casa, oficina y estudio."
      }
    ]
  },
  "tk61": {
    h1: "TK61 (60%)",
    p: "El TK61 es un teclado mecánico 60% muy popular por su relación precio-rendimiento. Como teclado mecanico gamer compacto, ofrece 61 teclas, buen comportamiento en juego y una experiencia cómoda para quienes quieren dar el salto desde un teclado de membrana.",
    title: "Teclado mecanico gamer TK61 60% en Chile | SaintGeek",
    description: "Compra tu teclado mecanico gamer TK61 60% con switches mecánicos, cable USB-C y opciones con retroiluminación. Este teclado mecánico gamer es perfecto para jugadores y estudiantes que quieren un periférico compacto, portátil y con mejor sensación de tecleo que los teclados básicos.",
    faq: [
      {
        question: "¿Por qué el TK61 es un teclado mecanico gamer tan conocido?",
        answer: "Porque ofrece una muy buena relación precio-calidad en formato 60%, ideal para empezar en el mundo mecánico. El TK61 es un teclado mecanico gamer compacto que ha ganado fama por su rendimiento sólido a un costo accesible."
      },
      {
        question: "¿El TK61 sirve como primer teclado mecanico gamer?",
        answer: "Sí, es una excelente puerta de entrada. Ofrece switches mecánicos, tamaño reducido y mejor sensación de tecleo que la mayoría de teclados de membrana, sin exigir una gran inversión."
      },
      {
        question: "¿Es práctico el TK61 como teclado mecanico gamer de uso diario?",
        answer: "Si te adaptas a las funciones en capas, sí. El TK61 es un teclado mecanico gamer 60% que ahorra mucho espacio y sigue siendo funcional para estudiar, trabajar y jugar."
      },
      {
        question: "¿Qué debo revisar antes de comprar un teclado mecanico gamer TK61?",
        answer: "Verifica el tipo de switches, si el cable es USB-C desmontable, la versión de iluminación (blanca o RGB) y el layout. Así te aseguras de que tu teclado mecanico gamer TK61 coincida con lo que necesitas en tu setup."
      }
    ]
  },
  "tk68": {
    h1: "TK68 (65%)",
    p: "El TK68 lleva el formato 65% con flechas dedicadas y un diseño muy cómodo para jugar y trabajar. Como teclado mecanico gamer, ofrece un equilibrio excelente entre tamaño reducido, funcionalidad extra y buena sensación de escritura para uso mixto.",
    title: "Teclado mecanico gamer TK68 65% en Chile | SaintGeek",
    description: "Encuentra tu teclado mecanico gamer TK68 65% con 68 teclas, switches mecánicos de calidad y retroiluminación RGB. Este teclado mecánico gamer es ideal para quienes quieren flechas dedicadas sin renunciar a un formato compacto que deje espacio libre para el mouse en el escritorio.",
    faq: [
      {
        question: "¿Qué ventajas tiene el TK68 frente a otros teclados mecanico gamer 60%?",
        answer: "El TK68 añade flechas dedicadas y algunas teclas extra manteniendo un cuerpo compacto. Esto lo hace muy cómodo como teclado mecanico gamer para quienes escriben mucho, programan o navegan por documentos con frecuencia."
      },
      {
        question: "¿El TK68 es buena opción como teclado mecanico gamer principal?",
        answer: "Sí, es un excelente candidato. Ofrece un equilibrio muy cómodo entre funcionalidad extendida y tamaño reducido, por lo que puede ser tu teclado mecanico gamer principal tanto para jugar como para trabajar."
      },
      {
        question: "¿El teclado mecanico gamer TK68 requiere mucha adaptación si vengo de un full size?",
        answer: "Notarás menos ancho y algunas funciones en capas, pero mantendrás flechas y navegación básica. Muchos usuarios se adaptan rápido y agradecen el espacio extra para el mouse que ofrece este teclado mecanico gamer 65%."
      },
      {
        question: "¿Qué debo revisar antes de comprar un teclado mecanico gamer TK68?",
        answer: "Revisa los switches disponibles, la calidad del cable USB-C, la versión de RGB y el layout. Con esto claro, el TK68 puede convertirse en uno de los teclados mecanico gamer más versátiles de tu setup."
      }
    ]
  }
}

/** ------------------------------
 * buildCopy(): Generador automático de H1/Title/Description/Faq para cualquier tag
 * ------------------------------ */
export function buildCopy(slug: string): TagCopy {
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
  const colorMap: Record<string, string> = {
    "negro": "negro",
    "blanco": "blanco",
    "azul-claro": "azul claro",
    "azul": "azul",
    "rosado": "rosado",
    "morado": "morado",
    "verde": "verde",
    "gris": "gris"
  }
  const colorHit = Object.keys(colorMap).find((k) => has(k))
  const colorStr = colorHit ? ` en color ${colorMap[colorHit]}` : ""

  // Construye piezas
  const h1Core = size ? `Teclados mecánicos ${size}` : `Teclados mecánicos ${human}`
  const h1 = `${h1Core}${colorStr}${switchDesc ? " " + switchDesc : ""}`.trim()

  const baseHuman = human[0].toUpperCase() + human.slice(1)
  const featLine = feat.length ? ` Incluye características como ${feat.join(", ")}.` : ""
  const useLine =
    " Pensado como teclado mecanico gamer para jugar, trabajar y estudiar con comodidad durante muchas horas."
  const p = `Elige un teclado mecanico gamer${size ? ` ${size}` : ""} ${human.toLowerCase()}${colorHit ? ` en color ${colorMap[colorHit]}` : ""}${switchDesc ? ` ${switchDesc}` : ""}.${featLine}${useLine}`
    .replace(/\s+/g, " ")
    .trim()

  const descriptionFeat = feat.length ? ` con funciones como ${feat.join(", ")}` : ""
  const description = `Compra tu teclado mecanico gamer ${baseHuman}${size ? ` ${size}` : ""}${
    colorHit ? ` en color ${colorMap[colorHit]}` : ""
  }${descriptionFeat}. Este tipo de teclado mecánico gamer está pensado para usuarios que buscan mejor sensación de tecleo, mayor durabilidad y un periférico versátil para gaming y productividad. Despacho a todo Chile y garantía SaintGeek.`

  const faq = defaultFaq(baseHuman)

  const title = `Teclado mecanico gamer ${baseHuman} en Chile | SaintGeek`

  return { h1, p, title, description, faq }
}

/** ------------------------------
 * API principal: getTagCopy()
 * ------------------------------ */
export function getTagCopy(slug: string): TagCopy {
  const s = slugifyTag(slug)
  const curated = COPY[s]
  if (curated) return curated
  return buildCopy(s)
}
