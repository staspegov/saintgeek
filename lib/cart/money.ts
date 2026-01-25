export function formatMoney(amount: number, currency: "CLP" | "USD" | "EUR" = "CLP") {
  const n = Number.isFinite(amount) ? amount : 0;

  // CLP normalmente sin decimales
  const options: Intl.NumberFormatOptions =
    currency === "CLP"
      ? { style: "currency", currency, maximumFractionDigits: 0 }
      : { style: "currency", currency };

  return new Intl.NumberFormat("es-CL", options).format(n);
}

export function safeNumber(x: unknown, fallback = 0) {
  const n = typeof x === "number" ? x : typeof x === "string" ? Number(x.replace(/[^\d.-]/g, "")) : NaN;
  return Number.isFinite(n) ? n : fallback;
}
