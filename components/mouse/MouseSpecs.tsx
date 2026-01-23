// /components/mouse/MouseSpecs.tsx
"use client"

import type { MouseProduct } from "@/data/products"

export default function MouseSpecs({ product }: { product: MouseProduct }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-white">Especificaciones</h2>

      <div className="overflow-x-auto rounded-xl border border-[#1f1f20] bg-[#0f0f11]">
        <table className="w-full text-sm text-[#e9e9ea]">
          <tbody>
            <tr className="border-b border-[#1f1f20]">
              <td className="p-3 text-[#a9abb0]">Modelo</td>
              <td className="p-3">{product.model}</td>
            </tr>

            <tr className="border-b border-[#1f1f20]">
              <td className="p-3 text-[#a9abb0]">Sensor</td>
              <td className="p-3">{product.sensor}</td>
            </tr>

            <tr className="border-b border-[#1f1f20]">
              <td className="p-3 text-[#a9abb0]">DPI máx.</td>
              <td className="p-3">{product.dpiMax.toLocaleString("es-CL")}</td>
            </tr>

            <tr className="border-b border-[#1f1f20]">
              <td className="p-3 text-[#a9abb0]">Botones</td>
              <td className="p-3">{product.buttons}</td>
            </tr>

            <tr className="border-b border-[#1f1f20]">
              <td className="p-3 text-[#a9abb0]">Conectividad</td>
              <td className="p-3">{product.connectivity.join(" + ")}</td>
            </tr>

            <tr className="border-b border-[#1f1f20]">
              <td className="p-3 text-[#a9abb0]">Recargable</td>
              <td className="p-3">{product.rechargeable ? "Sí" : "No"}</td>
            </tr>

            {product.pollingRateHz ? (
              <tr className="border-b border-[#1f1f20]">
                <td className="p-3 text-[#a9abb0]">Polling rate</td>
                <td className="p-3">{product.pollingRateHz} Hz</td>
              </tr>
            ) : null}

            {product.software ? (
              <tr className="border-b border-[#1f1f20]">
                <td className="p-3 text-[#a9abb0]">Software</td>
                <td className="p-3">{product.software}</td>
              </tr>
            ) : null}

            {product.handedness ? (
              <tr className="border-b border-[#1f1f20]">
                <td className="p-3 text-[#a9abb0]">Ergonomía</td>
                <td className="p-3">{product.handedness}</td>
              </tr>
            ) : null}

            <tr>
              <td className="p-3 text-[#a9abb0]">Peso</td>
              <td className="p-3">{product.weight}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
