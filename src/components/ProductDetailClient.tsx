'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import type { ProductItem, ServiceItem } from '@/types/cms';
import { getWhatsAppUrl } from '@/data/fallback-data';
import { useBag } from '@/components/BagProvider';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { NewsletterBand } from '@/components/NewsletterBand';
import { Footer } from '@/components/Footer';

export function ProductDetailClient({
  product,
  allProducts,
  services,
}: {
  product: ProductItem;
  allProducts: ProductItem[];
  services: ServiceItem[];
}) {
  const { bagCount, openBag, addToBag, isFavorite, toggleFavorite } = useBag();

  const gallery =
    product.gallery && product.gallery.length
      ? product.gallery
      : [{ src: product.imagePath, label: product.title }];

  const [activeImage, setActiveImage] = useState(gallery[0].src);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] || 'Standard');
  const [selectedQty, setSelectedQty] = useState(1);
  const [openAcc1, setOpenAcc1] = useState(true);
  const [openAcc2, setOpenAcc2] = useState(false);

  const firstImage = gallery[0]?.src || product.imagePath;
  const firstVariant = product.variants[0] || 'Standard';

  useEffect(() => {
    setActiveImage(firstImage);
    setSelectedVariant(firstVariant);
    setSelectedQty(1);
  }, [product.slug, firstImage, firstVariant]);

  const saved = isFavorite(product.slug);
  const total = product.price * selectedQty;
  const waHref = getWhatsAppUrl(
    `Hello Tanogaido Shop, I would like to order ${selectedQty}x "${product.title}" (${selectedVariant}) [$${total}].`
  );
  const relatedProducts = allProducts.filter((p) => p.slug !== product.slug).slice(0, 4);

  function handleAddToBag() {
    addToBag(product, selectedVariant, selectedQty);
    openBag();
  }

  return (
    <>
      <Navbar
        services={services}
        ctaLabel="Concierge Order"
        ctaHref={waHref}
        mobileCtaLabel="Chat With Shop Concierge"
      />

      <main className="pdp-main">
        {/* Breadcrumb Bar + Quick Bag Action */}
        <div className="breadcrumb-bar">
          <div className="page-container breadcrumb-flex">
            <nav className="breadcrumb-nav" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="breadcrumb-sep" aria-hidden="true">
                /
              </span>
              <Link href="/shop">Japan Goods Shop</Link>
              <span className="breadcrumb-sep" aria-hidden="true">
                /
              </span>
              <span>{product.categoryLabel}</span>
              <span className="breadcrumb-sep" aria-hidden="true">
                /
              </span>
              <span className="breadcrumb-current">{product.title}</span>
            </nav>

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

        {/* Product Detail Stage */}
        <section className="pdp-stage">
          <div className="page-container">
            <div className="pdp-layout">
              {/* Left Gallery */}
              <div className="pdp-gallery">
                <div className="pdp-main-frame">
                  <img src={activeImage} alt={product.title} />
                  <button
                    type="button"
                    className={`pdp-fav-float ${saved ? 'saved' : ''}`}
                    aria-label="Save to Wishlist"
                    onClick={() => toggleFavorite(product.slug)}
                  >
                    <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>
                <div className="pdp-thumbs">
                  {gallery.map((g) => (
                    <button
                      key={`${g.src}-${g.label}`}
                      type="button"
                      className={`pdp-thumb-btn ${activeImage === g.src ? 'active' : ''}`}
                      aria-label={g.label}
                      onClick={() => setActiveImage(g.src)}
                    >
                      <img src={g.src} alt={g.label} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Details Column */}
              <div className="pdp-info-col">
                <div className="pdp-kicker-row">
                  <span className="pdp-kicker">
                    {product.origin} &middot; {product.categoryLabel}
                  </span>
                  <span className="pdp-rating">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span>
                      {product.rating} ({product.reviewCount} concierge reviews)
                    </span>
                  </span>
                </div>

                <h1 className="pdp-title">{product.title}</h1>

                <div className="pdp-price-bar">
                  <span className="pdp-price">${product.price}</span>
                  <span className="pdp-price-jpy">{product.priceJpy}</span>
                  <span className="pdp-status-tag">{product.status}</span>
                </div>

                <p className="pdp-short-desc">{product.shortDesc}</p>

                {/* Variant Selector */}
                <div className="pdp-option-block">
                  <span className="pdp-option-label">Select Variant / Edition</span>
                  <div className="pdp-variants">
                    {product.variants.map((v) => (
                      <button
                        key={v}
                        type="button"
                        className={`pdp-variant-btn ${selectedVariant === v ? 'active' : ''}`}
                        onClick={() => setSelectedVariant(v)}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Desktop Purchase Controls */}
                <div className="pdp-actions-desktop">
                  <div className="pdp-qty-stepper" aria-label="Quantity selector">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setSelectedQty((q) => Math.max(1, q - 1))}
                    >
                      -
                    </button>
                    <span>{selectedQty}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setSelectedQty((q) => q + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button type="button" className="pdp-add-btn" onClick={handleAddToBag}>
                    Add to Bag &middot; ${total}
                  </button>
                </div>

                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdp-wa-direct"
                >
                  <span>Order Directly via WhatsApp</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>

                {/* Provenance / Craft Story */}
                <div className="pdp-craft-box">
                  <h3>Craftsmanship &amp; Origin Story</h3>
                  <p>{product.craftStory}</p>
                </div>

                {/* Technical Specs */}
                <div className="pdp-specs-box">
                  <span className="pdp-option-label">Key Specifications</span>
                  <ul className="pdp-specs-list">
                    {product.specs.map((spec) => (
                      <li key={spec}>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Shipping & Concierge Accordions */}
                <div className="pdp-accordions">
                  <div className={`pdp-acc-item ${openAcc1 ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="pdp-acc-btn"
                      aria-expanded={openAcc1}
                      onClick={() => setOpenAcc1((prev) => !prev)}
                    >
                      <span>Shipping &amp; Customs Delivery</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    <div className="pdp-acc-body">
                      <p>{product.shippingNote}</p>
                      <p style={{ marginTop: 6 }}>
                        Free express air shipping applies automatically to all Tanogaido Shop orders over $150.
                      </p>
                    </div>
                  </div>

                  <div className={`pdp-acc-item ${openAcc2 ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="pdp-acc-btn"
                      aria-expanded={openAcc2}
                      onClick={() => setOpenAcc2((prev) => !prev)}
                    >
                      <span>Concierge Guarantee &amp; Packaging</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    <div className="pdp-acc-body">
                      <p>
                        Every item is verified in person by our bilingual staff in Kyoto or Tokyo with original
                        artisan origin guarantees and protective multi-layer export crating.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products Grid */}
        <section className="pdp-related-band">
          <div className="page-container">
            <div className="section-header-row">
              <div>
                <h2 className="section-heading-editorial">You May Also Love</h2>
                <p className="section-subtitle">More curated artisan goods from our Japan collection.</p>
              </div>
              <Link href="/shop" className="section-link-cta">
                View All Goods <span>&rarr;</span>
              </Link>
            </div>
            <div className="products-grid" id="pdp-related-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>

        <NewsletterBand source="product-newsletter" />

        <Footer />
      </main>

      {/* Mobile Sticky Bottom Purchase Bar */}
      <div className="pdp-mobile-buybar" id="pdp-mobile-buybar">
        <div className="pdp-mobile-bar-left">
          <span className="pdp-mobile-bar-price">${total}</span>
          <span className="pdp-mobile-bar-sub">{selectedVariant}</span>
        </div>
        <div className="pdp-mobile-qty">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setSelectedQty((q) => Math.max(1, q - 1))}
          >
            -
          </button>
          <span>{selectedQty}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setSelectedQty((q) => q + 1)}
          >
            +
          </button>
        </div>
        <button type="button" className="pdp-mobile-add-btn" onClick={handleAddToBag}>
          Add to Bag
        </button>
      </div>
    </>
  );
}
