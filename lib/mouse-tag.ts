// lib/mouse-tags.ts
import { slugifyTag } from "@/lib/tags"

export type TagCopy = {
  title: string
  description: string
  h1: string
  p: string
  faq?: { question: string; answer: string }[]
}

const upperIfSensor = (tag: string) => {
  // paw3311 -> PAW3311
  if (/^paw\d+$/i.test(tag)) return tag.toUpperCase()
  return tag
}

export function getMouseTagCopy(rawTag: string): TagCopy {
  const tag = slugifyTag(rawTag)
  const pretty = upperIfSensor(tag)

  // ✅ keyword especial: /accesorios/ratones/todos
  if (tag === "todos") {
    return {
      title: "Ratones gamer — Todos los modelos | SaintGeek",
      description:
        "Explora todos los ratones gamer SaintGeek. Filtra por sensor, peso y conectividad.",
      h1: "Ratones gamer — Todos los modelos",
      p: "Explora todos los ratones disponibles y filtra por sensor, peso, conectividad y mano preferida.",
      faq: [
        {
          question: "¿Qué debo priorizar al elegir un mouse gamer?",
          answer:
            "Sensor, peso, forma y conectividad. Para competitivo: ligero + sensor confiable + agarre cómodo.",
        },
        {
          question: "¿2.4GHz o Bluetooth?",
          answer:
            "2.4GHz suele dar menor latencia para gaming. Bluetooth es ideal para movilidad y multi-dispositivo.",
        },
      ],
    }
  }

  // ✅ sensores tipo PAW
  if (/^paw\d+$/i.test(tag)) {
    return {
      title: `Mouse gamer ${pretty} — Ratones con sensor ${pretty} | SaintGeek`,
      description: `Ratones gamer con sensor ${pretty}. Filtra por peso, conectividad y modelo para encontrar el mejor rendimiento.`,
      h1: `Ratones gamer con sensor ${pretty}`,
      p: `Elige un mouse gamer con sensor ${pretty} para precisión consistente y control estable. Filtra por peso, conectividad y modelo.`,
      faq: [
        {
          question: `¿Qué significa ${pretty} en un mouse?`,
          answer:
            "Es el modelo del sensor óptico. En general, define parte de la precisión, estabilidad y respuesta del tracking.",
        },
        {
          question: "¿Un sensor mejor te hace jugar mejor?",
          answer:
            "Ayuda a la consistencia, pero lo clave es: peso cómodo, buena forma para tu agarre y una sensibilidad bien configurada.",
        },
      ],
    }
  }

  // ✅ conectividad / tags comunes
  if (tag.includes("inalambric") || tag.includes("wireless")) {
    return {
      title: "Mouse gamer inalámbrico — Ratones wireless | SaintGeek",
      description:
        "Ratones gamer inalámbricos (2.4GHz / Bluetooth / cable). Baja latencia y máxima comodidad.",
      h1: "Mouse gamer inalámbrico",
      p: "Ratones wireless para jugar sin cables: filtra por sensor, peso y conectividad (2.4GHz, Bluetooth o ambos).",
      faq: [
        {
          question: "¿Wireless sirve para competitivo?",
          answer:
            "Sí, especialmente 2.4GHz. El Bluetooth es más para movilidad; 2.4GHz suele ser la mejor opción para gaming.",
        },
      ],
    }
  }

  if (tag === "rgb") {
    return {
      title: "Mouse gamer RGB — Iluminación y performance | SaintGeek",
      description:
        "Ratones gamer con RGB: estilo y rendimiento. Filtra por sensor, peso y conectividad.",
      h1: "Mouse gamer RGB",
      p: "Ratones gamer con iluminación RGB para setups con presencia. Filtra por sensor, peso y conectividad.",
    }
  }

  // ✅ fallback genérico (no dice “teclados” nunca)
  return {
    title: `Todos los ${pretty} | SaintGeek`,
    description:
      "Explora ratones gamer SaintGeek. Filtra por sensor, peso y conectividad para elegir tu mouse ideal.",
    h1: `Todos los ${pretty}`,
    p: "Filtra por sensor, peso, conectividad y modelo para encontrar el mouse gamer ideal para tu estilo.",
  }
}
