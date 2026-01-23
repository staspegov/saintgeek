import Image from "next/image"

type Variant = "dark" | "purple"

type MouseFeatureDuoProps = {
  title: string
  description?: string
  leftImageSrc: string
  rightImageSrc: string
  leftLabel?: string
  rightLabel?: string
  variant?: Variant
  heightClass?: string
}

export default function MouseFeatureDuo({
  title,
  description,
  leftImageSrc,
  rightImageSrc,
  leftLabel,
  rightLabel,
  variant = "purple",
  heightClass = "py-14 md:py-20",
}: MouseFeatureDuoProps) {
  return (
    <div className="relative left-1/2 w-[100vw] -translate-x-1/2">
      <section className={`relative overflow-hidden ${heightClass}`}>
        <div className="absolute inset-0 bg-[#070708]" />

        {variant === "purple" ? (
          <>
            <div
              className="absolute inset-0 opacity-90"
              style={{
                background:
                  "radial-gradient(1200px 520px at 50% 40%, rgba(124,58,237,0.55), transparent 60%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(900px 420px at 20% 55%, rgba(91,33,182,0.35), transparent 60%)",
              }}
            />
          </>
        ) : null}

        <div className="relative mx-auto max-w-[1300px] px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              {title}
            </h2>
            {description ? (
              <p className="mt-4 text-[#a9abb0] text-base md:text-lg leading-relaxed">
                {description}
              </p>
            ) : null}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
            <div className="text-center">
              {leftLabel ? (
                <div className="mb-4 text-sm font-semibold text-white/85">
                  {leftLabel}
                </div>
              ) : null}
              <Image
                src={leftImageSrc}
                alt={leftLabel ?? "Mouse view left"}
                width={1100}
                height={1100}
                className="mx-auto w-full max-w-[480px] h-auto drop-shadow-[0_35px_60px_rgba(0,0,0,0.55)]"
              />
            </div>

            <div className="text-center">
              {rightLabel ? (
                <div className="mb-4 text-sm font-semibold text-white/85">
                  {rightLabel}
                </div>
              ) : null}
              <Image
                src={rightImageSrc}
                alt={rightLabel ?? "Mouse view right"}
                width={1100}
                height={1100}
                className="mx-auto w-full max-w-[480px] h-auto drop-shadow-[0_35px_60px_rgba(0,0,0,0.55)]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
