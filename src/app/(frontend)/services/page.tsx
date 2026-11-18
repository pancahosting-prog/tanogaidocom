import React from 'react';
import type { Metadata } from 'next';
import { getServices } from '@/lib/cms-data';
import { ServicesCatalogClient } from '@/components/ServicesCatalogClient';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'All Japan Travel Services & Concierge Capabilities',
  description:
    'Explore 20 premier Japan travel services from Tanogaido: licensed tour guides, private van charters, Shinkansen tickets, theme park admissions, and ryokan bookings.',
  alternates: {
    canonical: 'https://tanogaido.com/services',
  },
  openGraph: {
    title: 'All Japan Travel Services & Concierge Capabilities | Tanogaido',
    description:
      'Explore 20 premier Japan travel services from Tanogaido: licensed tour guides, private van charters, and luxury bookings.',
    url: 'https://tanogaido.com/services',
    images: ['/assets/shinkansen.jpg'],
  },
};

export default async function ServicesPage() {
  const services = await getServices();

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Tanogaido Japan Travel Services',
    itemListElement: services.map((svc, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: svc.title,
      url: `https://tanogaido.com/services/${svc.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <ServicesCatalogClient services={services} />
    </>
  );
}
