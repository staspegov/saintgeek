import { Suspense } from "react"
import PagoExitoClient from "@/components/PagoExitoClient"

export const dynamic = "force-dynamic"

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0b] text-white">
          <div className="max-w-3xl mx-auto px-4 py-14">
            <div className="rounded-2xl border border-white/10 bg-[#141416] p-7 text-sm text-white/70">
              Cargando...
            </div>
          </div>
        </div>
      }
    >
      <PagoExitoClient />
    </Suspense>
  )
}
