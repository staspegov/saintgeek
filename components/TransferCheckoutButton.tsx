"use client"

import { useEffect, useMemo, useState } from "react"

type Props = {
  productName: string
  productUrl: string
  priceLabel?: string | number // p.priceRub (con o sin formato)
}

const CHILE_REGIONS = [
  "Arica y Parinacota",
  "Tarapacá",
  "Antofagasta",
  "Atacama",
  "Coquimbo",
  "Valparaíso",
  "Metropolitana de Santiago",
  "Libertador General Bernardo O'Higgins",
  "Maule",
  "Ñuble",
  "Biobío",
  "La Araucanía",
  "Los Ríos",
  "Los Lagos",
  "Aysén del General Carlos Ibáñez del Campo",
  "Magallanes y de la Antártica Chilena",
]

const SHIPPING_METHODS = [
  { id: "express", label: "Envío express en 2 horas (Solo RM)" },
  { id: "estandar", label: "Envío estándar — 3 a 5 días" },
  { id: "retiro", label: "Retiro en tienda" },
] as const

export default function TransferCheckoutButton({ productName, productUrl, priceLabel }: Props) {
  const [open, setOpen] = useState(false)
  const [fullName, setFullName] = useState("")
  const [method, setMethod] = useState<typeof SHIPPING_METHODS[number]["id"] | "">("")
  const [region, setRegion] = useState("")
  const [address, setAddress] = useState("")

  const isPickup = method === "retiro"
  const isExpress = method === "express"

  // ---- Precio transferencia (10% OFF) ----
  const base = useMemo(() => {
    if (priceLabel == null) return 0
    const n = Number(String(priceLabel).replace(/[^\d.]/g, ""))
    return Number.isFinite(n) ? n : 0
  }, [priceLabel])

  const transferPrice = useMemo(() => (base > 0 ? Math.round(base * 0.9) : 0), [base])

  const formatCLP = (v: number) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(v)

  // Validación:
  // - Siempre requiere nombre y método
  // - Retiro: NO requiere región ni dirección
  // - Express: requiere dirección, NO requiere región
  // - Estándar: requiere región y dirección
  const isValid = useMemo(() => {
    if (!fullName.trim() || !method) return false
    if (isPickup) return true
    if (isExpress) return !!address.trim()
    return !!region && !!address.trim()
  }, [fullName, method, isPickup, isExpress, region, address])

  // ESC + bloqueo de scroll al abrir
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  const buildMessage = () => {
    const lines = [
      "Hola, quiero comprar por transferencia 👋",
      `Producto: ${productName}`,
      `Link: ${productUrl}`,
      transferPrice ? `Precio transferencia (10% OFF): ${formatCLP(transferPrice)}` : undefined,
      `Nombre completo: ${fullName}`,
      `Método de entrega: ${SHIPPING_METHODS.find((m) => m.id === method)?.label ?? method}`,
      !isPickup && !isExpress ? `Región: ${region}` : undefined,
      !isPickup ? `Dirección: ${address}` : undefined,
      "",
      "¿Me pueden indicar los datos de transferencia y tiempos de entrega? ¡Gracias!",
    ].filter(Boolean)

    return lines.join("\n")
  }

  const sendWhatsApp = () => {
    if (!isValid) return
    const phone = "56975682588" // sin '+'
    const text = encodeURIComponent(buildMessage())
    const wa = `https://wa.me/${phone}?text=${text}`
    window.open(wa, "_blank", "noopener,noreferrer")
  }

  return (
    <>
      {/* Botón que abre el modal */}
      <button
        onClick={() => setOpen(true)}
        className="block w-full text-center rounded-lg border border-[#2c2c2f] px-4 py-3 text-sm hover:border-lime-400 transition"
      >
        Comprar por transferencia
      </button>

      {/* Modal centrado */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          aria-modal="true"
          role="dialog"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
        >
          <div className="w-full max-w-lg bg-[#0f0f11] border border-[#1f1f20] rounded-2xl shadow-xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white text-lg font-semibold">Finaliza por transferencia</h3>
                <p className="text-[#a9abb0] text-sm">
                  Completa tus datos y te contactamos por WhatsApp.
                </p>
                {/* Info de precio por transferencia */}
                {transferPrice > 0 && (
                  <p className="text-xs text-lime-300 mt-2">
                    Precio transferencia (10% OFF):{" "}
                    <span className="font-semibold text-white">{formatCLP(transferPrice)}</span>
                  </p>
                )}
              </div>
              <button
                aria-label="Cerrar"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 hover:bg-white/5"
              >
                ✕
              </button>
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                if (isValid) sendWhatsApp()
              }}
            >
              {/* Nombre completo */}
              <div>
                <label className="block text-sm text-[#a9abb0] mb-1" htmlFor="fullName">
                  Nombre completo
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Tu nombre y apellido"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg bg-[#121214] border border-[#26262a] focus:border-lime-400 outline-none px-3 py-2 text-sm text-white"
                  required
                />
              </div>

              {/* Método de entrega */}
              <div>
                <label className="block text-sm text-[#a9abb0] mb-1" htmlFor="method">
                  Método de entrega
                </label>
                <select
                  id="method"
                  value={method}
                  onChange={(e) => setMethod(e.target.value as any)}
                  className="w-full rounded-lg bg-[#121214] border border-[#26262a] focus:border-lime-400 outline-none px-3 py-2 text-sm text-white"
                  required
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  {SHIPPING_METHODS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label}
                    </option>
                  ))}
                </select>
                {isExpress && (
                  <p className="text-[12px] text-[#a9abb0] mt-1">
                    *Disponible solo en Región Metropolitana. Indica tu dirección exacta.
                  </p>
                )}
              </div>

              {/* Región (oculto si Retiro o Express) */}
              {!isPickup && !isExpress && (
                <div>
                  <label className="block text-sm text-[#a9abb0] mb-1" htmlFor="region">
                    Región
                  </label>
                  <select
                    id="region"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full rounded-lg bg-[#121214] border border-[#26262a] focus:border-lime-400 outline-none px-3 py-2 text-sm text-white"
                    required
                  >
                    <option value="" disabled>
                      Selecciona tu región
                    </option>
                    {CHILE_REGIONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Dirección exacta (oculto si Retiro) */}
              {!isPickup && (
                <div>
                  <label className="block text-sm text-[#a9abb0] mb-1" htmlFor="address">
                    Dirección exacta
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder={isExpress ? "Calle, número, depto/comuna (RM)" : "Calle, número, depto/comuna"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-lg bg-[#121214] border border-[#26262a] focus:border-lime-400 outline-none px-3 py-2 text-sm text-white"
                    required
                  />
                </div>
              )}

              {/* Acciones */}
              <div className="flex flex-col md:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={!isValid}
                  className="flex-1 rounded-lg bg-lime-400 text-black font-semibold px-4 py-3 text-sm shadow-md hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  title={!isValid ? "Completa los campos requeridos" : "Enviar por WhatsApp"}
                >
                  Enviar por WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-lg border border-[#2c2c2f] px-4 py-3 text-sm hover:border-lime-400 transition"
                >
                  Cancelar
                </button>
              </div>

              {/* Vista previa (opcional) */}
              <details className="mt-2">
                <summary className="cursor-pointer text-xs text-[#a9abb0]">
                  Ver mensaje que se enviará
                </summary>
                <pre className="mt-2 text-xs whitespace-pre-wrap rounded-lg bg-[#0a0a0b] border border-[#1f1f20] p-3 text-[#d4d4d8]">
{buildMessage()}
                </pre>
              </details>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
