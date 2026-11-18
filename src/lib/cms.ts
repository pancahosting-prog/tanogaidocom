import { unstable_cache } from 'next/cache';
import { getPayload } from 'payload';
import config from '@payload-config';
import {
  FALLBACK_PRODUCTS,
  FALLBACK_SERVICES,
  FALLBACK_SITE_SETTINGS,
  FALLBACK_TESTIMONIALS,
  FALLBACK_TRIPS,
} from '@/data/fallback-data';
import {
  FALLBACK_BLOG_CATEGORIES,
  FALLBACK_BLOG_POSTS,
  FALLBACK_PAGES,
} from '@/data/fallback-editorial';
import type {
  BlogCategoryItem,
  BlogPostItem,
  LexicalEditorState,
  PageItem,
  ProductCategorySlug,
  ProductItem,
  ServiceCategorySlug,
  ServiceItem,
  SiteSettingsData,
  TestimonialItem,
  TripItem,
} from '@/types/cms';

import {
  extractProxyMediaUrl,
  getImageKitConfig,
  buildProxyMediaUrl,
} from '@/lib/imagekit';

function normalizeAssetPath(p?: string | null, fallback = ''): string {
  const val = (p || fallback || '').trim();
  if (!val) return '';

  const { urlEndpoint } = getImageKitConfig();
  if (urlEndpoint && val.startsWith(urlEndpoint)) {
    const rest = val.slice(urlEndpoint.length);
    return buildProxyMediaUrl(rest);
  }
  const ikMatch = /^https?:\/\/ik\.imagekit\.io\/[^/]+(\/.*)$/i.exec(val);
  if (ikMatch && ikMatch[1]) {
    return buildProxyMediaUrl(ikMatch[1]);
  }

  if (val.startsWith('http://') || val.startsWith('https://') || val.startsWith('/')) {
    return val;
  }
  return `/${val}`;
}

function normalizeHeroVideoUrl(
  videoMedia: unknown,
  url?: string | null,
  fallback = '/assets/hero-japan.mp4'
): string {
  const uploadedUrl = extractProxyMediaUrl(videoMedia);
  if (uploadedUrl) {
    return normalizeAssetPath(uploadedUrl, fallback);
  }
  const trimmed = (url || '').trim();
  if (!trimmed || trimmed.includes('dn4jqfz3s') || trimmed.includes('japan_3_y7b62u')) {
    return fallback;
  }
  return normalizeAssetPath(trimmed, fallback);
}

function hasDatabaseConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI && process.env.MONGODB_URI.trim().length > 0);
}

async function withTimeout<T>(promise: Promise<T>, ms = 8000): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error('MongoDB query timeout')), ms);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timer!);
  }
}

export async function getPayloadClient() {
  return getPayload({ config });
}

