'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, Star, MessageSquare } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { NewsletterBand } from '@/components/NewsletterBand';
import { SiteFooter } from '@/components/SiteFooter';
import type { Service, Trip, Product, Testimonial, TravelStyle } from '@/types/cms';

interface HomeExperienceClientProps {
  services: Service[];
  trips: Trip[];
  products: Product[];
  testimonials: Testimonial[];
  travelStyles: TravelStyle[];
}

const CATEGORIES = [
  { id: 'all', label: 'All Services' },
  { id: 'planning', label: 'Planning & Guides' },
  { id: 'transport', label: 'Transport & Transit' },
  { id: 'tickets', label: 'Tickets & Parks' },
  { id: 'stays', label: 'Stays & Onsen' },
  { id: 'lifestyle', label: 'Lifestyle & Cargo' },
];

export function HomeExperienceClient({
  services,
  trips,
  products,
  testimonials,
  travelStyles,
}: HomeExperienceClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  useEffect(() => {
    document.body.classList.add('page-home');
    return () => {
      document.body.classList.remove('page-home');
    };
  }, []);

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredServices = services
    .filter((s) => s.featuredOnHome)
    .filter((s) => {
      if (selectedCategory === 'all') return true;
      if (selectedCategory === 'planning')
        return s.category === 'planning' || s.id === 'japan-tour-guide' || s.id === 'japan-documents';
      if (selectedCategory === 'transport')
        return s.category === 'transport' || s.id === 'private-transport' || s.id === 'shinkansen-jr-pass';
      if (selectedCategory === 'tickets')
        return s.category === 'tickets' || s.id === 'tokyo-disneyland-disneysea';
      if (selectedCategory === 'stays')
        return s.category === 'stays' || s.id === 'traditional-ryokan-onsen';
      if (selectedCategory === 'lifestyle')
        return s.category === 'lifestyle' || s.id === 'japan-cargo' || s.id === 'japan-golf';
      return true;
    });

  return (
    <div className="home-experience-root">
      {/* 1. Hero Cover Video & Aperture SVG Overlay */}
      <video
        id="hero-video"
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/shinkansen.jpg"
      >
        <source src="/assets/shinkansen.jpg" type="video/mp4" />
      </video>

      <div className="viewport-overlay" aria-hidden="true">
        <svg
          id="architectural-frame-svg"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
        >
          <defs>
            <mask id="hero-aperture-mask">
              <rect width="100%" height="100%" fill="white" />
              <circle cx="960" cy="540" r="420" fill="black" />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="rgba(11, 15, 25, 0.55)"
            mask="url(#hero-aperture-mask)"
          />
        </svg>
      </div>

      {/* Hero Content Overlay */}
      <section className="fixed-ui-stage" aria-label="Hero Welcome">
        <div className="center-hero-title-group">
          <span className="section-eyebrow" style={{ color: '#fca5a5' }}>
            Licensed Japan Tour Operator & Concierge &bull; Est. 2007
          </span>
          <h1 className="hero-headline">
            Experience Japan With Unrivaled Authenticity
          </h1>
          <p className="hero-sub">
            From licensed bilingual Tokyo concierges and VIP private transport to secluded Hakone onsens and Michelin dining reservations.
          </p>
          <div className="hero-cta-wrap" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="https://wa.me/6281318047974?text=Hello%20Tanogaido,%20I%20would%20like%20to%20plan%20my%20Japan%20trip."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span>Consult Concierge</span>
              <span className="btn-icon-bubble">
                <MessageSquare size={14} />
              </span>
            </a>
            <Link href="/services" className="btn-secondary">
              <span>View All 20 Services</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Scroll spacer to allow hero presence before rising curtain */}
      <div style={{ height: '70vh' }} aria-hidden="true" />

      {/* 2. White Content Stage */}
      <main className="white-content-stage">
        {/* Services Band */}
        <section className="section-band services-band" id="services" aria-labelledby="services-heading">
          <div className="section-head">
            <span className="section-eyebrow">Comprehensive Travel Capabilities</span>
            <h2 id="services-heading" className="section-title">
              Curated Japan Travel Services
            </h2>
            <p className="section-sub">
              Every detail engineered for effortless travel. Click or hover any card to inspect highlights and explore complete service itineraries.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="category-filter-strip" role="tablist">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat.id}
                className={`category-pill ${selectedCategory === cat.id ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 12 Interactive 3D Flip Cards (Front + Back with ONLY 'Service Details' CTA) */}
          <div className="services-grid">
            {filteredServices.map((svc) => {
              const isFlipped = !!flippedCards[svc.id];
              const cardImg = svc.homeCard?.image || svc.heroImage || '/assets/shinkansen.jpg';
              const cardTitle = svc.homeCard?.title || svc.title;
              const cardBadge = svc.homeCard?.badge || svc.badge;
              const cardTeaser = svc.homeCard?.teaser || svc.shortDesc;

              return (
                <div
                  key={svc.id}
                  className={`service-flip-card ${isFlipped ? 'is-flipped' : ''}`}
                  onClick={() => toggleFlip(svc.id)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${cardTitle}. Click to flip.`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleFlip(svc.id);
                    }
                  }}
                >
                  <div className="service-flip-inner">
                    {/* Front */}
                    <div
                      className="service-flip-front"
                      style={{ backgroundImage: `url('${cardImg}')` }}
                    >
                      <div className="service-flip-front-content">
                        <span className="service-card-badge">{cardBadge}</span>
                        <h3 className="service-card-title">{cardTitle}</h3>
                        <p className="service-card-teaser">{cardTeaser}</p>
                      </div>
                    </div>

                    {/* Back */}
                    <div className="service-flip-back">
                      <div className="service-flip-back-body">
                        <h3 className="service-flip-back-title">{cardTitle}</h3>
                        <p className="service-flip-back-desc">{svc.shortDesc}</p>

                        <ul className="service-flip-highlights">
                          {svc.highlights.slice(0, 3).map((hl, idx) => (
                            <li key={idx}>
                              <Check size={14} />
                              <span>{hl.title}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CRITICAL: Back CTA is ONLY Link to Service Details, NO WhatsApp */}
                      <div
                        className="service-flip-actions"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Link
                          href={`/services/${svc.slug}`}
                          className="btn-flip-details"
                        >
                          <span>Service Details</span>
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <Link href="/services" className="btn-primary" style={{ display: 'inline-flex', border: '1px solid #e2e8f0' }}>
              <span>View All 20 Japan Services &rarr;</span>
            </Link>
          </div>
        </section>

        {/* Travel Your Way (Styles Band) */}
        <section className="section-band styles-band" aria-labelledby="styles-heading" style={{ background: '#fafafa' }}>
          <div className="section-head">
            <span className="section-eyebrow">Tailored Experiences</span>
            <h2 id="styles-heading" className="section-title">
              Travel Japan Your Way
            </h2>
            <p className="section-sub">
              Whether pursuing high-octane Tokyo neon, secluded hot spring sanctuaries, or peak golf greens beneath Mt. Fuji.
            </p>
          </div>

          <div className="styles-grid">
            {travelStyles.map((style) => (
              <Link
                key={style.id}
                href={style.link || '/services'}
                className="style-tile"
                style={{ backgroundImage: `url('${style.image || '/assets/cards/card-1.jpg'}')` }}
              >
                <div className="style-tile-content">
                  <h3 className="style-tile-title">{style.title || style.label}</h3>
                  <p className="style-tile-desc">{style.desc || style.waText}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Trips */}
        <section className="section-band trips-band" aria-labelledby="trips-heading">
          <div className="section-head">
            <span className="section-eyebrow">Signature Itineraries</span>
            <h2 id="trips-heading" className="section-title">
              Featured Japan Journeys
            </h2>
            <p className="section-sub">
              Tested routes led by seasoned concierges with VIP transit, private stays, and insider access.
            </p>
          </div>

          <div className="trips-grid">
            {trips.map((trip) => (
              <article key={trip.id} className="trip-card">
                <div
                  className="trip-card-media"
                  style={{ backgroundImage: `url('${trip.image}')` }}
                >
                  <span className="trip-card-badge">{trip.duration}</span>
                </div>
                <div className="trip-card-body">
                  <h3 className="trip-card-title">{trip.title}</h3>
                  <p className="trip-card-summary">{trip.summary}</p>
                  <div className="trip-card-specs">
                    <div>
                      <span style={{ fontSize: 12, color: '#64748b', display: 'block' }}>From</span>
                      <span className="trip-card-price">${trip.priceFrom.toLocaleString()}</span>
                      <span style={{ fontSize: 12, color: '#64748b' }}> / person</span>
                    </div>
                    <a
                      href={`https://wa.me/6281318047974?text=${encodeURIComponent(`Inquire about itinerary: ${trip.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-flip-details"
                      style={{ width: 'auto', padding: '8px 16px', fontSize: 13 }}
                    >
                      Inquire
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Curated Japanese Goods Preview */}
        <section className="section-band" aria-labelledby="shop-heading" style={{ background: '#f8fafc' }}>
          <div className="section-head">
            <span className="section-eyebrow">Artisan Merchandise</span>
            <h2 id="shop-heading" className="section-title">
              Curated Japanese Lifestyle Goods
            </h2>
            <p className="section-sub">
              Authentic crafts, Edo glassware, Imabari organic cotton, and essential connectivity shipped directly to your door.
            </p>
          </div>

          <div className="products-grid">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/shop" className="btn-primary" style={{ display: 'inline-flex', border: '1px solid #e2e8f0' }}>
              <span>Visit Tanogaido Shop &rarr;</span>
            </Link>
          </div>
        </section>

        {/* Reviews Band */}
        <section className="section-band reviews-band" aria-labelledby="reviews-heading">
          <div className="section-head">
            <span className="section-eyebrow">Client Endorsements</span>
            <h2 id="reviews-heading" className="section-title">
              Memories Cherished by Travelers
            </h2>
            <p className="section-sub">
              Over 1,200 travelers guided across Japan with 100% 5-star satisfaction ratings.
            </p>
          </div>

          <div className="reviews-grid">
            {testimonials.map((t) => (
              <div key={t.id} className="review-card">
                <div>
                  <div className="review-stars">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <blockquote className="review-quote">&ldquo;{t.quote}&rdquo;</blockquote>
                </div>
                <div className="review-author">
                  <Image
                    src={t.avatar}
                    alt={t.author}
                    width={44}
                    height={44}
                    className="review-avatar"
                  />
                  <div>
                    <h4 className="review-name">{t.author}</h4>
                    <span className="review-location">{t.location} &bull; {t.tripType}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <NewsletterBand />

        {/* Footer */}
        <SiteFooter />
      </main>
    </div>
  );
}
