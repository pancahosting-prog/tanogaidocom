import type { Metadata } from 'next';
import Link from 'next/link';
import { getServices, getSiteSettings } from '@/lib/cms';
import { getWhatsAppUrl } from '@/data/fallback-data';
import { getSiteOrigin } from '@/lib/editorial';
import {
  buildAboutPageJsonLd,
  buildBreadcrumbJsonLd,
  buildOrganizationJsonLd,
} from '@/lib/seo';
import { Navbar } from '@/components/Navbar';
import { NewsletterBand } from '@/components/NewsletterBand';
import { Footer } from '@/components/Footer';

export const revalidate = 60;

const SITE_URL = getSiteOrigin();

export const metadata: Metadata = {
  title: 'About Us — PT. Tanogaido Fantasi Pratama | Tanogaido',
  description:
    'PT. Tanogaido Fantasi Pratama — Your Gateway to Japan since 2007. Integrated Japan tours, visa assistance, rail passes, education, and shopping concierge.',
  alternates: {
    canonical: '/about',
    languages: {
      en: '/about',
      'id-ID': '/about',
      'x-default': '/about',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Tanogaido',
    url: `${SITE_URL}/about`,
    title: 'About Us — PT. Tanogaido Fantasi Pratama | Tanogaido',
    description:
      'Connecting Indonesia and Japan since 2007 through travel, education, mobility, and curated Japanese goods.',
    images: [{ url: '/assets/tokyo-pulse.jpg', alt: 'PT. Tanogaido Fantasi Pratama' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us — PT. Tanogaido Fantasi Pratama | Tanogaido',
    description:
      'Connecting Indonesia and Japan since 2007 through travel, education, mobility, and curated Japanese goods.',
    images: ['/assets/tokyo-pulse.jpg'],
  },
};

export default async function AboutPage() {
  const [services, siteSettings] = await Promise.all([getServices(), getSiteSettings()]);
  const waHref = getWhatsAppUrl(
    `Hello ${siteSettings.companyName}, I would like to connect about your Japan services.`
  );

  const aboutJsonLd = buildAboutPageJsonLd(siteSettings, SITE_URL);
  const orgJsonLd = buildOrganizationJsonLd(siteSettings, SITE_URL);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' },
    ],
    SITE_URL
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar
        services={services}
        ctaLabel="Explore Now"
        ctaHref={waHref}
        mobileCtaLabel="Contact Our Team"
      />

      <main className="about-main">
        {/* 1. About Us Editorial Hero */}
        <section className="about-hero-band" id="about-us">
          <div className="page-container">
            <div className="about-hero-grid">
              <div>
                <div className="eyebrow-row">
                  <span className="eyebrow">ABOUT US</span>
                  <span className="eyebrow-line" aria-hidden="true" />
                </div>
                <span className="about-company-tag">{siteSettings.companyName.toUpperCase()}</span>
                <h1 className="about-hero-title">
                  Your Gateway <span className="line-red">to Japan.</span>
                </h1>
                <div className="about-hero-copy">
                  <p>
                    {siteSettings.companyName} is an Indonesian company specializing in Japan-related services,
                    providing comprehensive solutions for individuals and businesses seeking travel,
                    education, and various services connected to Japan.
                  </p>
                  <p>
                    Established in 2007, Tanogaido was founded with a vision to make Japan more accessible to
                    Indonesian people. Through our growing range of services, we aim to simplify every aspect
                    of experiencing, exploring, and connecting with Japan.
                  </p>
                  <p>
                    We understand that every customer has different needs, whether they wish to explore
                    Japan&apos;s destinations, experience its culture, pursue educational opportunities, or access
                    essential services. Therefore, we continuously develop integrated solutions designed to
                    provide convenience, reliability, and a better customer experience.
                  </p>
                  <p>
                    Our commitment is to become a trusted partner for anyone looking to discover
                    opportunities and experiences in Japan.
                  </p>
                </div>
                <div className="about-hero-actions">
                  <a href="#contact" className="hero-cta-btn">
                    <span>Contact Us</span>
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
                  <a href="#services" className="about-secondary-cta">
                    Explore Our Services
                  </a>
                </div>
              </div>

              <div className="about-hero-visual">
                <div className="about-hero-frame">
                  <img src="/assets/logotano.png" alt="Tanogaido official red Torii brand logo" />
                </div>
                <div className="about-metrics-bar">
                  <div className="about-metric-card">
                    <div className="about-metric-val">2007</div>
                    <div className="about-metric-label">Founded in Indonesia</div>
                  </div>
                  <div className="about-metric-card">
                    <div className="about-metric-val">6+</div>
                    <div className="about-metric-label">Integrated Japan Service Pillars</div>
                  </div>
                  <div className="about-metric-card">
                    <div className="about-metric-val">100%</div>
                    <div className="about-metric-label">Registered Legal Entity (AHU)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Our Journey */}
        <section className="journey-band" id="journey">
          <div className="page-container">
            <div className="journey-grid">
              <div className="journey-media">
                <img
                  src="/assets/tokyo-pulse.jpg"
                  alt="Tokyo cityscape reflecting Tanogaido's integrated Japan services"
                />
                <div className="journey-caption-card">
                  <span className="journey-caption-kicker">INTEGRATED ECOSYSTEM</span>
                  <span className="journey-caption-text">
                    Connecting Indonesian travelers, students, and businesses with trusted Japan solutions
                    since 2007.
                  </span>
                </div>
              </div>
              <div>
                <div className="eyebrow-row">
                  <span className="eyebrow">MILESTONES &amp; GROWTH</span>
                  <span className="eyebrow-line" aria-hidden="true" />
                </div>
                <h2 className="section-heading-editorial">Our Journey</h2>
                <div className="journey-prose">
                  <p>
                    Since 2007, Tanogaido has continuously developed its business in response to the growing
                    interest of Indonesian people in Japan.
                  </p>
                  <p>
                    Starting with travel and tourism services, we have expanded our offerings to cover a
                    broader range of Japan-related needs, including private tours, visa assistance,
                    transportation, travel essentials, Japanese language education, ticket reservations, and
                    shopping assistance.
                  </p>
                  <p>
                    Our journey reflects our commitment to innovation, service development, and building
                    long-term relationships with our customers and business partners.
                  </p>
                  <p>
                    Today, we continue to strengthen our position as an integrated Japan services provider,
                    connecting people with the experiences, opportunities, and services they need.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Our Vision & Our Mission */}
        <section className="vision-mission-band" id="vision-mission">
          <div className="page-container">
            <div className="vm-grid">
              <div className="vision-card">
                <span className="eyebrow">OUR VISION</span>
                <h2 className="section-heading-editorial" style={{ marginTop: 8 }}>
                  Connecting Indonesia &amp; Japan
                </h2>
                <p className="vision-quote">
                  &ldquo;To become a trusted and leading integrated Japan services company, connecting Indonesia
                  and Japan through accessible, reliable, and innovative solutions.&rdquo;
                </p>
              </div>

              <div>
                <span className="eyebrow">OUR MISSION</span>
                <h2 className="section-heading-editorial" style={{ marginTop: 8 }}>
                  Six Pillars Guiding Every Interaction
                </h2>
                <div className="mission-grid">
                  <article className="mission-card">
                    <span className="mission-num">01</span>
                    <p>To provide high-quality services that meet the diverse needs of our customers.</p>
                  </article>
                  <article className="mission-card">
                    <span className="mission-num">02</span>
                    <p>
                      To make Japan-related travel, education, and services more accessible to Indonesian
                      people.
                    </p>
                  </article>
                  <article className="mission-card">
                    <span className="mission-num">03</span>
                    <p>To continuously develop an integrated ecosystem of Japan-related services.</p>
                  </article>
                  <article className="mission-card">
                    <span className="mission-num">04</span>
                    <p>
                      To maintain professionalism, transparency, and reliability in every customer interaction.
                    </p>
                  </article>
                  <article className="mission-card">
                    <span className="mission-num">05</span>
                    <p>
                      To leverage technology and innovation to improve service accessibility and customer
                      experience.
                    </p>
                  </article>
                  <article className="mission-card">
                    <span className="mission-num">06</span>
                    <p>To establish strong, sustainable relationships with customers and business partners.</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Our Services */}
        <section className="about-services-band" id="services">
          <div className="page-container">
            <div className="section-header-row">
              <div>
                <span className="eyebrow">OUR SERVICES</span>
                <h2 className="section-heading-editorial" style={{ marginTop: 6 }}>
                  Integrated Japan Solutions
                </h2>
                <p className="section-subtitle">
                  Six dedicated service lines designed to support tourism, mobility, education, and curated
                  commerce in Japan.
                </p>
              </div>
              <Link href="/services" className="section-link-cta">
                Explore Interactive Service Catalog <span>&rarr;</span>
              </Link>
            </div>

            <div className="about-services-grid">
              <article className="about-service-card">
                <div className="about-service-top">
                  <span className="about-service-code">01 &middot; TRAVEL</span>
                  <span className="about-service-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 20l6-12 4 7 3-4 5 9H3z" />
                    </svg>
                  </span>
                </div>
                <h3>01. Japan Tour &amp; Travel</h3>
                <p>
                  We provide travel solutions for customers who want to explore Japan, including private tours,
                  guided experiences, customized itineraries, and travel arrangements.
                </p>
              </article>

              <article className="about-service-card">
                <div className="about-service-top">
                  <span className="about-service-code">02 &middot; DOCUMENTATION</span>
                  <span className="about-service-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="4" y="2" width="16" height="20" rx="2" />
                      <line x1="8" y1="8" x2="16" y2="8" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                      <line x1="8" y1="16" x2="12" y2="16" />
                    </svg>
                  </span>
                </div>
                <h3>02. Visa &amp; Travel Assistance</h3>
                <p>
                  We assist customers with Japan visa application services, travel consultations, and other
                  essential travel arrangements to help make their journey more convenient.
                </p>
              </article>

              <article className="about-service-card">
                <div className="about-service-top">
                  <span className="about-service-code">03 &middot; MOBILITY</span>
                  <span className="about-service-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="4" y="3" width="16" height="14" rx="3" />
                      <path d="M4 11h16M8 17l-2 4M16 17l2 4" />
                    </svg>
                  </span>
                </div>
                <h3>03. Transportation &amp; Attraction Tickets</h3>
                <p>
                  We provide access to transportation and travel products, including JR Pass, vehicle and bus
                  rentals, attraction tickets, and other travel-related services in Japan.
                </p>
              </article>

              <article className="about-service-card">
                <div className="about-service-top">
                  <span className="about-service-code">04 &middot; EDUCATION</span>
                  <span className="about-service-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </span>
                </div>
                <h3>04. Japanese Language Education</h3>
                <p>
                  We support individuals interested in learning Japanese through language education services
                  and information about Japanese language and culture.
                </p>
              </article>

              <article className="about-service-card">
                <div className="about-service-top">
                  <span className="about-service-code">05 &middot; COMMERCE</span>
                  <span className="about-service-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </span>
                </div>
                <h3>05. Japan Shopping &amp; Personal Shopping</h3>
                <p>
                  We help customers access Japanese products through personal shopping assistance and
                  shopping-related services.
                </p>
              </article>

              <article className="about-service-card">
                <div className="about-service-top">
                  <span className="about-service-code">06 &middot; ESSENTIALS</span>
                  <span className="about-service-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                      <circle cx="12" cy="20" r="1" />
                    </svg>
                  </span>
                </div>
                <h3>06. Travel Essentials</h3>
                <p>
                  We provide additional travel necessities, including Pocket WiFi, document translation, and
                  other supporting services for a more convenient experience in Japan.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* 5. Why Choose Tanogaido? */}
        <section className="why-band" id="why-choose">
          <div className="page-container">
            <span className="eyebrow">TRUSTED PARTNER</span>
            <h2 className="section-heading-editorial" style={{ marginTop: 6 }}>
              Why Choose Tanogaido?
            </h2>
            <div className="why-grid">
              <article className="why-card">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <h3>Experience Since 2007</h3>
                <p>
                  With years of experience in Japan-related services, we continuously develop our expertise
                  to better understand customer needs.
                </p>
              </article>
              <article className="why-card">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
                <h3>Integrated Services</h3>
                <p>
                  From travel arrangements to education and essential services, we bring various Japan-related
                  solutions together under one company.
                </p>
              </article>
              <article className="why-card">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                </svg>
                <h3>Customer-Oriented Approach</h3>
                <p>
                  We believe every customer deserves solutions tailored to their individual needs,
                  preferences, and objectives.
                </p>
              </article>
              <article className="why-card">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <h3>Convenience &amp; Accessibility</h3>
                <p>
                  We aim to simplify access to various services in Japan through practical and accessible
                  solutions.
                </p>
              </article>
              <article className="why-card">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
                <h3>Commitment to Quality</h3>
                <p>
                  Professionalism, reliability, and customer satisfaction remain at the heart of everything we
                  do.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* 6. Our Commitment */}
        <section className="commitment-band" id="commitment">
          <div className="page-container">
            <div className="commitment-card">
              <div className="commitment-content">
                <span className="eyebrow">OUR COMMITMENT</span>
                <h2 className="commitment-title">More Than a Destination</h2>
                <div className="commitment-copy">
                  <p>
                    At Tanogaido, we believe Japan is more than just a travel destination. It is a place of
                    extraordinary experiences, cultural discoveries, knowledge, and opportunities.
                  </p>
                  <p>
                    We are committed to helping our customers connect with Japan through services that are
                    reliable, accessible, and continuously evolving.
                  </p>
                  <p>
                    By embracing innovation and expanding our service ecosystem, we strive to create
                    meaningful experiences and build lasting connections between Indonesia and Japan.
                  </p>
                </div>
                <p className="commitment-signoff">
                  Tanogaido &mdash; <span>Your Gateway to Japan.</span>
                </p>
              </div>
              <div className="commitment-cta-panel">
                <Link href="/shop" className="hero-cta-btn">
                  <span>Explore Japan Goods</span>
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
                </Link>
                <a
                  href={getWhatsAppUrl(
                    `Hello ${siteSettings.companyName}, I would like to discuss a Japan service.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: '#ffffff',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                  }}
                >
                  Direct WhatsApp Concierge &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Company Legal Information & Contact Us */}
        <section className="legal-contact-band" id="contact">
          <div className="page-container">
            <div className="lc-grid">
              <div className="lc-card">
                <span className="eyebrow">CORPORATE CREDENTIALS</span>
                <h2 className="lc-card-title">Company Legal Information</h2>
                <p className="lc-card-sub">
                  Registered Indonesian corporate entity operating with official licensing and national
                  compliance.
                </p>
                <div className="lc-list">
                  <div className="lc-row">
                    <span className="lc-label">Company Name</span>
                    <span className="lc-val">{siteSettings.companyName}</span>
                  </div>
                  <div className="lc-row">
                    <span className="lc-label">Business Identification Number (NIB)</span>
                    <span className="lc-val">{siteSettings.nibNumber}</span>
                  </div>
                  <div className="lc-row">
                    <span className="lc-label">Ministry of Law and Human Rights Decree</span>
                    <span className="lc-val">{siteSettings.ahuDecree}</span>
                  </div>
                  <div className="lc-row">
                    <span className="lc-label">Business Address</span>
                    <span className="lc-val">{siteSettings.address}</span>
                  </div>
                </div>
              </div>

              <div className="lc-card">
                <span className="eyebrow">CONTACT US</span>
                <h2 className="lc-card-title">Let&apos;s Connect with Japan</h2>
                <p className="lc-card-sub">
                  Whether you are planning a trip, looking for Japanese language education, or need assistance
                  with Japan-related services, our team is ready to help.
                </p>
                <div className="lc-list">
                  <div className="lc-row">
                    <span className="lc-label">Company</span>
                    <span className="lc-val">{siteSettings.companyName}</span>
                  </div>
                  <div className="lc-row">
                    <span className="lc-label">Website</span>
                    <span className="lc-val">
                      <a href="https://tanogaido.com" target="_blank" rel="noopener noreferrer">
                        https://tanogaido.com
                      </a>
                    </span>
                  </div>
                  <div className="lc-row">
                    <span className="lc-label">WhatsApp</span>
                    <span className="lc-val">
                      <a
                        href={`https://wa.me/${siteSettings.whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +62 813-1893-9319
                      </a>
                    </span>
                  </div>
                  <div className="lc-row">
                    <span className="lc-label">Email</span>
                    <span className="lc-val">
                      <a href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a>
                    </span>
                  </div>
                  <div className="lc-row">
                    <span className="lc-label">Office</span>
                    <span className="lc-val">Kelapa Gading, North Jakarta, Indonesia.</span>
                  </div>
                </div>
                <div className="lc-contact-footer">
                  <span className="lc-tagline">Tanogaido &mdash; Connecting Indonesia and Japan.</span>
                  <a
                    href={getWhatsAppUrl(
                      `Hello ${siteSettings.companyName}, I would like assistance with Japan services.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lc-wa-btn"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <NewsletterBand
          successText="Subscribed! Watch your inbox for curated Japan inspiration."
          source="about-newsletter"
        />

        <Footer />
      </main>
    </>
  );
}