function mapServiceDoc(doc: Record<string, unknown>, fallback?: ServiceItem): ServiceItem {
  const uploadedCardUrl = extractProxyMediaUrl(doc.uploadedImage);
  const resolvedImagePath = uploadedCardUrl
    ? normalizeAssetPath(uploadedCardUrl, fallback?.imagePath)
    : normalizeAssetPath(doc.imagePath as string, fallback?.imagePath);

  return {
    slug: String(doc.slug || fallback?.slug || ''),
    title: String(doc.title || fallback?.title || ''),
    category: (doc.category as ServiceCategorySlug) || fallback?.category || 'tours',
    categoryLabel: String(doc.categoryLabel || fallback?.categoryLabel || ''),
    kicker: String(doc.kicker || fallback?.kicker || ''),
    shortDesc: String(doc.shortDesc || fallback?.shortDesc || ''),
    imagePath: resolvedImagePath,
    heroImagePath: normalizeAssetPath(doc.heroImagePath as string, fallback?.heroImagePath),
    heroImageAlt: String(doc.heroImageAlt || fallback?.heroImageAlt || ''),
    detailImagePath: normalizeAssetPath(doc.detailImagePath as string, fallback?.detailImagePath),
    detailImageAlt: String(doc.detailImageAlt || fallback?.detailImageAlt || ''),
    features: Array.isArray(doc.features)
      ? doc.features.map((f: { text?: string }) => String(f?.text || '')).filter(Boolean)
      : fallback?.features || [],
    seoTitle: String(doc.seoTitle || fallback?.seoTitle || ''),
    metaDescription: String(doc.metaDescription || fallback?.metaDescription || ''),
    keywords: String(doc.keywords || fallback?.keywords || ''),
    eyebrow: String(doc.eyebrow || fallback?.eyebrow || ''),
    h1Lead: String(doc.h1Lead || fallback?.h1Lead || ''),
    h1Accent: String(doc.h1Accent || fallback?.h1Accent || ''),
    heroDesc: String(doc.heroDesc || fallback?.heroDesc || ''),
    stats: Array.isArray(doc.stats)
      ? doc.stats.map((s: { val?: string; label?: string }) => ({
          val: String(s?.val || ''),
          label: String(s?.label || ''),
        }))
      : fallback?.stats || [],
    highlights: Array.isArray(doc.highlights)
      ? doc.highlights.map((h: { title?: string; desc?: string }) => ({
          title: String(h?.title || ''),
          desc: String(h?.desc || ''),
        }))
      : fallback?.highlights || [],
    overviewTitle: String(doc.overviewTitle || fallback?.overviewTitle || ''),
    overviewText: String(doc.overviewText || fallback?.overviewText || ''),
    included: Array.isArray(doc.included)
      ? doc.included.map((i: { text?: string }) => String(i?.text || '')).filter(Boolean)
      : fallback?.included || [],
    steps: Array.isArray(doc.steps)
      ? doc.steps.map((s: { title?: string; desc?: string }) => ({
          title: String(s?.title || ''),
          desc: String(s?.desc || ''),
        }))
      : fallback?.steps || [],
    faqs: Array.isArray(doc.faqs)
      ? doc.faqs.map((f: { q?: string; a?: string }) => ({
          q: String(f?.q || ''),
          a: String(f?.a || ''),
        }))
      : fallback?.faqs || [],
    relatedSlugs: Array.isArray(doc.relatedSlugs)
      ? doc.relatedSlugs.map((r: { slug?: string }) => String(r?.slug || '')).filter(Boolean)
      : fallback?.relatedSlugs || [],
    waText: String(doc.waText || fallback?.waText || ''),
    showOnHome: typeof doc.showOnHome === 'boolean' ? doc.showOnHome : Boolean(fallback?.showOnHome),
    homeSortOrder: Number(doc.homeSortOrder ?? fallback?.homeSortOrder ?? 99),
    sortOrder: Number(doc.sortOrder ?? fallback?.sortOrder ?? 99),
    homeCategory: (doc.homeCategory as string) || fallback?.homeCategory,
    homeCardTitle: fallback?.homeCardTitle || String(doc.title || ''),
    homeCardTag: String(doc.homeTag || fallback?.homeCardTag || ''),
    homeCardKicker: fallback?.homeCardKicker || String(doc.kicker || ''),
    homeCardShort: fallback?.homeCardShort || String(doc.shortDesc || ''),
    homeCardImage: fallback?.homeCardImage || normalizeAssetPath(doc.imagePath as string),
    homeCardSubtitle: String(doc.homeSubtitle || fallback?.homeCardSubtitle || doc.shortDesc || ''),
    homeCardFeatures: fallback?.homeCardFeatures,
  };
}

function mapProductDoc(doc: Record<string, unknown>, fallback?: ProductItem): ProductItem {
  const uploadedProductUrl = extractProxyMediaUrl(doc.uploadedImage);
  const resolvedProductImage = uploadedProductUrl
    ? normalizeAssetPath(uploadedProductUrl, fallback?.imagePath)
    : normalizeAssetPath(doc.imagePath as string, fallback?.imagePath);

  return {
    slug: String(doc.slug || fallback?.slug || ''),
    title: String(doc.title || fallback?.title || ''),
    origin: String(doc.origin || fallback?.origin || ''),
    categoryLabel: String(doc.categoryLabel || fallback?.categoryLabel || ''),
    category: (doc.category as ProductCategorySlug) || fallback?.category || 'tea',
    status: String(doc.status || fallback?.status || ''),
    rating: String(doc.rating || fallback?.rating || '4.9'),
    reviewCount: Number(doc.reviewCount ?? fallback?.reviewCount ?? 20),
    price: Number(doc.price ?? fallback?.price ?? 0),
    priceJpy: String(doc.priceJpy || fallback?.priceJpy || ''),
    imagePath: resolvedProductImage,
    gallery: Array.isArray(doc.gallery)
      ? doc.gallery.map((g: { src?: string; label?: string }) => ({
          src: normalizeAssetPath(g?.src, fallback?.imagePath),
          label: String(g?.label || ''),
        }))
      : fallback?.gallery || [],
    shortDesc: String(doc.shortDesc || fallback?.shortDesc || ''),
    craftStory: String(doc.craftStory || fallback?.craftStory || ''),
    variants: Array.isArray(doc.variants)
      ? doc.variants.map((v: { name?: string }) => String(v?.name || '')).filter(Boolean)
      : fallback?.variants || [],
    specs: Array.isArray(doc.specs)
      ? doc.specs.map((s: { text?: string }) => String(s?.text || '')).filter(Boolean)
      : fallback?.specs || [],
    shippingNote: String(doc.shippingNote || fallback?.shippingNote || ''),
    featured: typeof doc.featured === 'boolean' ? doc.featured : Boolean(fallback?.featured),
    sortOrder: Number(doc.sortOrder ?? fallback?.sortOrder ?? 99),
  };
}

