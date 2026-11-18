import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/tanogaido.css';
import { BagProvider } from '@/components/BagProvider';
import { getSiteOrigin } from '@/lib/editorial';
import { getSiteSettings } from '@/lib/cms';

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

const SITE_URL = getSiteOrigin();

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#dc2626',
};

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  const googleToken =
    siteSettings.googleSiteVerification || process.env.GOOGLE_SITE_VERIFICATION || undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: 'Tanogaido — Explore Authentic Japan',
      template: '%s',
    },
    description:
      'PT. Tanogaido Fantasi Pratama — Your Gateway to Japan since 2007. Curated private Japan tours, licensed bilingual tour guides, visa processing, JR Pass, private transport, and authentic Japanese crafts.',
    keywords: [
      'Tanogaido',
      'Japan tour guide',
      'jasa tour guide Jepang',
      'private Japan tour',
      'visa Jepang',
      'Japan visa processing',
      'JR Pass',
      'sewa mobil Jepang',
      'jastip Jepang',
    ],
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [
        { url: '/icon.png', sizes: '192x192', type: 'image/png' },
        { url: '/assets/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    verification: googleToken ? { google: googleToken } : undefined,
    openGraph: {
      type: 'website',
      siteName: 'Tanogaido',
      locale: 'en_US',
      alternateLocale: ['id_ID'],
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
}

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
