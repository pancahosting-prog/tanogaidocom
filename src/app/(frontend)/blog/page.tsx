import type { Metadata } from 'next';
import { getBlogCategories, getBlogPosts, getServices, getSiteSettings } from '@/lib/cms';
import { getSiteOrigin } from '@/lib/editorial';
import { getWhatsAppUrl } from '@/data/fallback-data';
import { Navbar } from '@/components/Navbar';
import { BlogCatalogClient } from '@/components/BlogCatalogClient';
import { NewsletterBand } from '@/components/NewsletterBand';
import { Footer } from '@/components/Footer';

export const revalidate = 60;

const SITE_URL = getSiteOrigin();

export const metadata: Metadata = {
  title: 'Japan Travel Blog, Visa Guides & Cultural Stories | Tanogaido',
  description:
    'Read curated Japan travel guides, 2026 JR Pass & Shinkansen comparisons, Indonesian visa checklists, and authentic Kyoto cultural stories by Tanogaido.',
  alternates: {
    canonical: '/blog',
    languages: {
      en: '/blog',
      'id-ID': '/blog',
      'x-default': '/blog',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Tanogaido',
    title: 'Japan Travel Blog, Visa Guides & Cultural Stories | Tanogaido',
    description:
      'Curated Japan itineraries, visa tips, rail pass comparisons, and artisan stories from Tanogaido.',
    url: `${SITE_URL}/blog`,
    images: [{ url: '/assets/tokyo-pulse.jpg', alt: 'Tanogaido Japan Travel Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Japan Travel Blog & Cultural Guides | Tanogaido',
    description:
      'Curated Japan itineraries, visa tips, rail pass comparisons, and artisan stories from Tanogaido.',
    images: ['/assets/tokyo-pulse.jpg'],
  },
};

export default async function BlogIndexPage() {
  const [services, siteSettings, posts, categories] = await Promise.all([
    getServices(),
    getSiteSettings(),
    getBlogPosts(),
    getBlogCategories(),
  ]);

  const waHref = getWhatsAppUrl(
    `Hello ${siteSettings.companyName}, I would like help planning a Japan trip.`
  );

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Tanogaido Japan Travel Journal',
    description:
      'Curated Japan travel guides, visa checklists, rail pass comparisons, and cultural stories by PT. Tanogaido Fantasi Pratama.',
    url: `${SITE_URL}/blog`,
    publisher: {
      '@type': 'Organization',
      name: siteSettings.companyName || 'PT. Tanogaido Fantasi Pratama',
      url: SITE_URL,
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.publishedAt,
      author: {
        '@type': 'Person',
        name: post.authorName,
      },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar
        services={services}
        ctaLabel="Plan a Trip"
        ctaHref={waHref}
        mobileCtaLabel="Plan Your Japan Trip"
      />

      <main className="blog-page-main">
        <div className="page-container">
          <BlogCatalogClient posts={posts} categories={categories} />
        </div>

        <NewsletterBand
          successText="Subscribed! Receive our newest Japan travel & visa guides in your inbox."
          source="blog-newsletter"
        />

        <Footer />
      </main>
    </>
  );
}
