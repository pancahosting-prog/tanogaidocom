import React from 'react';
import type { Metadata } from 'next';
import {
  getServices,
  getTrips,
  getProducts,
  getTestimonials,
  getTravelStyles,
} from '@/lib/cms-data';
import { HomeExperienceClient } from '@/components/HomeExperienceClient';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Tanogaido — Premier Japan Tour Operator & Travel Concierge',
  description:
    'Experience authentic Japan with licensed bilingual tour guides, VIP private vehicle charters, bespoke itineraries, onsen reservations, and curated Japanese goods.',
  alternates: {
    canonical: 'https://tanogaido.com',
  },
};

export default async function HomePage() {
  const [services, trips, products, testimonials, travelStyles] = await Promise.all([
    getServices(),
    getTrips(),
    getProducts(),
    getTestimonials(),
    getTravelStyles(),
  ]);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'PT. Tanogaido Fantasi Pratama',
    alternateName: 'Tanogaido',
    url: 'https://tanogaido.com',
    logo: 'https://tanogaido.com/assets/logotano.png',
    description:
      'Licensed Japan tour operator providing private tour guides, private transport, and bespoke itineraries.',
    foundingDate: '2007',
    telephone: '+6281318047974',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plaza Pasifik Blok A4 No. 79, Kelapa Gading',
      addressLocality: 'Jakarta Utara',
      addressCountry: 'ID',
    },
    sameAs: ['https://www.instagram.com/tanogaido'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <HomeExperienceClient
        services={services}
        trips={trips}
        products={products}
        testimonials={testimonials}
        travelStyles={travelStyles}
      />
    </>
  );
}
