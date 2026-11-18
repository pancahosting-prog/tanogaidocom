'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ArrowRight, MessageSquare, Check } from 'lucide-react';
import { ServiceIcon } from '@/components/ServiceIcon';
import { ConciergeBanner } from '@/components/ConciergeBanner';
import { SiteFooter } from '@/components/SiteFooter';
import type { Service } from '@/types/cms';

interface ServicesCatalogClientProps {
  services: Service[];
}

const CATEGORIES = [
  { id: 'all', label: 'All Services (20)' },
  { id: 'planning', label: 'Planning & Guides' },
  { id: 'transport', label: 'Transport & Transit' },
  { id: 'tickets', label: 'Tickets & Parks' },
  { id: 'stays', label: 'Stays & Onsen' },
  { id: 'lifestyle', label: 'Lifestyle & Cargo' },
];

export function ServicesCatalogClient({ services }: ServicesCatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return services.filter((svc) => {
      const matchCat = selectedCategory === 'all' || svc.category === selectedCategory;
      const matchQuery =
        !query ||
        svc.title.toLowerCase().includes(query.toLowerCase()) ||
        svc.shortDesc.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [services, selectedCategory, query]);

  return (
    <div className="services-catalog-root" style={{ background: '#ffffff', minHeight: '100vh', paddingTop: '88px' }}>
      {/* Hero Header */}
      <section className="section-band" style={{ paddingBottom: '32px' }}>
        <div className="section-head">
          <span className="section-eyebrow">End-to-End Travel Capabilities</span>
          <h1 className="section-title">All Japan Concierge Services</h1>
          <p className="section-sub">
            From private bilingual guides and VIP van charters to Michelin dining and secluded onsen ryokan bookings. Select any service to explore detailed pricing, itineraries, and inclusions.
          </p>
        </div>

        {/* Toolbar: Categories + Search */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
          <div className="category-filter-strip" style={{ marginBottom: 0 }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`category-pill ${selectedCategory === cat.id ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
            <Search
              size={18}
              style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
            />
            <input
              type="text"
              placeholder="Search services (e.g. guide, transport, disney)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="shop-search-input"
              style={{ width: '100%', paddingLeft: 44 }}
            />
          </div>
        </div>
      </section>

      {/* Grid of Services (Direct links to /services/[slug]) */}
      <section className="section-band" style={{ paddingTop: 0 }}>
        <div className="services-grid">
          {filtered.map((svc) => (
            <article
              key={svc.id}
              className="product-card"
              style={{ display: 'flex', flexDirection: 'column', minHeight: '440px' }}
            >
              <div className="product-card-media" style={{ height: '220px' }}>
                <Link href={`/services/${svc.slug}`} tabIndex={-1}>
                  <Image
                    src={svc.heroImage}
                    alt={svc.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="product-card-img"
                  />
                </Link>
                <span className="product-card-badge">{svc.badge}</span>
              </div>

              <div className="product-card-body" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 6,
                      background: '#fef2f2',
                      color: '#dc2626',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ServiceIcon name={svc.icon || 'compass'} size={14} />
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#64748b' }}>
                    {svc.category}
                  </span>
                </div>

                <Link
                  href={`/services/${svc.slug}`}
                  className="product-card-title"
                  style={{ fontSize: 20, marginBottom: 8 }}
                >
                  {svc.title}
                </Link>

                <p className="product-card-desc" style={{ marginBottom: 14 }}>
                  {svc.shortDesc}
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                  {svc.highlights.slice(0, 2).map((h, i) => (
                    <li key={i} style={{ fontSize: 12.5, color: '#475569', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Check size={13} color="#dc2626" />
                      <span>{h.title}</span>
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginTop: 'auto',
                    paddingTop: 14,
                    borderTop: '1px solid #f1f5f9',
                  }}
                >
                  <Link
                    href={`/services/${svc.slug}`}
                    className="btn-flip-details"
                    style={{ flex: 1, padding: '10px 14px', fontSize: 13 }}
                  >
                    <span>View Details</span>
                    <ArrowRight size={14} />
                  </Link>

                  <a
                    href={`https://wa.me/6281318047974?text=${encodeURIComponent(`Hello Tanogaido, I would like to inquire about: ${svc.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="product-card-btn"
                    style={{ padding: '10px 12px' }}
                    aria-label={`Inquire about ${svc.title} on WhatsApp`}
                  >
                    <MessageSquare size={16} color="#16a34a" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Concierge Banner */}
      <ConciergeBanner />

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
