'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ServiceItem } from '@/types/cms';
import { getWhatsAppUrl } from '@/data/fallback-data';
import { AllServicesIcon, ServiceIcon } from '@/components/ServiceIcons';

interface NavbarProps {
  services: ServiceItem[];
  isHome?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  mobileCtaLabel?: string;
  onHomeScrollLink?: (progress: number, href: string) => void;
  homeRefs?: {
    navbarContainerRef: React.RefObject<HTMLDivElement | null>;
    navbarRef: React.RefObject<HTMLElement | null>;
    headerBrandLogoRef: React.RefObject<HTMLAnchorElement | null>;
    headerLogoDotRef: React.RefObject<HTMLSpanElement | null>;
    navCenterZoneRef: React.RefObject<HTMLDivElement | null>;
    navActionsZoneRef: React.RefObject<HTMLDivElement | null>;
  };
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeInOutQuart = (t: number) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

const isNodeInside = (container: HTMLElement | null, target: EventTarget | null): boolean =>
  Boolean(container && typeof Node !== 'undefined' && target instanceof Node && container.contains(target));

export function Navbar({
  services,
  isHome = false,
  ctaLabel = 'Plan a Trip',
  ctaHref,
  mobileCtaLabel = 'Explore Now',
  onHomeScrollLink,
  homeRefs,
}: NavbarProps) {
  const pathname = usePathname();
  const internalNavbarContainerRef = useRef<HTMLDivElement | null>(null);
  const navbarContainerRef = homeRefs?.navbarContainerRef ?? internalNavbarContainerRef;
  const dropdownItemRef = useRef<HTMLLIElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mobile fluid drawer refs
  const mobileModalRef = useRef<HTMLDivElement | null>(null);
  const mobileSvgRef = useRef<SVGSVGElement | null>(null);
  const mobilePathRef = useRef<SVGPathElement | null>(null);
  const menuTargetRef = useRef(0);
  const menuRawRef = useRef(0);
  const lastMenuKeyRef = useRef('');
  const rafRef = useRef<number | null>(null);

  const resolvedCtaHref =
    ctaHref || getWhatsAppUrl('Hello Tanogaido, I would like to plan a Japan trip.');

  useEffect(() => {
    const updateTouch = () => {
      if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) {
        setIsTouchDevice(true);
      }
    };
    updateTouch();
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === 'touch' || e.pointerType === 'pen') {
        setIsTouchDevice(true);
      } else if (e.pointerType === 'mouse') {
        setIsTouchDevice(false);
      }
    };
    const onTouch = () => setIsTouchDevice(true);
    document.addEventListener('pointerdown', onPointer, { passive: true });
    document.addEventListener('touchstart', onTouch, { passive: true });
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('touchstart', onTouch);
    };
  }, []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsServicesOpen(false);
    };
    const onOutsidePointer = (e: PointerEvent) => {
      if (
        isNodeInside(dropdownItemRef.current, e.target) ||
        isNodeInside(drawerRef.current, e.target)
      ) {
        return;
      }
      setIsServicesOpen(false);
    };
    document.addEventListener('keydown', onEsc);
    document.addEventListener('pointerdown', onOutsidePointer);
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.removeEventListener('pointerdown', onOutsidePointer);
    };
  }, []);

  // Close drawers when pathname changes
  useEffect(() => {
    setIsServicesOpen(false);
    setMobileServicesExpanded(false);
    menuTargetRef.current = 0;
    if (menuRawRef.current > 0 && rafRef.current === null) {
      let lastTick = performance.now();
      const tick = (now: number) => {
        const dt = Math.min((now - lastTick) / 1000, 0.1);
        lastTick = now;
        menuRawRef.current = Math.max(0, menuRawRef.current - dt / 0.56);
        renderMobileFluid(menuRawRef.current);
        if (menuRawRef.current > 0) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          rafRef.current = null;
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [pathname]);

  function openDrawer() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsServicesOpen(true);
  }

  function scheduleClose() {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 220);
  }

  function renderMobileFluid(tRaw: number) {
    const modal = mobileModalRef.current;
    const svg = mobileSvgRef.current;
    const pathEl = mobilePathRef.current;
    if (!modal || !svg || !pathEl) return;

    const target = menuTargetRef.current;
    const isVisible = tRaw > 0.002;
    const isClosing = target === 0 && tRaw > 0.002;

    modal.classList.toggle('is-animating', isVisible);
    modal.classList.toggle('active', target === 1);
    modal.classList.toggle('is-closing', isClosing);
    modal.classList.toggle('content-visible', target === 1 && tRaw >= 0.78);

    if (!isVisible) {
      if (lastMenuKeyRef.current !== 'closed') {
        pathEl.setAttribute('d', 'M0 0 H0 V0 H0 Z');
        lastMenuKeyRef.current = 'closed';
      }
      return;
    }

    const svgT = target === 0 ? clamp(tRaw / 0.8, 0, 1) : tRaw;
    const w = window.innerWidth || 375;
    const h = window.innerHeight || 667;
    const key = `${w}x${h}:${svgT >= 0.999 ? 1 : svgT.toFixed(4)}`;
    if (key === lastMenuKeyRef.current) return;
    lastMenuKeyRef.current = key;

    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    if (svgT >= 0.999) {
      pathEl.setAttribute('d', `M -4 -4 H ${w + 4} V ${h + 4} H -4 Z`);
      return;
    }

    const pad = 8;
    const R = Math.max(pad, w - pad);
    const wingW = w <= 860 ? 136 : 220;
    const x2 = Math.max(pad, R - wingW);
    const yW = w <= 860 ? 56 : 72;

    const eW = easeInOutQuart(clamp(svgT / 0.88, 0, 1));
    const eH = easeInOutQuart(clamp(svgT / 0.84, 0, 1));
    const eC = easeInOutCubic(clamp((svgT - 0.12) / 0.88, 0, 1));

    const xTop = lerp(x2, -32, eW);
    const yRight = lerp(yW, h + 32, eH);
    const ctrlBottomX = lerp(x2 + 16, -64, eW);
    const ctrlLeftY = lerp(yW, h + 32, eC);

    const d =
      `M ${xTop.toFixed(1)} -4 ` +
      `H ${w + 4} ` +
      `V ${yRight.toFixed(1)} ` +
      `C ${ctrlBottomX.toFixed(1)} ${yRight.toFixed(1)}, ${xTop.toFixed(1)} ${ctrlLeftY.toFixed(1)}, ${xTop.toFixed(1)} -4 Z`;
    pathEl.setAttribute('d', d);
  }

  function startMenuLoop() {
    if (rafRef.current !== null) return;
    let lastTick = performance.now();
    const isReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tick = (now: number) => {
      const dt = Math.min((now - lastTick) / 1000, 0.1);
      lastTick = now;
      const target = menuTargetRef.current;

      if (isReduced) {
        menuRawRef.current = target;
      } else if (menuRawRef.current < target) {
        menuRawRef.current = Math.min(1, menuRawRef.current + dt / 0.62);
      } else if (menuRawRef.current > target) {
        menuRawRef.current = Math.max(0, menuRawRef.current - dt / 0.56);
      }

      renderMobileFluid(menuRawRef.current);

      if (menuRawRef.current !== target) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }

  function openMobileMenu() {
    menuTargetRef.current = 1;
    startMenuLoop();
  }

  function closeMobileMenu() {
    menuTargetRef.current = 0;
    startMenuLoop();
  }

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const isServicesActive = pathname?.startsWith('/services');
  const isBlogActive = pathname?.startsWith('/blog');
  const isShopActive = pathname?.startsWith('/shop') || pathname === '/product';
  const isAboutActive = pathname === '/about';

  return (
    <>
      <div
        ref={navbarContainerRef}
        className={`navbar-container ${isHome ? 'is-home-animated' : 'unified'} ${
          isServicesOpen ? 'is-services-open' : ''
        }`}
        id="navbar-container"
      >
        <nav
          ref={homeRefs?.navbarRef}
          className="navbar"
          id="main-navbar"
          aria-label="Primary Navigation"
        >
          <div className="nav-brand-zone">
            {isHome ? (
              <a
                ref={homeRefs?.headerBrandLogoRef}
                href="#"
                className="brand-logo"
                id="header-brand-logo"
                onClick={(e) => {
                  e.preventDefault();
                  onHomeScrollLink?.(0, '#');
                }}
              >
                tanogaido
                <span className="dot" ref={homeRefs?.headerLogoDotRef} id="header-logo-dot">
                  .
                </span>
              </a>
            ) : (
              <Link href="/" className="brand-logo">
                tanogaido<span className="dot">.</span>
              </Link>
            )}
          </div>

          <div
            ref={homeRefs?.navCenterZoneRef}
            className="nav-center-zone"
            id="nav-center-zone"
          >
            <ul className="nav-links">
              <li
                ref={dropdownItemRef}
                className={`nav-item-has-dropdown ${isServicesOpen ? 'is-open' : ''}`}
                onMouseEnter={() => {
                  if (!isTouchDevice) openDrawer();
                }}
                onMouseLeave={(e) => {
                  if (!isTouchDevice && !isNodeInside(drawerRef.current, e.relatedTarget)) {
                    scheduleClose();
                  }
                }}
                onFocus={() => {
                  if (!isTouchDevice) openDrawer();
                }}
              >
                <Link
                  href="/services"
                  className={`nav-services-trigger ${isServicesActive ? 'nav-active' : ''}`}
                  aria-current={isServicesActive ? 'page' : undefined}
                  aria-expanded={isServicesOpen}
                  onClick={(e) => {
                    if (isTouchDevice) {
                      e.preventDefault();
                      setIsServicesOpen((prev) => !prev);
                    } else {
                      setIsServicesOpen(false);
                    }
                  }}
                >
                  <span>Services</span>
                  <svg
                    className="nav-services-chevron"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </Link>
              </li>

              <li
                onMouseEnter={() => {
                  if (!isTouchDevice) scheduleClose();
                }}
              >
                {isHome ? (
                  <a
                    href="#destinations"
                    data-scroll-progress="0.26"
                    onClick={(e) => {
                      e.preventDefault();
                      onHomeScrollLink?.(0.26, '#destinations');
                    }}
                  >
                    Destinations
                  </a>
                ) : (
                  <Link href="/#destinations">Destinations</Link>
                )}
              </li>

              <li
                onMouseEnter={() => {
                  if (!isTouchDevice) scheduleClose();
                }}
              >
                {isHome ? (
                  <a
                    href="#passes"
                    data-scroll-progress="0.58"
                    onClick={(e) => {
                      e.preventDefault();
                      onHomeScrollLink?.(0.58, '#passes');
                    }}
                  >
                    JR Pass
                  </a>
                ) : (
                  <Link href="/#passes">JR Pass</Link>
                )}
              </li>

              <li
                onMouseEnter={() => {
                  if (!isTouchDevice) scheduleClose();
                }}
              >
                <Link
                  href="/blog"
                  className={isBlogActive ? 'nav-active' : undefined}
                  aria-current={isBlogActive ? 'page' : undefined}
                >
                  Blog
                </Link>
              </li>

              <li
                onMouseEnter={() => {
                  if (!isTouchDevice) scheduleClose();
                }}
              >
                <Link
                  href="/shop"
                  className={isShopActive ? 'nav-active' : undefined}
                  aria-current={isShopActive ? 'page' : undefined}
                >
                  Shop
                </Link>
              </li>

              <li
                onMouseEnter={() => {
                  if (!isTouchDevice) scheduleClose();
                }}
              >
                <Link
                  href="/about"
                  className={isAboutActive ? 'nav-active' : undefined}
                  aria-current={isAboutActive ? 'page' : undefined}
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div
            ref={homeRefs?.navActionsZoneRef}
            className="nav-actions"
            id="nav-actions-zone"
          >
            <div className="header-cta-group">
              {isHome ? (
                <>
                  <a
                    href="#tours"
                    data-scroll-progress="0.26"
                    className="btn-explore"
                    onClick={(e) => {
                      e.preventDefault();
                      onHomeScrollLink?.(0.26, '#tours');
                    }}
                  >
                    {ctaLabel}
                  </a>
                  <a
                    href="#tours"
                    data-scroll-progress="0.26"
                    className="btn-explore-circle"
                    aria-label="Explore Japan Tours"
                    onClick={(e) => {
                      e.preventDefault();
                      onHomeScrollLink?.(0.26, '#tours');
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7M17 7H8M17 7V16" />
                    </svg>
                  </a>
                </>
              ) : (
                <>
                  <a
                    href={resolvedCtaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-explore"
                  >
                    {ctaLabel}
                  </a>
                  <a
                    href={resolvedCtaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-explore-circle"
                    aria-label={ctaLabel}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7M17 7H8M17 7V16" />
                    </svg>
                  </a>
                </>
              )}
            </div>

            <button
              className="btn-mobile-menu"
              id="open-menu-btn"
              type="button"
              aria-label="Open Navigation Menu"
              onClick={openMobileMenu}
            >
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="2.5" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <span>Menu</span>
            </button>
          </div>
        </nav>

        {/* Full-Width Header-Attached Mega Drawer for Services */}
        <div
          ref={drawerRef}
          className="nav-services-drawer"
          onMouseEnter={() => {
            if (!isTouchDevice) openDrawer();
          }}
          onMouseLeave={(e) => {
            if (
              !isTouchDevice &&
              !isNodeInside(dropdownItemRef.current, e.relatedTarget)
            ) {
              scheduleClose();
            }
          }}
        >
          <div className="nav-services-drawer-body">
            <div className="nav-services-drawer-inner">
              <div className="nav-services-grid">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="nav-svc-item"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    <span className="nav-svc-icon" aria-hidden="true">
                      <ServiceIcon slug={s.slug} />
                    </span>
                    <span className="nav-svc-label">{s.title}</span>
                  </Link>
                ))}
                <Link
                  href="/services"
                  className="nav-svc-item nav-svc-item-all"
                  onClick={() => setIsServicesOpen(false)}
                >
                  <span className="nav-svc-icon" aria-hidden="true">
                    <AllServicesIcon />
                  </span>
                  <span className="nav-svc-label">All Services &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fluid Mobile Drawer Menu */}
      <div
        ref={mobileModalRef}
        className="mobile-menu-overlay"
        id="mobile-menu-modal"
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest('[data-mobile-services-toggle]')) return;
          if (
            target === mobileModalRef.current ||
            target.closest('.mobile-nav-list a, .mobile-menu-footer a')
          ) {
            closeMobileMenu();
          }
        }}
      >
        <svg
          ref={mobileSvgRef}
          className="mobile-menu-fluid-svg"
          id="mobile-menu-fluid-svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path ref={mobilePathRef} id="mobile-menu-fluid-path" d="M0 0 H0 V0 H0 Z" fill="#ffffff" />
        </svg>

        <div className="mobile-menu-card">
          <div className="mobile-menu-header">
            {isHome ? (
              <a
                href="#"
                className="brand-logo mobile-nav-item"
                onClick={(e) => {
                  e.preventDefault();
                  closeMobileMenu();
                  onHomeScrollLink?.(0, '#');
                }}
              >
                tanogaido<span className="dot">.</span>
              </a>
            ) : (
              <Link href="/" className="brand-logo mobile-nav-item">
                tanogaido<span className="dot">.</span>
              </Link>
            )}
            <button
              className="btn-close-menu"
              id="close-menu-btn"
              type="button"
              aria-label="Close menu"
              onClick={closeMobileMenu}
            >
              <span>Close</span>
              <span style={{ fontSize: 16, lineHeight: 1 }}>&times;</span>
            </button>
          </div>

          <ul className="mobile-nav-list">
            <li>
              <div
                className={`mobile-services-group mobile-nav-item ${
                  mobileServicesExpanded ? 'is-expanded' : ''
                }`}
              >
                <div className="mobile-services-row">
                  <Link href="/services" className={isServicesActive ? 'nav-active' : undefined}>
                    Services
                  </Link>
                  <button
                    type="button"
                    className="mobile-services-toggle"
                    data-mobile-services-toggle
                    aria-expanded={mobileServicesExpanded}
                    aria-label="Toggle services list"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setMobileServicesExpanded((prev) => !prev);
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </div>
                <div className="mobile-services-sublist">
                  <div className="mobile-services-sublist-inner">
                    <div className="mobile-services-scroll">
                      {services.map((s) => (
                        <Link key={s.slug} href={`/services/${s.slug}`}>
                          {s.title}
                        </Link>
                      ))}
                      <Link href="/services" className="mobile-services-all-link">
                        All Services &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li>
              {isHome ? (
                <a
                  href="#destinations"
                  className="mobile-nav-item"
                  data-scroll-progress="0.26"
                  onClick={(e) => {
                    e.preventDefault();
                    closeMobileMenu();
                    onHomeScrollLink?.(0.26, '#destinations');
                  }}
                >
                  Destinations
                </a>
              ) : (
                <Link href="/#destinations" className="mobile-nav-item">
                  Destinations
                </Link>
              )}
            </li>

            <li>
              {isHome ? (
                <a
                  href="#passes"
                  className="mobile-nav-item"
                  data-scroll-progress="0.58"
                  onClick={(e) => {
                    e.preventDefault();
                    closeMobileMenu();
                    onHomeScrollLink?.(0.58, '#passes');
                  }}
                >
                  JR Pass
                </a>
              ) : (
                <Link href="/#passes" className="mobile-nav-item">
                  JR Pass
                </Link>
              )}
            </li>

            <li>
              <Link href="/blog" className={`mobile-nav-item ${isBlogActive ? 'nav-active' : ''}`}>
                Blog
              </Link>
            </li>

            <li>
              <Link href="/shop" className={`mobile-nav-item ${isShopActive ? 'nav-active' : ''}`}>
                Shop
              </Link>
            </li>

            <li>
              <Link href="/about" className={`mobile-nav-item ${isAboutActive ? 'nav-active' : ''}`}>
                About
              </Link>
            </li>
          </ul>

          <div className="mobile-menu-footer">
            {isHome ? (
              <a
                href="#explore"
                className="hero-cta-btn mobile-nav-item"
                data-scroll-progress="0.26"
                style={{ width: '100%', justifyContent: 'space-between' }}
                onClick={(e) => {
                  e.preventDefault();
                  closeMobileMenu();
                  onHomeScrollLink?.(0.26, '#explore');
                }}
              >
                <span>{mobileCtaLabel}</span>
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
            ) : (
              <a
                href={resolvedCtaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-btn mobile-nav-item"
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                <span>{mobileCtaLabel}</span>
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
            )}
            <p style={{ fontSize: '11.5px', color: '#64748b', textAlign: 'center' }}>
              Trusted Japan private travel concierge &middot; 24/7 bilingual support
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
