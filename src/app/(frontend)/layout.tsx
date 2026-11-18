import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { getServices } from '@/lib/cms-data';
import { FrontendShell } from '@/components/FrontendShell';

import './styles/base.css';
import './styles/pages.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tanogaido.com'),
  title: {
    default: 'Tanogaido — Premier Japan Tour Operator & Concierge Services',
    template: '%s | Tanogaido Japan',
  },
  description:
    'Licensed Japan tour operator (PT. Tanogaido Fantasi Pratama). Bilingual private tour guides, VIP van charters, Shinkansen tickets, traditional ryokan onsen, and artisan merchandise.',
  keywords: [
    'Japan Tour Guide',
    'Private Tour Japan',
    'Tanogaido',
    'Tokyo Concierge',
    'Japan Private Van',
    'Shinkansen Tickets',
    'Hakone Ryokan',
    'Tokyo Disney Tickets',
  ],
  authors: [{ name: 'PT. Tanogaido Fantasi Pratama', url: 'https://tanogaido.com' }],
  creator: 'PT. Tanogaido Fantasi Pratama',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tanogaido.com',
    siteName: 'Tanogaido Japan',
    title: 'Tanogaido — Premier Japan Tour Operator & Concierge Services',
    description:
      'Licensed Japan tour operator offering bilingual guides, private transfers, and bespoke luxury travel.',
    images: [
      {
        url: '/assets/shinkansen.jpg',
        width: 1200,
        height: 630,
        alt: 'Tanogaido Japan Travel Experience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tanogaido — Premier Japan Tour Operator & Concierge Services',
    description: 'Licensed private Japan tours, VIP transfers, and bespoke luxury itineraries.',
    images: ['/assets/shinkansen.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const services = await getServices();

  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <head>
        <link rel="icon" href="/assets/logotano.png" />
      </head>
      <body>
        <FrontendShell services={services}>{children}</FrontendShell>
      </body>
    </html>
  );
}
