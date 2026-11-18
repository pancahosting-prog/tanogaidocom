import type {
  ProductItem,
  ServiceItem,
  SiteSettingsData,
} from '@/types/cms';
import { getSiteOrigin } from './editorial';

export function toAbsoluteUrl(
  pathOrUrl: string | undefined | null,
  siteOrigin: string = getSiteOrigin()
): string {
  const raw = String(pathOrUrl || '').trim();
  if (!raw) return siteOrigin;
  if (/^https?:\/\//i.test(raw)) return raw;
  const normalizedPath = raw.startsWith('/') ? raw : `/${raw}`;
  return `${siteOrigin}${normalizedPath}`;
}

export function normalizeGoogleVerificationToken(input: string | undefined | null): string {
  const raw = String(input || '').trim();
  if (!raw) return '';
  const metaMatch = raw.match(/content\s*=\s*["']([^"']+)["']/i);
  if (metaMatch?.[1]) {
    return metaMatch[1].trim();
  }
  return raw;
}

export function buildOrganizationJsonLd(
  siteSettings: SiteSettingsData,
  siteOrigin: string = getSiteOrigin()
) {
  const companyName = siteSettings.companyName || 'PT. Tanogaido Fantasi Pratama';
  const rawPhone = String(siteSettings.whatsappNumber || '6281318939319').replace(/\D/g, '');
  const formattedPhone = rawPhone.startsWith('62') ? `+${rawPhone}` : `+62${rawPhone}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${siteOrigin}/#organization`,
    name: companyName,
    alternateName: 'Tanogaido',
    url: siteOrigin,
    logo: {
      '@type': 'ImageObject',
      url: toAbsoluteUrl('/assets/logotano.png', siteOrigin),
    },
    image: toAbsoluteUrl('/assets/tokyo-pulse.jpg', siteOrigin),
    description:
      'PT. Tanogaido Fantasi Pratama (est. 2007) — Licensed bilingual Japan tour guides, private Japan tours, Japan visa concierge, JR Pass tickets, airport transfers, and curated Japanese artisan goods.',
    foundingDate: '2007',
    telephone: formattedPhone,
    email: siteSettings.email || 'tanogaidocom@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        siteSettings.address ||
        'Jl. Boulevard Artha Gading, Blok A6B No. 32 Kelapa Gading',
      addressLocality: 'Jakarta Utara',
      addressRegion: 'DKI Jakarta',
      addressCountry: 'ID',
    },
    areaServed: [
      { '@type': 'Country', name: 'Japan' },
      { '@type': 'Country', name: 'Indonesia' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: formattedPhone,
      email: siteSettings.email || 'tanogaidocom@gmail.com',
      contactType: 'customer service',
      availableLanguage: ['Indonesian', 'English', 'Japanese'],
    },
    sameAs: [
      'https://instagram.com/tanogaido',
      'https://facebook.com/tanogaido',
      'https://youtube.com/@tanogaido',
    ],
  };
}

export function buildWebSiteJsonLd(siteOrigin: string = getSiteOrigin()) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteOrigin}/#website`,
    name: 'Tanogaido',
    url: siteOrigin,
    inLanguage: ['en', 'id'],
    publisher: {
      '@id': `${siteOrigin}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteOrigin}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[],
  siteOrigin: string = getSiteOrigin()
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path, siteOrigin),
    })),
  };
}

export function buildCollectionPageJsonLd(
  params: {
    name: string;
    description: string;
    path: string;
    items: { name: string; path: string; image?: string }[];
  },
  siteOrigin: string = getSiteOrigin()
) {
  const pageUrl = toAbsoluteUrl(params.path, siteOrigin);
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: params.name,
    description: params.description,
    url: pageUrl,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: params.items.length,
      itemListElement: params.items.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        url: toAbsoluteUrl(item.path, siteOrigin),
        ...(item.image ? { image: toAbsoluteUrl(item.image, siteOrigin) } : {}),
      })),
    },
  };
}

export function buildAboutPageJsonLd(
  siteSettings: SiteSettingsData,
  siteOrigin: string = getSiteOrigin()
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${siteSettings.companyName || 'PT. Tanogaido Fantasi Pratama'}`,
    description:
      'Connecting Indonesia and Japan since 2007 through licensed tour guiding, visa assistance, rail passes, study consultation, and curated Japanese goods.',
    url: toAbsoluteUrl('/about', siteOrigin),
    mainEntity: {
      '@id': `${siteOrigin}/#organization`,
    },
  };
}

export function buildProductJsonLd(
  product: ProductItem,
  siteSettings: SiteSettingsData,
  siteOrigin: string = getSiteOrigin()
) {
  const productUrl = toAbsoluteUrl(`/shop/${product.slug}`, siteOrigin);
  const images = [
    product.imagePath,
    ...(product.gallery || []).map((g) => g.src),
  ]
    .filter(Boolean)
    .map((src) => toAbsoluteUrl(src, siteOrigin));

  const uniqueImages = Array.from(new Set(images));
  const isAvailable = !/sold out|out of stock/i.test(product.status || '');

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.shortDesc,
    sku: product.slug,
    category: product.categoryLabel,
    image: uniqueImages,
    brand: {
      '@type': 'Brand',
      name: `Tanogaido Curated (${product.origin})`,
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'USD',
      price: Number(product.price || 0).toFixed(2),
      availability: isAvailable
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: siteSettings.companyName || 'PT. Tanogaido Fantasi Pratama',
      },
    },
    ...(product.reviewCount > 0 && Number(product.rating) > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: Number(product.rating).toFixed(1),
            reviewCount: product.reviewCount,
          },
        }
      : {}),
  };
}

export function buildHomeServicesItemListJsonLd(
  services: ServiceItem[],
  siteOrigin: string = getSiteOrigin()
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Tanogaido Featured Japan Services',
    itemListElement: services.slice(0, 10).map((svc, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: svc.title,
      url: toAbsoluteUrl(`/services/${svc.slug}`, siteOrigin),
    })),
  };
}
