"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product } from "@/lib/data";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, sourceEl?: HTMLElement | null) => void;
  removeFromCart: (id: number) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ceramika-cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem("ceramika-cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product: Product, sourceEl?: HTMLElement | null) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, sqm: i.sqm + 10 } : i
        );
      }
      return [...prev, { ...product, sqm: 10 }];
    });

    // Optional animation logic here if we centralize animateFlyToCart
  }

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, cartOpen, setCartOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
