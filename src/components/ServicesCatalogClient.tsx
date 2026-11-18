'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { ServiceItem } from '@/types/cms';
import { SERVICE_CATEGORIES, getWhatsAppUrl } from '@/data/fallback-data';
import { Navbar } from '@/components/Navbar';
import { NewsletterBand } from '@/components/NewsletterBand';
import { Footer } from '@/components/Footer';

export function ServicesCatalogClient({ services }: { services: ServiceItem[] }) {
  const [activeCat, setActiveCat] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('category');
    if (catParam && SERVICE_CATEGORIES.some((c) => c.id === catParam)) {
      setActiveCat(catParam);
    }

    const hash = window.location.hash;
    if (hash && hash.startsWith('#service-')) {
      const slug = hash.replace('#service-', '');
      const el = document.getElementById(`service-${slug}`);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setHighlightedSlug(slug);
          setTimeout(() => setHighlightedSlug(null), 2200);
        }, 120);
      }
    }
  }, []);

  const filteredServices = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      const catMatch = activeCat === 'all' || s.category === activeCat;
      const textMatch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.shortDesc.toLowerCase().includes(q) ||
        s.categoryLabel.toLowerCase().includes(q) ||
        s.kicker.toLowerCase().includes(q);
      return catMatch && textMatch;
    });
  }, [services, activeCat, query]);

  const sections = useMemo(() => {
    const categoriesToShow =
      activeCat === 'all'
        ? SERVICE_CATEGORIES
        : SERVICE_CATEGORIES.filter((c) => c.id === activeCat);

    return categoriesToShow
      .map((cat) => ({
        ...cat,
        items: filteredServices.filter((s) => s.category === cat.id),
      }))
      .filter((sec) => sec.items.length > 0);
  }, [activeCat, filteredServices]);

  return (
    <>
      <Navbar
        services={services}
        ctaLabel="Free Consultation"
        ctaHref={getWhatsAppUrl('Hello Tanogaido, I would like a free Japan & visa consultation.')}
        mobileCtaLabel="Free Consultation"
      />

      <main className="catalog-main">
        {/* Breadcrumb Bar */}
        <div className="breadcrumb-bar">
          <div className="page-container">
            <nav className="breadcrumb-nav" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="breadcrumb-sep" aria-hidden="true">
                /
              </span>
              <span className="breadcrumb-current">Our Services</span>
            </nav>
          </div>
        </div>

        {/* Catalog Hero */}
        <section className="catalog-hero-band">
          <div className="page-container">
            <div className="catalog-hero-banner">
              <div>
                <div className="eyebrow-row">
                  <span className="eyebrow">COMPLETE JAPAN &amp; VISA CONCIERGE</span>
                  <span className="eyebrow-line" aria-hidden="true" />
                </div>
                <h1 className="catalog-hero-title">
                  20+ Specialized <span>Concierge Services</span>
                </h1>
                <p className="catalog-hero-desc">
                  Explore every travel, guiding, visa processing, rail pass, private vehicle charter, golf,
                  prewedding, property survey, and logistics solution crafted by PT. Tanogaido Fantasi
                  Pratama since 2007.
                </p>
              </div>
              <div className="catalog-count-badge">
                <div className="catalog-count-num">{services.length} Core Services</div>
                <div className="catalog-count-label">5 Service Divisions</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <section className="catalog-controls-band" aria-label="Filter Services">
          <div className="page-container">
            <div className="catalog-controls-row">
              <div className="catalog-tabs" role="tablist" aria-label="Service Categories">
                <button
                  type="button"
                  className={`catalog-tab ${activeCat === 'all' ? 'active' : ''}`}
                  role="tab"
                  aria-selected={activeCat === 'all'}
                  onClick={() => setActiveCat('all')}
                >
                  All Services ({services.length})
                </button>
                {SERVICE_CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`catalog-tab ${activeCat === c.id ? 'active' : ''}`}
                    role="tab"
                    aria-selected={activeCat === c.id}
                    onClick={() => setActiveCat(c.id)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <div className="catalog-right-controls">
                <div className="catalog-search-wrap">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="search"
                    className="catalog-search"
                    placeholder="Search service (e.g., Visa, Golf, WiFi...)"
                    aria-label="Search Tanogaido services"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <span className="catalog-result-count">
                  Showing {filteredServices.length}{' '}
                  {filteredServices.length === 1 ? 'Service' : 'Services'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Full Catalog Listing */}
        <section className="catalog-list-band">
          <div className="page-container" id="catalog-container">
            {sections.length === 0 ? (
              <div className="catalog-empty">
                No Tanogaido service matches that keyword. Try clearing your filter or search for{' '}
                <strong>Japan</strong>, <strong>Visa</strong>, or <strong>Tour</strong>.
              </div>
            ) : (
              sections.map((section) => (
                <div key={section.id} className="catalog-category-section">
                  <div className="catalog-cat-head">
                    <h2>{section.label}</h2>
                    <span>
                      {section.items.length} {section.items.length === 1 ? 'service' : 'services'}
                    </span>
                  </div>
                  <div className="catalog-grid">
                    {section.items.map((svc) => (
                      <article
                        key={svc.slug}
                        className={`catalog-card ${
                          highlightedSlug === svc.slug ? 'is-highlighted' : ''
                        }`}
                        id={`service-${svc.slug}`}
                      >
                        <Link
                          href={`/services/${svc.slug}`}
                          className="catalog-card-img-link"
                          aria-label={`View details for ${svc.title}`}
                        >
                          <div className="catalog-card-img">
                            <img src={svc.imagePath} alt={svc.title} loading="lazy" />
                          </div>
                        </Link>
                        <div className="catalog-card-body">
                          <span className="catalog-card-kicker">{svc.kicker}</span>
                          <h3 className="catalog-card-title">
                            <Link href={`/services/${svc.slug}`}>{svc.title}</Link>
                          </h3>
                          <p className="catalog-card-desc">{svc.shortDesc}</p>
                          <ul className="catalog-feature-list">
                            {svc.features.map((f) => (
                              <li key={f}>
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  strokeWidth="2.4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="catalog-card-footer">
                            <Link
                              href={`/services/${svc.slug}`}
                              className="catalog-detail-link"
                            >
                              View Full Details &rarr;
                            </Link>
                            <a
                              href={getWhatsAppUrl(svc.waText)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="catalog-wa-btn"
                            >
                              <span>Book via WhatsApp</span>
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M5 12h14M13 6l6 6-6 6" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Direct Concierge Consultation Band */}
        <section className="concierge-banner-band">
          <div className="page-container">
            <div className="concierge-banner-card">
              <div>
                <span className="eyebrow" style={{ color: '#fca5a5' }}>
                  BESPOKE CONCIERGE DESK
                </span>
                <h2>Need a Custom Multi-Service Japan Bundle?</h2>
                <p>
                  Combine airport chauffeur transfers, Japan E-Visa handling, Pocket WiFi, USJ Express Passes,
                  and a dedicated tour guide under one seamless WhatsApp concierge.
                </p>
              </div>
              <a
                href={getWhatsAppUrl('Hello Tanogaido, I would like a custom Japan travel bundle quote.')}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-btn"
              >
                <span>Consult on WhatsApp</span>
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

        <NewsletterBand
          successText="Subscribed! Watch your inbox for curated Japan drops & travel notes."
          source="services-catalog"
        />

        <Footer />
      </main>
    </>
  );
}