export const getServices = unstable_cache(
  async (): Promise<ServiceItem[]> => {
    if (!hasDatabaseConfigured()) {
      return FALLBACK_SERVICES;
    }
    try {
      const payload = await withTimeout(getPayloadClient());
      const result = await withTimeout(
        payload.find({
          collection: 'services',
          limit: 100,
          sort: 'sortOrder',
        })
      );
      if (!result.docs?.length) {
        return FALLBACK_SERVICES;
      }
      const fallbackMap = new Map(FALLBACK_SERVICES.map((s) => [s.slug, s]));
      return result.docs.map((d) =>
        mapServiceDoc(d as unknown as Record<string, unknown>, fallbackMap.get(String(d.slug)))
      );
    } catch {
      return FALLBACK_SERVICES;
    }
  },
  ['tanogaido-services-all'],
  { revalidate: 60, tags: ['tanogaido-cms'] }
);

export const getServiceBySlug = unstable_cache(
  async (slug: string): Promise<ServiceItem | null> => {
    const services = await getServices();
    return services.find((s) => s.slug === slug) || null;
  },
  ['tanogaido-service-by-slug'],
  { revalidate: 60, tags: ['tanogaido-cms'] }
);

export const getProducts = unstable_cache(
  async (): Promise<ProductItem[]> => {
    if (!hasDatabaseConfigured()) {
      return FALLBACK_PRODUCTS;
    }
    try {
      const payload = await withTimeout(getPayloadClient());
      const result = await withTimeout(
        payload.find({
          collection: 'products',
          limit: 100,
          sort: 'sortOrder',
        })
      );
      if (!result.docs?.length) {
        return FALLBACK_PRODUCTS;
      }
      const fallbackMap = new Map(FALLBACK_PRODUCTS.map((p) => [p.slug, p]));
      return result.docs.map((d) =>
        mapProductDoc(d as unknown as Record<string, unknown>, fallbackMap.get(String(d.slug)))
      );
    } catch {
      return FALLBACK_PRODUCTS;
    }
  },
  ['tanogaido-products-all'],
  { revalidate: 60, tags: ['tanogaido-cms'] }
);

export const getProductBySlug = unstable_cache(
  async (slug: string): Promise<ProductItem | null> => {
    const products = await getProducts();
    return products.find((p) => p.slug === slug) || null;
  },
  ['tanogaido-product-by-slug'],
  { revalidate: 60, tags: ['tanogaido-cms'] }
);

export const getTrips = unstable_cache(
  async (): Promise<TripItem[]> => {
    if (!hasDatabaseConfigured()) {
      return FALLBACK_TRIPS;
    }
    try {
      const payload = await withTimeout(getPayloadClient());
      const result = await withTimeout(
        payload.find({
          collection: 'trips',
          limit: 20,
          sort: 'sortOrder',
        })
      );
      if (!result.docs?.length) {
        return FALLBACK_TRIPS;
      }
      return result.docs.map((d) => ({
        slug: String(d.slug || ''),
        title: String(d.title || ''),
        daysLabel: String(d.daysLabel || ''),
        locationLabel: String(d.locationLabel || ''),
        priceFrom: String(d.priceFrom || ''),
        shortDesc: String(d.shortDesc || ''),
        imagePath: normalizeAssetPath(
          extractProxyMediaUrl(d.uploadedImage) || (d.imagePath as string),
          '/assets/fuji-climb.jpg'
        ),
        waText: String(d.waText || ''),
        sortOrder: Number(d.sortOrder ?? 1),
      }));
    } catch {
      return FALLBACK_TRIPS;
    }
  },
  ['tanogaido-trips-all'],
  { revalidate: 60, tags: ['tanogaido-cms'] }
);

