import type { Metadata } from 'next';
import {
  getProducts,
  getServices,
  getSiteSettings,
  getTestimonials,
  getTrips,
} from '@/lib/cms';
import { getSiteOrigin } from '@/lib/editorial';
import {
  buildHomeServicesItemListJsonLd,
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
} from '@/lib/seo';
import { HomeExperience } from '@/components/HomeExperience';

export const revalidate = 60;

const SITE_URL = getSiteOrigin();

export const metadata: Metadata = {
  title: 'Tanogaido — Explore Authentic Japan | Private Tours, Guides & Visa',
  description:
    'Explore authentic Japan with PT. Tanogaido Fantasi Pratama. Licensed bilingual tour guides, private Japan tours, visa processing, JR Pass, airport chauffeur transfers, and curated Japanese goods.',
  keywords: [
    'Tanogaido',
    'Japan tour guide',
    'jasa tour guide Jepang',
    'private Japan tour',
    'visa Jepang',
    'JR Pass Indonesia',
    'rental mobil Tokyo',
  ],
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      'id-ID': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Tanogaido',
    url: `${SITE_URL}/`,
    title: 'Tanogaido — Explore Authentic Japan | Private Tours, Guides & Visa',
    description:
      'Trusted since 2007. Licensed bilingual Japan tour guides, private Japan tours, visa concierge, JR Pass tickets, and authentic Japanese goods.',
    images: [{ url: '/assets/tokyo-pulse.jpg', alt: 'Tanogaido — Explore Authentic Japan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tanogaido — Explore Authentic Japan',
    description:
      'Licensed bilingual Japan tour guides, private tours, visa concierge, JR Pass & curated Japanese goods.',
    images: ['/assets/tokyo-pulse.jpg'],
  },
};

export default async function HomePage() {
  const [services, products, trips, testimonials, siteSettings] = await Promise.all([
    getServices(),
    getProducts(),
    getTrips(),
    getTestimonials(),
    getSiteSettings(),
  ]);

  const orgJsonLd = buildOrganizationJsonLd(siteSettings, SITE_URL);
  const websiteJsonLd = buildWebSiteJsonLd(SITE_URL);
  const servicesListJsonLd = buildHomeServicesItemListJsonLd(services, SITE_URL);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesListJsonLd) }}
      />

      <HomeExperience
        services={services}
        products={products}
        trips={trips}
        testimonials={testimonials}
        siteSettings={siteSettings}
      />
    </>
  );
}
