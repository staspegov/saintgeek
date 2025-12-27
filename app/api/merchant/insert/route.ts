import { NextResponse } from "next/server"
import { merchant, MERCHANT_ID } from "@/lib/merchant"
import { products } from "@/data/products"
import { mapProductToMerchant } from "@/lib/merchantMapper"

export const runtime = "nodejs"

export async function POST() {
  try {
    const results = []

    for (const p of products) {
      const product = mapProductToMerchant(p)

      const res = await merchant.products.insert({
        merchantId: MERCHANT_ID,
        requestBody: product,
      })

      results.push({
        offerId: product.offerId,
        status: "ok",
        id: res.data.id,
      })
    }

    return NextResponse.json({
      ok: true,
      inserted: results.length,
      results,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        error: error?.errors ?? error?.message ?? error,
      },
      { status: 500 }
    )
  }
}