export const getTestimonials = unstable_cache(
  async (): Promise<TestimonialItem[]> => {
    if (!hasDatabaseConfigured()) {
      return FALLBACK_TESTIMONIALS;
    }
    try {
      const payload = await withTimeout(getPayloadClient());
      const result = await withTimeout(
        payload.find({
          collection: 'testimonials',
          limit: 30,
          sort: 'sortOrder',
        })
      );
      if (!result.docs?.length) {
        return FALLBACK_TESTIMONIALS;
      }
      return result.docs.map((d) => ({
        id: String(d.id || d.author || ''),
        author: String(d.author || ''),
        trip: String(d.trip || ''),
        quote: String(d.quote || ''),
        avatarPath: normalizeAssetPath(
          extractProxyMediaUrl(d.uploadedAvatar) || (d.avatarPath as string),
          '/assets/avatars/traveler-1.jpg'
        ),
        sortOrder: Number(d.sortOrder ?? 1),
      }));
    } catch {
      return FALLBACK_TESTIMONIALS;
    }
  },
  ['tanogaido-testimonials-all'],
  { revalidate: 60, tags: ['tanogaido-cms'] }
);

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettingsData> => {
    if (!hasDatabaseConfigured()) {
      return FALLBACK_SITE_SETTINGS;
    }
    try {
      const payload = await withTimeout(getPayloadClient());
      const data = await withTimeout(
        payload.findGlobal({
          slug: 'site-settings',
        })
      );
      if (!data) {
        return FALLBACK_SITE_SETTINGS;
      }
      return {
        brandName: String(data.brandName || FALLBACK_SITE_SETTINGS.brandName),
        companyName: String(data.companyName || FALLBACK_SITE_SETTINGS.companyName),
        nibNumber: String(data.nibNumber || FALLBACK_SITE_SETTINGS.nibNumber),
        ahuDecree: String(data.ahuDecree || FALLBACK_SITE_SETTINGS.ahuDecree),
        address: String(data.address || FALLBACK_SITE_SETTINGS.address),
        email: String(data.email || FALLBACK_SITE_SETTINGS.email),
        whatsappNumber: String(data.whatsappNumber || FALLBACK_SITE_SETTINGS.whatsappNumber),
        heroEyebrow: String(data.heroEyebrow || FALLBACK_SITE_SETTINGS.heroEyebrow),
        heroTitleLead: String(data.heroTitleLead || FALLBACK_SITE_SETTINGS.heroTitleLead),
        heroTitleAccent: String(data.heroTitleAccent || FALLBACK_SITE_SETTINGS.heroTitleAccent),
        heroDescription: String(data.heroDescription || FALLBACK_SITE_SETTINGS.heroDescription),
        heroVideoUrl: normalizeHeroVideoUrl(
          (data as unknown as Record<string, unknown>).heroVideoMedia,
          data.heroVideoUrl as string,
          FALLBACK_SITE_SETTINGS.heroVideoUrl
        ),
        googleSiteVerification: String(
          (data as unknown as Record<string, unknown>).googleSiteVerification ||
            process.env.GOOGLE_SITE_VERIFICATION ||
            ''
        ).trim(),
      };
    } catch {
      return FALLBACK_SITE_SETTINGS;
    }
  },
  ['tanogaido-site-settings'],
  { revalidate: 60, tags: ['tanogaido-cms'] }
);

