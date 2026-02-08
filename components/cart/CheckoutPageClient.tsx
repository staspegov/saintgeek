"use client"

import React, { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "./useCart"

const TRANSFER_DISCOUNT = 0.16

function formatCLP(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Math.round(value))
}

function getQty(it: any): number {
  if (typeof it?.qty === "number") return it.qty
  if (typeof it?.quantity === "number") return it.quantity
  return 1
}

function getUnitPrice(it: any): number {
  if (typeof it?.price === "number") return it.price
  if (typeof it?.unitPrice === "number") return it.unitPrice
  if (typeof it?.priceRub === "number") return it.priceRub
  if (typeof it?.product?.priceRub === "number") return it.product.priceRub
  if (typeof it?.product?.price === "number") return it.product.price
  return 0
}

function getProductId(it: any): string {
  // un poco más tolerante
  return String(it?.productId ?? it?.id ?? it?.product?.id ?? "")
}

function getProductSlug(it: any): string {
  return String(it?.productSlug ?? it?.product?.slug ?? it?.slug ?? "")
}

type PayMethod = "transfer" | "mercadopago"

export default function CheckoutPageClient() {
  const router = useRouter()
  const { items } = useCart()

  const [method, setMethod] = useState<PayMethod>("transfer")
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    rut: "",
    address: "",
    notes: "",
  })

  const totalNormal = useMemo(() => {
    return items.reduce((acc, it) => acc + getUnitPrice(it) * getQty(it), 0)
  }, [items])

  const totalTransfer = useMemo(() => {
    return Math.round(totalNormal * (1 - TRANSFER_DISCOUNT))
  }, [totalNormal])

  const ahorroTransfer = Math.max(0, totalNormal - totalTransfer)
  const totalAPagar = method === "transfer" ? totalTransfer : totalNormal

  function onChange<K extends keyof typeof form>(key: K, value: string) {
    setForm((p) => ({ ...p, [key]: value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!items.length || submitting) return

    setSubmitting(true)

    try {
      if (method === "transfer") {
        router.push(`/pago/exito?method=transfer`)
        return
      }

      const payload = {
        items: items.map((it: any) => ({
          productId: getProductId(it),
          productSlug: getProductSlug(it),
          qty: getQty(it),
        })),
        customer: {
          email: form.email,
          name: form.name,
          phone: form.phone,
          rut: form.rut,
          address: form.address,
          notes: form.notes,
        },
      }

      if (payload.items.some((x: any) => !x.productId && !x.productSlug)) {
        throw new Error("Falta productId/productSlug en uno o más items del carrito.")
      }

      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(json?.error ?? "No se pudo crear la orden")
      }

      const orderId = String(json.orderId ?? "")
      const total = Number(json.total ?? 0)

      if (!orderId || !Number.isFinite(total) || total <= 0) {
        throw new Error("Respuesta inválida desde /api/orders/create")
      }

      const draft = {
        orderId,
        createdAt: Date.now(),
        amount: total,
        description: "Compra SaintGeek",
        payerEmail: form.email || "",
        form,
        items: items.map((it: any) => ({
          key: String(it.key ?? it.id ?? it.productId ?? Math.random()),
          qty: getQty(it),
          unit: getUnitPrice(it),
          productSlug: getProductSlug(it),
          productId: getProductId(it),
          name:
            it?.name ||
            it?.title ||
            it?.product?.name ||
            it?.product?.title ||
            "Producto SaintGeek",
        })),
      }

      localStorage.setItem("sg_checkout_draft", JSON.stringify(draft))
      router.push("/pago/tarjeta")
    } catch (err: any) {
      console.error(err)
      alert(err?.message ?? "Error")
      setSubmitting(false)
    }
  }

  const pageBg =
    "bg-[radial-gradient(circle_at_top_right,rgba(192,255,3,0.10),transparent_45%),linear-gradient(180deg,#0e0e0f_0%,#0a0a0b_100%)]"
  const card =
    "rounded-2xl border border-white/10 bg-[#141416] shadow-[0_10px_28px_rgba(0,0,0,.45)]"
  const softCard = "rounded-2xl border border-white/10 bg-[#0f0f10]"
  const label = "text-xs text-white/60"
  const input =
    "mt-1 w-full rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:ring-2 focus:ring-[#C0FF03]/25"
  const textarea =
    "mt-1 w-full min-h-[90px] rounded-xl border border-white/10 bg-[#0f0f10] px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:ring-2 focus:ring-[#C0FF03]/25"
  const secondaryBtn =
    "rounded-xl px-4 py-2 text-sm font-semibold bg-white/5 hover:bg-white/10 transition text-white"
  const green = "#C0FF03"

  if (!items.length) {
    return (
      <div className={`min-h-screen ${pageBg}`}>
        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className={`${card} p-6 text-sm text-white/80`}>
            Tu carrito está vacío.{" "}
            <Link href="/" className="underline font-semibold text-white">
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${pageBg} text-white`}>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold">Pago</h1>
            <p className="text-sm text-white/60">
              Completa tus datos y elige método de pago.
            </p>
          </div>

          <button onClick={() => router.back()} className={secondaryBtn}>
            Volver al carrito
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
          <form onSubmit={submit} className="space-y-4">
            <div className={`${card} p-5`}>
              <h2 className="font-extrabold">Datos del comprador</h2>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className={label}>Nombre</label>
                  <input
                    value={form.name}
                    onChange={(e) => onChange("name", e.target.value)}
                    required
                    className={input}
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className={label}>RUT</label>
                  <input
                    value={form.rut}
                    onChange={(e) => onChange("rut", e.target.value)}
                    className={input}
                    placeholder="12.345.678-9"
                  />
                </div>

                <div>
                  <label className={label}>Email</label>
                  <input
                    value={form.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    type="email"
                    required
                    className={input}
                    placeholder="tucorreo@mail.com"
                  />
                </div>

                <div>
                  <label className={label}>Teléfono</label>
                  <input
                    value={form.phone}
                    onChange={(e) => onChange("phone", e.target.value)}
                    className={input}
                    placeholder="+56 9 1234 5678"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={label}>Dirección (opcional)</label>
                  <input
                    value={form.address}
                    onChange={(e) => onChange("address", e.target.value)}
                    className={input}
                    placeholder="Calle, número, comuna"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={label}>Notas (opcional)</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => onChange("notes", e.target.value)}
                    className={textarea}
                    placeholder="Ej: dejar en conserjería, etc."
                  />
                </div>
              </div>
            </div>

            <div className={`${card} p-5`}>
              <h2 className="font-extrabold">Método de pago</h2>

              <div className="mt-3 space-y-2">
                <label className={`${softCard} flex items-start gap-3 p-3 cursor-pointer`}>
                  <input
                    type="radio"
                    name="pay"
                    checked={method === "transfer"}
                    onChange={() => setMethod("transfer")}
                    className="mt-1 accent-[#C0FF03]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold">Transferencia (16% OFF)</span>
                      <span className="text-sm font-extrabold" style={{ color: green }}>
                        {formatCLP(totalTransfer)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-white/60">
                      Ahorro aprox: {formatCLP(ahorroTransfer)}.
                    </p>
                  </div>
                </label>

                <label className={`${softCard} flex items-start gap-3 p-3 cursor-pointer`}>
                  <input
                    type="radio"
                    name="pay"
                    checked={method === "mercadopago"}
                    onChange={() => setMethod("mercadopago")}
                    className="mt-1 accent-[#C0FF03]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold">MercadoPago</span>
                      <span className="text-sm font-extrabold text-white">
                        {formatCLP(totalNormal)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-white/60">Pago con tarjeta / cuotas.</p>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full px-6 py-4 text-sm font-semibold text-black transition hover:brightness-95 disabled:opacity-50"
              style={{ backgroundColor: green }}
            >
              {submitting ? "Procesando..." : `Confirmar y pagar (${formatCLP(totalAPagar)})`}
            </button>
          </form>

          <div className="lg:sticky lg:top-6 h-fit space-y-3">
            <div className={`${card} p-5`}>
              <h2 className="font-extrabold">Resumen</h2>

              <div className="mt-3 space-y-2 text-sm">
                {items.map((it: any) => {
                  const qty = getQty(it)
                  const unit = getUnitPrice(it)
                  const line = unit * qty
                  const title =
                    it?.name || it?.title || it?.product?.name || it?.product?.title || "Producto"

                  return (
                    <div key={it.key} className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-semibold truncate text-white/90">{title}</div>
                        <div className="text-xs text-white/50">
                          {qty} × {formatCLP(unit)}
                        </div>
                      </div>
                      <div className="font-semibold text-white/90">{formatCLP(line)}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className={`${softCard} p-5 text-xs text-white/60`}>
              ¿Necesitas ayuda? Escríbenos y te guiamos.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
