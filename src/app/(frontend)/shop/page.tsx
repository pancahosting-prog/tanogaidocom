import React from 'react';
import type { Metadata } from 'next';
import { getProducts } from '@/lib/cms-data';
import { ShopCatalogClient } from '@/components/ShopCatalogClient';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Tanogaido Shop — Authentic Japanese Lifestyle & Artisan Goods',
  description:
    'Handcrafted Edo glassware, organic Imabari cotton towels, ceremonial grade Uji matcha, and high-speed Pocket WiFi delivered directly from Japan.',
  alternates: {
    canonical: 'https://tanogaido.com/shop',
  },
  openGraph: {
    title: 'Tanogaido Shop — Authentic Japanese Lifestyle & Artisan Goods',
    description:
      'Handcrafted glassware, organic cotton towels, ceremonial grade matcha, and Pocket WiFi.',
    url: 'https://tanogaido.com/shop',
    images: ['/assets/products/shop-hero.jpg'],
  },
};

export default async function ShopPage() {
  const products = await getProducts();

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Tanogaido Japanese Goods Store',
    itemListElement: products.map((prod, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: prod.name,
      url: `https://tanogaido.com/product/${prod.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <ShopCatalogClient products={products} />
    </>
  );
}
