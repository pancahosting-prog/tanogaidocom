'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import type {
  ProductItem,
  ServiceItem,
  SiteSettingsData,
  TestimonialItem,
  TripItem,
} from '@/types/cms';
import { HOME_CATEGORIES, getWhatsAppUrl } from '@/data/fallback-data';
import { useBag } from '@/components/BagProvider';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { NewsletterBand } from '@/components/NewsletterBand';
import { Footer } from '@/components/Footer';

interface HomeExperienceProps {
  services: ServiceItem[];
  products: ProductItem[];
  trips: TripItem[];
  testimonials: TestimonialItem[];
  siteSettings: SiteSettingsData;
}

const TRAVEL_STYLES = [
  {
    label: 'Relax & Onsen',
    waText: 'Hello Tanogaido, I am interested in a Relax & Onsen Japan trip.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c4-4 6-7.5 6-11a6 6 0 1 0-12 0c0 3.5 2 7 6 11z" />
        <circle cx="12" cy="11" r="2.2" />
      </svg>
    ),
  },
  {
    label: 'Mt. Fuji Adventure',
    waText: 'Hello Tanogaido, I am interested in a Mt. Fuji Adventure.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 20l6-12 4 7 3-4 5 9H3z" />
      </svg>
    ),
  },
  {
    label: 'Family Travel',
    waText: 'Hello Tanogaido, I would like to plan a Family Travel trip to Japan.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: 'Honeymoon & Prewed',
    waText: 'Hello Tanogaido, I would like to plan a Honeymoon & Prewedding in Japan.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    label: 'Cultural Shrines',
    waText: 'Hello Tanogaido, I am interested in Cultural Experiences in Kyoto.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M6 10h12M8 6v14m8-14v14M3 6l1-2h16l1 2" />
      </svg>
    ),
  },
  {
    label: 'Food & Matcha',
    waText: 'Hello Tanogaido, I would like Culinary & Matcha tours in Japan.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    label: 'Theme Parks',
    waText: 'Hello Tanogaido, I want to visit Japan Theme Parks.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12l2.5 2.5L16 9" />
      </svg>
    ),
  },
  {
    label: 'Solo & Rail',
    waText: 'Hello Tanogaido, I am planning a Solo Rail trip with JR Pass.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="4" width="12" height="16" rx="2" />
        <line x1="9" y1="9" x2="15" y2="9" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="12" y2="17" />
      </svg>
    ),
  },
];

