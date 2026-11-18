import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts, getServices, getSiteSettings } from '@/lib/cms';
import { getSiteOrigin } from '@/lib/editorial';
import { buildBreadcrumbJsonLd, buildProductJsonLd } from '@/lib/seo';
import { ProductDetailClient } from '@/components/ProductDetailClient';

export const revalidate = 60;
export const dynamicParams = true;

const SITE_URL = getSiteOrigin();

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: 'Product Not Found | Tanogaido Shop' };
  }

  return {
    title: `${product.title} — ${product.origin} | Tanogaido Japan Shop`,
    description: product.shortDesc,
    alternates: {
      canonical: `/shop/${product.slug}`,
      languages: {
        en: `/shop/${product.slug}`,
        'id-ID': `/shop/${product.slug}`,
        'x-default': `/shop/${product.slug}`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'Tanogaido',
      url: `${SITE_URL}/shop/${product.slug}`,
      title: `${product.title} — ${product.origin} | Tanogaido Japan Shop`,
      description: product.shortDesc,
      images: [{ url: product.imagePath, alt: product.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} — ${product.origin} | Tanogaido`,
      description: product.shortDesc,
      images: [product.imagePath],
    },
  };
}

export default async function ShopProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [products, services, siteSettings] = await Promise.all([
    getProducts(),
    getServices(),
    getSiteSettings(),
  ]);
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const productJsonLd = buildProductJsonLd(product, siteSettings, SITE_URL);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [
      { name: 'Home', path: '/' },
      { name: 'Shop', path: '/shop' },
      { name: product.title, path: `/shop/${product.slug}` },
    ],
    SITE_URL
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetailClient product={product} allProducts={products} services={services} />
    </>
  );
}
