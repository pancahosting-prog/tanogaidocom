'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { Product } from '@/types/cms';

export interface BagItem {
  product: Product;
  variant?: string;
  quantity: number;
}

interface ShopBagContextType {
  items: BagItem[];
  isBagOpen: boolean;
  favorites: string[];
  totalCount: number;
  subtotal: number;
  freeShippingProgress: number;
  freeShippingEligible: boolean;
  addItem: (product: Product, variant?: string, quantity?: number) => void;
  removeItem: (productId: string, variant?: string) => void;
  updateQuantity: (productId: string, variant: string | undefined, quantity: number) => void;
  toggleBag: () => void;
  openBag: () => void;
  closeBag: () => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  checkoutWhatsApp: () => void;
}

const FREE_SHIPPING_THRESHOLD = 150;
const ShopBagContext = createContext<ShopBagContextType | undefined>(undefined);

export function ShopBagProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedBag = localStorage.getItem('tg_bag');
      if (savedBag) setItems(JSON.parse(savedBag));
      const savedFavs = localStorage.getItem('tg_favs');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem('tg_bag', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem('tg_favs', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites, isMounted]);

  const addItem = (product: Product, variant?: string, quantity = 1) => {
    let defaultVariant: string | undefined;
    if (product.variants && product.variants.length > 0) {
      const first = product.variants[0];
      defaultVariant = typeof first === 'string' ? first : first.name;
    }
    const selectedVariant = variant || defaultVariant;
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.product.id === product.id && i.variant === selectedVariant
      );
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { product, variant: selectedVariant, quantity }];
    });
    setIsBagOpen(true);
  };

  const removeItem = (productId: string, variant?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.variant === variant))
    );
  };

  const updateQuantity = (productId: string, variant: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, variant);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.variant === variant
          ? { ...i, quantity }
          : i
      )
    );
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  const freeShippingProgress = useMemo(
    () => Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)),
    [subtotal]
  );

  const freeShippingEligible = subtotal >= FREE_SHIPPING_THRESHOLD;

  const checkoutWhatsApp = () => {
    if (items.length === 0) return;
    const invoiceNumber = `TG-${Math.floor(1000 + Math.random() * 9000)}`;
    const itemsList = items
      .map(
        (i) =>
          `• ${i.product.name || i.product.title}${i.variant ? ` (${i.variant})` : ''} x${i.quantity} — $${(i.product.price * i.quantity).toFixed(2)}`
      )
      .join('\n');

    const message = `*Tanogaido Japan Goods Order*\nInvoice: ${invoiceNumber}\n\n*Items:*\n${itemsList}\n\n*Subtotal:* $${subtotal.toFixed(2)}\n*Shipping:* ${freeShippingEligible ? 'FREE' : '$15.00'}\n\nPlease confirm product availability and delivery address.`;

    const url = `https://wa.me/6281318047974?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <ShopBagContext.Provider
      value={{
        items,
        isBagOpen,
        favorites,
        totalCount,
        subtotal,
        freeShippingProgress,
        freeShippingEligible,
        addItem,
        removeItem,
        updateQuantity,
        toggleBag: () => setIsBagOpen((prev) => !prev),
        openBag: () => setIsBagOpen(true),
        closeBag: () => setIsBagOpen(false),
        toggleFavorite,
        isFavorite,
        checkoutWhatsApp,
      }}
    >
      {children}
    </ShopBagContext.Provider>
  );
}

export function useShopBag() {
  const ctx = useContext(ShopBagContext);
  if (!ctx) throw new Error('useShopBag must be used within ShopBagProvider');
  return ctx;
}
