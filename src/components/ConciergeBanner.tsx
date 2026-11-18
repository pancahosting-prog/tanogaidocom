import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

interface ConciergeBannerProps {
  title?: string;
  description?: string;
}

export function ConciergeBanner({
  title = 'Design Your Bespoke Japan Itinerary',
  description = 'Connect directly with our Tokyo-based licensed concierge team for customized private tours, VIP vehicle charters, onsen ryokan reservations, and event access.',
}: ConciergeBannerProps) {
  return (
    <section className="concierge-banner-band" aria-label="Concierge Consultation">
      <div className="concierge-banner-inner">
        <div className="concierge-banner-text">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flexShrink: 0 }}>
          <a
            href="https://wa.me/6281318047974?text=Hello%20Tanogaido,%20I%20would%20like%20to%20plan%20a%20custom%20Japan%20trip."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <span>Consult Concierge</span>
            <span className="btn-icon-bubble">
              <MessageCircle size={14} />
            </span>
          </a>

          <Link href="/services" className="btn-secondary">
            <span>Explore All 20 Services</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
