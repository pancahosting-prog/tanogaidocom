'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, ChevronDown, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useShopBag } from '@/context/ShopBagContext';
import { ProductCard } from '@/components/ProductCard';
import { SiteFooter } from '@/components/SiteFooter';
import type { Product, ProductVariant } from '@/types/cms';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const { addItem } = useShopBag();

  const title = product.name || product.title;
  const variantsList: ProductVariant[] = (product.variants || []).map((v) =>
    typeof v === 'string' ? { name: v, price: product.price } : v
  );

  const [selectedVariant, setSelectedVariant] = useState(
    variantsList.length > 0 ? variantsList[0].name : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);

  const images: string[] = (product.gallery && product.gallery.length > 0 ? product.gallery : [product.image]).map(
    (item) => (typeof item === 'string' ? item : item.src)
  );

  const handleAdd = () => {
    addItem(product, selectedVariant, quantity);
  };

  const currentPrice = useMemoVariantPrice(product, selectedVariant);

  return (
    <div className="pdp-main">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/shop">Shop</Link>
        <span>/</span>
        <span className="active-crumb">{title}</span>
      </div>

      <div className="pdp-grid">
        {/* Left: Sticky Gallery */}
        <div className="pdp-gallery-wrap">
          <div className="pdp-main-img-box">
            <Image
              src={activeImage}
              alt={title}
              width={640}
              height={480}
              priority
              className="pdp-main-img"
            />
          </div>

          {images.length > 1 && (
            <div className="pdp-thumbs-row">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  className={`pdp-thumb-btn ${activeImage === img ? 'is-active' : ''}`}
                  onClick={() => setActiveImage(img)}
                  aria-label={`View photo ${i + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${title} thumbnail ${i + 1}`}
                    width={72}
                    height={72}
                    className="pdp-thumb-img"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info, Variants & Actions */}
        <div className="pdp-info-wrap">
          <div>
            <span className="pdp-tag">{product.category}</span>
            <h1 className="pdp-title">{title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
              <span className="pdp-price">${currentPrice.toFixed(2)}</span>
              {product.inStock && (
                <span style={{ fontSize: 13, color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Check size={14} /> In Stock & Ready to Ship
                </span>
              )}
            </div>
          </div>

          <p className="pdp-desc">{product.description || product.shortDesc}</p>

          {/* Variants */}
          {variantsList.length > 0 && (
            <div className="pdp-variants-group">
              <span className="pdp-variants-label">Select Option / Variant:</span>
              <div className="pdp-variants-pills">
                {variantsList.map((v) => (
                  <button
                    key={v.name}
                    type="button"
                    className={`pdp-variant-pill ${selectedVariant === v.name ? 'is-active' : ''}`}
                    onClick={() => setSelectedVariant(v.name)}
                  >
                    {v.name} {v.price ? `($${v.price.toFixed(2)})` : ''}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Bag */}
          <div className="pdp-buy-actions">
            <div className="pdp-qty-picker">
              <button
                type="button"
                className="pdp-qty-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="pdp-qty-val">{quantity}</span>
              <button
                type="button"
                className="pdp-qty-btn"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="pdp-add-bag-btn"
              onClick={handleAdd}
            >
              <ShoppingBag size={18} />
              <span>Add to Shopping Bag &bull; ${(currentPrice * quantity).toFixed(2)}</span>
            </button>
          </div>

          {/* Value Badges */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 12,
              padding: '16px 0',
              borderTop: '1px solid #e2e8f0',
              borderBottom: '1px solid #e2e8f0',
              fontSize: 12.5,
              color: '#475569',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={16} color="#dc2626" />
              <span>100% Authentic Japan</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Truck size={16} color="#dc2626" />
              <span>Free Ship &gt; $150</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <RefreshCw size={16} color="#dc2626" />
              <span>Careful Packaging</span>
            </div>
          </div>

          {/* Accordions */}
          <div className="faq-list" style={{ marginTop: 8 }}>
            <details className="faq-item" open>
              <summary className="faq-summary">
                <span>Product Specifications & Origin</span>
                <ChevronDown />
              </summary>
              <div className="faq-content">
                {Array.isArray(product.specs) ? (
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {product.specs.map((item, idx) => (
                      <li key={idx} style={{ color: '#475569', display: 'flex', gap: 8 }}>
                        <span style={{ color: '#dc2626' }}>&bull;</span>
                        <span>{String(item)}</span>
                      </li>
                    ))}
                  </ul>
                ) : typeof product.specs === 'object' && product.specs !== null ? (
                  <dl style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '8px 12px' }}>
                    {Object.entries(product.specs).map(([key, val]) => (
                      <React.Fragment key={key}>
                        <dt style={{ fontWeight: 600, color: '#11141c' }}>{key}:</dt>
                        <dd style={{ color: '#475569' }}>{String(val)}</dd>
                      </React.Fragment>
                    ))}
                  </dl>
                ) : (
                  <p>Handcrafted by certified Japanese artisans under authentic regional traditions.</p>
                )}
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-summary">
                <span>Care & Handling Guidelines</span>
                <ChevronDown />
              </summary>
              <div className="faq-content">
                <p>
                  To preserve the longevity and tactile quality of your piece, hand wash with mild detergent and avoid abrasive scrubbers. Store in dry, cool conditions away from prolonged direct UV exposure.
                </p>
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-summary">
                <span>Worldwide Dispatch & Delivery</span>
                <ChevronDown />
              </summary>
              <div className="faq-content">
                <p>
                  Orders are dispatched within 2–4 business days via Japan Post EMS or DHL Express with end-to-end tracking. Orders over $150 qualify for complimentary international courier shipping.
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-band" style={{ paddingTop: 0 }}>
          <div className="section-head">
            <span className="section-eyebrow">Complementary Picks</span>
            <h2 className="section-title">You May Also Appreciate</h2>
          </div>
          <div className="products-grid">
            {relatedProducts.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky Buybar */}
      <div className="pdp-mobile-buybar">
        <div style={{ flexGrow: 1 }}>
          <div style={{ fontSize: 12, color: '#64748b' }}>Total</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#dc2626' }}>
            ${(currentPrice * quantity).toFixed(2)}
          </div>
        </div>
        <button
          type="button"
          className="pdp-add-bag-btn"
          style={{ width: 'auto', padding: '0 24px' }}
          onClick={handleAdd}
        >
          <ShoppingBag size={18} />
          <span>Add to Bag</span>
        </button>
      </div>

      <SiteFooter />
    </div>
  );
}

function useMemoVariantPrice(product: Product, variantName?: string): number {
  if (!variantName || !product.variants) return product.price;
  const match = product.variants.find((v) =>
    typeof v === 'string' ? v === variantName : v.name === variantName
  );
  if (!match) return product.price;
  return typeof match === 'string' ? product.price : match.price || product.price;
}
