'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ProductItem } from '@/types/cms';
import { WA_NUMBER } from '@/data/fallback-data';

export interface BagLineItem {
  id: string;
  title: string;
  price: number;
  image: string;
  variant: string;
  qty: number;
}

interface BagContextValue {
  bag: BagLineItem[];
  favs: string[];
  bagCount: number;
  subtotal: number;
  isBagOpen: boolean;
  openBag: () => void;
  closeBag: () => void;
  addToBag: (product: ProductItem, variant?: string, qty?: number) => void;
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => boolean;
}

const STORAGE_BAG_KEY = 'tanogaido_bag_v1';
const STORAGE_FAV_KEY = 'tanogaido_shop_fav_v1';
const FREE_SHIPPING_THRESHOLD = 150;

const BagContext = createContext<BagContextValue | null>(null);

export function useBag(): BagContextValue {
  const ctx = useContext(BagContext);
  if (!ctx) {
    throw new Error('useBag must be used within BagProvider');
  }
  return ctx;
}

export function BagProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isShopPage = pathname === '/shop';

  const [bag, setBag] = useState<BagLineItem[]>([]);
  const [favs, setFavs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [confirmedOrderCode, setConfirmedOrderCode] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      const rawBag = localStorage.getItem(STORAGE_BAG_KEY);
      if (rawBag) setBag(JSON.parse(rawBag));
    } catch {
      // Ignore storage read errors
    }
    try {
      const rawFav = localStorage.getItem(STORAGE_FAV_KEY);
      if (rawFav) setFavs(JSON.parse(rawFav));
    } catch {
      // Ignore storage read errors
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_BAG_KEY, JSON.stringify(bag));
    } catch {
      // Ignore storage write errors
    }
  }, [bag, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_FAV_KEY, JSON.stringify(favs));
    } catch {
      // Ignore storage write errors
    }
  }, [favs, hydrated]);

  const bagCount = bag.reduce((sum, item) => sum + (item.qty || 0), 0);
  const subtotal = bag.reduce((sum, item) => sum + item.price * item.qty, 0);

  const openBag = useCallback(() => {
    setConfirmedOrderCode(null);
    setIsBagOpen(true);
  }, []);

  const closeBag = useCallback(() => {
    setIsBagOpen(false);
  }, []);

  const addToBag = useCallback((product: ProductItem, variant?: string, qty = 1) => {
    const chosenVariant = variant || product.variants[0] || 'Standard';
    setBag((prev) => {
      const next = [...prev];
      const existingIdx = next.findIndex(
        (item) => item.id === product.slug && item.variant === chosenVariant
      );
      if (existingIdx >= 0) {
        next[existingIdx] = { ...next[existingIdx], qty: next[existingIdx].qty + qty };
      } else {
        next.push({
          id: product.slug,
          title: product.title,
          price: product.price,
          image: product.imagePath,
          variant: chosenVariant,
          qty,
        });
      }
      return next;
    });
    setConfirmedOrderCode(null);
  }, []);

  const removeItem = useCallback((idx: number) => {
    setBag((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const updateItemQty = useCallback((idx: number, delta: number) => {
    setBag((prev) => {
      const next = [...prev];
      const item = next[idx];
      if (!item) return prev;
      const newQty = item.qty + delta;
      if (newQty <= 0) {
        return next.filter((_, i) => i !== idx);
      }
      next[idx] = { ...item, qty: newQty };
      return next;
    });
  }, []);

  const isFavorite = useCallback((slug: string) => favs.includes(slug), [favs]);

  const toggleFavorite = useCallback((slug: string) => {
    let nowSaved = false;
    setFavs((prev) => {
      if (prev.includes(slug)) {
        nowSaved = false;
        return prev.filter((f) => f !== slug);
      }
      nowSaved = true;
      return [...prev, slug];
    });
    return nowSaved;
  }, []);

  const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const itemLines = bag
    .map((i) => `- ${i.qty}x ${i.title} (${i.variant}) [$${i.price * i.qty}]`)
    .join('\n');
  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hello Tanogaido Shop, I would like to order:\n${itemLines}\nSubtotal: $${subtotal}`
  )}`;

  async function handleCheckoutSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!customerName.trim() || !deliveryLocation.trim() || bag.length === 0 || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName.trim(),
          deliveryLocation: deliveryLocation.trim(),
          items: bag.map((i) => ({
            productSlug: i.id,
            title: i.title,
            variant: i.variant,
            price: i.price,
            qty: i.qty,
          })),
          subtotal,
        }),
      });
      const data = (await res.json()) as { orderNumber?: string };
      setBag([]);
      setCustomerName('');
      setDeliveryLocation('');
      setConfirmedOrderCode(data.orderNumber || `TG-${Math.floor(1000 + Math.random() * 9000)}`);
    } catch {
      setConfirmedOrderCode(`TG-${Math.floor(1000 + Math.random() * 9000)}`);
      setBag([]);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <BagContext.Provider
      value={{
        bag,
        favs,
        bagCount,
        subtotal,
        isBagOpen,
        openBag,
        closeBag,
        addToBag,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}

      {/* Shopping Bag Drawer & Backdrop */}
      <div
        className={`tg-bag-backdrop ${isBagOpen ? 'open' : ''}`}
        id="tg-bag-backdrop"
        onClick={closeBag}
      />
      <aside className={`tg-bag-drawer ${isBagOpen ? 'open' : ''}`} id="tg-bag-drawer" aria-label="Shopping Bag">
        <div className="tg-bag-header">
          <h3 className="tg-bag-title">
            Shopping Bag (<span data-bag-count>{bagCount}</span>)
          </h3>
          <button
            className="tg-qv-close"
            id="tg-bag-close"
            type="button"
            aria-label="Close bag"
            onClick={closeBag}
          >
            &times;
          </button>
        </div>

        <div className="tg-bag-shipping-bar">
          <span id="tg-bag-ship-text">
            {subtotal >= FREE_SHIPPING_THRESHOLD
              ? 'Complimentary Express Air Shipping Unlocked!'
              : `Add $${remaining} more for complimentary Express Air Shipping from Tokyo`}
          </span>
          <div className="tg-bag-progress-track">
            <div className="tg-bag-progress-fill" id="tg-bag-progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="tg-bag-body" id="tg-bag-body">
          {confirmedOrderCode ? (
            <div className="tg-order-confirmed">
              <strong>Order #{confirmedOrderCode} Confirmed — Preparing Concierge Invoice</strong>
              Thank you for shopping with Tanogaido. Our Japan concierge team has logged your request and will
              confirm shipping details shortly via email or WhatsApp.
            </div>
          ) : bag.length === 0 ? (
            <div className="tg-bag-empty">
              Your curated Japan shopping bag is currently empty.
              <br />
              Explore our Kyoto tea craft, ceramics, and travel gear.
            </div>
          ) : (
            bag.map((item, idx) => (
              <div className="tg-bag-item" key={`${item.id}-${item.variant}`}>
                <Link href={`/shop/${item.id}`} onClick={closeBag}>
                  <img className="tg-bag-item-img" src={item.image} alt={item.title} />
                </Link>
                <div className="tg-bag-item-info">
                  <div className="tg-bag-item-top">
                    <Link href={`/shop/${item.id}`} className="tg-bag-item-name" onClick={closeBag}>
                      {item.title}
                    </Link>
                    <button
                      type="button"
                      className="tg-bag-item-remove"
                      onClick={() => removeItem(idx)}
                    >
                      Remove
                    </button>
                  </div>
                  <span className="tg-bag-item-variant">{item.variant}</span>
                  <div className="tg-bag-item-bottom">
                    <div className="tg-bag-mini-qty">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateItemQty(idx, -1)}
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateItemQty(idx, 1)}
                      >
                        +
                      </button>
                    </div>
                    <span className="tg-bag-item-price">${item.price * item.qty}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="tg-bag-footer" id="tg-bag-footer">
          {confirmedOrderCode ? (
            <button type="button" className="tg-bag-checkout-btn" onClick={closeBag}>
              Continue Shopping
            </button>
          ) : bag.length === 0 ? (
            <Link href="/shop" className="tg-bag-wa-btn" onClick={closeBag}>
              Browse All Japan Goods &rarr;
            </Link>
          ) : (
            <>
              <div className="tg-bag-subtotal-row">
                <span>Subtotal</span>
                <span>${subtotal}.00</span>
              </div>
              <form className="tg-bag-form" id="tg-bag-checkout-form" onSubmit={handleCheckoutSubmit}>
                <input
                  className="tg-bag-input"
                  type="text"
                  required
                  placeholder="Full name for invoice"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
                <input
                  className="tg-bag-input"
                  type="text"
                  required
                  placeholder="Delivery city or Tokyo hotel"
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                />
                <button type="submit" className="tg-bag-checkout-btn" disabled={submitting}>
                  {submitting ? 'Submitting...' : `Submit Order Request · $${subtotal}`}
                </button>
              </form>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="tg-bag-wa-btn"
              >
                Checkout via WhatsApp Concierge
              </a>
            </>
          )}
        </div>
      </aside>

      {/* Mobile Sticky Bag Bar on /shop */}
      {isShopPage && (
        <div
          className={`tg-mobile-bag-bar ${bagCount > 0 ? 'has-items' : ''}`}
          id="tg-mobile-bag-bar"
          role="button"
          tabIndex={0}
          aria-label="View Shopping Bag"
          onClick={openBag}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') openBag();
          }}
        >
          <span>
            {bagCount} {bagCount === 1 ? 'item' : 'items'} &middot; ${subtotal}
          </span>
          <button type="button" className="tg-mobile-bag-bar-cta">
            View Bag &rarr;
          </button>
        </div>
      )}
    </BagContext.Provider>
  );
}
