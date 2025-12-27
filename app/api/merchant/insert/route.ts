import { NextResponse } from "next/server"
import { merchant, MERCHANT_ID } from "@/lib/merchant"

export const runtime = "nodejs"

export async function POST() {
  try {
    const product = {
      offerId: "sg-test-keyboard-1",
      title: "Teclado Mecánico 60% RGB Hot-Swap",
      description:
        "Teclado mecánico 60% con switches hot-swap, iluminación RGB y layout español.",
      link: "https://saintgeek.cl/products/keyboard-60",
      imageLink: "https://saintgeek.cl/images/keyboard.jpg",

      contentLanguage: "es",
      targetCountry: "CL",
      channel: "online",

      availability: "in stock",
      condition: "new",

      price: {
        value: "89990",
        currency: "CLP",
      },

      brand: "SaintGeek",
      mpn: "SG-KB-60-RGB",
      identifierExists: false,

      googleProductCategory: "Electronics > Computers > Computer Accessories > Keyboards",
    }

    const res = await merchant.products.insert({
      merchantId: MERCHANT_ID,
      requestBody: product,
    })

    return NextResponse.json({
      success: true,
      product: res.data,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.errors ?? error?.message ?? error,
      },
      { status: 500 }
    )
  }
}
