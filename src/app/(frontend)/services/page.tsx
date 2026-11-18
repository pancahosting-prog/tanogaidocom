import type { Metadata } from 'next';
import { getServices } from '@/lib/cms';
import { getSiteOrigin } from '@/lib/editorial';
import { buildBreadcrumbJsonLd, buildCollectionPageJsonLd } from '@/lib/seo';
import { ServicesCatalogClient } from '@/components/ServicesCatalogClient';

export const revalidate = 60;

const SITE_URL = getSiteOrigin();

export const metadata: Metadata = {
  title: 'Our Services — Complete Japan Travel, Visa & Concierge Catalog | Tanogaido',
  description:
    'Browse all 20 Tanogaido Japan services: Licensed Tour Guides, Visa Processing, JR Pass, Car & Bus Rental, Pocket WiFi, Cargo Import, Prewedding Photography & Study in Japan.',
  keywords:
    'Tanogaido services, Japan tour guide, jasa tour guide Jepang, Japan visa processing, visa Jepang, JR pass tickets, Japan car rental, Pocket WiFi Japan, Japan import service',
  alternates: {
    canonical: '/services',
    languages: {
      en: '/services',
      'id-ID': '/services',
      'x-default': '/services',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Tanogaido',
    url: `${SITE_URL}/services`,
    title: 'Our Services — Complete Japan Travel, Visa & Concierge Catalog | Tanogaido',
    description:
      'Explore every travel, guiding, visa processing, rail pass, private vehicle charter, golf, prewedding, property survey, and logistics solution crafted by PT. Tanogaido Fantasi Pratama.',
    images: [{ url: '/assets/cards/card-4.jpg', alt: 'Tanogaido Complete Japan Concierge Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services — Complete Japan Travel, Visa & Concierge Catalog | Tanogaido',
    description:
      'Licensed tour guides, visa processing, JR Pass, car & bus rental, Pocket WiFi, and shopping concierge in Japan.',
    images: ['/assets/cards/card-4.jpg'],
  },
};

export default async function ServicesCatalogPage() {
  const services = await getServices();

  const collectionJsonLd = buildCollectionPageJsonLd(
    {
      name: 'Tanogaido Japan Travel, Visa & Concierge Services',
      description:
        'Complete catalog of 20+ specialized Japan travel, visa, transport, study, and concierge services by PT. Tanogaido Fantasi Pratama.',
      path: '/services',
      items: services.map((s) => ({
        name: s.title,
        path: `/services/${s.slug}`,
        image: s.imagePath,
      })),
    },
    SITE_URL
  );

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [
      { name: 'Home', path: '/' },
      { name: 'Our Services', path: '/services' },
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
      <ServicesCatalogClient services={services} />
    </>
  );
}
