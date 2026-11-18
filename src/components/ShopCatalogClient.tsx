'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { ProductItem, ServiceItem } from '@/types/cms';
import { SHOP_CATEGORIES, getWhatsAppUrl } from '@/data/fallback-data';
import { useBag } from '@/components/BagProvider';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { NewsletterBand } from '@/components/NewsletterBand';
import { Footer } from '@/components/Footer';

export function ShopCatalogClient({
  products,
  services,
}: {
  products: ProductItem[];
  services: ServiceItem[];
}) {
  const { bagCount, openBag } = useBag();
  const [currentCat, setCurrentCat] = useState<string>('all');
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentSort, setCurrentSort] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  useEffect(() => {
    document.body.classList.add('is-shop-page');
    return () => {
      document.body.classList.remove('is-shop-page');
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const q = currentQuery.trim().toLowerCase();
    let list = products.filter((p) => {
      const catMatch = currentCat === 'all' || p.category === currentCat;
      const textMatch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q);
      return catMatch && textMatch;
    });

    if (currentSort === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [products, currentCat, currentQuery, currentSort]);

  return (
    <>
      <Navbar
        services={services}
        ctaLabel="Concierge Order"
        ctaHref={getWhatsAppUrl('Hello Tanogaido Shop, I would like assistance ordering Japanese goods.')}
        mobileCtaLabel="Concierge Shop Support"
      />

      <main className="shop-main">
        {/* Breadcrumb Bar */}
        <div className="breadcrumb-bar">
          <div className="page-container">
            <nav className="breadcrumb-nav" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="breadcrumb-sep" aria-hidden="true">
                /
              </span>
              <span className="breadcrumb-current">Japan Goods Shop</span>
            </nav>
          </div>
        </div>

        {/* Shop Hero Banner */}
        <section className="shop-hero-band">
          <div className="page-container">
            <div className="shop-hero-banner">
              <div className="shop-hero-content">
                <div className="eyebrow-row">
                  <span className="eyebrow">CURATED JAPANESE CRAFTS &amp; ESSENTIALS</span>
                  <span className="eyebrow-line" aria-hidden="true" />
                </div>
                <h1 className="shop-hero-title">
                  Crafted Across <span>Kyoto, Hakone &amp; Tokyo</span>
                </h1>
                <p className="shop-hero-desc">
                  Explore small-batch Uji ceremonial matcha, hand-thrown Kiyomizu ceramics, Edo Kiriko
                  glassware, and purpose-built rail travel gear sourced directly by Tanogaido’s concierge
                  specialists.
                </p>
              </div>
              <div className="shop-hero-visual">
                <img
                  src="/assets/products/shop-hero.jpg"
                  alt="Curated collection of authentic Japanese craft tea goods and travel essentials"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filter, Search, Sort & Bag Bar */}
        <section className="shop-controls-band" aria-label="Filter Shop Goods">
          <div className="page-container">
            <div className="shop-toolbar">
              <div className="shop-cat-tabs" role="tablist" aria-label="Product Categories">
                {SHOP_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`shop-cat-tab ${currentCat === cat.id ? 'active' : ''}`}
                    role="tab"
                    aria-selected={currentCat === cat.id}
                    onClick={() => setCurrentCat(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="shop-right-tools">
                <div className="shop-search-wrap">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="search"
                    className="shop-search"
                    id="shop-search"
                    placeholder="Search craft or origin..."
                    aria-label="Search shop goods"
                    value={currentQuery}
                    onChange={(e) => setCurrentQuery(e.target.value)}
                  />
                </div>
                <select
                  className="shop-sort-select"
                  id="shop-sort"
                  aria-label="Sort products"
                  value={currentSort}
                  onChange={(e) =>
                    setCurrentSort(e.target.value as 'featured' | 'price-asc' | 'price-desc')
                  }
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <span className="shop-count-label" id="shop-count-label">
                  {filteredProducts.length} Authentic{' '}
                  {filteredProducts.length === 1 ? 'Item' : 'Items'}
                </span>
                <button
                  type="button"
                  className="bag-trigger-btn"
                  aria-label="Open Shopping Bag"
                  onClick={openBag}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <span>
                    Bag (<span data-bag-count>{bagCount}</span>)
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section className="shop-grid-band">
          <div className="page-container">
            <div className="products-grid" id="shop-products-grid">
              {filteredProducts.length === 0 ? (
                <div
                  style={{
                    gridColumn: '1/-1',
                    textAlign: 'center',
                    padding: '42px 16px',
                    color: '#64748b',
                    fontSize: '14px',
                  }}
                >
                  No items match that filter. Try another category or keyword.
                </div>
              ) : (
                filteredProducts.map((p) => <ProductCard key={p.slug} product={p} />)
              )}
            </div>
          </div>
        </section>

        {/* Craft & Provenance Story */}
        <section className="provenance-band">
          <div className="page-container">
            <div className="provenance-grid">
              <div className="provenance-card">
                <span className="provenance-kicker">01 · PROVENANCE</span>
                <h3>Direct Artisan Relationships</h3>
                <p>
                  Every ceramic, wooden marquetry folio, and tea tin is sourced straight from vetted workshops
                  across Kyoto, Hakone, Sumida, and Ehime without middlemen markups.
                </p>
              </div>
              <div className="provenance-card">
                <span className="provenance-kicker">02 · HOTEL OR WORLDWIDE DROP</span>
                <h3>Flexible Delivery While You Travel</h3>
                <p>
                  Receive your goods waiting at your Tokyo or Kyoto hotel check-in desk, or ship globally in
                  custom impact-cushioned air freight packaging.
                </p>
              </div>
              <div className="provenance-card">
                <span className="provenance-kicker">03 · PERSONAL SHOPPER</span>
                <h3>Looking for Something Rare?</h3>
                <p>
                  Need a specific vintage timepiece, limited matcha harvest, or custom gift box? Our Tokyo
                  Jastip concierge team shops live with boutique receipts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Direct Personal Shopper Banner */}
        <section className="concierge-banner-band">
          <div className="page-container">
            <div className="concierge-banner-card">
              <div>
                <span className="eyebrow" style={{ color: '#fca5a5' }}>
                  TOKYO PERSONAL SHOPPER DESK
                </span>
                <h2>Request Custom Japan Sourcing</h2>
                <p>
                  Looking for specific Ginza releases, limited department store drops, or corporate gifting?
                  Chat with our bilingual personal shopper team directly.
                </p>
              </div>
              <a
                href={getWhatsAppUrl('Hello Tanogaido, I would like custom Japan Personal Shopper sourcing.')}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-btn"
              >
                <span>Message Personal Shopper</span>
                <span className="hero-cta-circle" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7M17 7H8M17 7V16" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </section>

        <NewsletterBand source="shop-newsletter" />

        <Footer />
      </main>
    </>
  );
}
