import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import {
  Service,
  Product,
  Trip,
  Testimonial,
  TravelStyle,
  SiteSettings,
  AboutPageData,
} from '@/types/cms';
import { SERVICES, SERVICE_BY_ID } from '@/data/services';
import { PRODUCTS, PRODUCT_BY_ID } from '@/data/products';
import {
  FEATURED_TRIPS,
  TESTIMONIALS,
  SITE_SETTINGS,
  TRAVEL_STYLES,
  ABOUT_PAGE_DATA,
} from '@/data/site-content';

const hasMongo = Boolean(process.env.MONGODB_URI?.trim());

function getServiceIconName(id: string): string {
  const map: Record<string, string> = {
    'japan-tour-guide': 'compass',
    'private-transport': 'car',
    'tokyo-disneyland-disneysea': 'sparkles',
    'traditional-ryokan-onsen': 'flame',
    'shinkansen-jr-pass': 'train',
    'japan-documents': 'file-text',
    'japan-wifi-esim': 'wifi',
    'japan-golf': 'flag',
    'tea-ceremony-kimono': 'coffee',
    'michelin-dining': 'utensils',
    'japan-cargo': 'truck',
    'personal-shopper': 'package',
    'japan-photographer': 'camera',
    'japan-business-charter': 'briefcase',
    'universal-studios-japan': 'sparkles',
    'luggage-forwarding': 'package',
    'travel-insurance-japan': 'shield-alert',
    'mt-fuji-climbing': 'mountain',
    'island-hopping-okinawa': 'map-pin',
    'tokyo-nightlife-pulse': 'building',
  };
  return map[id] || 'compass';
}

function normalizeService(s: any): Service {
  const id = s.id || s.slug || 'japan-tour-guide';
  const kicker = s.kicker || s.badge || 'PREMIER';
  const h1Lead = s.h1Lead || '';
  const h1Accent = s.h1Accent || '';
  const headline = s.headline || (h1Lead ? `${h1Lead} ${h1Accent}`.trim() : s.title);
  const heroDesc = s.heroDesc || s.subheadline || s.shortDesc || '';
  const overview = s.overviewText || s.overview || s.shortDesc || '';
  const included = Array.isArray(s.included)
    ? s.included.map((item: any) => (typeof item === 'string' ? item : item.item || ''))
    : s.inclusions || s.features || [];

  const rawStats = Array.isArray(s.stats) ? s.stats : [];
  const stats = rawStats.map((st: any) => ({
    val: st.val || st.value || '',
    value: st.value || st.val || '',
    label: st.label || '',
  }));

  const rawSteps = Array.isArray(s.steps) ? s.steps : [];
  const steps = rawSteps.map((st: any, idx: number) => ({
    step: st.step || `0${idx + 1}`,
    title: st.title || '',
    desc: st.desc || '',
  }));

  const icon = s.icon || getServiceIconName(id);
  const rawHighlights = Array.isArray(s.highlights) ? s.highlights : [];
  const highlights = rawHighlights.map((h: any) => ({
    title: h.title || '',
    desc: h.desc || '',
    icon: h.icon || icon,
  }));

  const homeCard = s.homeCard
    ? {
        categoryTab: s.homeCard.categoryTab || 'tours',
        kicker: s.homeCard.kicker || kicker,
        badge: s.homeCard.badge || s.homeCard.kicker || kicker,
        title: s.homeCard.title || s.title,
        shortDesc: s.homeCard.shortDesc || s.shortDesc,
        teaser: s.homeCard.teaser || s.homeCard.shortDesc || s.shortDesc,
        thumb: s.homeCard.thumb || s.homeCard.image || s.image,
        image: s.homeCard.image || s.homeCard.thumb || s.image,
        backTitle: s.homeCard.backTitle || s.title,
        backSub: s.homeCard.backSub || s.shortDesc,
        backBullets: Array.isArray(s.homeCard.backBullets)
          ? s.homeCard.backBullets.map((b: any) => (typeof b === 'string' ? b : b.item || ''))
          : [],
      }
    : undefined;

  return {
    id,
    slug: id,
    title: s.title || '',
    category: s.category || 'tours',
    categoryLabel: s.categoryLabel || 'Tours & Guides',
    kicker,
    badge: kicker,
    shortDesc: s.shortDesc || '',
    image: s.image || '/assets/cards/card-1.jpg',
    features: Array.isArray(s.features)
      ? s.features.map((f: any) => (typeof f === 'string' ? f : f.item || ''))
      : included,
    seoTitle: s.seoTitle || `${s.title} — Tanogaido Japan Concierge`,
    metaDescription: s.metaDescription || s.shortDesc || '',
    seoDescription: s.metaDescription || s.shortDesc || '',
    keywords: s.keywords || 'Japan travel, Tanogaido, Japan concierge',
    eyebrow: s.eyebrow || 'LICENSED JAPAN CONCIERGE',
    h1Lead,
    h1Accent,
    headline,
    subheadline: heroDesc,
    heroDesc,
    heroImage: s.heroImage || s.image || '/assets/cards/card-1.jpg',
    heroImageAlt: s.heroImageAlt || s.title || '',
    detailImage: s.detailImage || s.image || '/assets/cards/card-1.jpg',
    detailImageAlt: s.detailImageAlt || s.title || '',
    stats,
    highlights,
    overviewTitle: s.overviewTitle || 'Comprehensive Overview',
    overviewText: overview,
    overview,
    included,
    inclusions: included,
    steps,
    faqs: Array.isArray(s.faqs) ? s.faqs : [],
    relatedIds: Array.isArray(s.relatedIds)
      ? s.relatedIds.map((r: any) => (typeof r === 'string' ? r : r.serviceSlug || ''))
      : [],
    waText: s.waText || `Inquire about ${s.title}`,
    icon,
    priceStarting: s.priceStarting || 150,
    featuredOnHome: Boolean(homeCard),
    homeCard,
  };
}

