import React from 'react';
import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div>
            <h3 className="footer-brand-title">Tanogaido Japan Concierge</h3>
            <p className="footer-brand-desc">
              PT. Tanogaido Fantasi Pratama (Est. 2007). Providing exceptional, licensed private travel
              services, private transport, and curated Japanese lifestyle goods.
            </p>
            <div style={{ marginTop: 14, fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
              <p>NIB: 2003230101593</p>
              <p>Decree: AHU-0022369.AH.01.01.TAHUN 2023</p>
            </div>
          </div>

          {/* Travel Services */}
          <div>
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/services/japan-tour-guide">Private Tour Guide</Link>
              </li>
              <li>
                <Link href="/services/private-transport">VIP Vehicle Charter</Link>
              </li>
              <li>
                <Link href="/services/tokyo-disneyland-disneysea">Disney & Theme Parks</Link>
              </li>
              <li>
                <Link href="/services/traditional-ryokan-onsen">Onsen & Ryokan</Link>
              </li>
              <li>
                <Link href="/services/shinkansen-jr-pass">Bullet Train & JR Pass</Link>
              </li>
              <li>
                <Link href="/services">View All 20 Services &rarr;</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/services">All Services</Link>
              </li>
              <li>
                <Link href="/shop">Japanese Goods</Link>
              </li>
              <li>
                <Link href="/about">Corporate Profile</Link>
              </li>
              <li>
                <Link href="/admin">Payload CMS Login</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="footer-col-title">Tokyo & Jakarta Desk</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13.5, color: '#94a3b8' }}>
              <p>
                <strong>WhatsApp Concierge:</strong><br />
                <a
                  href="https://wa.me/6281318047974"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#ffffff', textDecoration: 'none' }}
                >
                  +62 813-1804-7974
                </a>
              </p>
              <p>
                <strong>Email:</strong><br />
                <a
                  href="mailto:halo@tanogaido.com"
                  style={{ color: '#ffffff', textDecoration: 'none' }}
                >
                  halo@tanogaido.com
                </a>
              </p>
              <p>
                <strong>Headquarters:</strong><br />
                Plaza Pasifik Blok A4 No. 79, Kelapa Gading, Jakarta Utara
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="footer-bottom-row">
          <div>
            &copy; {new Date().getFullYear()} PT. Tanogaido Fantasi Pratama. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Licensed Tour Operator</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
