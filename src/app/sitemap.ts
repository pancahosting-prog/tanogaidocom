import type { MetadataRoute } from 'next';
import { getBlogPosts, getPages, getProducts, getServices } from '@/lib/cms';
import { getSiteOrigin, isReservedPageSlug } from '@/lib/editorial';

export const revalidate = 60;

const SITE_URL = getSiteOrigin();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, products, posts, pages] = await Promise.all([
    getServices(),
    getProducts(),
    getBlogPosts(),
    getPages(),
  ]);
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/shop`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/shop/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts
    .filter((p) => p.status === 'published' && !p.noIndex)
    .map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(p.publishedAt),
      changeFrequency: 'weekly',
      priority: 0.85,
    }));

  const pageRoutes: MetadataRoute.Sitemap = pages
    .filter((pg) => pg.status === 'published' && !pg.noIndex && !isReservedPageSlug(pg.slug))
    .map((pg) => ({
      url: `${SITE_URL}/${pg.slug}`,
      lastModified: pg.updatedAt ? new Date(pg.updatedAt) : new Date(pg.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.75,
    }));

  return [...staticRoutes, ...serviceRoutes, ...productRoutes, ...blogRoutes, ...pageRoutes];
}
