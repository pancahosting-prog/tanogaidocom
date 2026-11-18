import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tanogaido — Explore Authentic Japan',
    short_name: 'Tanogaido',
    description:
      'PT. Tanogaido Fantasi Pratama — Licensed bilingual Japan tour guides, visa processing, JR Pass, chauffeur transfers, and curated Japanese goods.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#dc2626',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