function normalizeProduct(p: any): Product {
  const id = p.id || p.slug || 'uji-matcha';
  const name = p.name || p.title || 'Japanese Artisan Artifact';
  const badge = p.status || p.badge || 'Curated';
  const desc = p.craftStory || p.description || p.shortDesc || '';

  const rawVariants = Array.isArray(p.variants) ? p.variants : [];
  const variants = rawVariants.map((v: any) => {
    if (typeof v === 'string') return { name: v, price: p.price };
    return { name: v.name || 'Standard', price: v.price || p.price };
  });

  const rawGallery = Array.isArray(p.gallery) && p.gallery.length > 0 ? p.gallery : [p.image];
  const gallery = rawGallery.map((item: any) => (typeof item === 'string' ? item : item.src || p.image));

  return {
    id,
    slug: id,
    title: name,
    name,
    origin: p.origin || 'Japan',
    categoryLabel: p.categoryLabel || 'Curated Goods',
    category: p.category || 'Lifestyle',
    status: badge,
    badge,
    rating: p.rating || '4.9',
    reviewCount: p.reviewCount || 36,
    price: typeof p.price === 'number' ? p.price : 48,
    priceJpy: p.priceJpy || '¥7,200',
    image: p.image || '/assets/products/uji-matcha.jpg',
    gallery,
    shortDesc: p.shortDesc || desc,
    description: desc,
    craftStory: desc,
    variants,
    specs: p.specs || [
      'Single-cultivar harvested in Kyoto, Japan',
      'Certified authentic packaging',
      'Direct dispatch from Tokyo / Kyoto studio',
    ],
    shippingNote: p.shippingNote || 'Dispatched within 48 hours worldwide',
    featured: Boolean(p.featured),
    inStock: true,
  };
}

