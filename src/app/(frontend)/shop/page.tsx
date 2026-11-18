import type { Metadata } from 'next';
import { getProducts, getServices } from '@/lib/cms';
import { getSiteOrigin } from '@/lib/editorial';
import { buildBreadcrumbJsonLd, buildCollectionPageJsonLd } from '@/lib/seo';
import { ShopCatalogClient } from '@/components/ShopCatalogClient';

export const revalidate = 60;

const SITE_URL = getSiteOrigin();

export const metadata: Metadata = {
  title: 'Japan Goods Shop — Authentic Artisanal Treasures | Tanogaido',
  description:
    'Shop authentic Japanese craft goods, Uji ceremonial matcha, Edo Kiriko glassware, Hakone Yosegi woodworking, and Japan travel essentials via Tanogaido.',
  keywords: [
    'Japan Goods Shop',
    'Uji matcha',
    'Edo Kiriko glassware',
    'Japanese ceramics',
    'jastip Jepang',
    'oleh-oleh Jepang',
  ],
  alternates: {
    canonical: '/shop',
    languages: {
      en: '/shop',
      'id-ID': '/shop',
      'x-default': '/shop',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Tanogaido',
    url: `${SITE_URL}/shop`,
    title: 'Japan Goods Shop — Authentic Artisanal Treasures | Tanogaido',
    description:
      'Small-batch Uji ceremonial matcha, hand-thrown Kiyomizu ceramics, Edo Kiriko glassware, and curated Japan travel essentials.',
    images: [{ url: '/assets/products/shop-hero.jpg', alt: 'Tanogaido Japan Goods Shop' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Japan Goods Shop — Authentic Artisanal Treasures | Tanogaido',
    description:
      'Authentic Uji ceremonial matcha, Kyoto ceramics, Edo Kiriko glassware & Japan travel essentials.',
    images: ['/assets/products/shop-hero.jpg'],
  },
};

export default async function ShopPage() {
  const [products, services] = await Promise.all([getProducts(), getServices()]);

  const collectionJsonLd = buildCollectionPageJsonLd(
    {
      name: 'Tanogaido Japan Goods Shop',
      description:
        'Authentic Japanese tea, ceramics, glassware, woodworking crafts, and rail travel essentials curated by Tanogaido.',
      path: '/shop',
      items: products.map((p) => ({
        name: p.title,
        path: `/shop/${p.slug}`,
        image: p.imagePath,
      })),
    },
    SITE_URL
  );

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [
      { name: 'Home', path: '/' },
      { name: 'Japan Goods Shop', path: '/shop' },
    ],
    SITE_URL
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ShopCatalogClient products={products} services={services} />
    </>
  );
}
