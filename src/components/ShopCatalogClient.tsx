'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Award,
  Compass,
  Package,
  Search,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';
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

        {/* Storefront Hero Section */}
        <section className="shop-hero-band">
          <div className="page-container">
            <div className="shop-hero-grid">
              <div>
                <div className="shop-eyebrow-row">
                  <span className="shop-eyebrow">CURATED JAPANESE CRAFTS &amp; ESSENTIALS</span>
                  <span className="shop-eyebrow-line" aria-hidden="true" />
                </div>
                <h1 className="shop-hero-title">
                  Crafted Across <span>Kyoto, Hakone &amp; Tokyo</span>
                </h1>
                <p className="shop-hero-desc">
                  Explore small-batch Uji ceremonial matcha, hand-thrown Kiyomizu ceramics, Edo Kiriko
                  glassware, and purpose-built rail travel gear sourced directly by Tanogaido&apos;s
                  concierge specialists.
                </p>
                <div className="shop-hero-actions">
                  <a href="#shop-collection" className="hero-cta-btn">
                    <span>Explore Collection</span>
                    <span className="hero-cta-circle" aria-hidden="true">
                      <ArrowUpRight strokeWidth={2.2} />
                    </span>
                  </a>
                  <Link href="/services/japan-personal-shopper" className="shop-secondary-link">
                    Custom Tokyo Jastip
                  </Link>
                </div>
              </div>

              <div className="shop-hero-media">
                <img
                  src="/assets/products/shop-hero.jpg"
                  alt="Curated collection of authentic Japanese craft tea goods and travel essentials"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Filter, Search, Sort & Bag Toolbar */}
        <section className="shop-toolbar-band" aria-label="Filter Shop Goods">
          <div className="page-container">
            <div className="shop-toolbar-inner">
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

              <div className="shop-controls-right">
                <div className="shop-search-box">
                  <Search aria-hidden="true" />
                  <input
                    type="search"
                    className="shop-search-input"
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
                <button
                  type="button"
                  className="bag-trigger-btn"
                  aria-label="Open Shopping Bag"
                  onClick={openBag}
                >
                  <ShoppingBag aria-hidden="true" strokeWidth={2} />
                  <span>
                    Bag (<span data-bag-count>{bagCount}</span>)
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid Band */}
        <section className="products-band" id="shop-collection">
          <div className="page-container">
            <div className="section-header-row">
              <div>
                <h2 className="section-heading-editorial">Curated Collection</h2>
                <p className="section-subtitle">
                  Available for worldwide insured air delivery or complimentary hotel check-in drop in
                  Japan.
                </p>
              </div>
              <span className="shop-count-label" id="shop-count-label">
                Showing {filteredProducts.length}{' '}
                {filteredProducts.length === 1 ? 'Authentic Item' : 'Authentic Items'}
              </span>
            </div>

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

        {/* Provenance / Brand Guarantees Strip */}
        <section className="provenance-band">
          <div className="page-container">
            <div>
              <h2 className="section-heading-editorial">Tanogaido Provenance Standard</h2>
              <p className="section-subtitle">
                Every release is inspected directly by our Tokyo &amp; Kyoto specialists before dispatch.
              </p>
            </div>
            <div className="provenance-grid">
              <div className="provenance-card">
                <Award aria-hidden="true" strokeWidth={2} />
                <span className="provenance-kicker">01 &middot; PROVENANCE</span>
                <h3>Direct Artisan Relationships</h3>
                <p>
                  Ceramics, wood marquetry, and Uji matcha tins sourced straight from vetted workshops
                  across Kyoto, Hakone, and Sumida without middlemen markups.
                </p>
              </div>
              <div className="provenance-card">
                <ShieldCheck aria-hidden="true" strokeWidth={2} />
                <span className="provenance-kicker">02 &middot; AUTHENTICATED</span>
                <h3>Boutique Receipts &amp; Craft Seals</h3>
                <p>
                  Includes artisan origin stamps, batch harvest dates for tea, and kiln markings verified
                  by our bilingual concierge team.
                </p>
              </div>
              <div className="provenance-card">
                <Package aria-hidden="true" strokeWidth={2} />
                <span className="provenance-kicker">03 &middot; HOTEL OR WORLDWIDE DROP</span>
                <h3>Flexible Delivery While You Travel</h3>
                <p>
                  Have parcels waiting at your Tokyo or Kyoto hotel reception desk, or ship globally in
                  custom impact-cushioned air freight crating.
                </p>
              </div>
              <div className="provenance-card">
                <Compass aria-hidden="true" strokeWidth={2} />
                <span className="provenance-kicker">04 &middot; PERSONAL SHOPPER</span>
                <h3>Bespoke Ginza &amp; Harajuku Sourcing</h3>
                <p>
                  Searching for a limited Japanese timepiece, seasonal matcha tin, or department store
                  drop? Our Jastip concierge shops live for you.
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
                  Looking for specific Ginza releases, limited department store drops, or corporate
                  gifting? Chat with our bilingual personal shopper team directly.
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
                  <ArrowUpRight strokeWidth={2.2} />
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
