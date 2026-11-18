import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import {
  getBlogPostBySlug,
  getBlogPosts,
  getPages,
  getProducts,
  getServices,
  getSiteSettings,
} from '@/lib/cms';
import {
  buildInternalLinkTargets,
  extractTocAndReadingStats,
  formatEditorialDate,
  getSiteOrigin,
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
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    return { title: 'Article Not Found | Tanogaido' };
  }

  const title = normalizeSeoTitle(post.title, post.seoTitle);
  const description = normalizeMetaDescription(post.excerpt, post.metaDescription);
  const canonical = post.canonicalUrl || `/blog/${post.slug}`;

  return {
    title,
    description,
    keywords: [post.focusKeyword, ...post.tags].filter(Boolean) as string[],
    robots: post.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        en: canonical,
        'id-ID': canonical,
        'x-default': canonical,
      },
    },
    openGraph: {
      type: 'article',
      siteName: 'Tanogaido',
      title,
      description,
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.authorName],
      tags: post.tags,
      images: [
        {
          url: post.coverImagePath,
          alt: post.coverImageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.coverImagePath],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [services, products, posts, pages, siteSettings] = await Promise.all([
    getServices(),
    getProducts(),
    getBlogPosts(),
    getPages(),
    getSiteSettings(),
  ]);

  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  const { headings, wordCount, readingTimeMinutes } = extractTocAndReadingStats(post.content);
  const internalTargets = post.enableAutoInternalLinks
    ? buildInternalLinkTargets({
        currentHref: `/blog/${post.slug}`,
        services,
        products,
        posts,
        pages,
      })
    : [];

  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const coverAbsolute = post.coverImagePath.startsWith('http')
    ? post.coverImagePath
    : `${SITE_URL}${post.coverImagePath}`;

  const relatedPosts = posts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const aSame = a.categorySlug === post.categorySlug ? 1 : 0;
      const bSame = b.categorySlug === post.categorySlug ? 1 : 0;
      return bSame - aSame;
    })
    .slice(0, 3);

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: normalizeMetaDescription(post.excerpt, post.metaDescription),
    image: coverAbsolute,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    articleSection: post.categoryName,
    wordCount,
    inLanguage: 'en',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    author: {
      '@type': 'Person',
      name: post.authorName,
      jobTitle: post.authorRole,
    },
    publisher: {
      '@type': 'Organization',
      name: siteSettings.companyName || 'PT. Tanogaido Fantasi Pratama',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/logotano.png`,
      },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  };

  const faqJsonLd =
    post.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.a,
            },
          })),
        }
      : null;

  const waHref = getWhatsAppUrl(
    `Hello ${siteSettings.companyName}, I just read "${post.title}" and would like travel assistance.`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
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
        ctaLabel="Plan a Trip"
        ctaHref={waHref}
        mobileCtaLabel="Ask Our Japan Concierge"
      />

      <main className="blog-article-main">
        <article className="page-container blog-article-container">
          {/* Breadcrumbs */}
          <nav className="editorial-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog">Blog</Link>
            <span aria-hidden="true">/</span>
            <span className="editorial-breadcrumb-current">{post.categoryName}</span>
          </nav>

          {/* Article Header */}
          <header className="blog-article-header">
            <div className="blog-article-kicker-row">
              <span>{post.categoryName}</span>
              <span aria-hidden="true">&middot;</span>
              <time dateTime={post.publishedAt}>{formatEditorialDate(post.publishedAt)}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{readingTimeMinutes} min read</span>
            </div>

            <h1 className="blog-article-title">{post.title}</h1>
            <p className="blog-article-lead">{post.excerpt}</p>

            <div className="blog-article-byline">
              <img
                src={post.authorAvatarPath}
                alt={post.authorName}
                className="blog-byline-avatar"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="blog-byline-name">{post.authorName}</div>
                <div className="blog-byline-role">{post.authorRole}</div>
              </div>
            </div>
          </header>

          {/* Featured Cover Photo */}
          <figure className="blog-article-hero-figure">
            <img
              src={post.coverImagePath}
              alt={post.coverImageAlt || post.title}
              fetchPriority="high"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </figure>

          {/* Two-Column Editorial Layout: Sticky TOC + Reading Column */}
          <div
            className={`blog-reading-grid ${
              post.enableToc && headings.length > 0 ? 'has-toc' : 'no-toc'
            }`}
          >
            {post.enableToc && headings.length > 0 && (
              <TableOfContents headings={headings} readingTimeMinutes={readingTimeMinutes} />
            )}

            <div className="blog-reading-column">
              <RichContentRenderer
                content={post.content}
                internalLinkTargets={internalTargets}
                enableAutoInternalLinks={post.enableAutoInternalLinks}
                maxAutoLinks={6}
              />

              {/* Article FAQ Section */}
              {post.faqs.length > 0 && (
                <section className="editorial-faq-section" aria-label="Frequently Asked Questions">
                  <h2 className="editorial-h2">Frequently Asked Questions</h2>
                  <div className="editorial-faq-list">
                    {post.faqs.map((faq, idx) => (
                      <div key={idx} className="editorial-faq-item">
                        <h3>{faq.q}</h3>
                        <p>{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Unboxed Tag List */}
              {post.tags.length > 0 && (
                <div className="editorial-tags-line">
                  <span className="editorial-tags-label">Topics:</span>
                  <span>{post.tags.join(' · ')}</span>
                </div>
              )}

              {/* Concierge Conversion Strip */}
              <aside className="editorial-concierge-box">
                <div>
                  <div className="editorial-embed-kicker">TANOGAIDO CONCIERGE DESK</div>
                  <h3 className="editorial-concierge-title">
                    Need tailored support for your Japan itinerary?
                  </h3>
                  <p className="editorial-concierge-desc">
                    Speak directly with our bilingual Tokyo &amp; Jakarta team for private guides,
                    visa screening, JR Pass advice, and chauffeur charters.
                  </p>
                </div>
                <div className="editorial-concierge-actions">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-cta-btn"
                  >
                    <span>Chat on WhatsApp</span>
                    <span className="hero-cta-circle" aria-hidden="true">
                      <ArrowUpRight size={15} />
                    </span>
                  </a>
                  <Link href="/blog" className="editorial-back-link">
                    <ArrowLeft size={14} aria-hidden="true" />
                    <span>All Articles</span>
                  </Link>
                </div>
              </aside>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <section className="blog-related-section" aria-label="Related Japan travel guides">
              <div className="blog-related-header">
                <h2>Continue Reading</h2>
                <Link href="/blog" className="blog-related-all">
                  All blog posts &rarr;
                </Link>
              </div>
              <div className="blog-posts-grid">
                {relatedPosts.map((rel) => (
                  <article key={rel.slug} className="blog-card">
                    <Link href={`/blog/${rel.slug}`} className="blog-card-link">
                      <div className="blog-card-media">
                        <img
                          src={rel.coverImagePath}
                          alt={rel.coverImageAlt || rel.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="blog-card-body">
                        <div className="blog-card-title-row">
                          <h3 className="blog-card-title">{rel.title}</h3>
                          <ArrowUpRight size={17} className="blog-card-arrow" aria-hidden="true" />
                        </div>
                        <p className="blog-card-excerpt">{rel.excerpt}</p>
                        <div className="blog-card-meta">
                          <img
                            src={rel.authorAvatarPath}
                            alt={rel.authorName}
                            className="blog-card-avatar"
                            referrerPolicy="no-referrer"
                          />
                          <span className="blog-card-author">{rel.authorName}</span>
                          <span className="blog-card-sep" aria-hidden="true">
                            &bull;
                          </span>
                          <time dateTime={rel.publishedAt} className="blog-card-date">
                            {formatEditorialDate(rel.publishedAt)}
                          </time>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </article>

        <NewsletterBand
          successText="Subscribed! Receive our newest Japan guides directly in your inbox."
          source="blog-detail-newsletter"
        />

        <Footer />
      </main>
    </>
  );
}