function normalizeTrip(t: any): Trip {
  const duration = t.durationDays || t.duration || '7 Days';
  const summary = t.desc || t.summary || '';
  return {
    id: t.slug || t.id || 'golden-route',
    slug: t.slug || t.id || 'golden-route',
    title: t.title || 'Golden Route Japan Itinerary',
    durationDays: duration,
    duration,
    priceFrom: typeof t.priceFrom === 'number' ? t.priceFrom : 1450,
    image: t.image || '/assets/fuji-climb.jpg',
    imageAlt: t.imageAlt || t.title || 'Japan Journey',
    desc: summary,
    summary,
    destination: t.destination || 'Tokyo · Kyoto',
    waText: t.waText || `Inquire about ${t.title}`,
  };
}

function normalizeTestimonial(t: any, idx: number): Testimonial {
  return {
    id: t.id || `rev-${idx + 1}`,
    author: t.author || 'Private Traveler',
    avatar: t.avatar || `/assets/avatars/traveler-${(idx % 3) + 1}.jpg`,
    quote: t.quote || 'Tanogaido made our Japan trip extraordinary.',
    trip: t.trip || 'Private Japan Tour',
    tripType: t.tripType || t.trip || 'Private Bespoke Tour',
    rating: typeof t.rating === 'number' ? t.rating : 5,
    location: t.location || 'Verified Traveler',
  };
}

function normalizeTravelStyle(ts: any, idx: number): TravelStyle {
  const styleImages = [
    '/assets/cards/card-1.jpg',
    '/assets/fuji-climb.jpg',
    '/assets/cards/card-2.jpg',
    '/assets/tea-ceremony.jpg',
    '/assets/zen-retreat.jpg',
    '/assets/cards/card-3.jpg',
    '/assets/cards/japan-theme-park.jpg',
    '/assets/shinkansen.jpg',
  ];

  return {
    id: ts.id || `style-${idx}`,
    label: ts.label || ts.title || 'Travel Style',
    title: ts.label || ts.title || 'Travel Style',
    iconName: ts.iconName || 'compass',
    waText: ts.waText || 'Inquire with Tanogaido',
    desc: ts.desc || 'Explore Japan through personalized routes curated around your individual rhythm.',
    image: ts.image || styleImages[idx % styleImages.length],
    link: ts.link || '/services',
  };
}

export async function getServices(): Promise<Service[]> {
  if (!hasMongo) return SERVICES.map(normalizeService);
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'services',
      limit: 100,
      depth: 1,
    });
    if (!res.docs || res.docs.length === 0) return SERVICES.map(normalizeService);
    return res.docs.map(normalizeService);
  } catch (err) {
    console.warn('Payload getServices error, falling back to static data:', err);
    return SERVICES.map(normalizeService);
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (!slug) return null;
  if (!hasMongo) {
    const found = SERVICE_BY_ID[slug] || SERVICES.find((s) => s.id === slug);
    return found ? normalizeService(found) : null;
  }

  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'services',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });

    if (res.docs && res.docs.length > 0) {
      return normalizeService(res.docs[0]);
    }
    const fallback = SERVICE_BY_ID[slug] || SERVICES.find((s) => s.id === slug);
    return fallback ? normalizeService(fallback) : null;
  } catch (err) {
    console.warn(`Payload getServiceBySlug(${slug}) error:`, err);
    const fallback = SERVICE_BY_ID[slug] || SERVICES.find((s) => s.id === slug);
    return fallback ? normalizeService(fallback) : null;
  }
}

