'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Plus } from 'lucide-react';
import { useShopBag } from '@/context/ShopBagContext';
import type { Product } from '@/types/cms';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, toggleFavorite, isFavorite } = useShopBag();
  const fav = isFavorite(product.id);
  const slug = product.slug || product.id;
  const name = product.name || product.title;
  const badge = product.badge || product.status;

  return (
    <article className="product-card">
      <div className="product-card-media">
        <Link href={`/product/${slug}`} tabIndex={-1} aria-hidden="true">
          <Image
            src={product.image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="product-card-img"
          />
        </Link>

        {badge && <span className="product-card-badge">{badge}</span>}

        <button
          type="button"
          className={`product-card-fav ${fav ? 'is-favorite' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(product.id);
          }}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={16} fill={fav ? '#dc2626' : 'none'} />
        </button>
      </div>

      <div className="product-card-body">
        <span className="product-card-category">{product.category}</span>
        <Link href={`/product/${slug}`} className="product-card-title">
          {name}
        </Link>
        <p className="product-card-desc">{product.shortDesc}</p>

        <div className="product-card-bottom">
          <span className="product-card-price">${product.price.toFixed(2)}</span>
          <button
            type="button"
            className="product-card-btn"
            onClick={() => addItem(product)}
            aria-label={`Add ${name} to bag`}
          >
            <Plus size={14} style={{ display: 'inline', marginRight: 4 }} />
            Add to Bag
          </button>
        </div>
      </div>
    </article>
  );
}
