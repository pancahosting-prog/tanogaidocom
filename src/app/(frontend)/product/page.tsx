import { permanentRedirect } from 'next/navigation';
import { getProducts } from '@/lib/cms';

export const dynamic = 'force-dynamic';

export default async function LegacyProductQueryPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const sp = await searchParams;
  const id = typeof sp.id === 'string' ? sp.id.trim() : '';

  if (id) {
    const products = await getProducts();
    const match = products.find((p) => p.slug === id);
    if (match) {
      permanentRedirect(`/shop/${match.slug}`);
    }
  }

  permanentRedirect('/shop');
}
