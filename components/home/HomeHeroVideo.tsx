import Link from "next/link"

type Props = {
  videoSrc?: string
  title?: string
  subtitle?: string
}

export default function HomeHeroVideo({
  videoSrc = "/videos/hero.mp4", // ⚠️ <video> needs a direct .mp4/.webm, not a YouTube URL
  title = "SAINTGEEK",
  subtitle = "Accesorios gamer premium",
}: Props) {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* overlays */}
      <div className="absolute inset-0 bg-black/35" />

      {/* stronger overall gradient (bottom heavier) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />

      {/* vignette */}
      <div className="absolute inset-0 [background:radial-gradient(80%_70%_at_50%_35%,transparent_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.9)_100%)]" />

      {/* EXTRA: deeper bottom fade (longer + smoother) */}
      <div className="pointer-events-none absolute left-0 bottom-0 h-52 w-full bg-gradient-to-t from-black via-black/80 to-transparent" />

      {/* EXTRA: bottom “pool” vignette (makes it feel more premium) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 [background:radial-gradient(70%_55%_at_50%_100%,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.0)_70%)]" />

      {/* content */}
      <div className="relative z-10 flex min-h-[620px] items-end justify-center px-4 pb-14 md:min-h-[720px]">
        <div className="text-center">
          <div
            className="text-[56px] font-extrabold tracking-[0.08em] text-white md:text-[88px]"
            style={{ textShadow: "0 10px 50px rgba(0,0,0,0.6)" }}
          >
            {title}
          </div>
          <div className="-mt-2 text-[16px] font-semibold tracking-wide text-white/80 md:text-[18px]">
            {subtitle}
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={{ pathname: "/accesorios/teclados" }}
              className="rounded-full bg-white px-5 py-2 text-[13px] font-semibold text-black hover:brightness-95"
            >
              Ver teclados
            </Link>
            <Link
              href={{ pathname: "/accesorios/ratones" }}
              className="rounded-full border border-white/10 bg-white/10 px-5 py-2 text-[13px] font-semibold text-white hover:bg-white/15"
            >
              Ver ratones
            </Link>
          </div>
        </div>
      </div>

      {/* top fade */}
      <div className="pointer-events-none absolute left-0 top-0 h-28 w-full bg-gradient-to-b from-black/80 to-transparent" />
    </section>
  )
}