import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts, getServices } from '@/lib/cms';
import { ProductDetailClient } from '@/components/ProductDetailClient';

export const revalidate = 60;
export const dynamicParams = true;

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
    },
    openGraph: {
      type: 'website',
      siteName: 'Tanogaido',
      title: `${product.title} — ${product.origin} | Tanogaido Japan Shop`,
      description: product.shortDesc,
      images: [{ url: product.imagePath, alt: product.title }],
    },
  };
}

export default async function ShopProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [products, services] = await Promise.all([getProducts(), getServices()]);
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} allProducts={products} services={services} />;
}
