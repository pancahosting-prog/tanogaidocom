'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, ShoppingBag, Menu, ArrowRight } from 'lucide-react';
import { useShopBag } from '@/context/ShopBagContext';
import { ServiceIcon } from '@/components/ServiceIcon';
import type { Service } from '@/types/cms';

interface SiteNavbarProps {
  services: Service[];
  onOpenMobileMenu: () => void;
}

export function SiteNavbar({ services, onOpenMobileMenu }: SiteNavbarProps) {
  const pathname = usePathname();
  const { totalCount, openBag } = useShopBag();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close services drawer on page route change
  useEffect(() => {
    setIsServicesOpen(false);
  }, [pathname]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 220); // 220ms grace period prevents flickering when moving cursor between trigger and drawer
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsServicesOpen((prev) => !prev);
  };

  return (
    <div
      className={`navbar-container unified ${isScrolled ? 'is-scrolled' : ''} ${
        isServicesOpen ? 'is-services-open' : ''
      }`}
      onMouseLeave={handleMouseLeave}
    >
      <header className="navbar">
        {/* Brand */}
        <div className="nav-brand-zone">
          <Link href="/" className="brand-logo" aria-label="Tanogaido Home">
            <span className="brand-logo-img-wrap">
              <Image
                src="/assets/logotano.png"
                alt="Tanogaido Logo"
                width={36}
                height={36}
                className="brand-logo-img"
                priority
              />
            </span>
            <span className="brand-logo-text">Tanogaido</span>
          </Link>
        </div>

        {/* Center Desktop Links */}
        <nav className="nav-center-zone" aria-label="Main Navigation">
          <ul className="nav-links">
            <li>
              <Link href="/" className={isHome ? 'active' : ''}>
                Home
              </Link>
            </li>
            <li
              className={`nav-item-has-dropdown ${isServicesOpen ? 'is-open' : ''}`}
              onMouseEnter={handleMouseEnter}
            >
              <button
                type="button"
                className={`nav-services-trigger ${pathname.startsWith('/services') ? 'active' : ''}`}
                onClick={handleTriggerClick}
                aria-expanded={isServicesOpen}
                aria-controls="nav-services-drawer"
              >
                <span>Services</span>
                <ChevronDown className="nav-services-chevron" />
              </button>
            </li>
            <li>
              <Link
                href="/shop"
                className={pathname.startsWith('/shop') || pathname.startsWith('/product') ? 'active' : ''}
              >
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className={pathname === '/about' ? 'active' : ''}>
                About
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          <button
            type="button"
            className="btn-bag-trigger"
            onClick={openBag}
            aria-label="View Shopping Bag"
          >
            <ShoppingBag size={20} />
            {totalCount > 0 && <span className="bag-badge-count">{totalCount}</span>}
          </button>

          <a
            href="https://wa.me/6281318047974?text=Hello%20Tanogaido,%20I%20would%20like%20to%20inquire%20about%20Japan%20travel%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-header-cta"
          >
            <span>Book Consultation</span>
          </a>

          <button
            type="button"
            className="btn-mobile-menu"
            onClick={onOpenMobileMenu}
            aria-label="Open mobile menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Desktop Full-Width Expanding Services Drawer */}
      <div
        id="nav-services-drawer"
        className="nav-services-drawer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="nav-services-drawer-body">
          <div className="nav-services-drawer-inner">
            <div className="nav-services-grid">
              {services.map((svc) => (
                <Link
                  key={svc.id}
                  href={`/services/${svc.slug || svc.id}`}
                  className="nav-svc-item"
                  onClick={() => setIsServicesOpen(false)}
                >
                  <span className="nav-svc-icon">
                    <ServiceIcon name={svc.icon || 'compass'} size={15} />
                  </span>
                  <span className="nav-svc-label">{svc.title}</span>
                </Link>
              ))}

              <Link
                href="/services"
                className="nav-svc-item nav-svc-item-all"
                onClick={() => setIsServicesOpen(false)}
              >
                <span className="nav-svc-icon">
                  <ArrowRight size={15} />
                </span>
                <span className="nav-svc-label">All Services &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