const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function HomeExperience({
  services,
  products,
  trips,
  testimonials,
  siteSettings,
}: HomeExperienceProps) {
  const { bagCount, openBag } = useBag();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [flippedSlug, setFlippedSlug] = useState<string | null>(null);
  const [savedCards, setSavedCards] = useState<Record<string, boolean>>({});
  const [activeReviewPage, setActiveReviewPage] = useState(0);

  // Refs for curtain / scroll animation engine
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const viewportOverlayRef = useRef<HTMLDivElement | null>(null);
  const architecturalFrameSvgRef = useRef<SVGSVGElement | null>(null);
  const architecturalFramePathRef = useRef<SVGPathElement | null>(null);
  const introLogoRef = useRef<HTMLDivElement | null>(null);

  const navbarContainerRef = useRef<HTMLDivElement | null>(null);
  const navbarRef = useRef<HTMLElement | null>(null);
  const headerBrandLogoRef = useRef<HTMLAnchorElement | null>(null);
  const headerLogoDotRef = useRef<HTMLSpanElement | null>(null);
  const navCenterZoneRef = useRef<HTMLDivElement | null>(null);
  const navActionsZoneRef = useRef<HTMLDivElement | null>(null);

  const heroViewRef = useRef<HTMLElement | null>(null);
  const heroEyebrowRef = useRef<HTMLDivElement | null>(null);
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
  const heroDescRef = useRef<HTMLParagraphElement | null>(null);
  const heroCtaRef = useRef<HTMLAnchorElement | null>(null);

  const whiteContentStageRef = useRef<HTMLDivElement | null>(null);
  const whiteScrollTrackRef = useRef<HTMLDivElement | null>(null);
  const categoryBarBandRef = useRef<HTMLDivElement | null>(null);
  const servicesHeaderRef = useRef<HTMLElement | null>(null);
  const postServicesWrapRef = useRef<HTMLDivElement | null>(null);
  const scrollHintRef = useRef<HTMLDivElement | null>(null);

  // Shared imperative engine controls exposed to React handlers
  const scrollToProgressRef = useRef<(prog: number, href?: string) => void>(() => {});
  const syncBudgetRef = useRef<() => void>(() => {});
  const mobileMetricsRef = useRef({
    riseEnd: 0.2,
    headerEnd: 0.255,
    catFullH: 52,
    catCompactH: 40,
    hdrFullH: 96,
    hdrCompactH: 34,
    reserveH: 148,
  });

  const homeFlipServices = useMemo(
    () =>
      services
        .filter((s) => s.showOnHome)
        .sort((a, b) => a.homeSortOrder - b.homeSortOrder)
        .slice(0, 12),
    [services]
  );

  const featuredProducts = useMemo(
    () => products.filter((p) => p.featured).slice(0, 4),
    [products]
  );

  const reviewPages = useMemo(() => {
    const pages: TestimonialItem[][] = [];
    for (let i = 0; i < testimonials.length; i += 3) {
      pages.push(testimonials.slice(i, i + 3));
    }
    return pages.length ? pages : [testimonials];
  }, [testimonials]);

  const currentReviews = reviewPages[activeReviewPage % reviewPages.length] || [];

  const handleScrollLink = useCallback((prog: number, href?: string) => {
    scrollToProgressRef.current(prog, href);
  }, []);

  // Re-sync scroll budget after category change
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      syncBudgetRef.current();
    });
    return () => cancelAnimationFrame(id);
  }, [activeCategory]);

  // Close flipped card when clicking outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest('.service-flip-card')) {
        setFlippedSlug(null);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  // Core Curtain / Video / Logo Flight / Mobile Sticky Scroll Engine
  useEffect(() => {
    document.body.classList.add('is-home-page');
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let mobileStylesApplied = false;

    let splashState: 'closed' | 'opening' | 'open' = 'closed';
    let splashRaw = 0;
    let splashTarget = 0;
    let autoLockUntil = 0;
    let scrollTween: {
      startY: number;
      targetY: number;
      startTime: number;
      duration: number;
    } | null = null;

    let targetProgress = 0;
    let smoothedProgress = 0;
    let lastTime = performance.now();
    let isCoverVideoActive = true;
    let logoTargetMetrics = { x: 100, y: 43 };
    let headerDotMetrics = { x: 145, y: 43 };
    let lastFramePathState = '';
    let rafId = 0;

    function getViewportSize() {
      const svg = architecturalFrameSvgRef.current;
      if (svg) {
        const r = svg.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          return { w: Math.round(r.width), h: Math.round(r.height) };
        }
      }
      return {
        w: window.innerWidth || document.documentElement.clientWidth || 1280,
        h: window.innerHeight || document.documentElement.clientHeight || 720,
      };
    }

    function getMaxScroll() {
      const doc = document.documentElement;
      const body = document.body;
      const { h } = getViewportSize();
      const scrollHeight = Math.max(
        doc.scrollHeight,
        body.scrollHeight,
        doc.offsetHeight,
        body.offsetHeight
      );
      return Math.max(0, scrollHeight - h);
    }

    function ensureHeroVideoPlayback() {
      const heroVideo = heroVideoRef.current;
      if (!heroVideo || !isCoverVideoActive) return;
      heroVideo.muted = true;
      heroVideo.defaultMuted = true;
      heroVideo.loop = true;
      heroVideo.playsInline = true;
      if (heroVideo.paused) {
        const playPromise = heroVideo.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {});
        }
      }
    }

    function clearMobileInlineStyles() {
      if (!mobileStylesApplied) return;
      mobileStylesApplied = false;

      const whiteScrollTrack = whiteScrollTrackRef.current;
      const categoryBarBand = categoryBarBandRef.current;
      const servicesHeaderEl = servicesHeaderRef.current;
      const servicesSubtitleEl = servicesHeaderEl?.querySelector('.section-subtitle') as HTMLElement | null;

      if (whiteScrollTrack) {
        whiteScrollTrack.style.paddingTop = '';
        whiteScrollTrack.style.background = '';
      }
      if (categoryBarBand) {
        categoryBarBand.classList.remove('is-mobile-pinned', 'is-mobile-compact');
        categoryBarBand.style.position = '';
        categoryBarBand.style.top = '';
        categoryBarBand.style.left = '';
        categoryBarBand.style.width = '';
        categoryBarBand.style.zIndex = '';
        categoryBarBand.style.transform = '';
        categoryBarBand.style.opacity = '';
      }
      if (servicesHeaderEl) {
        servicesHeaderEl.classList.remove('is-mobile-compact');
        servicesHeaderEl.style.position = '';
        servicesHeaderEl.style.top = '';
        servicesHeaderEl.style.left = '';
        servicesHeaderEl.style.width = '';
        servicesHeaderEl.style.zIndex = '';
        servicesHeaderEl.style.transform = '';
        servicesHeaderEl.style.opacity = '';
      }
      if (servicesSubtitleEl) {
        servicesSubtitleEl.style.opacity = '';
        servicesSubtitleEl.style.maxHeight = '';
        servicesSubtitleEl.style.marginTop = '';
      }
    }

    function measureLogoTarget() {
      const headerBrandLogo = headerBrandLogoRef.current;
      const headerLogoDot = headerLogoDotRef.current;
      if (!headerBrandLogo) return;
      const rect = headerBrandLogo.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        logoTargetMetrics = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      }
      if (headerLogoDot) {
        const dotRect = headerLogoDot.getBoundingClientRect();
        if (dotRect.width > 0 && dotRect.height > 0) {
          headerDotMetrics = {
            x: dotRect.left + dotRect.width / 2,
            y: dotRect.top + dotRect.height / 2,
          };
        }
      }
    }

    function startScrollTween(targetY: number, durationMs: number) {
      const startY = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (durationMs <= 0 || isReducedMotion) {
        window.scrollTo(0, targetY);
        scrollTween = null;
        return;
      }
      scrollTween = {
        startY,
        targetY,
        startTime: performance.now(),
        duration: durationMs,
      };
    }

    function openSplash(options: { settleAtTop?: boolean } = {}) {
      const settleAtTop = options.settleAtTop !== false;
      ensureHeroVideoPlayback();
      if (splashState !== 'closed') return;
      const now = performance.now();
      splashTarget = 1;
      splashState = 'opening';
      autoLockUntil = now + (settleAtTop ? 750 : 250);

      if (isReducedMotion) {
        splashRaw = 1;
        splashState = 'open';
      }

      if (settleAtTop) {
        startScrollTween(0, 520);
      }
    }

    function scrollToProgress(targetProg: number, href = '') {
      const { w, h } = getViewportSize();
      const whiteScrollTrack = whiteScrollTrackRef.current;
      const mm = mobileMetricsRef.current;
      let resolvedProg = targetProg;

      if (w <= 860 && whiteScrollTrack && href) {
        const trackHeight = whiteScrollTrack.offsetHeight || h;
        const maxTrackTravel = Math.max(1, 60 + trackHeight - h);
        const targetEl =
          href === '#styles'
            ? document.getElementById('travel-styles-band')
            : href === '#trips'
              ? document.getElementById('featured-trips-band')
              : href === '#reviews'
                ? document.getElementById('reviews-band')
                : null;
        if (targetEl) {
          const pinnedH = mm.catCompactH + mm.hdrCompactH;
          const offsetInTrack = Math.max(0, targetEl.offsetTop - pinnedH);
          const tTrack = clamp(offsetInTrack / maxTrackTravel, 0, 1);
          resolvedProg = mm.riseEnd + tTrack * (1 - mm.riseEnd);
        } else if (
          href === '#services' ||
          href === '#destinations' ||
          href === '#tours' ||
          href === '#guides' ||
          href === '#explore'
        ) {
          resolvedProg = mm.headerEnd;
        }
      }

      const maxScroll = getMaxScroll();
      if (maxScroll <= 0) return;

      if (splashState === 'closed') {
        openSplash({ settleAtTop: false });
      }
      scrollTween = null;
      window.scrollTo({
        top: resolvedProg * maxScroll,
        behavior: isReducedMotion ? 'auto' : 'smooth',
      });
    }

    scrollToProgressRef.current = scrollToProgress;

    function getScrollProgress() {
      const doc = document.documentElement;
      const body = document.body;
      const scrollTop =
        window.pageYOffset !== undefined ? window.pageYOffset : doc.scrollTop || body.scrollTop || 0;
      const maxScroll = getMaxScroll();
      if (maxScroll <= 0) return 0;
      return clamp(scrollTop / maxScroll, 0, 1);
    }

    function buildUnifiedFramePath(
      w: number,
      h: number,
      tWindow: number,
      dotX: number,
      dotY: number,
      tCurtainRise: number
    ) {
      const isMobile = w <= 860;
      const isTablet = w <= 1024;
      const pad = isMobile ? 8 : 14;
      const targetR = isMobile ? 18 : 24;
      const targetWingH = isMobile ? 48 : 58;
      const targetWingL = isMobile ? 136 : isTablet ? 180 : clamp(0.21 * w, 190, 260);
      const targetWingR = isMobile ? 136 : isTablet ? 196 : clamp(0.21 * w, 205, 256);

      const L_target = pad;
      const R_target = Math.max(pad, w - pad);
      const T_target = pad;
      const B_target = Math.max(pad, h - pad);
      const targetW = Math.max(0, R_target - L_target);

      const outer = `M -4 -4 H ${w + 4} V ${h + 4} H -4 Z`;

      if (tWindow <= 0.002 || tCurtainRise >= 0.999) {
        return { path: outer, bottomY: tWindow <= 0.002 ? h : T_target };
      }

      const ox = clamp(dotX, L_target, R_target);
      const oy = clamp(dotY, T_target, B_target);
      const seedR = 115 * easeOutCubic(clamp(tWindow / 0.36, 0, 1));
      const eBox = easeInOutCubic(tWindow);

      const L = Math.max(L_target, lerp(ox - seedR, L_target, eBox));
      const R = Math.min(R_target, lerp(ox + seedR, R_target, eBox));
      const T = Math.max(T_target, lerp(oy - seedR, T_target, eBox));
      const B_open = Math.min(B_target, lerp(oy + seedR, B_target, eBox));
      const B = lerp(B_open, T, tCurtainRise);

      const curW = R - L;
      const curH = B - T;

      if (curW <= 3 || curH <= 2) {
        return { path: outer, bottomY: B };
      }

      const radiusBlend = easeInOutCubic(clamp(tWindow / 0.55, 0, 1));
      const rCircle = Math.min(curW / 2, curH / 2);
      const rOuterBase = lerp(rCircle, targetR, radiusBlend);

      const wRatio = targetW > 0 ? curW / targetW : 1;
      const wingEase = easeInOutCubic(clamp((tWindow - 0.3) / 0.65, 0, 1));
      const wL = targetWingL * wRatio;
      const wR = targetWingR * wRatio;
      const wH = targetWingH * wingEase;
      const yW = T + wH;
      const notchSpan = curW - wL - wR;
      const x1 = L + wL;
      const x2 = R - wR;

      if (wH <= 2.5 || notchSpan <= 8) {
        const rSimple = Math.max(0, Math.min(rOuterBase, curW / 2.02, curH / 2.02));
        if (rSimple <= 0.5) {
          return {
            path: `${outer} M ${L.toFixed(1)} ${T.toFixed(1)} H ${R.toFixed(1)} V ${B.toFixed(1)} H ${L.toFixed(1)} Z`,
            bottomY: B,
          };
        }
        return {
          path:
            `${outer} ` +
            `M ${(L + rSimple).toFixed(1)} ${T.toFixed(1)} ` +
            `H ${(R - rSimple).toFixed(1)} ` +
            `A ${rSimple.toFixed(1)} ${rSimple.toFixed(1)} 0 0 1 ${R.toFixed(1)} ${(T + rSimple).toFixed(1)} ` +
            `V ${(B - rSimple).toFixed(1)} ` +
            `A ${rSimple.toFixed(1)} ${rSimple.toFixed(1)} 0 0 1 ${(R - rSimple).toFixed(1)} ${B.toFixed(1)} ` +
            `H ${(L + rSimple).toFixed(1)} ` +
            `A ${rSimple.toFixed(1)} ${rSimple.toFixed(1)} 0 0 1 ${L.toFixed(1)} ${(B - rSimple).toFixed(1)} ` +
            `V ${(T + rSimple).toFixed(1)} ` +
            `A ${rSimple.toFixed(1)} ${rSimple.toFixed(1)} 0 0 1 ${(L + rSimple).toFixed(1)} ${T.toFixed(1)} Z`,
          bottomY: B,
        };
      }

      const bodyH = B - yW;
      if (bodyH <= 2) {
        const notchH = Math.max(0, B - T);
        const rN = Math.max(0, Math.min(targetR, notchSpan / 2.05, notchH / 2.05));
        if (rN <= 0.5) {
          return {
            path: `${outer} M ${x1.toFixed(1)} ${T.toFixed(1)} H ${x2.toFixed(1)} V ${B.toFixed(1)} H ${x1.toFixed(1)} Z`,
            bottomY: B,
          };
        }
        return {
          path:
            `${outer} ` +
            `M ${(x1 + rN).toFixed(1)} ${T.toFixed(1)} ` +
            `H ${(x2 - rN).toFixed(1)} ` +
            `A ${rN.toFixed(1)} ${rN.toFixed(1)} 0 0 1 ${x2.toFixed(1)} ${(T + rN).toFixed(1)} ` +
            `V ${(B - rN).toFixed(1)} ` +
            `A ${rN.toFixed(1)} ${rN.toFixed(1)} 0 0 1 ${(x2 - rN).toFixed(1)} ${B.toFixed(1)} ` +
            `H ${(x1 + rN).toFixed(1)} ` +
            `A ${rN.toFixed(1)} ${rN.toFixed(1)} 0 0 1 ${x1.toFixed(1)} ${(B - rN).toFixed(1)} ` +
            `V ${(T + rN).toFixed(1)} ` +
            `A ${rN.toFixed(1)} ${rN.toFixed(1)} 0 0 1 ${(x1 + rN).toFixed(1)} ${T.toFixed(1)} Z`,
          bottomY: B,
        };
      }

      const rOuter = Math.max(0, Math.min(rOuterBase, curW / 2.05, bodyH / 2.05));
      const rTopMax = Math.max(0, Math.min(targetR, wL / 2.05, wR / 2.05, notchSpan / 2.05, wH / 2.05));
      const rConcaveMax = Math.max(0, Math.min(rTopMax, bodyH * 0.65, wL * 0.94 - rOuter, wR * 0.94 - rOuter));
      const rTop = Math.min(rTopMax, Math.max(0, wH - rConcaveMax - 0.5));

      return {
        path:
          `${outer} ` +
          `M ${(x1 + rTop).toFixed(1)} ${T.toFixed(1)} ` +
          `L ${(x2 - rTop).toFixed(1)} ${T.toFixed(1)} ` +
          `A ${rTop.toFixed(1)} ${rTop.toFixed(1)} 0 0 1 ${x2.toFixed(1)} ${(T + rTop).toFixed(1)} ` +
          `L ${x2.toFixed(1)} ${(yW - rConcaveMax).toFixed(1)} ` +
          `A ${rConcaveMax.toFixed(1)} ${rConcaveMax.toFixed(1)} 0 0 0 ${(x2 + rConcaveMax).toFixed(1)} ${yW.toFixed(1)} ` +
          `L ${(R - rOuter).toFixed(1)} ${yW.toFixed(1)} ` +
          `A ${rOuter.toFixed(1)} ${rOuter.toFixed(1)} 0 0 1 ${R.toFixed(1)} ${(yW + rOuter).toFixed(1)} ` +
          `L ${R.toFixed(1)} ${(B - rOuter).toFixed(1)} ` +
          `A ${rOuter.toFixed(1)} ${rOuter.toFixed(1)} 0 0 1 ${(R - rOuter).toFixed(1)} ${B.toFixed(1)} ` +
          `L ${(L + rOuter).toFixed(1)} ${B.toFixed(1)} ` +
          `A ${rOuter.toFixed(1)} ${rOuter.toFixed(1)} 0 0 1 ${L.toFixed(1)} ${(B - rOuter).toFixed(1)} ` +
          `L ${L.toFixed(1)} ${(yW + rOuter).toFixed(1)} ` +
          `A ${rOuter.toFixed(1)} ${rOuter.toFixed(1)} 0 0 1 ${(L + rOuter).toFixed(1)} ${yW.toFixed(1)} ` +
          `L ${(x1 - rConcaveMax).toFixed(1)} ${yW.toFixed(1)} ` +
          `A ${rConcaveMax.toFixed(1)} ${rConcaveMax.toFixed(1)} 0 0 0 ${x1.toFixed(1)} ${(yW - rConcaveMax).toFixed(1)} ` +
          `L ${x1.toFixed(1)} ${(T + rTop).toFixed(1)} ` +
          `A ${rTop.toFixed(1)} ${rTop.toFixed(1)} 0 0 1 ${(x1 + rTop).toFixed(1)} ${T.toFixed(1)} Z`,
        bottomY: B,
      };
    }

    function updateUIProgress(progress: number, sRaw: number) {
      const { w, h } = getViewportSize();
      const isMobile = w <= 860;
      const pad = isMobile ? 8 : 14;
      const mm = mobileMetricsRef.current;

      const tLogo = easeInOutCubic(clamp(sRaw / 0.36, 0, 1));
      const tWindow = clamp((sRaw - 0.2) / 0.8, 0, 1);

      const HERO_RISE_START = 0.03;
      const HERO_RISE_END = isMobile ? mm.riseEnd : 0.25;
      const tCurtainRise =
        sRaw >= 0.99 ? clamp((progress - HERO_RISE_START) / (HERO_RISE_END - HERO_RISE_START), 0, 1) : 0;

      let currentBottomY = h - pad;
      const architecturalFrameSvg = architecturalFrameSvgRef.current;
      const architecturalFramePath = architecturalFramePathRef.current;
      if (architecturalFrameSvg && architecturalFramePath) {
        const stateKey = `${w}x${h}:${tWindow >= 1 ? 1 : tWindow.toFixed(4)}:${tCurtainRise.toFixed(4)}:${Math.round(
          headerDotMetrics.x
        )},${Math.round(headerDotMetrics.y)}`;
        if (stateKey !== lastFramePathState) {
          architecturalFrameSvg.setAttribute('viewBox', `0 0 ${w} ${h}`);
          const geo = buildUnifiedFramePath(
            w,
            h,
            tWindow,
            headerDotMetrics.x,
            headerDotMetrics.y,
            tCurtainRise
          );
          architecturalFramePath.setAttribute('d', geo.path);
          currentBottomY = geo.bottomY;
          lastFramePathState = stateKey;
        } else {
          currentBottomY = tWindow <= 0.002 ? h : lerp(h - pad, pad, tCurtainRise);
        }
      }

      const risePx = Math.max(0, h - pad - currentBottomY);

      const coverActive = tCurtainRise < 0.995;
      const heroVideo = heroVideoRef.current;
      if (heroVideo) {
        isCoverVideoActive = coverActive;
        heroVideo.style.display = coverActive ? 'block' : 'none';
        heroVideo.style.transform = coverActive
          ? `translate3d(0, ${(-risePx * 0.08).toFixed(1)}px, 0) scale(1.06)`
          : 'none';
        if (coverActive) {
          if (heroVideo.paused) ensureHeroVideoPlayback();
        } else if (!heroVideo.paused) {
          heroVideo.pause();
        }
      }
      if (viewportOverlayRef.current) {
        viewportOverlayRef.current.style.display = coverActive ? 'block' : 'none';
      }

      const introLogo = introLogoRef.current;
      const headerBrandLogo = headerBrandLogoRef.current;
      if (introLogo && headerBrandLogo) {
        if (sRaw < 0.37) {
          const startX = w / 2;
          const startY = h / 2;
          const startScale = isMobile ? 1.65 : 2.25;
          const curX = lerp(startX, logoTargetMetrics.x, tLogo);
          const curY = lerp(startY, logoTargetMetrics.y, tLogo);
          const curScale = lerp(startScale, 1, tLogo);

          introLogo.style.display = 'inline-flex';
          introLogo.style.opacity = '1';
          introLogo.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%) scale(${curScale})`;
          headerBrandLogo.style.opacity = '0';
          headerBrandLogo.style.pointerEvents = 'none';
        } else {
          introLogo.style.display = 'none';
          headerBrandLogo.style.opacity = '1';
          headerBrandLogo.style.pointerEvents = 'auto';
        }
      }

      const navReveal = easeOutCubic(clamp((tWindow - 0.52) / 0.48, 0, 1));
      if (navCenterZoneRef.current) {
        navCenterZoneRef.current.style.opacity = String(navReveal);
        navCenterZoneRef.current.style.transform = `translateY(${((1 - navReveal) * -10).toFixed(2)}px)`;
        navCenterZoneRef.current.style.pointerEvents = navReveal > 0.7 ? 'auto' : 'none';
      }
      if (navActionsZoneRef.current) {
        navActionsZoneRef.current.style.opacity = String(navReveal);
        navActionsZoneRef.current.style.transform = `translateY(${((1 - navReveal) * -10).toFixed(2)}px)`;
        navActionsZoneRef.current.style.pointerEvents = navReveal > 0.7 ? 'auto' : 'none';
      }

      if (navbarContainerRef.current) {
        navbarContainerRef.current.classList.toggle('unified', tCurtainRise >= 0.96);
      }

      if (navbarRef.current) {
        navbarRef.current.classList.toggle('scrolled', progress > 0.035 && sRaw > 0.9);
      }

      const getHeroEnterProgress = (val: number, start: number, end: number) =>
        easeOutCubic(clamp((val - start) / (end - start), 0, 1));

      const enterEyebrow = getHeroEnterProgress(tWindow, 0.35, 0.8);
      const enterTitle = getHeroEnterProgress(tWindow, 0.42, 0.86);
      const enterDesc = getHeroEnterProgress(tWindow, 0.5, 0.92);
      const enterCta = getHeroEnterProgress(tWindow, 0.58, 0.98);
      const coverFadeOut = clamp(1 - Math.max(0, tCurtainRise - 0.14) / 0.44, 0, 1);

      if (heroViewRef.current) {
        const showCover = coverActive && tWindow >= 0.25 && coverFadeOut > 0.005;
        heroViewRef.current.style.display = showCover ? 'flex' : 'none';
        heroViewRef.current.style.transform = `translate3d(0, ${(-risePx * 0.24).toFixed(1)}px, 0)`;
        heroViewRef.current.style.pointerEvents = enterCta * coverFadeOut > 0.25 ? 'auto' : 'none';
      }

      if (heroEyebrowRef.current) {
        heroEyebrowRef.current.style.opacity = String(enterEyebrow * coverFadeOut);
        heroEyebrowRef.current.style.transform = `translateY(${((1 - enterEyebrow) * 16).toFixed(1)}px)`;
      }

      if (heroTitleRef.current) {
        heroTitleRef.current.style.opacity = String(enterTitle * coverFadeOut);
        heroTitleRef.current.style.transform = `translateY(${((1 - enterTitle) * 20).toFixed(1)}px)`;
      }

      if (heroDescRef.current) {
        heroDescRef.current.style.opacity = String(enterDesc * coverFadeOut);
        heroDescRef.current.style.transform = `translateY(${((1 - enterDesc) * 20).toFixed(1)}px)`;
      }

      if (heroCtaRef.current) {
        const ctaOp = enterCta * coverFadeOut;
        heroCtaRef.current.style.opacity = String(ctaOp);
        heroCtaRef.current.style.transform = `translateY(${((1 - enterCta) * 20).toFixed(1)}px)`;
        heroCtaRef.current.style.pointerEvents = ctaOp > 0.35 ? 'auto' : 'none';
      }

      const whiteContentStage = whiteContentStageRef.current;
      if (whiteContentStage) {
        if (tCurtainRise <= 0.002) {
          whiteContentStage.style.visibility = 'hidden';
          whiteContentStage.style.clipPath = 'inset(100% 0 0 0)';
          whiteContentStage.style.pointerEvents = 'none';
        } else if (tCurtainRise < 0.995) {
          whiteContentStage.style.visibility = 'visible';
          whiteContentStage.style.clipPath = `inset(${Math.max(0, Math.round(currentBottomY))}px 0 0 0)`;
          whiteContentStage.style.pointerEvents = tCurtainRise >= 0.75 ? 'auto' : 'none';
        } else {
          whiteContentStage.style.visibility = 'visible';
          whiteContentStage.style.clipPath = isMobile ? 'inset(60px 0 0 0)' : 'none';
          whiteContentStage.style.pointerEvents = 'auto';
        }
      }

      const whiteScrollTrack = whiteScrollTrackRef.current;
      const categoryBarBand = categoryBarBandRef.current;
      const servicesHeaderEl = servicesHeaderRef.current;
      const postServicesWrap = postServicesWrapRef.current;
      const servicesSubtitleEl = servicesHeaderEl?.querySelector('.section-subtitle') as HTMLElement | null;

      if (whiteScrollTrack) {
        const enterGlobal = easeOutCubic(clamp(tCurtainRise / 0.22, 0, 1));
        const revealSpan = Math.max(100, Math.min(180, h * 0.22));
        const headerSafeTop = isMobile ? 60 : 72;

        if (!isMobile) {
          clearMobileInlineStyles();
        } else {
          mobileStylesApplied = true;
          whiteScrollTrack.style.paddingTop = `${mm.reserveH}px`;
          whiteScrollTrack.style.background = '#ffffff';
        }

        const trackHeight = whiteScrollTrack.offsetHeight || h;
        const maxTrackTravel = Math.max(0, headerSafeTop + trackHeight - h);

        let trackY = headerSafeTop;
        if (progress < HERO_RISE_END) {
          trackY = Math.max(headerSafeTop, currentBottomY);
        } else {
          const tTrackScroll = clamp((progress - HERO_RISE_END) / (1.0 - HERO_RISE_END), 0, 1);
          trackY = headerSafeTop - tTrackScroll * maxTrackTravel;
        }

        whiteScrollTrack.style.transform = `translate3d(0, ${trackY.toFixed(1)}px, 0)`;

        if (isMobile) {
          const riseEnd = mm.riseEnd;
          const headerEnd = mm.headerEnd;
          const compactSpan = Math.max(0.01, headerEnd - riseEnd);

          const tCompact = clamp((progress - riseEnd) / compactSpan, 0, 1);
          const tSubFade = easeOutCubic(
            clamp((progress - (riseEnd - 0.005)) / (compactSpan * 0.88), 0, 1)
          );
          const isPinned = currentBottomY <= headerSafeTop + 2 || progress >= riseEnd;
          const isCompact = tCompact >= 0.22;

          categoryBarBand?.classList.toggle('is-mobile-compact', isCompact);
          servicesHeaderEl?.classList.toggle('is-mobile-compact', isCompact);

          if (servicesSubtitleEl) {
            servicesSubtitleEl.style.opacity = String(1 - tSubFade);
            servicesSubtitleEl.style.maxHeight = `${(60 * (1 - tSubFade)).toFixed(1)}px`;
            servicesSubtitleEl.style.marginTop = `${(4 * (1 - tSubFade)).toFixed(1)}px`;
          }

          const catLiveH = categoryBarBand
            ? categoryBarBand.offsetHeight || (isCompact ? mm.catCompactH : mm.catFullH)
            : mm.catCompactH;
          const hdrLiveH = servicesHeaderEl
            ? servicesHeaderEl.offsetHeight || (isCompact ? mm.hdrCompactH : mm.hdrFullH)
            : mm.hdrCompactH;

          const servicesBottomInTrack = postServicesWrap ? postServicesWrap.offsetTop : trackHeight;
          const servicesBottomScreenY = servicesBottomInTrack + trackY;
          const pinnedBlockH = catLiveH + hdrLiveH;
          const releaseShiftY = Math.max(0, headerSafeTop + pinnedBlockH - servicesBottomScreenY);

          const baseCatY = Math.max(headerSafeTop, currentBottomY);
          const desiredCatY = baseCatY - releaseShiftY;
          const desiredHdrY = desiredCatY + catLiveH;
          const localCatY = desiredCatY - trackY;
          const localHdrY = desiredHdrY - trackY;

          if (categoryBarBand) {
            categoryBarBand.classList.toggle('is-mobile-pinned', isPinned && releaseShiftY < 2);
            categoryBarBand.style.position = 'absolute';
            categoryBarBand.style.top = '0px';
            categoryBarBand.style.left = '0px';
            categoryBarBand.style.width = '100%';
            categoryBarBand.style.zIndex = '65';
            categoryBarBand.style.opacity = String(enterGlobal);
            categoryBarBand.style.transform = `translate3d(0, ${localCatY.toFixed(1)}px, 0)`;
          }

          if (servicesHeaderEl) {
            servicesHeaderEl.style.position = 'absolute';
            servicesHeaderEl.style.top = '0px';
            servicesHeaderEl.style.left = '0px';
            servicesHeaderEl.style.width = '100%';
            servicesHeaderEl.style.zIndex = '62';
            servicesHeaderEl.style.opacity = String(enterGlobal);
            servicesHeaderEl.style.transform = `translate3d(0, ${localHdrY.toFixed(1)}px, 0)`;
          }
        }

        const revealItems = whiteScrollTrack.querySelectorAll('.reveal-item');
        for (let i = 0; i < revealItems.length; i++) {
          const item = revealItems[i] as HTMLElement;
          if (isMobile && item === servicesHeaderEl) continue;
          if (item.classList.contains('is-hidden-cat')) continue;
          const stagger = parseFloat(item.getAttribute('data-stagger') || '0');
          let itemTop = 0;
          let cur: HTMLElement | null = item;
          while (cur && cur !== whiteScrollTrack) {
            itemTop += cur.offsetTop || 0;
            cur = cur.offsetParent as HTMLElement | null;
          }
          const screenTop = itemTop + trackY;
          const rawReveal = clamp((h * 0.98 - screenTop) / revealSpan, 0, 1);
          const staggerShift = stagger * 0.04;
          const staggeredReveal = clamp((rawReveal - staggerShift) / (1 - staggerShift), 0, 1);
          const easedReveal = easeOutCubic(staggeredReveal) * enterGlobal;

          item.style.opacity = String(easedReveal);
          item.style.transform = `translate3d(0, ${((1 - easedReveal) * 18).toFixed(1)}px, 0)`;
        }
      }

      if (scrollHintRef.current) {
        const hintAlpha = clamp(1 - sRaw * 3.2, 0, 1);
        scrollHintRef.current.style.opacity = String(0.85 * hintAlpha);
        scrollHintRef.current.style.pointerEvents = hintAlpha > 0.2 ? 'auto' : 'none';
      }
    }

    function syncScrollBudget() {
      const whiteScrollTrack = whiteScrollTrackRef.current;
      const categoryBarBand = categoryBarBandRef.current;
      const servicesHeaderEl = servicesHeaderRef.current;
      if (!whiteScrollTrack) return;

      const { h } = getViewportSize();
      const { w } = getViewportSize();
      const isMobile = w <= 860;
      const mm = mobileMetricsRef.current;

      if (!isMobile) {
        clearMobileInlineStyles();
        const headerSafeTop = 72;
        const trackHeight = whiteScrollTrack.offsetHeight || h;
        const maxTrackTravel = Math.max(0, headerSafeTop + trackHeight - h);
        const trackScrollSpan = 0.75;
        const scrollBudget = Math.max(Math.round(h * 1.6), Math.round(maxTrackTravel / trackScrollSpan));
        document.body.style.minHeight = '0px';
        document.body.style.height = `${h + scrollBudget}px`;
        return;
      }

      const headerSafeTop = 60;
      const servicesSubtitleEl = servicesHeaderEl?.querySelector('.section-subtitle') as HTMLElement | null;
      if (categoryBarBand && servicesHeaderEl) {
        const prevCatCompact = categoryBarBand.classList.contains('is-mobile-compact');
        const prevHdrCompact = servicesHeaderEl.classList.contains('is-mobile-compact');
        const prevSubMax = servicesSubtitleEl ? servicesSubtitleEl.style.maxHeight : '';
        const prevSubMargin = servicesSubtitleEl ? servicesSubtitleEl.style.marginTop : '';

        categoryBarBand.classList.remove('is-mobile-compact');
        servicesHeaderEl.classList.remove('is-mobile-compact');
        if (servicesSubtitleEl) {
          servicesSubtitleEl.style.maxHeight = '60px';
          servicesSubtitleEl.style.marginTop = '4px';
        }
        mm.catFullH = categoryBarBand.offsetHeight || 52;
        mm.hdrFullH = servicesHeaderEl.offsetHeight || 96;

        categoryBarBand.classList.add('is-mobile-compact');
        servicesHeaderEl.classList.add('is-mobile-compact');
        if (servicesSubtitleEl) {
          servicesSubtitleEl.style.maxHeight = '0px';
          servicesSubtitleEl.style.marginTop = '0px';
        }
        mm.catCompactH = categoryBarBand.offsetHeight || 40;
        mm.hdrCompactH = servicesHeaderEl.offsetHeight || 34;

        categoryBarBand.classList.toggle('is-mobile-compact', prevCatCompact);
        servicesHeaderEl.classList.toggle('is-mobile-compact', prevHdrCompact);
        if (servicesSubtitleEl) {
          servicesSubtitleEl.style.maxHeight = prevSubMax;
          servicesSubtitleEl.style.marginTop = prevSubMargin;
        }
      }

      mm.riseEnd = 0.2;
      mm.headerEnd = 0.255;
      mm.reserveH = mm.catFullH + mm.hdrFullH;
      whiteScrollTrack.style.paddingTop = `${mm.reserveH}px`;

      const trackHeight = whiteScrollTrack.offsetHeight || h;
      const maxTrackTravel = Math.max(0, headerSafeTop + trackHeight - h);
      const trackScrollSpan = 1 - mm.riseEnd;
      const scrollBudget = Math.max(Math.round(h * 1.8), Math.round(maxTrackTravel / trackScrollSpan));

      document.body.style.minHeight = '0px';
      document.body.style.height = `${h + scrollBudget}px`;
    }

    syncBudgetRef.current = syncScrollBudget;

    function handleScrollTrigger() {
      const now = performance.now();
      const maxScroll = getMaxScroll();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      const prog = maxScroll > 0 ? clamp(scrollTop / maxScroll, 0, 1) : 0;

      if (scrollTween) {
        targetProgress = prog;
        return;
      }
      if (now < autoLockUntil) return;
      if (splashState === 'closed' && scrollTop > 4) {
        openSplash({ settleAtTop: true });
      }
      targetProgress = prog;
    }

    const onWheel = (e: WheelEvent) => {
      ensureHeroVideoPlayback();
      if (splashState === 'closed' && e.deltaY > 4) {
        openSplash({ settleAtTop: true });
      }
    };

    let touchStartY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      ensureHeroVideoPlayback();
      if (splashState === 'closed' && e.touches?.length === 1) {
        touchStartY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (splashState !== 'closed' || touchStartY === null || e.touches?.length !== 1) return;
      const dy = touchStartY - e.touches[0].clientY;
      if (dy > 8) {
        touchStartY = null;
        openSplash({ settleAtTop: true });
      }
    };
    const onTouchEnd = () => {
      touchStartY = null;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      ensureHeroVideoPlayback();
      if (splashState === 'closed' && (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ')) {
        e.preventDefault();
        openSplash({ settleAtTop: true });
        return;
      }
      const step = getViewportSize().h * 0.4;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        window.scrollBy({ top: step, behavior: 'smooth' });
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        window.scrollBy({ top: -step, behavior: 'smooth' });
      }
    };

    const onResize = () => {
      syncScrollBudget();
      measureLogoTarget();
      lastFramePathState = '';
      targetProgress = getScrollProgress();
      updateUIProgress(smoothedProgress, splashRaw);
    };

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (scrollTween) {
        const elapsed = now - scrollTween.startTime;
        const u = clamp(elapsed / scrollTween.duration, 0, 1);
        const eased = easeInOutCubic(u);
        const nextY = lerp(scrollTween.startY, scrollTween.targetY, eased);
        window.scrollTo(0, nextY);
        targetProgress = getScrollProgress();
        if (u >= 1) scrollTween = null;
      } else {
        targetProgress = getScrollProgress();
      }

      if (isReducedMotion) {
        splashRaw = splashTarget;
        splashState = splashTarget === 1 ? 'open' : 'closed';
      } else if (splashRaw < splashTarget) {
        splashRaw = Math.min(splashTarget, splashRaw + dt / 1.05);
        if (splashRaw >= 1) {
          splashRaw = 1;
          splashState = 'open';
        }
      } else if (splashRaw > splashTarget) {
        splashRaw = Math.max(splashTarget, splashRaw - dt / 0.85);
        if (splashRaw <= 0) {
          splashRaw = 0;
          splashState = 'closed';
        }
      }

      if (isReducedMotion) {
        smoothedProgress = targetProgress;
      } else {
        const progressFactor = 1 - Math.exp(-10 * dt);
        smoothedProgress += (targetProgress - smoothedProgress) * progressFactor;
        if (Math.abs(targetProgress - smoothedProgress) < 0.0001) {
          smoothedProgress = targetProgress;
        }
      }

      updateUIProgress(smoothedProgress, splashRaw);
      rafId = requestAnimationFrame(animate);
    };

    const heroVideoEl = heroVideoRef.current;
    heroVideoEl?.addEventListener('canplay', ensureHeroVideoPlayback);
    heroVideoEl?.addEventListener('loadeddata', ensureHeroVideoPlayback);

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('scroll', handleScrollTrigger, { passive: true });
    document.addEventListener('scroll', handleScrollTrigger, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    window.visualViewport?.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    const scrollHintEl = scrollHintRef.current;
    const onScrollHintClick = () => openSplash({ settleAtTop: true });
    scrollHintEl?.addEventListener('click', onScrollHintClick);

    const HASH_PROGRESS: Record<string, number> = {
      '#destinations': 0.26,
      '#tours': 0.26,
      '#services': 0.26,
      '#guides': 0.26,
      '#styles': 0.44,
      '#passes': 0.58,
      '#trips': 0.62,
      '#featured-products-band': 0.72,
      '#reviews': 0.84,
    };

    syncScrollBudget();
    measureLogoTarget();
    ensureHeroVideoPlayback();

    const initialHash = window.location.hash;
    if (initialHash && HASH_PROGRESS[initialHash] !== undefined) {
      const maxScroll = getMaxScroll();
      const prog = HASH_PROGRESS[initialHash];
      splashState = 'open';
      splashRaw = 1;
      splashTarget = 1;
      targetProgress = prog;
      smoothedProgress = prog;
      window.scrollTo(0, prog * maxScroll);
    } else {
      window.scrollTo(0, 0);
      targetProgress = 0;
      smoothedProgress = 0;
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        syncScrollBudget();
        measureLogoTarget();
        lastFramePathState = '';
        updateUIProgress(smoothedProgress, splashRaw);
      });
    }

    updateUIProgress(smoothedProgress, splashRaw);
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.classList.remove('is-home-page');
      document.body.style.height = '';
      document.body.style.minHeight = '';
      heroVideoEl?.removeEventListener('canplay', ensureHeroVideoPlayback);
      heroVideoEl?.removeEventListener('loadeddata', ensureHeroVideoPlayback);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('scroll', handleScrollTrigger);
      document.removeEventListener('scroll', handleScrollTrigger);
      window.removeEventListener('resize', onResize);
      window.visualViewport?.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeyDown);
      scrollHintEl?.removeEventListener('click', onScrollHintClick);
    };
  }, []);

  function toggleBookmark(key: string, e: React.MouseEvent) {
    e.stopPropagation();
    setSavedCards((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <>
      {/* Fixed Autoplay Hero Background Video */}
      <video
        ref={heroVideoRef}
        id="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/fuji-climb.jpg"
        aria-hidden="true"
      >
        <source src={siteSettings.heroVideoUrl} type="video/mp4" />
      </video>
      <div ref={viewportOverlayRef} className="viewport-overlay" />

      {/* Unified Architectural White Curtain & Animated Header Bezel SVG */}
      <svg
        ref={architecturalFrameSvgRef}
        className="architectural-frame-svg"
        id="architectural-frame-svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={architecturalFramePathRef}
          id="architectural-frame-path"
          fillRule="evenodd"
          fill="#ffffff"
          d="M0 0 H100 V100 H0 Z"
        />
      </svg>

      {/* Flying Intro Brand Mark */}
      <div ref={introLogoRef} className="intro-logo-flight" id="intro-logo" aria-hidden="true">
        {siteSettings.brandName}
        <span className="dot">.</span>
      </div>

      {/* Fixed Top Navigation & Mega Drawer */}
      <Navbar
        services={services}
        isHome
        onHomeScrollLink={handleScrollLink}
        homeRefs={{
          navbarContainerRef,
          navbarRef,
          headerBrandLogoRef,
          headerLogoDotRef,
          navCenterZoneRef,
          navActionsZoneRef,
        }}
      />

      {/* Fixed Hero Cover Stage */}
      <div className="fixed-ui-stage" id="cover-stage">
        <div className="content-constraint">
          <section ref={heroViewRef} className="hero-content" id="hero-view">
            <div ref={heroEyebrowRef} className="eyebrow-row" id="hero-eyebrow">
              <span className="eyebrow">{siteSettings.heroEyebrow}</span>
              <span className="eyebrow-line" aria-hidden="true" />
            </div>
            <h1 ref={heroTitleRef} className="hero-title" id="hero-title">
              {siteSettings.heroTitleLead}
              <br />
              <span className="line-red">{siteSettings.heroTitleAccent}</span>
            </h1>
            <p ref={heroDescRef} className="hero-desc" id="hero-desc">
              {siteSettings.heroDescription}
            </p>
            <a
              ref={heroCtaRef}
              href="#explore"
              className="hero-cta-btn"
              id="hero-cta"
              data-scroll-progress="0.26"
              onClick={(e) => {
                e.preventDefault();
                handleScrollLink(0.26, '#explore');
              }}
            >
              <span>Explore Now</span>
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
          </section>
        </div>
      </div>

      {/* White Content Stage */}
      <div ref={whiteContentStageRef} className="white-content-stage" id="white-content-stage">
        <div ref={whiteScrollTrackRef} className="white-scroll-track" id="white-scroll-track">
          {/* 0. Top Category Strip */}
          <div ref={categoryBarBandRef} className="category-bar-band" id="category-bar-band">
            <div className="page-container">
              <div className="category-strip" role="tablist" aria-label="Service Categories">
                {HOME_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      className={`category-tab ${isActive ? 'active' : ''}`}
                      type="button"
                      data-cat={cat.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setFlippedSlug(null);
                      }}
                    >
                      {cat.id === 'all' && (
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M3.6 9h16.8M3.6 15h16.8" />
                          <path d="M12 3a14.5 14.5 0 0 1 0 18M12 3a14.5 14.5 0 0 0 0 18" />
                        </svg>
                      )}
                      {cat.id === 'tours' && (
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 20l6-12 4 7 3-4 5 9H3z" />
                        </svg>
                      )}
                      {cat.id === 'transport' && (
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="4" y="3" width="16" height="14" rx="3" />
                          <path d="M4 11h16M8 17l-2 4M16 17l2 4" />
                          <circle cx="8.5" cy="14" r="1" />
                          <circle cx="15.5" cy="14" r="1" />
                        </svg>
                      )}
                      {cat.id === 'visa-wifi' && (
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                          <circle cx="12" cy="20" r="1" />
                        </svg>
                      )}
                      {cat.id === 'parks' && (
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 9a3 3 0 0 1 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 1 0-6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
                          <line x1="9" y1="4" x2="9" y2="20" />
                        </svg>
                      )}
                      {cat.id === 'shopping' && (
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                          <line x1="3" y1="6" x2="21" y2="6" />
                          <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                      )}
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 1. Exclusive Services (6 Cards Per Row) */}
          <section className="services-band" id="services-stage">
            <div className="page-container">
              <header ref={servicesHeaderRef} className="section-header-row reveal-item" id="services-top-header">
                <div>
                  <h2 className="section-heading-editorial">Exclusive Services</h2>
                  <p className="section-subtitle">
                    Find every Japan travel essential right here — curated tours, transport, passes, and concierge care.
                  </p>
                </div>
                <Link href="/services" className="section-link-cta">
                  View All Services <span>&rarr;</span>
                </Link>
              </header>

              <div className="services-grid" id="services-grid">
                {homeFlipServices.map((svc, idx) => {
                  const cat = svc.homeCategory || 'tours';
                  const visible = activeCategory === 'all' || cat === activeCategory;
                  const title = svc.homeCardTitle || svc.title;
                  const tag = svc.homeCardTag || svc.kicker;
                  const kicker = svc.homeCardKicker || svc.kicker;
                  const shortText = svc.homeCardShort || svc.shortDesc;
                  const thumbImg = svc.homeCardImage || svc.imagePath;
                  const backSub = svc.homeCardSubtitle || svc.shortDesc;
                  const backBullets = svc.homeCardFeatures || svc.features;
                  const isFlipped = flippedSlug === svc.slug;
                  const isSaved = Boolean(savedCards[svc.slug]);

                  return (
                    <article
                      key={svc.slug}
                      className={`service-flip-card reveal-item ${visible ? '' : 'is-hidden-cat'} ${
                        isFlipped ? 'is-flipped' : ''
                      }`}
                      data-category={cat}
                      data-stagger={idx % 6}
                      tabIndex={0}
                      onClick={(e) => {
                        const target = e.target as HTMLElement;
                        if (target.closest('a, .card-bookmark-btn, .flip-back-close, .svc-arrow-btn')) {
                          return;
                        }
                        if (!window.matchMedia('(hover: hover)').matches) {
                          setFlippedSlug((prev) => (prev === svc.slug ? null : svc.slug));
                        }
                      }}
                    >
                      <div className="service-flip-inner">
                        <div className="service-flip-face service-flip-front">
                          <div
                            className="mobile-card-spine"
                            role="button"
                            tabIndex={0}
                            aria-label={`Open ${title}`}
                          >
                            <span className="mobile-spine-title">{title}</span>
                            <span className="mobile-spine-tag">{tag}</span>
                          </div>
                          <div className="svc-thumb-wrap">
                            <img className="svc-thumb" src={thumbImg} alt={title} loading="lazy" />
                            <button
                              className={`card-bookmark-btn ${isSaved ? 'saved' : ''}`}
                              type="button"
                              aria-label={`Save ${title}`}
                              onClick={(e) => toggleBookmark(svc.slug, e)}
                            >
                              <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                              </svg>
                            </button>
                          </div>
                          <div className="svc-card-body">
                            <div>
                              <span className="svc-kicker">{kicker}</span>
                              <div className="svc-title-row">
                                <h3 className="svc-title">{title}</h3>
                                <button
                                  className="svc-arrow-btn"
                                  type="button"
                                  aria-label={`Flip ${title} details`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setFlippedSlug((prev) => (prev === svc.slug ? null : svc.slug));
                                  }}
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                  </svg>
                                </button>
                              </div>
                              <p className="svc-short">{shortText}</p>
                            </div>
                          </div>
                        </div>

                        <div className="service-flip-face service-flip-back">
                          <div>
                            <div className="flip-back-kicker-row">
                              <span className="flip-back-kicker">Service Details</span>
                              <button
                                className="flip-back-close"
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFlippedSlug(null);
                                }}
                              >
                                Close
                              </button>
                            </div>
                            <h4 className="flip-back-title">{title}</h4>
                            <p className="flip-back-sub">{backSub}</p>
                          </div>
                          <ul className="back-detail-list">
                            {backBullets.slice(0, 3).map((b) => (
                              <li key={b}>
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                          <Link href={`/services/${svc.slug}`} className="wa-flip-cta">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                            <span>Service Details</span>
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <div ref={postServicesWrapRef} className="post-services-wrap" id="post-services-wrap">
            {/* 2. Travel Your Way */}
            <section className="styles-band reveal-item" id="travel-styles-band">
              <div className="page-container">
                <h2 className="section-heading-editorial">Travel Your Way</h2>
                <p className="section-subtitle">
                  Find experiences tailored to match your ideal Japan travel pace and style.
                </p>
                <div className="styles-grid">
                  {TRAVEL_STYLES.map((style) => (
                    <a
                      key={style.label}
                      href={getWhatsAppUrl(style.waText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="style-tile"
                    >
                      {style.icon}
                      <span>{style.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </section>

            {/* 3. Featured Trips */}
            <section className="trips-band" id="featured-trips-band">
              <div className="page-container">
                <div className="section-header-row reveal-item">
                  <div>
                    <h2 className="section-heading-editorial">Featured Trips</h2>
                    <p className="section-subtitle">
                      Handpicked seasonal itineraries crafted for unforgettable journeys across Japan.
                    </p>
                  </div>
                  <a
                    href={getWhatsAppUrl(
                      'Hello Tanogaido, please send me your complete Featured Japan Trips catalog.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="section-link-cta"
                  >
                    View All Trips <span>&rarr;</span>
                  </a>
                </div>

                <div className="trips-grid">
                  {trips.map((trip, idx) => (
                    <article
                      key={trip.slug}
                      className="trip-card reveal-item"
                      data-stagger={idx}
                    >
                      <div className="trip-img-wrap">
                        <img src={trip.imagePath} alt={trip.title} loading="lazy" />
                        <button
                          className={`card-bookmark-btn ${savedCards[trip.slug] ? 'saved' : ''}`}
                          type="button"
                          aria-label={`Save ${trip.title}`}
                          onClick={(e) => toggleBookmark(trip.slug, e)}
                        >
                          <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </button>
                        <span className="trip-days-pill">{trip.daysLabel}</span>
                      </div>
                      <div className="trip-body">
                        <h3 className="trip-title">{trip.title}</h3>
                        <p className="trip-desc">{trip.shortDesc}</p>
                        <div className="trip-footer">
                          <div className="trip-meta-list">
                            <span className="trip-meta-item">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                              </svg>
                              {trip.locationLabel}
                            </span>
                            <span className="trip-meta-item">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                              </svg>
                              {trip.daysLabel}
                            </span>
                            <span className="trip-meta-item">
                              From <strong>{trip.priceFrom}</strong>
                            </span>
                          </div>
                          <a
                            href={getWhatsAppUrl(trip.waText)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="trip-go-btn"
                            aria-label={`Book ${trip.title}`}
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* 3.5 Featured Products */}
            <section className="products-featured-band reveal-item" id="featured-products-band">
              <div className="page-container">
                <div className="section-header-row">
                  <div>
                    <h2 className="section-heading-editorial">Featured Products</h2>
                    <p className="section-subtitle">
                      Authentic tea craft, ceramics, and Japan travel gear sourced directly by our local concierge team.
                    </p>
                  </div>
                  <div className="shop-header-actions">
                    <button
                      type="button"
                      className="bag-trigger-btn"
                      aria-label="Open Shopping Bag"
                      onClick={openBag}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                      <span>
                        Bag (<span data-bag-count>{bagCount}</span>)
                      </span>
                    </button>
                    <Link href="/shop" className="section-link-cta">
                      View All Shop <span>&rarr;</span>
                    </Link>
                  </div>
                </div>

                <div className="products-grid" id="featured-products-grid">
                  {featuredProducts.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                  ))}
                </div>
              </div>
            </section>

            {/* 4. What Travelers Say */}
            <section className="reviews-band reveal-item" id="reviews-band">
              <div className="page-container">
                <div className="section-header-row">
                  <div>
                    <h2 className="section-heading-editorial">What Travelers Say</h2>
                    <p className="section-subtitle">
                      Real stories from travelers exploring Japan with Tanogaido.
                    </p>
                  </div>
                  <div className="carousel-controls">
                    <button
                      className="carousel-btn"
                      id="rev-prev"
                      type="button"
                      aria-label="Previous reviews"
                      onClick={() =>
                        setActiveReviewPage(
                          (prev) => (prev - 1 + reviewPages.length) % reviewPages.length
                        )
                      }
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      className="carousel-btn"
                      id="rev-next"
                      type="button"
                      aria-label="Next reviews"
                      onClick={() => setActiveReviewPage((prev) => (prev + 1) % reviewPages.length)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="reviews-grid" id="reviews-grid">
                  {currentReviews.map((rev) => (
                    <article className="review-card" key={rev.id}>
                      <img className="review-avatar" src={rev.avatarPath} alt={rev.author} loading="lazy" />
                      <div>
                        <p className="review-quote">{rev.quote}</p>
                        <p className="review-author">{rev.author}</p>
                        <p className="review-trip">{rev.trip}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. Newsletter Band */}
            <NewsletterBand
              isRevealItem
              successText="Subscribed! Watch your inbox for curated Japan inspiration."
              source="home-newsletter"
            />

            {/* 6. Footer */}
            <Footer isHome onScrollToProgress={handleScrollLink} />
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div ref={scrollHintRef} className="scroll-hint" id="scroll-hint">
        <span>Scroll to Explore</span>
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
      </div>
    </>
  );
}