function mapPostDoc(doc: Record<string, unknown>, fallback?: BlogPostItem): BlogPostItem {
  const categoryObj =
    doc.category && typeof doc.category === 'object'
      ? (doc.category as { slug?: string; name?: string })
      : null;
  const coverUrl =
    extractProxyMediaUrl(doc.uploadedCover) || (doc.coverImagePath as string) || fallback?.coverImagePath;
  const avatarUrl =
    extractProxyMediaUrl(doc.authorAvatarMedia) ||
    (doc.authorAvatarPath as string) ||
    fallback?.authorAvatarPath ||
    '/assets/avatars/traveler-1.jpg';

  return {
    id: String(doc.id || fallback?.id || ''),
    slug: String(doc.slug || fallback?.slug || ''),
    title: String(doc.title || fallback?.title || ''),
    excerpt: String(doc.excerpt || fallback?.excerpt || ''),
    categorySlug: String(categoryObj?.slug || fallback?.categorySlug || 'travel-planning'),
    categoryName: String(categoryObj?.name || fallback?.categoryName || 'Travel Planning'),
    featured: typeof doc.featured === 'boolean' ? doc.featured : Boolean(fallback?.featured),
    status: (doc.status as 'draft' | 'published') || fallback?.status || 'published',
    publishedAt: String(doc.publishedAt || fallback?.publishedAt || new Date().toISOString()),
    updatedAt: String(doc.updatedAt || fallback?.updatedAt || doc.publishedAt || ''),
    authorName: String(doc.authorName || fallback?.authorName || 'Rina Takahashi'),
    authorRole: String(doc.authorRole || fallback?.authorRole || 'Japan Travel Concierge'),
    authorAvatarPath: normalizeAssetPath(avatarUrl, '/assets/avatars/traveler-1.jpg'),
    coverImagePath: normalizeAssetPath(coverUrl, '/assets/tokyo-pulse.jpg'),
    coverImageAlt: String(doc.coverImageAlt || fallback?.coverImageAlt || doc.title || ''),
    content: (doc.content as LexicalEditorState) || fallback?.content || { root: { type: 'root', children: [] } },
    tags: Array.isArray(doc.tags)
      ? doc.tags.map((t: { tag?: string }) => String(t?.tag || '')).filter(Boolean)
      : fallback?.tags || [],
    internalKeywords: Array.isArray(doc.internalKeywords)
      ? doc.internalKeywords.map((k: { keyword?: string }) => String(k?.keyword || '')).filter(Boolean)
      : fallback?.internalKeywords || [],
    enableToc: typeof doc.enableToc === 'boolean' ? doc.enableToc : true,
    enableAutoInternalLinks:
      typeof doc.enableAutoInternalLinks === 'boolean' ? doc.enableAutoInternalLinks : true,
    seoTitle: String(doc.seoTitle || fallback?.seoTitle || ''),
    metaDescription: String(doc.metaDescription || fallback?.metaDescription || ''),
    focusKeyword: String(doc.focusKeyword || fallback?.focusKeyword || ''),
    canonicalUrl: String(doc.canonicalUrl || fallback?.canonicalUrl || ''),
    noIndex: Boolean(doc.noIndex),
    faqs: Array.isArray(doc.faqs)
      ? doc.faqs.map((f: { q?: string; a?: string }) => ({
          q: String(f?.q || ''),
          a: String(f?.a || ''),
        }))
      : fallback?.faqs || [],
  };
}

function mapPageDoc(doc: Record<string, unknown>, fallback?: PageItem): PageItem {
  const heroUrl =
    extractProxyMediaUrl(doc.uploadedHeroImage) ||
    (doc.heroImagePath as string) ||
    fallback?.heroImagePath;

  return {
    id: String(doc.id || fallback?.id || ''),
    slug: String(doc.slug || fallback?.slug || ''),
    title: String(doc.title || fallback?.title || ''),
    eyebrow: String(doc.eyebrow || fallback?.eyebrow || 'TANOGAIDO GUIDE'),
    subtitle: String(doc.subtitle || fallback?.subtitle || ''),
    heroImagePath: heroUrl ? normalizeAssetPath(heroUrl, fallback?.heroImagePath) : undefined,
    heroImageAlt: String(doc.heroImageAlt || fallback?.heroImageAlt || doc.title || ''),
    status: (doc.status as 'draft' | 'published') || fallback?.status || 'published',
    publishedAt: String(doc.publishedAt || fallback?.publishedAt || new Date().toISOString()),
    updatedAt: String(doc.updatedAt || fallback?.updatedAt || doc.publishedAt || ''),
    content: (doc.content as LexicalEditorState) || fallback?.content || { root: { type: 'root', children: [] } },
    internalKeywords: Array.isArray(doc.internalKeywords)
      ? doc.internalKeywords.map((k: { keyword?: string }) => String(k?.keyword || '')).filter(Boolean)
      : fallback?.internalKeywords || [],
    showToc: typeof doc.showToc === 'boolean' ? doc.showToc : true,
    enableAutoInternalLinks:
      typeof doc.enableAutoInternalLinks === 'boolean' ? doc.enableAutoInternalLinks : true,
    showInFooter: typeof doc.showInFooter === 'boolean' ? doc.showInFooter : Boolean(fallback?.showInFooter),
    sortOrder: Number(doc.sortOrder ?? fallback?.sortOrder ?? 1),
    seoTitle: String(doc.seoTitle || fallback?.seoTitle || ''),
    metaDescription: String(doc.metaDescription || fallback?.metaDescription || ''),
    focusKeyword: String(doc.focusKeyword || fallback?.focusKeyword || ''),
    canonicalUrl: String(doc.canonicalUrl || fallback?.canonicalUrl || ''),
    noIndex: Boolean(doc.noIndex),
    faqs: Array.isArray(doc.faqs)
      ? doc.faqs.map((f: { q?: string; a?: string }) => ({
          q: String(f?.q || ''),
          a: String(f?.a || ''),
        }))
      : fallback?.faqs || [],
  };
}

