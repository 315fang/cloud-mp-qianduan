"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { Product } from "@/lib/data";

export interface CartItem {
  product: Product;
  qty: number;
  spec: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, qty: number, spec: string) => void;
  removeItem: (productId: string, spec: string) => void;
  updateQty: (productId: string, spec: string, qty: number) => void;
  toggleSelect: (productId: string, spec: string) => void;
  selectedIds: Set<string>;
  selectAll: boolean;
  setSelectAll: (v: boolean) => void;
  clearSelected: () => void;
  total: number;
  totalCount: number;
  selectedCount: number;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const itemKey = (productId: string, spec: string) => `${productId}-${spec}`;

  const addItem = useCallback((product: Product, qty: number, spec: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.spec === spec
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.spec === spec
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }
      return [...prev, { product, qty, spec }];
    });
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.add(itemKey(product.id, spec));
      return next;
    });
  }, []);

  const removeItem = useCallback((productId: string, spec: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.spec === spec))
    );
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(itemKey(productId, spec));
      return next;
    });
  }, []);

  const updateQty = useCallback(
    (productId: string, spec: string, qty: number) => {
      if (qty < 1) return;
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId && i.spec === spec ? { ...i, qty } : i
        )
      );
    },
    []
  );

  const toggleSelect = useCallback((productId: string, spec: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const k = itemKey(productId, spec);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  }, []);

  const setSelectAll = useCallback(
    (v: boolean) => {
      if (v) {
        setSelectedIds(new Set(items.map((i) => itemKey(i.product.id, i.spec))));
      } else {
        setSelectedIds(new Set());
      }
    },
    [items]
  );

  const clearSelected = useCallback(() => {
    setItems((prev) =>
      prev.filter((i) => !selectedIds.has(itemKey(i.product.id, i.spec)))
    );
    setSelectedIds(new Set());
  }, [selectedIds]);

  const total = items
    .filter((i) => selectedIds.has(itemKey(i.product.id, i.spec)))
    .reduce((sum, i) => sum + i.product.price * i.qty, 0);

  const totalCount = items.reduce((sum, i) => sum + i.qty, 0);

  const selectedCount = items
    .filter((i) => selectedIds.has(itemKey(i.product.id, i.spec)))
    .reduce((s, i) => s + i.qty, 0);

  const isInCart = useCallback(
    (productId: string) => items.some((i) => i.product.id === productId),
    [items]
  );

  const selectAll = items.length > 0 && items.every((i) => selectedIds.has(itemKey(i.product.id, i.spec)));

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        toggleSelect,
        selectedIds,
        selectAll,
        setSelectAll,
        clearSelected,
        total,
        totalCount,
        selectedCount,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
