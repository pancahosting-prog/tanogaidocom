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
  googleSiteVerification?: string;
}

export interface LexicalTextNode {
  type: 'text';
  text: string;
  format?: number;
  mode?: string;
  style?: string;
  detail?: number;
  version?: number;
}

export interface LexicalNode {
  type: string;
  version?: number;
  tag?: string;
  listType?: 'bullet' | 'number' | 'check';
  format?: string | number;
  indent?: number;
  direction?: string | null;
  text?: string;
  url?: string;
  newTab?: boolean;
  fields?: Record<string, unknown>;
  value?: Record<string, unknown> | number;
  relationTo?: string;
  children?: LexicalNode[];
  [key: string]: unknown;
}

export interface LexicalEditorState {
  root: {
    type: string;
    children: LexicalNode[];
    direction?: string | null;
    format?: string;
    indent?: number;
    version?: number;
  };
}

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3 | 4;
}

export type InternalLinkKind = 'service' | 'product' | 'post' | 'page';

export interface InternalLinkTarget {
  phrase: string;
  href: string;
  title: string;
  kind: InternalLinkKind;
}

export interface EditorialFaq {
  q: string;
  a: string;
}

export interface BlogCategoryItem {
  id?: string;
  slug: string;
  name: string;
  description?: string;
  seoTitle?: string;
  metaDescription?: string;
}

export interface BlogPostItem {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  categoryName: string;
  featured: boolean;
  status: 'draft' | 'published';
  publishedAt: string;
  updatedAt?: string;
  authorName: string;
  authorRole: string;
  authorAvatarPath: string;
  coverImagePath: string;
  coverImageAlt: string;
  content: LexicalEditorState;
  tags: string[];
  internalKeywords: string[];
  enableToc: boolean;
  enableAutoInternalLinks: boolean;
  seoTitle: string;
  metaDescription: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  faqs: EditorialFaq[];
}

export interface PageItem {
  id?: string;
  slug: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  heroImagePath?: string;
  heroImageAlt?: string;
  status: 'draft' | 'published';
  publishedAt: string;
  updatedAt?: string;
  content: LexicalEditorState;
  internalKeywords: string[];
  showToc: boolean;
  enableAutoInternalLinks: boolean;
  showInFooter: boolean;
  sortOrder: number;
  seoTitle: string;
  metaDescription: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  faqs: EditorialFaq[];
}

