'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Search } from 'lucide-react';
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

      <main className="services-main">
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

        {/* Editorial Hero Band */}
        <section className="services-hero-band">
          <div className="page-container">
            <div className="services-hero-grid">
              <div>
                <div className="eyebrow-row">
                  <span className="eyebrow">COMPLETE JAPAN &amp; VISA CONCIERGE</span>
                  <span className="eyebrow-line" aria-hidden="true" />
                </div>
                <h1 className="services-hero-title">
                  {services.length}+ Specialized <span>Concierge Services</span>
                </h1>
                <p className="services-hero-desc">
                  Explore every travel, guiding, visa processing, rail pass, private vehicle charter, golf,
                  prewedding, property survey, and logistics solution crafted by PT. Tanogaido Fantasi
                  Pratama since 2007.
                </p>
              </div>
              <div className="services-hero-stats">
                <div className="hero-stat-box">
                  <div className="hero-stat-val">{services.length}+</div>
                  <div className="hero-stat-label">Specialized Japan &amp; Global Services</div>
                </div>
                <div className="hero-stat-box">
                  <div className="hero-stat-val">5</div>
                  <div className="hero-stat-label">Dedicated Concierge Divisions</div>
                </div>
                <div className="hero-stat-box">
                  <div className="hero-stat-val">2007</div>
                  <div className="hero-stat-label">Trusted Track Record</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Filter & Search Toolbar */}
        <section className="services-toolbar-band" aria-label="Filter Services">
          <div className="page-container">
            <div className="services-toolbar-inner">
              <div className="svc-filter-tabs" role="tablist" aria-label="Service Categories">
                <button
                  type="button"
                  className={`svc-filter-tab ${activeCat === 'all' ? 'active' : ''}`}
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
                    className={`svc-filter-tab ${activeCat === c.id ? 'active' : ''}`}
                    role="tab"
                    aria-selected={activeCat === c.id}
                    onClick={() => setActiveCat(c.id)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <div className="svc-search-wrap">
                <div className="svc-search-box">
                  <Search aria-hidden="true" />
                  <input
                    type="search"
                    className="svc-search-input"
                    placeholder="Search service (Visa, Golf, WiFi...)"
                    aria-label="Search Tanogaido services"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <span className="svc-count-pill">
                  Showing {filteredServices.length}{' '}
                  {filteredServices.length === 1 ? 'Service' : 'Services'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Services Catalog Grid */}
        <section className="services-catalog-band">
          <div className="page-container" id="catalog-container">
            {sections.length === 0 ? (
              <div className="services-empty">
                No Tanogaido service matches that keyword. Try clearing your filter or search for{' '}
                <strong>Japan</strong>, <strong>Visa</strong>, or <strong>Tour</strong>.
              </div>
            ) : (
              sections.map((section) => (
                <div key={section.id} className="services-cat-section">
                  <div className="services-cat-head">
                    <h2>{section.label}</h2>
                    <span>
                      {section.items.length} {section.items.length === 1 ? 'service' : 'services'}
                    </span>
                  </div>
                  <div className="services-full-grid">
                    {section.items.map((svc) => (
                      <article
                        key={svc.slug}
                        className={`full-service-card ${
                          highlightedSlug === svc.slug ? 'is-highlighted' : ''
                        }`}
                        id={`service-${svc.slug}`}
                      >
                        <div className="full-service-media">
                          <Link
                            href={`/services/${svc.slug}`}
                            className="full-service-media-link"
                            aria-label={`View details for ${svc.title}`}
                          >
                            <img src={svc.imagePath} alt={svc.title} loading="lazy" />
                          </Link>
                          <span className="full-service-cat-tag">{svc.categoryLabel}</span>
                        </div>
                        <div className="full-service-body">
                          <span className="full-service-kicker">{svc.kicker}</span>
                          <h3 className="full-service-title">
                            <Link href={`/services/${svc.slug}`}>{svc.title}</Link>
                          </h3>
                          <p className="full-service-desc">{svc.shortDesc}</p>
                          <ul className="full-service-list">
                            {svc.features.map((f) => (
                              <li key={f}>
                                <Check aria-hidden="true" strokeWidth={2.4} />
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="full-service-actions">
                            <Link
                              href={`/services/${svc.slug}`}
                              className="full-service-detail-btn"
                            >
                              <span>Full Details</span>
                            </Link>
                            <a
                              href={getWhatsAppUrl(svc.waText)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="full-service-cta"
                            >
                              <span>WhatsApp</span>
                              <ArrowRight aria-hidden="true" strokeWidth={2.2} />
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

        {/* Direct Concierge Consultation Banner */}
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
                  <ArrowUpRight strokeWidth={2.2} />
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
