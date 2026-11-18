import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getServices, getSiteSettings } from '@/lib/cms';
import { getWhatsAppUrl } from '@/data/fallback-data';
import { getSiteOrigin } from '@/lib/editorial';
import { toAbsoluteUrl } from '@/lib/seo';
import { Navbar } from '@/components/Navbar';
import { NewsletterBand } from '@/components/NewsletterBand';
import { Footer } from '@/components/Footer';

export const revalidate = 60;
export const dynamicParams = true;

const SITE_URL = getSiteOrigin();

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) {
    return {
      title: 'Service Not Found | Tanogaido',
    };
  }

  return {
    title: service.seoTitle || `${service.title} | Tanogaido`,
    description: service.metaDescription || service.shortDesc,
    keywords: service.keywords,
    alternates: {
      canonical: `/services/${service.slug}`,
      languages: {
        en: `/services/${service.slug}`,
        'id-ID': `/services/${service.slug}`,
        'x-default': `/services/${service.slug}`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'Tanogaido',
      title: service.seoTitle || `${service.title} | Tanogaido`,
      description: service.metaDescription || service.shortDesc,
      url: `${SITE_URL}/services/${service.slug}`,
      images: [
        {
          url: service.heroImagePath || service.imagePath,
          alt: service.heroImageAlt || service.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.seoTitle || `${service.title} | Tanogaido`,
      description: service.metaDescription || service.shortDesc,
      images: [service.heroImagePath || service.imagePath],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [services, siteSettings] = await Promise.all([getServices(), getSiteSettings()]);
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const serviceUrl = `${SITE_URL}/services/${service.slug}`;
  const waHref = getWhatsAppUrl(service.waText);

  const relatedServices = (service.relatedSlugs || [])
    .map((relSlug) => services.find((item) => item.slug === relSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const fallbackRelated =
    relatedServices.length > 0
      ? relatedServices
      : services.filter((item) => item.slug !== service.slug).slice(0, 4);

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.categoryLabel,
    description: service.metaDescription || service.shortDesc,
    url: serviceUrl,
    image: toAbsoluteUrl(service.heroImagePath || service.imagePath, SITE_URL),
    provider: {
      '@type': 'TravelAgency',
      name: siteSettings.companyName || 'PT. Tanogaido Fantasi Pratama',
      url: SITE_URL,
      telephone: '+62-813-1893-9319',
      email: siteSettings.email || 'tanogaidocom@gmail.com',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Japan',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${SITE_URL}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: serviceUrl,
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Navbar
        services={services}
        ctaLabel="Consult Now"
        ctaHref={waHref}
        mobileCtaLabel={`Consult About ${service.title}`}
      />

      <main className="svc-detail-main">
        {/* Breadcrumb Bar */}
        <div className="breadcrumb-bar">
          <div className="page-container">
            <nav className="breadcrumb-nav" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="breadcrumb-sep" aria-hidden="true">
                /
              </span>
              <Link href="/services">Our Services</Link>
              <span className="breadcrumb-sep" aria-hidden="true">
                /
              </span>
              <span className="breadcrumb-current">{service.title}</span>
            </nav>
          </div>
        </div>

        {/* 1. Home-Style Architectural Hero Stage */}
        <section className="svc-hero-band">
          <div className="page-container">
            <div className="svc-hero-frame">
              <img
                className="svc-hero-bg"
                src={service.heroImagePath || service.imagePath}
                alt={service.heroImageAlt || service.title}
                fetchPriority="high"
                decoding="async"
              />
              <div className="svc-hero-scrim" aria-hidden="true" />
              <div className="svc-hero-inner">
                <div className="svc-hero-copy">
                  <div className="eyebrow-row">
                    <span className="eyebrow">{service.eyebrow || service.kicker}</span>
                    <span className="eyebrow-line" aria-hidden="true" />
                  </div>
                  <h1 className="svc-hero-title">
                    {service.h1Lead}
                    <br />
                    <span className="line-red">{service.h1Accent}</span>
                  </h1>
                  <p className="svc-hero-desc">{service.heroDesc || service.shortDesc}</p>
                  <div className="svc-hero-cta-row">
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-cta-btn"
                    >
                      <span>Book via WhatsApp</span>
                      <span className="hero-cta-circle" aria-hidden="true">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 17L17 7M17 7H8M17 7V16" />
                        </svg>
                      </span>
                    </a>
                    <a href="#service-included" className="svc-hero-secondary-link">
                      See What&rsquo;s Included &darr;
                    </a>
                  </div>
                </div>

                <div className="svc-hero-stats">
                  {service.stats.map((st, idx) => (
                    <div className="svc-stat-glass" key={`${st.val}-${idx}`}>
                      <div className="svc-stat-val">{st.val}</div>
                      <div className="svc-stat-label">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Key Service Highlights */}
        <section className="svc-highlights-band">
          <div className="page-container">
            <div className="section-header-row">
              <div>
                <h2 className="section-heading-editorial">
                  Why Choose Tanogaido for {service.title}
                </h2>
                <p className="section-subtitle">
                  Engineered for clarity, bilingual support, and seamless execution across Japan and global
                  hubs.
                </p>
              </div>
              <Link href="/services" className="section-link-cta">
                View All {services.length} Services <span>&rarr;</span>
              </Link>
            </div>

            <div className="svc-highlights-grid">
              {service.highlights.map((hl, idx) => (
                <article className="svc-highlight-card" key={`${hl.title}-${idx}`}>
                  <span className="svc-highlight-num">{String(idx + 1).padStart(2, '0')}</span>
                  <h3 className="svc-highlight-title">{hl.title}</h3>
                  <p className="svc-highlight-desc">{hl.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Detailed Scope & Inclusions */}
        <section className="svc-details-band" id="service-included">
          <div className="page-container">
            <div className="svc-details-grid">
              <div className="svc-detail-media">
                <img
                  src={service.detailImagePath || service.imagePath}
                  alt={service.detailImageAlt || service.title}
                  loading="lazy"
                />
              </div>
              <div className="svc-detail-copy">
                <span className="svc-detail-kicker">{service.categoryLabel} &middot; SERVICE SCOPE</span>
                <h2 className="section-heading-editorial">{service.overviewTitle}</h2>
                <p>{service.overviewText}</p>
                <ul className="svc-included-list">
                  {service.included.map((item) => (
                    <li key={item}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="svc-inline-links">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-cta-btn"
                    style={{
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 10px 24px -10px rgba(15,23,42,0.18)',
                    }}
                  >
                    <span>Request Free Quote</span>
                    <span className="hero-cta-circle" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17L17 7M17 7H8M17 7V16" />
                      </svg>
                    </span>
                  </a>
                  <span>
                    Explore also: <Link href="/shop">Tanogaido Japan Shop</Link> &middot;{' '}
                    <Link href="/about">About PT. Tanogaido</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. How It Works */}
        <section className="svc-steps-band">
          <div className="page-container">
            <div className="section-header-row">
              <div>
                <h2 className="section-heading-editorial">How Booking Works</h2>
                <p className="section-subtitle">
                  Three straightforward steps to lock in your {service.title} reservation.
                </p>
              </div>
            </div>
            <div className="svc-steps-grid">
              {service.steps.map((step, idx) => (
                <article className="svc-step-card" key={`${step.title}-${idx}`}>
                  <span className="svc-step-tag">STEP {String(idx + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Frequently Asked Questions */}
        <section className="svc-faq-band">
          <div className="page-container">
            <div className="section-header-row">
              <div>
                <h2 className="section-heading-editorial">
                  {service.title} &mdash; Frequently Asked Questions
                </h2>
                <p className="section-subtitle">
                  Quick answers before you book with our bilingual Japan concierge desk.
                </p>
              </div>
            </div>
            <div className="svc-faq-list">
              {service.faqs.map((faq, idx) => (
                <details className="svc-faq-item" key={faq.q} open={idx === 0}>
                  <summary>
                    <span>{faq.q}</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Related Services Internal Linking */}
        <section className="svc-related-band">
          <div className="page-container">
            <div className="section-header-row">
              <div>
                <h2 className="section-heading-editorial">Pair With Complementary Services</h2>
                <p className="section-subtitle">
                  Combine your {service.title} request with other Tanogaido travel, visa, or transport
                  essentials.
                </p>
              </div>
              <Link href="/services" className="section-link-cta">
                Browse Full Catalog <span>&rarr;</span>
              </Link>
            </div>
            <div className="svc-related-grid">
              {fallbackRelated.map((rel) => (
                <Link key={rel.slug} href={`/services/${rel.slug}`} className="svc-related-card">
                  <div className="svc-related-img">
                    <img
                      src={rel.imagePath}
                      alt={rel.heroImageAlt || rel.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="svc-related-body">
                    <span className="svc-related-kicker">{rel.categoryLabel}</span>
                    <h3 className="svc-related-title">{rel.title}</h3>
                    <p className="svc-related-desc">{rel.shortDesc}</p>
                    <span className="svc-related-more">Explore Service &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Conversion CTA Banner */}
        <section className="concierge-banner-band">
          <div className="page-container">
            <div className="concierge-banner-card">
              <div>
                <span className="eyebrow" style={{ color: '#fca5a5' }}>
                  DIRECT CONCIERGE DESK
                </span>
                <h2>Ready to Plan Your {service.title}?</h2>
                <p>
                  Speak directly with our bilingual travel specialists on WhatsApp for transparent quotes,
                  schedule availability, and customized multi-service bundles.
                </p>
              </div>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-btn"
              >
                <span>Chat With Concierge Now</span>
                <span className="hero-cta-circle" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7M17 7H8M17 7V16" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </section>

        <NewsletterBand source={`service-${service.slug}`} />

        <Footer />
      </main>
    </>
  );
}
