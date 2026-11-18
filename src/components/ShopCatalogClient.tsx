'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, ShoppingBag, X, MessageSquare, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { ProductCard } from '@/components/ProductCard';
import { useShopBag } from '@/context/ShopBagContext';
import { SiteFooter } from '@/components/SiteFooter';
import type { Product } from '@/types/cms';

interface ShopCatalogClientProps {
  products: Product[];
}

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'Lifestyle & Drinkware', label: 'Drinkware & Table' },
  { id: 'Textiles & Living', label: 'Textiles & Living' },
  { id: 'Connectivity', label: 'Connectivity' },
  { id: 'Matcha & Tea', label: 'Matcha & Tea' },
];

export function ShopCatalogClient({ products }: ShopCatalogClientProps) {
  const {
    items,
    isBagOpen,
    totalCount,
    subtotal,
    freeShippingProgress,
    freeShippingEligible,
    updateQuantity,
    removeItem,
    closeBag,
    openBag,
    checkoutWhatsApp,
  } = useShopBag();

  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  useEffect(() => {
    document.body.classList.add('is-shop-page');
    return () => {
      document.body.classList.remove('is-shop-page');
    };
  }, []);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchCat = category === 'all' || p.category === category;
      const name = p.name || p.title || '';
      const matchQuery =
        !query ||
        name.toLowerCase().includes(query.toLowerCase()) ||
        p.shortDesc.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });

    if (sort === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, category, query, sort]);

  return (
    <div className="shop-main">
      {/* Hero Header */}
      <section className="shop-hero-band">
        <span className="section-eyebrow">Curated Japanese Goods</span>
        <h1 className="section-title">The Tanogaido Japanese Goods Store</h1>
        <p className="section-sub">
          Handcrafted tableware, Imabari organic cotton, ceremonial grade Uji matcha, and reliable Pocket WiFi shipped directly from Japan.
        </p>
      </section>

      {/* Toolbar */}
      <section className="shop-toolbar-band">
        <div className="category-filter-strip" style={{ marginBottom: 0 }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`category-pill ${category === cat.id ? 'is-active' : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search
              size={16}
              style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="shop-search-input"
              style={{ paddingLeft: 38 }}
            />
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="category-pill"
            style={{ padding: '9px 14px', outline: 'none' }}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </section>

      {/* Products Grid */}
      <div className="products-grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Slide-over Bag Drawer */}
      <div
        className={`tg-bag-backdrop ${isBagOpen ? 'is-open' : ''}`}
        onClick={closeBag}
      />
      <div className={`tg-bag-drawer ${isBagOpen ? 'is-open' : ''}`}>
        <div className="tg-bag-head">
          <h3>Your Shopping Bag ({totalCount})</h3>
          <button
            type="button"
            className="tg-bag-close-btn"
            onClick={closeBag}
            aria-label="Close bag"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="tg-free-shipping-bar">
          {freeShippingEligible ? (
            <span>You have unlocked <strong>FREE worldwide shipping</strong>!</span>
          ) : (
            <span>
              Add <strong>${(150 - subtotal).toFixed(2)}</strong> more to get <strong>FREE shipping</strong>!
            </span>
          )}
          <div className="tg-free-shipping-track">
            <div
              className="tg-free-shipping-progress"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Bag Items */}
        <div className="tg-bag-items-list">
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#94a3b8' }}>
              <ShoppingBag size={48} style={{ margin: '0 auto 12px auto', opacity: 0.4 }} />
              <p>Your bag is currently empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.variant || 'default'}`}
                className="tg-bag-item"
              >
                <Image
                  src={item.product.image}
                  alt={item.product.name || item.product.title}
                  width={72}
                  height={72}
                  className="tg-bag-item-img"
                />
                <div className="tg-bag-item-details">
                  <h4 className="tg-bag-item-title">{item.product.name || item.product.title}</h4>
                  {item.variant && (
                    <span className="tg-bag-item-variant">Variant: {item.variant}</span>
                  )}
                  <span className="tg-bag-item-price">${item.product.price.toFixed(2)}</span>

                  <div className="tg-bag-item-ctrls">
                    <div className="tg-bag-qty-group">
                      <button
                        type="button"
                        className="tg-bag-qty-btn"
                        onClick={() =>
                          updateQuantity(item.product.id, item.variant, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="tg-bag-qty-val">{item.quantity}</span>
                      <button
                        type="button"
                        className="tg-bag-qty-btn"
                        onClick={() =>
                          updateQuantity(item.product.id, item.variant, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="tg-bag-remove-btn"
                      onClick={() => removeItem(item.product.id, item.variant)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bag Footer with WhatsApp Checkout */}
        {items.length > 0 && (
          <div className="tg-bag-footer">
            <div className="tg-bag-totals-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button
              type="button"
              className="tg-bag-checkout-btn"
              onClick={checkoutWhatsApp}
            >
              <MessageSquare size={18} />
              <span>Checkout via WhatsApp &rarr;</span>
            </button>
            <p style={{ textAlign: 'center', fontSize: 11.5, color: '#94a3b8', marginTop: 10 }}>
              Generates an invoice and connects directly with our concierge desk.
            </p>
          </div>
        )}
      </div>

      {/* Floating Mobile Bag Bar */}
      <div
        className={`tg-mobile-bag-bar ${totalCount > 0 ? 'is-visible' : ''}`}
        onClick={openBag}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ShoppingBag size={20} />
          <span style={{ fontWeight: 700 }}>{totalCount} {totalCount === 1 ? 'item' : 'items'} in Bag</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 700 }}>${subtotal.toFixed(2)}</span>
          <ArrowRight size={16} />
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
