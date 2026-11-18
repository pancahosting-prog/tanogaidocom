import type { Metadata } from 'next';
import { getProducts, getServices } from '@/lib/cms';
import { ShopCatalogClient } from '@/components/ShopCatalogClient';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Japan Goods Shop — Authentic Artisanal Treasures | Tanogaido',
  description:
    'Shop authentic Japanese craft goods, Uji ceremonial matcha, Edo Kiriko glassware, Hakone Yosegi woodworking, and Japan travel essentials via Tanogaido.',
  alternates: {
    canonical: '/shop',
  },
  openGraph: {
    type: 'website',
    siteName: 'Tanogaido',
    title: 'Japan Goods Shop — Authentic Artisanal Treasures | Tanogaido',
    description:
      'Small-batch Uji ceremonial matcha, hand-thrown Kiyomizu ceramics, Edo Kiriko glassware, and curated Japan travel essentials.',
    images: [{ url: '/assets/products/shop-hero.jpg', alt: 'Tanogaido Japan Goods Shop' }],
  },
};

export default async function ShopPage() {
  const [products, services] = await Promise.all([getProducts(), getServices()]);
  return <ShopCatalogClient products={products} services={services} />;
}
