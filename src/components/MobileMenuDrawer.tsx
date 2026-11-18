'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { X, ChevronDown, ShoppingBag } from 'lucide-react';
import { useShopBag } from '@/context/ShopBagContext';
import type { Service } from '@/types/cms';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
}

export function MobileMenuDrawer({ isOpen, onClose, services }: MobileMenuDrawerProps) {
  const pathname = usePathname();
  const { totalCount, openBag } = useShopBag();
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);

  // Close when pathname changes
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="mobile-menu-portal" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
      {/* Backdrop */}
      <div className="mobile-menu-backdrop" onClick={onClose} />

      {/* Full Sheet Content */}
      <div className="mobile-menu-card">
        {/* Header */}
        <div className="mobile-menu-header">
          <Link href="/" className="brand-logo" onClick={onClose}>
            <Image
              src="/assets/logotano.png"
              alt="Tanogaido Logo"
              width={32}
              height={32}
              className="brand-logo-img"
            />
            <span className="brand-logo-text">Tanogaido</span>
          </Link>
          <button
            type="button"
            className="mobile-close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Nav List */}
        <nav className="mobile-nav-list">
          <Link href="/" className="mobile-nav-link" onClick={onClose}>
            Home
          </Link>

          {/* Services Accordion: Pushes other items down smoothly without container clipping */}
          <div className={`mobile-services-group ${isServicesExpanded ? 'is-expanded' : ''}`}>
            <div className="mobile-services-row">
              <Link
                href="/services"
                className="mobile-nav-link mobile-services-main-link"
                onClick={onClose}
              >
                Services
              </Link>
              <button
                type="button"
                className="mobile-services-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  setIsServicesExpanded((prev) => !prev);
                }}
                aria-label="Toggle Services submenu"
                aria-expanded={isServicesExpanded}
              >
                <ChevronDown />
              </button>
            </div>

            {/* Smooth animated accordion list */}
            <div className="mobile-services-sublist">
              <div className="mobile-services-sublist-inner">
                <div className="mobile-services-scroll">
                  {services.map((svc) => (
                    <Link
                      key={svc.id}
                      href={`/services/${svc.slug}`}
                      onClick={onClose}
                    >
                      {svc.title}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    className="mobile-services-all-link"
                    onClick={onClose}
                  >
                    View All Services &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link href="/shop" className="mobile-nav-link" onClick={onClose}>
            Shop
          </Link>

          <Link href="/about" className="mobile-nav-link" onClick={onClose}>
            About
          </Link>
        </nav>

        {/* Footer Actions */}
        <div className="mobile-menu-footer">
          <button
            type="button"
            className="mobile-menu-bag-btn"
            onClick={() => {
              onClose();
              openBag();
            }}
          >
            <ShoppingBag size={20} />
            <span>Shopping Bag ({totalCount})</span>
          </button>

          <a
            href="https://wa.me/6281318047974?text=Hello%20Tanogaido,%20I%20would%20like%20to%20inquire%20about%20Japan%20travel%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-menu-cta-btn"
          >
            Book WhatsApp Consultation
          </a>
        </div>
      </div>
    </div>
  );
}
