'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import type { ProductItem } from '@/types/cms';
import { useBag } from '@/components/BagProvider';

export function ProductCard({ product }: { product: ProductItem }) {
  const { addToBag, isFavorite, toggleFavorite } = useBag();
  const [justAdded, setJustAdded] = useState(false);

  const saved = isFavorite(product.slug);
  const url = `/shop/${product.slug}`;

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addToBag(product, undefined, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1150);
  }

  return (
    <article className="product-card" data-product-id={product.slug}>
      <div className="product-img-wrap">
        <Link href={url} className="product-card-img-link" aria-label={`View ${product.title}`}>
          <img src={product.imagePath} alt={product.title} loading="lazy" />
        </Link>
        <button
          type="button"
          className={`product-fav-btn ${saved ? 'saved' : ''}`}
          aria-label={`Save ${product.title}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(product.slug);
          }}
        >
          <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        <span className="product-quick-hint">View Product</span>
      </div>
      <div className="product-body">
        <div className="product-meta-row">
          <span className="product-kicker">
            {product.origin} &middot; {product.categoryLabel}
          </span>
          <span className="product-status-note">{product.status}</span>
        </div>
        <Link href={url} className="product-title-link">
          <h3 className="product-title">{product.title}</h3>
        </Link>
        <p className="product-sub">{product.shortDesc}</p>
        <div className="product-footer">
          <div className="product-price-wrap">
            <span className="product-price">${product.price}</span>
            <span className="product-price-jpy">{product.priceJpy}</span>
          </div>
          <button
            type="button"
            className={`product-add-btn ${justAdded ? 'is-added' : ''}`}
            onClick={handleAdd}
          >
            {justAdded ? 'Added' : '+ Bag'}
          </button>
        </div>
      </div>
    </article>
  );
}
