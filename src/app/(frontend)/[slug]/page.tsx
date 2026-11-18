import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import {
  getBlogPosts,
  getPageBySlug,
  getPages,
  getProducts,
  getServices,
  getSiteSettings,
} from '@/lib/cms';
import {
  buildInternalLinkTargets,
  extractTocAndReadingStats,
  getSiteOrigin,
  isReservedPageSlug,
  normalizeMetaDescription,
  normalizeSeoTitle,
} from '@/lib/editorial';
import { getWhatsAppUrl } from '@/data/fallback-data';
import { Navbar } from '@/components/Navbar';
import { TableOfContents } from '@/components/TableOfContents';
import { RichContentRenderer } from '@/components/RichContentRenderer';
import { NewsletterBand } from '@/components/NewsletterBand';
import { Footer } from '@/components/Footer';

export const revalidate = 60;
export const dynamicParams = true;

const SITE_URL = getSiteOrigin();

export async function generateStaticParams() {
  const pages = await getPages();
  return pages
    .filter((p) => !isReservedPageSlug(p.slug))
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (isReservedPageSlug(slug)) {
    return { title: 'Not Found | Tanogaido' };
  }
  const page = await getPageBySlug(slug);
  if (!page) {
    return { title: 'Page Not Found | Tanogaido' };
  }

  const title = normalizeSeoTitle(page.title, page.seoTitle);
  const description = normalizeMetaDescription(page.subtitle, page.metaDescription);
  const canonical = page.canonicalUrl || `/${page.slug}`;
  const ogImage = page.heroImagePath || '/assets/tokyo-pulse.jpg';

  return {
    title,
    description,
    keywords: page.focusKeyword ? [page.focusKeyword] : undefined,
    robots: page.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        en: canonical,
        'id-ID': canonical,
        'x-default': canonical,
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'Tanogaido',
      title,
      description,
      url: `${SITE_URL}/${page.slug}`,
      images: [{ url: ogImage, alt: page.heroImageAlt || page.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function CmsRootPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (isReservedPageSlug(slug)) {
    notFound();
  }

  const [services, products, posts, pages, siteSettings] = await Promise.all([
    getServices(),
    getProducts(),
    getBlogPosts(),
    getPages(),
    getSiteSettings(),
  ]);

  const page = pages.find((p) => p.slug === slug);
  if (!page) {
    notFound();
  }

  const { headings, readingTimeMinutes } = extractTocAndReadingStats(page.content);
  const internalTargets = page.enableAutoInternalLinks
    ? buildInternalLinkTargets({
        currentHref: `/${page.slug}`,
        services,
        products,
        posts,
        pages,
      })
    : [];

  const pageUrl = `${SITE_URL}/${page.slug}`;
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: normalizeMetaDescription(page.subtitle, page.metaDescription),
    url: pageUrl,
    datePublished: page.publishedAt,
    dateModified: page.updatedAt || page.publishedAt,
    publisher: {
      '@type': 'Organization',
      name: siteSettings.companyName || 'PT. Tanogaido Fantasi Pratama',
      url: SITE_URL,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: page.title, item: pageUrl },
    ],
  };

  const faqJsonLd =
    page.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: page.faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }
      : null;

  const waHref = getWhatsAppUrl(
    `Hello ${siteSettings.companyName}, I have a question regarding "${page.title}".`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Navbar
        services={services}
        ctaLabel="Explore Now"
        ctaHref={waHref}
        mobileCtaLabel="Contact Our Team"
      />

      <main className="cms-page-main">
        {/* Editorial Hero Band matching Tanogaido page system */}
        <section className="cms-page-hero-band">
          <div className="page-container">
            <nav className="editorial-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span className="editorial-breadcrumb-current">{page.title}</span>
            </nav>

            <div className={`cms-page-hero-grid ${page.heroImagePath ? 'has-media' : ''}`}>
              <div>
                <div className="eyebrow-row">
                  <span className="eyebrow">{page.eyebrow || 'TANOGAIDO GUIDE'}</span>
                  <span className="eyebrow-line" aria-hidden="true" />
                </div>
                <h1 className="cms-page-title">{page.title}</h1>
                <p className="cms-page-subtitle">{page.subtitle}</p>
                <div className="cms-page-hero-actions">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-cta-btn"
                  >
                    <span>Speak With Our Concierge</span>
                    <span className="hero-cta-circle" aria-hidden="true">
                      <ArrowUpRight size={15} />
                    </span>
                  </a>
                  <Link href="/services" className="about-secondary-cta">
                    Explore All Services
                  </Link>
                </div>
              </div>

              {page.heroImagePath && (
                <div className="cms-page-hero-media">
                  <img
                    src={page.heroImagePath}
                    alt={page.heroImageAlt || page.title}
                    fetchPriority="high"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Main Body + Optional TOC */}
        <section className="cms-page-body-band">
          <div className="page-container">
            <div
              className={`blog-reading-grid ${
                page.showToc && headings.length > 0 ? 'has-toc' : 'no-toc'
              }`}
            >
              {page.showToc && headings.length > 0 && (
                <TableOfContents headings={headings} readingTimeMinutes={readingTimeMinutes} />
              )}

              <div className="blog-reading-column">
                <RichContentRenderer
                  content={page.content}
                  internalLinkTargets={internalTargets}
                  enableAutoInternalLinks={page.enableAutoInternalLinks}
                  maxAutoLinks={6}
                />

                {page.faqs.length > 0 && (
                  <section className="editorial-faq-section" aria-label="Frequently Asked Questions">
                    <h2 className="editorial-h2">Frequently Asked Questions</h2>
                    <div className="editorial-faq-list">
                      {page.faqs.map((faq, idx) => (
                        <div key={idx} className="editorial-faq-item">
                          <h3>{faq.q}</h3>
                          <p>{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </section>

        <NewsletterBand
          successText="Subscribed! Watch your inbox for curated Japan inspiration."
          source={`page-${page.slug}-newsletter`}
        />

        <Footer />
      </main>
    </>
  );
}
