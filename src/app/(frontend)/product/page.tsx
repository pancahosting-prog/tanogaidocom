import type { Metadata } from 'next';
import { getProducts, getServices } from '@/lib/cms';
import { ProductDetailClient } from '@/components/ProductDetailClient';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Product Details — Japan Goods Shop | Tanogaido',
  description:
    'Authentic Japanese craft goods curated by Tanogaido across Kyoto, Hakone, Tokyo, and Ehime.',
  alternates: {
    canonical: '/shop',
  },
};

export default async function LegacyProductQueryPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const sp = await searchParams;
  const id = typeof sp.id === 'string' ? sp.id : '';
  const [products, services] = await Promise.all([getProducts(), getServices()]);
  const product = products.find((p) => p.slug === id) || products[0];

  return <ProductDetailClient product={product} allProducts={products} services={services} />;
}
