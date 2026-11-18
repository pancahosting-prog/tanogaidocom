import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/tanogaido.css';
import { BagProvider } from '@/components/BagProvider';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tanogaido.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Tanogaido — Explore Authentic Japan',
    template: '%s',
  },
  description:
    'PT. Tanogaido Fantasi Pratama — Your Gateway to Japan since 2007. Curated private Japan tours, licensed local guides, visa processing, JR Pass, private transport, and authentic Japanese crafts.',
  openGraph: {
    type: 'website',
    siteName: 'Tanogaido',
    title: 'Tanogaido — Explore Authentic Japan',
    description:
      'PT. Tanogaido Fantasi Pratama — Your Gateway to Japan since 2007. Curated private Japan tours, licensed local guides, visa processing, JR Pass, private transport, and authentic Japanese crafts.',
    images: [{ url: '/assets/tokyo-pulse.jpg', alt: 'Tanogaido — Explore Authentic Japan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tanogaido — Explore Authentic Japan',
    description:
      'Curated private Japan tours, licensed local guides, visa processing, JR Pass, private transport, and authentic Japanese crafts.',
    images: ['/assets/tokyo-pulse.jpg'],
  },
};

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body>
        <BagProvider>{children}</BagProvider>
      </body>
    </html>
  );
}
