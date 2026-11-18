import { redirect } from 'next/navigation';
import { getProductById, getProducts } from '@/lib/cms-data';

export default async function ProductQueryFallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; slug?: string }>;
}) {
  const { id, slug } = await searchParams;

  if (slug) {
    redirect(`/product/${slug}`);
  }

  if (id) {
    const product = await getProductById(id);
    if (product) {
      redirect(`/product/${product.slug}`);
    }
  }

  // Fallback to first product or shop
  const products = await getProducts();
  if (products.length > 0) {
    redirect(`/product/${products[0].slug}`);
  }

  redirect('/shop');
}
