import type { CartItem, CartState, Currency } from "./types";

export type CartAction =
  | { type: "HYDRATE"; payload: { items: CartItem[]; currency: Currency } }
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "TOGGLE" }
  | { type: "CLEAR" }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { key: string } }
  | { type: "SET_QTY"; payload: { key: string; quantity: number } };

export function initialCartState(currency: Currency = "CLP"): CartState {
  return {
    items: [],
    currency,
    isOpen: false,
    hydrated: false,
  };
}

function clampQty(qty: number, max?: number) {
  const q = Number.isFinite(qty) ? Math.floor(qty) : 1;
  const normalized = Math.max(1, q);
  return typeof max === "number" ? Math.min(normalized, Math.max(1, Math.floor(max))) : normalized;
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE": {
      return {
        ...state,
        items: action.payload.items ?? [],
        currency: action.payload.currency ?? state.currency,
        hydrated: true,
      };
    }

    case "OPEN":
      return { ...state, isOpen: true };

    case "CLOSE":
      return { ...state, isOpen: false };

    case "TOGGLE":
      return { ...state, isOpen: !state.isOpen };

    case "CLEAR":
      return { ...state, items: [], isOpen: false };

    case "ADD_ITEM": {
      const incoming = action.payload;
      const existingIndex = state.items.findIndex((it) => it.key === incoming.key);

      // Normaliza qty
      const incomingQty = clampQty(incoming.quantity, incoming.maxQuantity);

      if (existingIndex === -1) {
        return {
          ...state,
          items: [
            ...state.items,
            { ...incoming, quantity: incomingQty, currency: state.currency },
          ],
          isOpen: true,
        };
      }

      const existing = state.items[existingIndex];
      const mergedQty = clampQty(existing.quantity + incomingQty, existing.maxQuantity ?? incoming.maxQuantity);

      const nextItems = [...state.items];
      nextItems[existingIndex] = {
        ...existing,
        ...incoming,
        quantity: mergedQty,
        currency: state.currency,
      };

      return { ...state, items: nextItems, isOpen: true };
    }

    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((it) => it.key !== action.payload.key) };

    case "SET_QTY": {
      const { key, quantity } = action.payload;
      const nextItems = state.items.map((it) => {
        if (it.key !== key) return it;
        return { ...it, quantity: clampQty(quantity, it.maxQuantity) };
      });
      return { ...state, items: nextItems };
    }

    default:
      return state;
  }
}
