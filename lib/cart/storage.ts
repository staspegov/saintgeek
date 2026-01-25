import type { CartItem, Currency } from "./types";

const STORAGE_KEY = "saintgeek_cart_v1";

type PersistedCart = {
  items: CartItem[];
  currency: Currency;
};

export function loadCart(): PersistedCart | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedCart;
    if (!parsed?.items || !Array.isArray(parsed.items)) return null;
    if (!parsed.currency) parsed.currency = "CLP";
    return parsed;
  } catch {
    return null;
  }
}

export function saveCart(data: PersistedCart): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function clearCartStorage(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
