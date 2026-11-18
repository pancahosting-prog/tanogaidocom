export interface ServiceStat {
  val: string;
  label: string;
}

export interface ServiceHighlight {
  title: string;
  desc: string;
}

export interface ServiceStep {
  title: string;
  desc: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export type ServiceCategorySlug =
  | 'tours'
  | 'visa'
  | 'transport'
  | 'specialty'
  | 'essentials';

export interface ServiceItem {
  slug: string;
  title: string;
  category: ServiceCategorySlug;
  categoryLabel: string;
  kicker: string;
  shortDesc: string;
  imagePath: string;
  heroImagePath: string;
  heroImageAlt: string;
  detailImagePath: string;
  detailImageAlt: string;
  features: string[];
  seoTitle: string;
  metaDescription: string;
  keywords: string;
  eyebrow: string;
  h1Lead: string;
  h1Accent: string;
  heroDesc: string;
  stats: ServiceStat[];
  highlights: ServiceHighlight[];
  overviewTitle: string;
  overviewText: string;
  included: string[];
  steps: ServiceStep[];
  faqs: ServiceFaq[];
  relatedSlugs: string[];
  waText: string;
  showOnHome: boolean;
  homeSortOrder: number;
  sortOrder: number;
  homeCategory?: string;
  homeCardTitle?: string;
  homeCardTag?: string;
  homeCardKicker?: string;
  homeCardShort?: string;
  homeCardImage?: string;
  homeCardSubtitle?: string;
  homeCardFeatures?: string[];
}

export type ProductCategorySlug = 'tea' | 'travel' | 'craft' | 'home';

export interface ProductGalleryItem {
  src: string;
  label: string;
}

export interface ProductItem {
  slug: string;
  title: string;
  origin: string;
  categoryLabel: string;
  category: ProductCategorySlug;
  status: string;
  rating: string;
  reviewCount: number;
  price: number;
  priceJpy: string;
  imagePath: string;
  gallery: ProductGalleryItem[];
  shortDesc: string;
  craftStory: string;
  variants: string[];
  specs: string[];
  shippingNote: string;
  featured: boolean;
  sortOrder: number;
}

export interface TripItem {
  slug: string;
  title: string;
  daysLabel: string;
  locationLabel: string;
  priceFrom: string;
  shortDesc: string;
  imagePath: string;
  waText: string;
  sortOrder: number;
}

export interface TestimonialItem {
  id: string;
  author: string;
  trip: string;
  quote: string;
  avatarPath: string;
  sortOrder: number;
}

export interface SiteSettingsData {
  brandName: string;
  companyName: string;
  nibNumber: string;
  ahuDecree: string;
  address: string;
  email: string;
  whatsappNumber: string;
  heroEyebrow: string;
  heroTitleLead: string;
  heroTitleAccent: string;
  heroDescription: string;
  heroVideoUrl: string;
}
