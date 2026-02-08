// components/mercadopago/CardPaymentBrick.tsx
"use client"

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { loadMercadoPago } from "@mercadopago/sdk-js"

export type CardPaymentBrickHandle = {
  unmount: () => Promise<void>
}

type Props = {
  amount: number
  description: string
  payerEmail?: string
  metadata?: Record<string, any> // debe incluir { orderId }
  onApproved?: (res: any) => void
  onResult?: (res: any) => void
  onError?: (err: any) => void
}

const CardPaymentBrick = forwardRef<CardPaymentBrickHandle, Props>(function CardPaymentBrick(
  { amount, description, payerEmail, metadata, onApproved, onResult, onError },
  ref
) {
  const containerIdRef = useRef(
    `cardPaymentBrick_container_${Math.random().toString(16).slice(2)}`
  )
  const containerId = containerIdRef.current

  const controllerRef = useRef<any>(null)
  const [status, setStatus] = useState<string>("")

  useImperativeHandle(ref, () => ({
    unmount: async () => {
      try {
        if (controllerRef.current?.unmount) await controllerRef.current.unmount()
      } catch {
        // noop
      } finally {
        controllerRef.current = null
      }
    },
  }))

  useEffect(() => {
    let cancelled = false

    async function init() {
      // ✅ requerimiento: orderId
      const orderId = metadata?.orderId
      if (!orderId) {
        setStatus("Missing metadata.orderId")
        return
      }

      const pk = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY
      if (!pk) {
        setStatus("Falta NEXT_PUBLIC_MP_PUBLIC_KEY")
        return
      }

      try {
        await loadMercadoPago()
        const mp = new (window as any).MercadoPago(pk, { locale: "es-CL" })
        const bricksBuilder = mp.bricks()

        const settings = {
          initialization: { amount },
          customization: {
            visual: { style: { theme: "default" } },
          },
          callbacks: {
            onSubmit: (cardFormData: any) => {
              setStatus("Procesando pago...")

              // algunos bricks no traen payer.email siempre -> lo parchamos si falta
              const patched = { ...(cardFormData ?? {}) }
              if (payerEmail && !patched?.payer?.email) {
                patched.payer = { ...(patched.payer ?? {}), email: payerEmail }
              }

              const payload = {
                ...patched,
                transaction_amount: amount,
                description,
                metadata: {
                  ...(metadata ?? {}),
                  orderId, // ✅ forzar
                },
              }

              return fetch("/api/mp/process-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              })
                .then(async (r) => {
                  const json = await r.json().catch(() => ({}))
                  if (!r.ok) throw json
                  return json
                })
                .then((res) => {
                  if (cancelled) return

                  onResult?.(res)

                  // MercadoPago suele devolver status + status_detail + id
                  if (res?.status) {
                    const msg = `Resultado: ${res.status} (${res.status_detail ?? ""}) - ID: ${res.id ?? "-"}`
                    setStatus(msg)

                    if (res.status === "approved") {
                      onApproved?.(res)
                    }
                  } else {
                    const details =
                      res?.details
                        ? ` ${JSON.stringify(res.details)}`
                        : ""
                    setStatus(`Error: ${res?.error ?? "Pago no pudo procesarse"}${details}`)
                  }
                })
                .catch((err) => {
                  if (cancelled) return
                  onError?.(err)
                  const details =
                    err?.details
                      ? ` ${JSON.stringify(err.details)}`
                      : ""
                  setStatus(
                    `Error: ${err?.error ?? err?.message ?? "Error procesando el pago"}${details}`
                  )
                })
            },
            onReady: () => {
              if (!cancelled) setStatus("")
            },
            onError: (error: any) => {
              if (cancelled) return
              onError?.(error)
              setStatus("Ha ocurrido un error. Por favor, vuelve a intentarlo más tarde.")
              console.error("MP Brick error:", error)
            },
          },
        }

        // desmontar brick anterior si existía
        if (controllerRef.current?.unmount) {
          await controllerRef.current.unmount()
          controllerRef.current = null
        }

        controllerRef.current = await bricksBuilder.create("cardPayment", containerId, settings)
      } catch (err: any) {
        if (!cancelled) {
          onError?.(err)
          setStatus(err?.message ?? "No se pudo inicializar MercadoPago Brick")
        }
      }
    }

    init()

    return () => {
      cancelled = true
      if (controllerRef.current?.unmount) controllerRef.current.unmount()
      controllerRef.current = null
    }
  }, [amount, description, payerEmail, metadata, containerId, onApproved, onResult, onError])

  return (
    <div className="w-full">
      <div id={containerId} />
      {status ? (
        <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white/80">
          {status}
        </div>
      ) : null}
    </div>
  )
})

export default CardPaymentBrick
