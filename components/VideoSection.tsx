"use client"

export default function VideoSection({ videoId }: { videoId: string }) {
  return (
    <section className="mt-16 rounded-2xl overflow-hidden bg-[#111]">
      <div className="relative w-full aspect-video">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`}
          title="Video del producto"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-2">REVOLUCIÓN GAMER</h2>
        <p className="text-[#b6b6b8] text-sm leading-relaxed">
          Un teclado para los gamers más exigentes, creado en la cúspide de la innovación tecnológica.
          Tiempo de respuesta mínimo, pulsación suave, materiales premium y switches confiables:
          todo ello mejora la experiencia de juego y eleva el rendimiento en partidas competitivas.
        </p>
      </div>
    </section>
  )
}
