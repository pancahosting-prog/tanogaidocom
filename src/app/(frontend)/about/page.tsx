import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck, Check, Award, Compass, HeartHandshake, Globe } from 'lucide-react';
import { getAboutData } from '@/lib/cms-data';
import { ConciergeBanner } from '@/components/ConciergeBanner';
import { SiteFooter } from '@/components/SiteFooter';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Corporate Profile & Legal Accreditation — PT. Tanogaido Fantasi Pratama',
  description:
    'Established in 2007, PT. Tanogaido Fantasi Pratama is an officially licensed Japan tour operator and private concierge headquartered in Jakarta with dedicated operations in Tokyo.',
  alternates: {
    canonical: 'https://tanogaido.com/about',
  },
  openGraph: {
    title: 'Corporate Profile & Legal Accreditation | Tanogaido Japan',
    description:
      'Established in 2007, PT. Tanogaido Fantasi Pratama is an officially licensed Japan tour operator and private concierge.',
    url: 'https://tanogaido.com/about',
    images: ['/assets/cards/card-1.jpg'],
  },
};

export default async function AboutPage() {
  const data = await getAboutData();

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Tanogaido — PT. Tanogaido Fantasi Pratama',
    url: 'https://tanogaido.com/about',
    description:
      'Corporate overview, legal licensure, and mission of PT. Tanogaido Fantasi Pratama, premier Japan tour operator since 2007.',
    mainEntity: {
      '@type': 'Corporation',
      name: 'PT. Tanogaido Fantasi Pratama',
      foundingDate: '2007',
      taxID: '2003230101593',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Plaza Pasifik Blok A4 No. 79, Kelapa Gading',
        addressLocality: 'Jakarta Utara',
        addressCountry: 'ID',
      },
    },
  };

  return (
    <div className="about-main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      {/* Hero */}
      <section className="about-hero-band">
        <span className="section-eyebrow">Corporate Heritage &bull; Est. 2007</span>
        <h1 className="section-title">PT. Tanogaido Fantasi Pratama</h1>
        <p className="section-sub">
          {data.profile}
        </p>

        {/* Metrics Grid */}
        <div className="about-metrics-grid">
          {data.metrics.map((m, i) => (
            <div key={i} className="about-metric-card">
              <div className="about-metric-val">{m.val}</div>
              <div className="about-metric-lbl">{m.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Vision & Mission Split */}
      <section className="about-split-band">
        <div className="about-vision-card">
          <div style={{ display: 'inline-flex', padding: 8, borderRadius: 10, background: '#fef2f2', color: '#dc2626', marginBottom: 16 }}>
            <Globe size={24} />
          </div>
          <h3>Corporate Vision</h3>
          <p style={{ fontSize: 15.5, lineHeight: 1.7, color: '#475569' }}>{data.vision}</p>
        </div>

        <div className="about-mission-card">
          <div style={{ display: 'inline-flex', padding: 8, borderRadius: 10, background: '#fef2f2', color: '#dc2626', marginBottom: 16 }}>
            <Award size={24} />
          </div>
          <h3>Strategic Missions</h3>
          <ul className="about-mission-list">
            {data.missions.map((mission, i) => (
              <li key={i}>
                <Check size={16} />
                <span>{mission}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 Core Pillars */}
      <section className="section-band" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <span className="section-eyebrow">Institutional Capabilities</span>
          <h2 className="section-title">The 6 Pillars of Tanogaido</h2>
          <p className="section-sub">
            Our multi-faceted infrastructure covers every dimension of travel across Tokyo, Kyoto, Osaka, and beyond.
          </p>
        </div>

        <div className="about-pillars-grid">
          {data.pillars.map((pillar, i) => (
            <div key={i} className="about-pillar-card">
              <div style={{ display: 'inline-flex', padding: 8, borderRadius: 10, background: '#ffffff', border: '1px solid #e2e8f0', color: '#dc2626', marginBottom: 14 }}>
                <Compass size={20} />
              </div>
              <h3 className="about-pillar-title">{pillar.title}</h3>
              <p className="about-pillar-desc">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Tanogaido */}
      <section className="section-band" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <span className="section-eyebrow">Client Confidence</span>
          <h2 className="section-title">Why Travelers Trust Tanogaido</h2>
        </div>

        <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {data.whyChoose.map((why, i) => (
            <div key={i} className="svc-highlight-card" style={{ background: '#ffffff', border: '1px solid #e2e8f0' }}>
              <div className="svc-highlight-icon">
                <HeartHandshake size={20} />
              </div>
              <h3 className="svc-highlight-title">{why.title}</h3>
              <p className="svc-highlight-desc">{why.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Legal & Corporate Credentials Card */}
      <section style={{ padding: '0 24px' }}>
        <div className="about-legal-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <ShieldCheck size={28} color="#dc2626" />
            <h2 className="about-legal-title" style={{ margin: 0 }}>
              Official Licensure & Corporate Accreditation
            </h2>
          </div>

          <div className="about-legal-grid">
            <div>
              <strong style={{ color: '#ffffff', display: 'block', marginBottom: 4 }}>
                Legal Company Name:
              </strong>
              PT. Tanogaido Fantasi Pratama
              <br />
              Established: 2007
            </div>

            <div>
              <strong style={{ color: '#ffffff', display: 'block', marginBottom: 4 }}>
                Business Identification (NIB):
              </strong>
              {data.legal.nib}
              <br />
              <strong style={{ color: '#ffffff', display: 'block', marginTop: 8, marginBottom: 4 }}>
                Ministerial Decree:
              </strong>
              {data.legal.decree}
            </div>

            <div>
              <strong style={{ color: '#ffffff', display: 'block', marginBottom: 4 }}>
                Registered Office:
              </strong>
              {data.legal.address}
              <br />
              Support: halo@tanogaido.com &bull; +62 813-1804-7974
            </div>
          </div>
        </div>
      </section>

      {/* Concierge Banner */}
      <ConciergeBanner />

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
