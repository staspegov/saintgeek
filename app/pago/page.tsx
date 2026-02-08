// app/pago/page.tsx

import CheckoutPageClient from "@/components/cart/CheckoutPageClient"

export const metadata = {
  title: "Pago | SaintGeek",
  description: "Checkout SaintGeek",
}

export default function Page() {
  return <CheckoutPageClient />
}