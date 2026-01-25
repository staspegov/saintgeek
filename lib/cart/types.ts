export type Currency = "CLP" | "USD" | "EUR";

export type CartVariant = Record<string, string>; 
// Ej: { color: "Black", switch: "Blue" }

export type CartItem = {
  key: string;            // slug + variantes (único en carrito)
  productSlug: string;
  productName: string;
  productUrl?: string;
  image?: string;

  unitPrice: number;      // precio unitario (num)
  currency: Currency;

  quantity: number;
  maxQuantity?: number;   // opcional: stock o límite

  variant?: CartVariant;  // opcional
};

export type CartState = {
  items: CartItem[];
  currency: Currency;
  isOpen: boolean;
  hydrated: boolean; // para evitar parpadeos SSR/CSR
};
