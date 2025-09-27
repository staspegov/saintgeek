'use client'

import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import SidebarFilters from '@/components/SidebarFilters'
import Script from 'next/script'
import { orgJsonLd, websiteJsonLd, faqJsonLd, productJsonLd } from '@/lib/jsonld'
import { useMemo, useState } from 'react'

export default function Page() {
  // 🔹 estados de filtros
  const [model, setModel] = useState<string | null>(null)
  const [numpad, setNumpad] = useState<string | null>(null)
  const [switchType, setSwitchType] = useState<string | null>(null)
  const [switchName, setSwitchName] = useState<string | null>(null)

  const [open, setOpen] = useState(false) // modal

  // 🔹 lógica de filtrado
  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (model && p.model !== model) return false
      if (numpad && p.numpad !== numpad) return false
      if (switchName && p.switch !== switchName) return false
      if (switchType && p.switchType !== switchType) return false
      return true
    })
  }, [model, numpad, switchName, switchType])

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        background: `
          radial-gradient(circle at top right, rgba(141, 215, 223, 0), transparent 40%),
          linear-gradient(180deg, #0e0e0f 0%, #0a0a0b 100%)
        `,
        color: '#e9e9ea',
      }}
    >
      <div className="max-w-[1450px] mx-auto px-6 pb-20 pt-10">
        {/* Hero */}
        <div className="pt-2 pb-6">
          <h1 className="m-0 mb-3 text-[46px] leading-[1.1] tracking-[.2px] text-[#f4f4f5]">
            Teclados mecánicos gamer
          </h1>
          <p className="max-w-[860px] m-0 mb-4 text-[16px] leading-[1.6] text-[#b6b6b8]">
            Los teclados mecánicos gamer son periféricos diseñados
            especialmente para los jugadores. A diferencia de los modelos
            estándar u de oficina, estos dispositivos ofrecen una experiencia
            más inmersiva gracias a su diseño atractivo, comodidad de uso y
            funciones adicionales como retroiluminación RGB, anti-ghosting y
            switches intercambiables.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="inline-block font-semibold text-[14px] px-4 py-2 rounded-full"
            style={{
              background: '#89ff00',
              color: '#101010',
              boxShadow: '0 8px 24px rgba(137,255,0,.25)',
            }}
          >
            Saber más
          </button>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-6 items-start">
          <SidebarFilters
            onModel={setModel}
            onNumpad={setNumpad}
            onSwitch={setSwitchName}
            onSwitchType={setSwitchType}
          />
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </section>
        </div>
      </div>

     {/* Modal */}
{open && (
  <div
    className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
    onClick={() => setOpen(false)}
  >
    <div
      className="bg-[#1a1a1c] rounded-xl max-w-3xl w-full p-6 text-[#e9e9ea] overflow-y-auto max-h-[80vh] relative"
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
    >
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
        onClick={() => setOpen(false)}
        aria-label="Cerrar modal"
      >
        ✕
      </button>

      <h2 id="modal-title" className="text-2xl font-bold mb-4">
        Teclados mecánicos gamer
      </h2>

      <section id="modal-desc">
        <h3 className="text-xl font-semibold mb-2">¿Qué son y por qué elegirlos?</h3>
        <p className="mb-4">
          Los teclados mecánicos gamer son periféricos especiales, creados para quienes disfrutan de los videojuegos.
          A diferencia de los modelos estándar u de oficina, permiten obtener una experiencia más placentera gracias a su
          diseño atractivo, comodidad de uso y funciones adicionales.
        </p>

        <h3 className="text-xl font-semibold mb-2">¿Membrana o mecánico?</h3>
        <p className="mb-4">
          Al elegir un buen teclado para juegos, siempre surge la duda: ¿membrana o mecánico?
          La mejor opción para jugar suele ser la mecánica. Estos teclados integran interruptores capaces de soportar
          una inmensa cantidad de pulsaciones (hasta 50 millones) y ofrecen una respuesta más rápida:
          la acción se registra incluso antes de presionar la tecla por completo. Los teclados de membrana son comunes en
          el segmento económico y, a su favor, resultan casi silenciosos.
        </p>

        <h3 className="text-xl font-semibold mb-2">Juegos donde marcan la diferencia</h3>
        <ul className="list-disc list-inside mb-4 space-y-1 text-[#c9c9c9]">
          <li>Shooters en línea: Counter-Strike: GO, Warface, Battlefield</li>
          <li>MMORPG: World Of Warcraft, The Elder Scrolls Online, Final Fantasy XIV: A Realm Reborn</li>
          <li>MOBAs: Dota 2, League of Legends</li>
          <li>Single-player: GTA 5, Red Dead Redemption 2, The Witcher 3</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Características clave para jugar mejor</h3>
        <ul className="list-disc list-inside mb-4 space-y-1 text-[#c9c9c9]">
          <li><strong>Durabilidad de switches:</strong> hasta ~50 millones de pulsaciones.</li>
          <li><strong>Respuesta rápida:</strong> registro antes del recorrido completo de la tecla.</li>
          <li><strong>Teclas programables:</strong> asigna funciones críticas a botones dedicados para ganar ventaja.</li>
          <li><strong>Retroiluminación:</strong> facilita jugar en la oscuridad sin encender la luz del cuarto.</li>
        </ul>

        <p>
          En nuestra vitrina online podrás encontrar y comparar el teclado que mejor se adapte a tu estilo.
        </p>
      </section>
    </div>
  </div>
)}


      {/* JSON-LD */}
      <Script id="ld-org" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }} />
      <Script id="ld-website" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }} />
      <Script id="ld-faq" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }} />
      <Script id="ld-products" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(products.map(p => productJsonLd(p))),
        }} />
    </div>
  )
}
