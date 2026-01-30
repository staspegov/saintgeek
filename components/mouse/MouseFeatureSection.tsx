import Image from "next/image"

type Variant = "dark" | "purple"

type MouseFeatureSectionProps = {
  title: string
  description: string
  imageSrc: string
  imageAlt?: string
  reverse?: boolean
  variant?: Variant
  badge?: string
  bullets?: string[]
  heightClass?: string // opcional: controlar altura
}

export default function MouseFeatureSection({
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
  variant = "purple",
  badge,
  bullets,
  heightClass = "min-h-[320px] md:min-h-[420px]",
}: MouseFeatureSectionProps) {
  return (
    // Full-bleed wrapper: rompe el max-w del page
    <div className="relative left-1/2 w-[100vw] -translate-x-1/2">
      <section className={`relative overflow-hidden ${heightClass}`}>
        {/* Fondo */}
        <div className="absolute inset-0 bg-[#070708]" />

        {/* Gradientes tipo HyperPC */}
        {variant === "purple" ? (
          <>
            <div
              className="absolute inset-0 opacity-90"
              style={{
                background:
                  "radial-gradient(1200px 500px at 55% 45%, rgba(124,58,237,0.55), transparent 60%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(900px 420px at 20% 50%, rgba(91,33,182,0.35), transparent 60%)",
              }}
            />
          </>
        ) : (
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(900px 420px at 70% 40%, rgba(255,255,255,0.08), transparent 60%)",
            }}
          />
        )}

        {/* Sombra inferior suave */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Contenido alineado a tu layout */}
        <div className="relative mx-auto max-w-[1300px] px-6 py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
            {/* Texto */}
            <div className={reverse ? "md:order-2" : "md:order-1"}>
              {badge && (
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/90 mb-4">
                  {badge}
                </div>
              )}

              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                {title}
              </h2>

              <p className="mt-4 text-[#a9abb0] text-base md:text-lg leading-relaxed max-w-xl">
                {description}
              </p>

              {bullets?.length ? (
                <ul className="mt-6 space-y-2 text-sm md:text-base text-[#c8cbd1]">
                  {bullets.map((b, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[#C0FF03]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            {/* Imagen */}
            <div className={reverse ? "md:order-1" : "md:order-2"}>
              <div className="relative mx-auto w-full max-w-[520px]">
                {/* Glow verde sutil */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-10 opacity-35 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(520px 280px at 55% 55%, rgba(192,255,3,0.22), transparent 60%)",
                  }}
                />
                <Image
                  src={imageSrc}
                  alt={imageAlt ?? title}
                  width={1100}
                  height={1100}
                  className="relative w-full h-auto drop-shadow-[0_35px_60px_rgba(0,0,0,0.55)]"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