export async function getProducts(): Promise<Product[]> {
  if (!hasMongo) return PRODUCTS.map(normalizeProduct);
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'products',
      limit: 100,
      depth: 1,
    });
    if (!res.docs || res.docs.length === 0) return PRODUCTS.map(normalizeProduct);
    return res.docs.map(normalizeProduct);
  } catch (err) {
    console.warn('Payload getProducts error, falling back to static data:', err);
    return PRODUCTS.map(normalizeProduct);
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!slug) return null;
  if (!hasMongo) {
    const found = PRODUCT_BY_ID[slug] || PRODUCTS.find((p) => p.id === slug);
    return found ? normalizeProduct(found) : null;
  }

  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'products',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    });

    if (res.docs && res.docs.length > 0) {
      return normalizeProduct(res.docs[0]);
    }
    const fallback = PRODUCT_BY_ID[slug] || PRODUCTS.find((p) => p.id === slug);
    return fallback ? normalizeProduct(fallback) : null;
  } catch (err) {
    console.warn(`Payload getProductBySlug(${slug}) error:`, err);
    const fallback = PRODUCT_BY_ID[slug] || PRODUCTS.find((p) => p.id === slug);
    return fallback ? normalizeProduct(fallback) : null;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  return getProductBySlug(id);
}

export async function getTrips(): Promise<Trip[]> {
  if (!hasMongo) return FEATURED_TRIPS.map(normalizeTrip);
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'trips',
      limit: 10,
    });
    if (!res.docs || res.docs.length === 0) return FEATURED_TRIPS.map(normalizeTrip);
    return res.docs.map(normalizeTrip);
  } catch {
    return FEATURED_TRIPS.map(normalizeTrip);
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!hasMongo) return TESTIMONIALS.map(normalizeTestimonial);
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'testimonials',
      limit: 20,
    });
    if (!res.docs || res.docs.length === 0) return TESTIMONIALS.map(normalizeTestimonial);
    return res.docs.map(normalizeTestimonial);
  } catch {
    return TESTIMONIALS.map(normalizeTestimonial);
  }
}

export async function getTravelStyles(): Promise<TravelStyle[]> {
  return TRAVEL_STYLES.map(normalizeTravelStyle);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!hasMongo) return SITE_SETTINGS;
  try {
    const payload = await getPayload({ config: configPromise });
    const settings = await payload.findGlobal({
      slug: 'site-settings',
    });
    if (!settings) return SITE_SETTINGS;
    return {
      siteName: settings.siteName || SITE_SETTINGS.siteName,
      siteTagline: settings.siteTagline || SITE_SETTINGS.siteTagline,
      companyLegalName: settings.companyLegalName || SITE_SETTINGS.companyLegalName,
      establishedYear: settings.establishedYear || SITE_SETTINGS.establishedYear,
      nib: settings.nib || SITE_SETTINGS.nib,
      decreeNumber: settings.decreeNumber || SITE_SETTINGS.decreeNumber,
      address: settings.address || SITE_SETTINGS.address,
      contactEmail: settings.contactEmail || SITE_SETTINGS.contactEmail,
      contactPhone: settings.contactPhone || SITE_SETTINGS.contactPhone,
      waNumber: settings.waNumber || SITE_SETTINGS.waNumber,
      socials: (settings.socials as any) || SITE_SETTINGS.socials,
    };
  } catch {
    return SITE_SETTINGS;
  }
}

export async function getAboutData(): Promise<AboutPageData> {
  return {
    profile: ABOUT_PAGE_DATA.introText,
    metrics: [
      { val: '2007', lbl: 'Year Established' },
      { val: '1,200+', lbl: 'Travelers Guided' },
      { val: '100%', lbl: '5-Star Ratings' },
      { val: '24/7', lbl: 'On-Site Concierge' },
    ],
    vision: ABOUT_PAGE_DATA.visionText,
    missions: ABOUT_PAGE_DATA.missions.map((m) => `${m.title}: ${m.desc}`),
    pillars: ABOUT_PAGE_DATA.pillars.map((p) => ({ title: p.title, desc: p.desc })),
    whyChoose: ABOUT_PAGE_DATA.whyChoose.map((w) => ({ title: w.title, desc: w.desc })),
    legal: {
      nib: SITE_SETTINGS.nib,
      decree: SITE_SETTINGS.decreeNumber,
      address: SITE_SETTINGS.address,
    },
  };
}
