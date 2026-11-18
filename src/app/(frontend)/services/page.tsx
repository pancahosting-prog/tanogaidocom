import type { Metadata } from 'next';
import { getServices } from '@/lib/cms';
import { ServicesCatalogClient } from '@/components/ServicesCatalogClient';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Our Services — Complete Japan Travel, Visa & Concierge Catalog | Tanogaido',
  description:
    'Browse all 20 Tanogaido Japan services: Licensed Tour Guides, Visa Processing, JR Pass, Car & Bus Rental, Pocket WiFi, Cargo Import, Prewedding Photography & Study in Japan.',
  keywords:
    'Tanogaido services, Japan tour guide, Japan visa processing, JR pass tickets, Japan car rental, Pocket WiFi Japan, Japan import service',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    type: 'website',
    siteName: 'Tanogaido',
    title: 'Our Services — Complete Japan Travel, Visa & Concierge Catalog | Tanogaido',
    description:
      'Explore every travel, guiding, visa processing, rail pass, private vehicle charter, golf, prewedding, property survey, and logistics solution crafted by PT. Tanogaido Fantasi Pratama.',
    images: [{ url: '/assets/cards/card-4.jpg', alt: 'Tanogaido Complete Japan Concierge Services' }],
  },
};

export default async function ServicesCatalogPage() {
  const services = await getServices();
  return <ServicesCatalogClient services={services} />;
}
