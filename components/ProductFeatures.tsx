"use client"
import Image from "next/image"

export default function ProductFeatures() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
        FUNCIONES Y TECNOLOGÍAS ADICIONALES
      </h2>

      {/* Bloques de imágenes */}
      <div className="flex md:grid gap-6 overflow-x-auto md:overflow-visible md:grid-cols-3 pb-4 scrollbar-hide">
        <div className="bg-[#111] rounded-2xl overflow-hidden min-w-[80%] md:min-w-0">
          <Image
            src="/images/patitas.png"
            alt="Patas ajustables"
            width={500}
            height={300}
            className="object-cover w-full h-52"
          />
        </div>
        <div className="bg-[#111] rounded-2xl overflow-hidden min-w-[80%] md:min-w-0">
          <Image
            src="/images/clicks.png"
            alt="Registro de teclas"
            width={500}
            height={300}
            className="object-cover w-full h-52"
          />
        </div>
        <div className="bg-[#111] rounded-2xl overflow-hidden min-w-[80%] md:min-w-0">
          <Image
            src="/images/fn.png"
            alt="Acceso rápido"
            width={500}
            height={300}
            className="object-cover w-full h-52"
          />
        </div>
      </div>

      {/* Bloques de texto */}
      <div className="flex md:grid gap-6 overflow-x-auto md:overflow-visible md:grid-cols-3 mt-6 pb-4 scrollbar-hide">
        <div className="bg-[#111] rounded-2xl p-5 min-w-[80%] md:min-w-0">
          <h3 className="text-lg font-semibold text-white mb-2">
            PATAS AJUSTABLES
          </h3>
          <p className="text-[#b6b6b8] text-sm leading-relaxed">
            El diseño incluye dos patas ajustables que permiten colocar el
            teclado en diferentes ángulos. Así podrás encontrar la posición
            ideal para un máximo confort y rendimiento en juegos.
          </p>
        </div>
        <div className="bg-[#111] rounded-2xl p-5 min-w-[80%] md:min-w-0">
          <h3 className="text-lg font-semibold text-white mb-2">
            REGISTRO DE CADA TECLA
          </h3>
          <p className="text-[#b6b6b8] text-sm leading-relaxed">
            Cada pulsación se registra de manera independiente, evitando
            problemas de ghosting o bloqueo de teclas durante tus partidas.
          </p>
        </div>
        <div className="bg-[#111] rounded-2xl p-5 min-w-[80%] md:min-w-0">
          <h3 className="text-lg font-semibold text-white mb-2">
            ACCESO RÁPIDO
          </h3>
          <p className="text-[#b6b6b8] text-sm leading-relaxed">
            Controla tu PC con la tecla «Fn». Activa comandos adicionales como
            silenciar, pausar el reproductor, subir o bajar volumen y mucho más.
          </p>
        </div>
      </div>
    </section>
  )
}
