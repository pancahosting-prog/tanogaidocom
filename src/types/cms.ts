export interface ServiceCategory {
  id: string;
  label: string;
}

export interface ServiceStat {
  val: string;
  label: string;
  value?: string;
}

export interface ServiceHighlight {
  title: string;
  desc: string;
  icon?: string;
}

export interface ServiceStep {
  title: string;
  desc: string;
  step?: string | number;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface HomeCardOverride {
  categoryTab: string;
  kicker: string;
  title: string;
  shortDesc: string;
  thumb: string;
  backTitle: string;
  backSub: string;
  backBullets: string[];
  badge?: string;
  teaser?: string;
  image?: string;
}

export interface Service {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  kicker: string;
  shortDesc: string;
  image: string;
  features: string[];
  seoTitle: string;
  metaDescription: string;
  keywords: string | string[];
  eyebrow: string;
  h1Lead: string;
  h1Accent: string;
  heroDesc: string;
  heroImage: string;
  heroImageAlt: string;
  detailImage: string;
  detailImageAlt: string;
  stats: ServiceStat[];
  highlights: ServiceHighlight[];
  overviewTitle: string;
  overviewText: string;
  included: string[];
  steps: ServiceStep[];
  faqs: ServiceFaq[];
  relatedIds: string[];
  waText: string;
  homeCard?: HomeCardOverride;

  slug?: string;
  badge?: string;
  headline?: string;
  subheadline?: string;
  overview?: string;
  inclusions?: string[];
  icon?: string;
  priceStarting?: number;
  featuredOnHome?: boolean;
  seoDescription?: string;
}

export interface ProductGalleryItem {
  src: string;
  label: string;
}

export interface ProductVariant {
  name: string;
  price?: number;
}

export interface Product {
  id: string;
  title: string;
  origin: string;
  categoryLabel: string;
  category: string;
  status: string;
  rating: string | number;
  reviewCount: number;
  price: number;
  priceJpy: string;
  image: string;
  gallery: (string | ProductGalleryItem)[];
  shortDesc: string;
  craftStory: string;
  variants: (string | ProductVariant)[];
  specs: string[] | Record<string, string>;
  shippingNote: string;
  featured: boolean;

  slug?: string;
  name?: string;
  badge?: string;
  description?: string;
  inStock?: boolean;
}

export interface Trip {
  id: string;
  title: string;
  durationDays: string;
  priceFrom: number;
  image: string;
  imageAlt: string;
  desc: string;
  destination: string;
  waText: string;

  slug?: string;
  duration?: string;
  summary?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  avatar: string;
  quote: string;
  trip: string;

  tripType?: string;
  rating?: number;
  location?: string;
}

export interface TravelStyle {
  id: string;
  label: string;
  iconName: string;
  waText: string;

  title?: string;
  desc?: string;
  image?: string;
  link?: string;
}

export interface SiteSettings {
  siteName: string;
  siteTagline: string;
  companyLegalName: string;
  establishedYear: number;
  nib: string;
  decreeNumber: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  waNumber: string;
  socials: {
    instagram: string;
    facebook: string;
    youtube: string;
    whatsapp: string;
  };
}

export interface AboutPageData {
  profile: string;
  metrics: { val: string; lbl: string }[];
  vision: string;
  missions: string[];
  pillars: { title: string; desc: string }[];
  whyChoose: { title: string; desc: string }[];
  legal: {
    nib: string;
    decree: string;
    address: string;
  };
}
