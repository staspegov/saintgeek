import Link from "next/link"

type Props = {
  videoSrc?: string
  title?: string
  subtitle?: string
}

export default function HomeHeroVideo({
  videoSrc = "https://www.youtube.com/watch?v=MCRfz4EJz0o",
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

      {/* overlays hyperpc style */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
      <div className="absolute inset-0 [background:radial-gradient(80%_70%_at_50%_35%,transparent_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.85)_100%)]" />

      {/* content bottom-center like HyperPC */}
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

          {/* optional: botones invisibles estilo hyperpc (puedes borrar si quieres 100% limpio) */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={{ pathname: "accesorios/teclados" }}
              className="rounded-full bg-white px-5 py-2 text-[13px] font-semibold text-black hover:brightness-95"
            >
              Ver teclados
            </Link>
            <Link
              href={{ pathname: "accesorios/ratones" }}
              className="rounded-full bg-white/10 px-5 py-2 text-[13px] font-semibold text-white hover:bg-white/15 border border-white/10"
            >
              Ver ratones
            </Link>
          </div>
        </div>
      </div>

      {/* top/bottom fade edges like hyperpc */}
      <div className="pointer-events-none absolute left-0 top-0 h-28 w-full bg-gradient-to-b from-black/80 to-transparent" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-28 w-full bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}
