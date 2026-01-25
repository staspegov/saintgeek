"use client";

import React, { createContext, useEffect, useMemo, useReducer, useCallback } from "react";
import type { CartItem, CartState, Currency } from "@/lib/cart/types";
import { cartReducer, initialCartState } from "@/lib/cart/reducer";
import { loadCart, saveCart, clearCartStorage } from "@/lib/cart/storage";

type CartContextValue = {
  state: CartState;

  items: CartItem[];
  count: number;
  subtotal: number;

  open: () => void;
  close: () => void;
  toggle: () => void;

  addItem: (item: CartItem) => void;
  removeItem: (key: string) => void;
  setQty: (key: string, quantity: number) => void;
  clear: () => void;
};

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({
  children,
  currency = "CLP",
}: {
  children: React.ReactNode;
  currency?: Currency;
}) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState(currency));

  // Hydrate (localStorage) al montar
  useEffect(() => {
    const persisted = loadCart();
    if (persisted) {
      dispatch({ type: "HYDRATE", payload: { items: persisted.items, currency: persisted.currency } });
    } else {
      dispatch({ type: "HYDRATE", payload: { items: [], currency } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persistir cuando cambian items/currency (una vez hidratado)
  useEffect(() => {
    if (!state.hydrated) return;
    saveCart({ items: state.items, currency: state.currency });
  }, [state.items, state.currency, state.hydrated]);

  // Sync multi-tab (opcional)
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === null) return;
      if (e.key !== "saintgeek_cart_v1") return;
      const persisted = loadCart();
      if (persisted) {
        dispatch({ type: "HYDRATE", payload: { items: persisted.items, currency: persisted.currency } });
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const open = useCallback(() => dispatch({ type: "OPEN" }), []);
  const close = useCallback(() => dispatch({ type: "CLOSE" }), []);
  const toggle = useCallback(() => dispatch({ type: "TOGGLE" }), []);

  const addItem = useCallback((item: CartItem) => dispatch({ type: "ADD_ITEM", payload: item }), []);
  const removeItem = useCallback((key: string) => dispatch({ type: "REMOVE_ITEM", payload: { key } }), []);
  const setQty = useCallback((key: string, quantity: number) => dispatch({ type: "SET_QTY", payload: { key, quantity } }), []);

  const clear = useCallback(() => {
    dispatch({ type: "CLEAR" });
    clearCartStorage();
  }, []);

  const subtotal = useMemo(
    () => state.items.reduce((acc, it) => acc + it.unitPrice * it.quantity, 0),
    [state.items]
  );

  const count = useMemo(
    () => state.items.reduce((acc, it) => acc + it.quantity, 0),
    [state.items]
  );

  const value: CartContextValue = useMemo(
    () => ({
      state,
      items: state.items,
      count,
      subtotal,
      open,
      close,
      toggle,
      addItem,
      removeItem,
      setQty,
      clear,
    }),
    [state, count, subtotal, open, close, toggle, addItem, removeItem, setQty, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
