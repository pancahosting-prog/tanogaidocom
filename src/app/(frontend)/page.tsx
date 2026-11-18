import type { Metadata } from 'next';
import {
  getProducts,
  getServices,
  getSiteSettings,
  getTestimonials,
  getTrips,
} from '@/lib/cms';
import { HomeExperience } from '@/components/HomeExperience';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Tanogaido — Explore Authentic Japan',
  description:
    'Explore authentic Japan with PT. Tanogaido Fantasi Pratama. Licensed bilingual tour guides, private Japan tours, visa processing, JR Pass, airport chauffeur transfers, and curated Japanese goods.',
  alternates: {
    canonical: '/',
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

  return (
    <HomeExperience
      services={services}
      products={products}
      trips={trips}
      testimonials={testimonials}
      siteSettings={siteSettings}
    />
  );
}
