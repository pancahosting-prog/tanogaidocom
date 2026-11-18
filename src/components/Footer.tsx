'use client';

import React from 'react';
import Link from 'next/link';
import { getWhatsAppUrl, WA_NUMBER } from '@/data/fallback-data';

export function Footer({
  isHome = false,
  onScrollToProgress,
}: {
  isHome?: boolean;
  onScrollToProgress?: (prog: number, href?: string) => void;
}) {
  const waConciergeHref = getWhatsAppUrl(
    'Hello Tanogaido, I would like a free Japan trip consultation.'
  );

  function handleHomeJump(e: React.MouseEvent<HTMLAnchorElement>, prog: number, href: string) {
    if (isHome && onScrollToProgress) {
      e.preventDefault();
      onScrollToProgress(prog, href);
    }
  }

  return (
    <footer className="site-footer" id="site-footer">
      <div className="page-container">
        <div className="footer-grid">
          <div>
            {isHome ? (
              <a
                href="#"
                className="footer-brand brand-logo"
                onClick={(e) => handleHomeJump(e, 0, '#')}
              >
                tanogaido<span className="dot">.</span>
              </a>
            ) : (
              <Link href="/" className="footer-brand brand-logo">
                tanogaido<span className="dot">.</span>
              </Link>
            )}
            <p className="footer-tagline">
              {isHome
                ? 'Explore authentic Japan with curated private tours, licensed guides, transport, and logistics support.'
                : 'PT. Tanogaido Fantasi Pratama — Your Gateway to Japan since 2007.'}
            </p>
          </div>

          <div>
            <h3 className="footer-col-title">Explore</h3>
            <ul className="footer-links">
              {isHome ? (
                <>
                  <li>
                    <a
                      href="#services"
                      data-scroll-progress="0.26"
                      onClick={(e) => handleHomeJump(e, 0.26, '#services')}
                    >
                      Exclusive Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="#trips"
                      data-scroll-progress="0.62"
                      onClick={(e) => handleHomeJump(e, 0.62, '#trips')}
                    >
                      Featured Trips
                    </a>
                  </li>
                  <li>
                    <a
                      href="#styles"
                      data-scroll-progress="0.48"
                      onClick={(e) => handleHomeJump(e, 0.48, '#styles')}
                    >
                      Travel Your Way
                    </a>
                  </li>
                  <li>
                    <Link href="/shop">Japan Goods Shop</Link>
                  </li>
                  <li>
                    <Link href="/about">About Us</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/services">All 20 Services</Link>
                  </li>
                  <li>
                    <Link href="/#trips">Featured Trips</Link>
                  </li>
                  <li>
                    <Link href="/shop">Japan Goods Shop</Link>
                  </li>
                  <li>
                    <Link href="/about">About Us</Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className="footer-col-title">{isHome ? 'Services' : 'Popular Services'}</h3>
            <ul className="footer-links">
              <li>
                <Link href="/services/japan-tour-guide">Japan Tour Guide</Link>
              </li>
              <li>
                <Link href="/services/private-japan-tour">Private Japan Tour</Link>
              </li>
              <li>
                <Link href="/services/jr-pass-tickets">JR Pass Tickets</Link>
              </li>
              {isHome ? (
                <>
                  <li>
                    <Link href="/services/japan-visa-processing">Japan Visa Processing</Link>
                  </li>
                  <li>
                    <Link href="/services/pocket-wifi-rental">Pocket WiFi Rental</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/services/japan-golf-tour">Japan Golf Tour</Link>
                  </li>
                  <li>
                    <Link href="/services/car-bus-rental">Car &amp; Tour Bus Rental</Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className="footer-col-title">{isHome ? 'Support' : 'Visas & Essentials'}</h3>
            <ul className="footer-links">
              {isHome ? (
                <>
                  <li>
                    <Link href="/services">All 20 Services</Link>
                  </li>
                  <li>
                    <Link href="/services/japan-import-service">Cargo &amp; Import</Link>
                  </li>
                  <li>
                    <Link href="/services/document-translation">Document Translation</Link>
                  </li>
                  <li>
                    <Link href="/services/attraction-theme-park-tickets">Theme Park Tickets</Link>
                  </li>
                  <li>
                    <a href={waConciergeHref} target="_blank" rel="noopener noreferrer">
                      WhatsApp Concierge
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/services/japan-visa-processing">Japan Visa Processing</Link>
                  </li>
                  <li>
                    <Link href="/services/pocket-wifi-rental">Pocket WiFi Rental</Link>
                  </li>
                  <li>
                    <Link href="/services/japan-personal-shopper">Personal Shopper (Jastip)</Link>
                  </li>
                  <li>
                    <Link href="/services/japan-import-service">Japan Cargo Import</Link>
                  </li>
                  <li>
                    <Link href="/services/document-translation">Document Translation</Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className="footer-col-title">Follow Us</h3>
            <div className="footer-socials">
              <a
                href="https://instagram.com/tanogaido"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" />
                </svg>
              </a>
              <a
                href="https://facebook.com/tanogaido"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@tanogaido"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2026 PT. Tanogaido Fantasi Pratama. All rights reserved.</span>
          <div className="footer-legal">
            {isHome ? (
              <>
                <a
                  href="#services"
                  data-scroll-progress="0.26"
                  onClick={(e) => handleHomeJump(e, 0.26, '#services')}
                >
                  Services
                </a>
                <a
                  href="#trips"
                  data-scroll-progress="0.62"
                  onClick={(e) => handleHomeJump(e, 0.62, '#trips')}
                >
                  Itineraries
                </a>
                <Link href="/shop">Shop</Link>
                <Link href="/about">About Us</Link>
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Support
                </a>
              </>
            ) : (
              <>
                <Link href="/services">Our Services</Link>
                <Link href="/shop">Shop</Link>
                <Link href="/about">About Us</Link>
                <Link href="/about#contact">Contact</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
