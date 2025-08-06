// store/cartStore.ts
"use client"; // Import for Next.js client usage

import { create } from "zustand";

type CartItem = {
  id: string;
  name: string;
  price: number;
};

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
}

const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => ({
      cart: [...state.cart, item],
    })),
  removeFromCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId),
    })),
}));

export default useCartStore;
