import type { MetadataRoute } from 'next';
import { getSiteOrigin } from '@/lib/editorial';

const SITE_URL = getSiteOrigin();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
