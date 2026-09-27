"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Variant } from "@/data/products";

export interface CartItem {
  product: Product;
  variant: Variant;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, variant?: Variant, quantity?: number) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("veloraa_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem("veloraa_cart", JSON.stringify(cart));
      } catch {
        // ignore
      }
    }
  }, [cart, mounted]);

  const addToCart = (product: Product, variant?: Variant, quantity = 1) => {
    const selectedVariant = variant || product.variants[0];
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.variant.id === selectedVariant.id
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { product, variant: selectedVariant, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (variantId: string) => {
    setCart((prev) => prev.filter((item) => item.variant.id !== variantId));
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(variantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.variant.id === variantId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );
  // Free prepaid discount simulation or bonus
  const discount = 0;
  const totalPrice = subtotal - discount;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        discount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