export const getBlogCategories = unstable_cache(
  async (): Promise<BlogCategoryItem[]> => {
    if (!hasDatabaseConfigured()) {
      return FALLBACK_BLOG_CATEGORIES;
    }
    try {
      const payload = await withTimeout(getPayloadClient());
      const result = await withTimeout(
        payload.find({
          collection: 'categories',
          limit: 50,
          sort: 'name',
        })
      );
      if (!result.docs?.length) {
        return FALLBACK_BLOG_CATEGORIES;
      }
      return result.docs.map((d) => ({
        id: String(d.id),
        slug: String(d.slug || ''),
        name: String(d.name || ''),
        description: String(d.description || ''),
        seoTitle: String(d.seoTitle || ''),
        metaDescription: String(d.metaDescription || ''),
      }));
    } catch {
      return FALLBACK_BLOG_CATEGORIES;
    }
  },
  ['tanogaido-blog-categories'],
  { revalidate: 60, tags: ['tanogaido-cms'] }
);

export const getBlogPosts = unstable_cache(
  async (): Promise<BlogPostItem[]> => {
    if (!hasDatabaseConfigured()) {
      return FALLBACK_BLOG_POSTS;
    }
    try {
      const payload = await withTimeout(getPayloadClient());
      const result = await withTimeout(
        payload.find({
          collection: 'posts',
          where: { status: { equals: 'published' } },
          limit: 100,
          sort: '-publishedAt',
          depth: 2,
        })
      );
      if (!result.docs?.length) {
        return FALLBACK_BLOG_POSTS;
      }
      const fallbackMap = new Map(FALLBACK_BLOG_POSTS.map((p) => [p.slug, p]));
      return result.docs.map((d) =>
        mapPostDoc(d as unknown as Record<string, unknown>, fallbackMap.get(String(d.slug)))
      );
    } catch {
      return FALLBACK_BLOG_POSTS;
    }
  },
  ['tanogaido-blog-posts'],
  { revalidate: 60, tags: ['tanogaido-cms'] }
);

export const getBlogPostBySlug = unstable_cache(
  async (slug: string): Promise<BlogPostItem | null> => {
    const posts = await getBlogPosts();
    return posts.find((p) => p.slug === slug) || null;
  },
  ['tanogaido-blog-post-by-slug'],
  { revalidate: 60, tags: ['tanogaido-cms'] }
);

export const getPages = unstable_cache(
  async (): Promise<PageItem[]> => {
    if (!hasDatabaseConfigured()) {
      return FALLBACK_PAGES;
    }
    try {
      const payload = await withTimeout(getPayloadClient());
      const result = await withTimeout(
        payload.find({
          collection: 'pages',
          where: { status: { equals: 'published' } },
          limit: 100,
          sort: 'sortOrder',
          depth: 2,
        })
      );
      if (!result.docs?.length) {
        return FALLBACK_PAGES;
      }
      const fallbackMap = new Map(FALLBACK_PAGES.map((p) => [p.slug, p]));
      return result.docs.map((d) =>
        mapPageDoc(d as unknown as Record<string, unknown>, fallbackMap.get(String(d.slug)))
      );
    } catch {
      return FALLBACK_PAGES;
    }
  },
  ['tanogaido-cms-pages'],
  { revalidate: 60, tags: ['tanogaido-cms'] }
);

export const getPageBySlug = unstable_cache(
  async (slug: string): Promise<PageItem | null> => {
    const pages = await getPages();
    return pages.find((p) => p.slug === slug) || null;
  },
  ['tanogaido-cms-page-by-slug'],
  { revalidate: 60, tags: ['tanogaido-cms'] }
);

