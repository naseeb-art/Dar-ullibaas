"use client";

import { create } from "zustand";
import { CartItem } from "@/types";

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  searchOpen: boolean;
  searchQuery: string;
  recentlyViewed: string[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  setSearchOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  addToRecentlyViewed: (productId: string) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useStore = create<StoreState>((set, get) => ({
  cart: [],
  wishlist: [],
  searchOpen: false,
  searchQuery: "",
  recentlyViewed: [],

  addToCart: (item: CartItem) => {
    const cart = get().cart;
    const existing = cart.find(
      (c) =>
        c.product.id === item.product.id &&
        c.selectedSize === item.selectedSize &&
        c.selectedColor === item.selectedColor
    );
    if (existing) {
      set({
        cart: cart.map((c) =>
          c.product.id === item.product.id &&
          c.selectedSize === item.selectedSize &&
          c.selectedColor === item.selectedColor
            ? { ...c, quantity: c.quantity + item.quantity }
            : c
        ),
      });
    } else {
      set({ cart: [...cart, item] });
    }
  },

  removeFromCart: (productId: string) => {
    set({ cart: get().cart.filter((c) => c.product.id !== productId) });
  },

  updateCartQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    set({
      cart: get().cart.map((c) =>
        c.product.id === productId ? { ...c, quantity } : c
      ),
    });
  },

  clearCart: () => set({ cart: [] }),

  toggleWishlist: (productId: string) => {
    const wishlist = get().wishlist;
    if (wishlist.includes(productId)) {
      set({ wishlist: wishlist.filter((id) => id !== productId) });
    } else {
      set({ wishlist: [...wishlist, productId] });
    }
  },

  isInWishlist: (productId: string) => {
    return get().wishlist.includes(productId);
  },

  setSearchOpen: (open: boolean) => set({ searchOpen: open }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),

  addToRecentlyViewed: (productId: string) => {
    const recent = get().recentlyViewed.filter((id) => id !== productId);
    set({ recentlyViewed: [productId, ...recent].slice(0, 10) });
  },

  getCartTotal: () => {
    return get().cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },

  getCartCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  },
}));
