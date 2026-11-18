import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowUpRight, ArrowDown, Check, ChevronDown, Sparkles } from 'lucide-react';
import { getServiceBySlug, getServices } from '@/lib/cms-data';
import { ServiceIcon } from '@/components/ServiceIcon';
import { ConciergeBanner } from '@/components/ConciergeBanner';
import { SiteFooter } from '@/components/SiteFooter';

export const revalidate = 60;

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
    return { title: 'Service Not Found' };
  }

  return {
    title: `${service.title} — Tanogaido Japan Concierge`,
    description: service.seoDescription || service.shortDesc,
    keywords: service.keywords,
    alternates: {
      canonical: `https://tanogaido.com/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Tanogaido Japan`,
      description: service.shortDesc,
      url: `https://tanogaido.com/services/${service.slug}`,
      images: [
        {
          url: service.heroImage,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | Tanogaido Japan`,
      description: service.shortDesc,
      images: [service.heroImage],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const allServices = await getServices();
  const relatedServices = allServices
    .filter((s) => s.id !== service.id && service.relatedIds?.includes(s.id))
    .slice(0, 4);

  // Fallback to other services if relatedIds is empty
  const displayRelated =
    relatedServices.length > 0
      ? relatedServices
      : allServices.filter((s) => s.id !== service.id).slice(0, 4);

  // 1. Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.category,
    provider: {
      '@type': 'TravelAgency',
      name: 'PT. Tanogaido Fantasi Pratama',
      url: 'https://tanogaido.com',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Japan',
    },
    description: service.seoDescription || service.shortDesc,
    offers: {
      '@type': 'Offer',
      price: (service.priceStarting ?? 150).toString(),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  // 2. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://tanogaido.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Our Services',
        item: 'https://tanogaido.com/services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `https://tanogaido.com/services/${service.slug}`,
      },
    ],
  };

  // 3. FAQPage Schema
  const faqSchema = {
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

  const whatsappMessage = encodeURIComponent(
    `Hello Tanogaido, I would like to book or inquire about: ${service.title}`
  );

  return (
    <div className="svc-detail-main">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb Bar */}
      <nav className="breadcrumb-bar" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/services">Our Services</Link>
        <span>/</span>
        <span className="active-crumb">{service.title}</span>
      </nav>

      {/* Hero Framed Band (Responsive with Mobile Non-Clipping Safeguards) */}
      <section className="svc-hero-band" aria-label={`${service.title} Overview`}>
        <div className="svc-hero-frame">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            priority
            sizes="(max-width: 860px) 100vw, 1320px"
            className="svc-hero-bg"
          />
          <div className="svc-hero-gradient" />

          <div className="svc-hero-inner">
            <span className="svc-hero-eyebrow">
              <Sparkles size={14} />
              <span>{service.badge} &bull; On-Site Support</span>
            </span>

            <h1 className="svc-hero-title">{service.headline}</h1>

            <p className="svc-hero-desc">{service.subheadline}</p>

            {/* CTAs */}
            <div className="svc-hero-ctas">
              <a
                href={`https://wa.me/6281318047974?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span>Book via WhatsApp</span>
                <span className="btn-icon-bubble">
                  <ArrowUpRight size={16} />
                </span>
              </a>

              <a href="#inclusions" className="btn-secondary">
                <span>See What&apos;s Included</span>
                <ArrowDown size={16} />
              </a>
            </div>

            {/* Stat Cards */}
            <div className="svc-hero-stats">
              {service.stats.map((st, i) => (
                <div key={i} className="svc-hero-stat-card">
                  <div className="svc-hero-stat-value">{st.value}</div>
                  <div className="svc-hero-stat-label">{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Band */}
      <section className="svc-highlights-band" aria-labelledby="highlights-heading">
        <div className="section-head" style={{ marginBottom: 28 }}>
          <span className="section-eyebrow">Key Advantages</span>
          <h2 id="highlights-heading" className="section-title">
            Why Choose Tanogaido {service.title}
          </h2>
        </div>

        <div className="svc-highlights-grid">
          {service.highlights.map((hl, i) => (
            <div key={i} className="svc-highlight-card">
              <div className="svc-highlight-icon">
                <ServiceIcon name={hl.icon || service.icon || 'compass'} size={20} />
              </div>
              <h3 className="svc-highlight-title">{hl.title}</h3>
              <p className="svc-highlight-desc">{hl.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Scope & Inclusions Split */}
      <section className="svc-details-band" id="inclusions" aria-labelledby="details-heading">
        <div className="svc-details-split">
          {/* Prose */}
          <div className="svc-prose-col">
            <h2 id="details-heading">Comprehensive Service Overview</h2>
            <p>{service.overview || service.overviewText || service.shortDesc}</p>
            <p>{service.subheadline || service.heroDesc || service.shortDesc}</p>

            <div style={{ marginTop: 12 }}>
              <a
                href={`https://wa.me/6281318047974?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ background: '#dc2626', color: '#ffffff', display: 'inline-flex' }}
              >
                <span>Reserve {service.title}</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* Inclusions Card */}
          <div className="svc-inclusions-col">
            <div className="svc-inclusions-card">
              <h3>What&apos;s Included</h3>
              <ul className="svc-inclusions-list">
                {(service.inclusions || service.included || service.features || []).map((item, i) => (
                  <li key={i}>
                    <Check size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps */}
      <section className="svc-steps-band" aria-labelledby="steps-heading">
        <div className="svc-steps-wrap">
          <div className="section-head" style={{ marginBottom: 20 }}>
            <span className="section-eyebrow">Seamless Process</span>
            <h2 id="steps-heading" className="section-title">How It Works in 3 Simple Steps</h2>
          </div>

          <div className="svc-steps-grid">
            {service.steps.map((step) => (
              <div key={step.step} className="svc-step-card">
                <div className="svc-step-number">{step.step}</div>
                <h3 className="svc-step-title">{step.title}</h3>
                <p className="svc-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="svc-faq-band" aria-labelledby="faq-heading">
        <div className="section-head" style={{ marginBottom: 12 }}>
          <span className="section-eyebrow">Frequently Asked Questions</span>
          <h2 id="faq-heading" className="section-title">Questions & Answers</h2>
        </div>

        <div className="faq-list">
          {service.faqs.map((faq, idx) => (
            <details key={idx} className="faq-item" open={idx === 0}>
              <summary className="faq-summary">
                <span>{faq.q}</span>
                <ChevronDown />
              </summary>
              <div className="faq-content">
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Related Services */}
      <section className="svc-related-band" aria-labelledby="related-heading">
        <div className="section-head" style={{ marginBottom: 8 }}>
          <span className="section-eyebrow">Complementary Capabilities</span>
          <h2 id="related-heading" className="section-title">You May Also Need</h2>
        </div>

        <div className="svc-related-grid">
          {displayRelated.map((rel) => (
            <Link
              key={rel.id}
              href={`/services/${rel.slug}`}
              className="svc-related-card"
            >
              <div
                className="svc-related-thumb"
                style={{ backgroundImage: `url('${rel.heroImage}')` }}
              />
              <div className="svc-related-body">
                <h3 className="svc-related-title">{rel.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>
                  {rel.shortDesc.slice(0, 75)}...
                </p>
                <span className="svc-related-price">Explore Details &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Concierge Banner */}
      <ConciergeBanner
        title={`Customize Your ${service.title} Package`}
        description="Our licensed Tokyo concierges can adjust timings, routes, group configurations, and special accommodations to match your exact itinerary requirements."
      />

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
