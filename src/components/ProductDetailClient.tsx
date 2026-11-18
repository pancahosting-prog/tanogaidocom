'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  ShoppingBag,
  Star,
} from 'lucide-react';
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

  const firstImage = gallery[0]?.src || product.imagePath;
  const firstVariant = product.variants[0] || 'Standard';

  const [activeImage, setActiveImage] = useState(firstImage);
  const [selectedVariant, setSelectedVariant] = useState(firstVariant);
  const [selectedQty, setSelectedQty] = useState(1);
  const [openAcc1, setOpenAcc1] = useState(true);
  const [openAcc2, setOpenAcc2] = useState(false);

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
        {/* Top Navigation + Breadcrumb + Bag Bar */}
        <div className="page-container">
          <div className="pdp-topbar">
            <Link href="/shop" className="pdp-back-link">
              <ArrowLeft size={15} strokeWidth={2.2} aria-hidden="true" />
              <span>Back to Japan Goods Shop</span>
            </Link>

            <nav className="pdp-breadcrumb" aria-label="Breadcrumb">
              <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                Home
              </Link>
              <span>/</span>
              <Link href="/shop" style={{ color: 'inherit', textDecoration: 'none' }}>
                Shop
              </Link>
              <span>/</span>
              <span>{product.categoryLabel}</span>
              <span>/</span>
              <span>{product.title}</span>
            </nav>

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

        {/* Product Detail Stage */}
        <section className="pdp-section">
          <div className="page-container">
            <div className="pdp-grid">
              {/* Left Gallery Column */}
              <div className="pdp-gallery">
                <div className="pdp-stage">
                  <img src={activeImage} alt={product.title} />
                  <button
                    type="button"
                    className={`pdp-stage-fav ${saved ? 'saved' : ''}`}
                    aria-label="Save to Wishlist"
                    onClick={() => toggleFavorite(product.slug)}
                  >
                    <Heart strokeWidth={2} aria-hidden="true" />
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
              <div className="pdp-info">
                <div className="pdp-meta-line">
                  <span className="pdp-eyebrow">
                    {product.origin} &middot; {product.categoryLabel}
                  </span>
                  <span className="pdp-rating">
                    <Star aria-hidden="true" />
                    <span>
                      {product.rating} ({product.reviewCount} concierge reviews)
                    </span>
                  </span>
                </div>

                <h1 className="pdp-title">{product.title}</h1>

                <div className="pdp-price-bar">
                  <span className="pdp-price">${product.price}</span>
                  <span className="pdp-price-jpy">{product.priceJpy}</span>
                  <span className="pdp-stock-note">{product.status}</span>
                </div>

                <p className="pdp-short-desc">{product.shortDesc}</p>

                {/* Variant Selector */}
                <div>
                  <span className="pdp-block-label">Select Variant / Edition</span>
                  <div className="pdp-variant-row">
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
                <div className="pdp-purchase-row">
                  <div className="pdp-qty-box" aria-label="Quantity selector">
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
                  className="pdp-wa-cta"
                >
                  <span>Order Directly via WhatsApp</span>
                  <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
                </a>

                {/* Provenance / Craft Story */}
                <div className="pdp-craft-box">
                  <h3>Craftsmanship &amp; Origin Story</h3>
                  <p>{product.craftStory}</p>
                </div>

                {/* Key Specifications */}
                <div>
                  <span className="pdp-block-label">Key Specifications</span>
                  <ul className="pdp-spec-list">
                    {product.specs.map((spec) => (
                      <li key={spec}>
                        <Check aria-hidden="true" strokeWidth={2.4} />
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
                      <ChevronDown aria-hidden="true" strokeWidth={2.2} />
                    </button>
                    <div className="pdp-acc-panel">
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
                      <ChevronDown aria-hidden="true" strokeWidth={2.2} />
                    </button>
                    <div className="pdp-acc-panel">
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
