//checkout page.tsx

import CardPaymentBrick from "./CardPaymentBrick";

export default function CheckoutPage() {
  // Demo: monto fijo. En tu caso, pásalo desde el carrito/checkout real.
  const amount = 30000;
  const description = "Compra SaintGeek";

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-5xl items-start justify-center px-4 py-10">
      <CardPaymentBrick amount={amount} description={description} />
    </main>
  );
}
