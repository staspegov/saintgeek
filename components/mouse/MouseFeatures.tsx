import MouseFeatureSection from "./MouseFeatureSection"
import MouseFeatureDuo from "./MouseFeatureDuo"

type Img = { url: string }

type MouseProductLike = {
  name: string
  sensor?: string
  dpiMax?: string | number
  pollingRateHz?: number
  buttons?: string | number
  connectivity?: string[] | string
  rechargeable?: boolean
  software?: string
  weight?: string
  images?: Img[]
}

function safeImg(p: MouseProductLike, idx: number) {
  return p.images?.[idx]?.url ?? p.images?.[0]?.url ?? "/og.jpg"
}

function connectivityText(v: MouseProductLike["connectivity"]) {
  return Array.isArray(v) ? v.join(" + ") : (v ? String(v) : "—")
}

export default function MouseFeatures({ product }: { product: MouseProductLike }) {
  const conn = connectivityText(product.connectivity)

  return (
    <>
      <MouseFeatureSection
        variant="purple"
        badge="Performance"
        title="Creado para tu juego y tus victorias"
        description={`Máxima precisión y control. ${product.sensor ? `Sensor: ${product.sensor}.` : ""} ${
          product.dpiMax ? `DPI máx.: ${product.dpiMax}.` : ""
        }`}
        imageSrc={safeImg(product, 0)}
        bullets={[
          typeof product.pollingRateHz === "number"
            ? `Polling rate: ${product.pollingRateHz} Hz`
            : "Respuesta rápida y tracking consistente",
          "Ideal para FPS competitivo",
          "Microajustes precisos sin perder control",
        ]}
      />

      <MouseFeatureSection
        variant="purple"
        reverse
        badge="Conectividad"
        title="Conexión como tú prefieras"
        description={`Elige tu estilo: ${conn}. Optimizado para baja latencia y estabilidad en juego.`}
        imageSrc={safeImg(product, 3)}
        bullets={[
          product.rechargeable ? "Batería recargable para uso diario" : "Listo para usar sin complicaciones",
          "Setup limpio y movilidad",
          "Excelente para sesiones largas",
        ]}
      />

      <MouseFeatureDuo
        title="Paneles y estética"
        description="Vista comparativa, como en HyperPC."
        leftImageSrc={safeImg(product, 1)}
        rightImageSrc={safeImg(product, 2)}
        leftLabel="Vista superior"
        rightLabel="Vista trasera / logo"
        variant="purple"
      />

      <MouseFeatureSection
        variant="dark"
        badge="Control"
        title="Botones y configuración"
        description={`Personaliza tu experiencia: botones (${product.buttons ?? "—"}), perfiles y sensibilidad.`}
        imageSrc={safeImg(product, 3)}
        bullets={[
          product.software ? `Software: ${product.software}` : "Perfiles y ajustes de DPI",
          product.weight ? `Peso: ${product.weight}` : "Diseño optimizado para control",
          "Perfecto para MOBA, FPS y multitarea",
        ]}
      />
    </>
  )
}
