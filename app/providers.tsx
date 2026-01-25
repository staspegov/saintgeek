"use client";

import React from "react";
import { CartProvider } from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider currency="CLP">
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
