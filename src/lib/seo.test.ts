import test from 'node:test';
import assert from 'node:assert/strict';
import { FALLBACK_PRODUCTS, FALLBACK_SERVICES, FALLBACK_SITE_SETTINGS } from '../data/fallback-data';
import {
  buildAboutPageJsonLd,
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
  buildOrganizationJsonLd,
  buildProductJsonLd,
  buildWebSiteJsonLd,
  normalizeGoogleVerificationToken,
  toAbsoluteUrl,
} from './seo';

test('toAbsoluteUrl safely resolves local paths, proxy paths, and full URLs', () => {
  const origin = 'https://tanogaido.com';
  assert.equal(toAbsoluteUrl('/assets/tokyo.jpg', origin), 'https://tanogaido.com/assets/tokyo.jpg');
  assert.equal(toAbsoluteUrl('media/hero.jpg', origin), 'https://tanogaido.com/media/hero.jpg');
  assert.equal(
    toAbsoluteUrl('https://cdn.example.com/img.webp', origin),
    'https://cdn.example.com/img.webp'
  );
  assert.equal(toAbsoluteUrl('', origin), 'https://tanogaido.com');
});

test('buildOrganizationJsonLd and buildWebSiteJsonLd produce valid TravelAgency and SearchAction schema', () => {
  const origin = 'https://tanogaido.com';
  const org = buildOrganizationJsonLd(FALLBACK_SITE_SETTINGS, origin);
  assert.equal(org['@type'], 'TravelAgency');
  assert.equal(org.name, FALLBACK_SITE_SETTINGS.companyName);
  assert.equal(org.telephone, '+6281318939319');
  assert.equal(org.logo.url, 'https://tanogaido.com/assets/logotano.png');

  const website = buildWebSiteJsonLd(origin);
  assert.equal(website['@type'], 'WebSite');
  assert.equal(
    website.potentialAction.target.urlTemplate,
    'https://tanogaido.com/blog?q={search_term_string}'
  );
});

test('buildProductJsonLd produces Product schema with USD Offer and AggregateRating', () => {
  const origin = 'https://tanogaido.com';
  const product = FALLBACK_PRODUCTS[0];
  const schema = buildProductJsonLd(product, FALLBACK_SITE_SETTINGS, origin);

  assert.equal(schema['@type'], 'Product');
  assert.equal(schema.name, product.title);
  assert.equal(schema.offers.priceCurrency, 'USD');
  assert.equal(schema.offers.price, Number(product.price).toFixed(2));
  assert.equal(schema.offers.url, `https://tanogaido.com/shop/${product.slug}`);
  assert.ok(Array.isArray(schema.image) && schema.image.length >= 1);
  assert.ok(schema.aggregateRating);
});

test('buildCollectionPageJsonLd, buildAboutPageJsonLd, and buildBreadcrumbJsonLd structure lists cleanly', () => {
  const origin = 'https://tanogaido.com';
  const col = buildCollectionPageJsonLd(
    {
      name: 'Our Services',
      description: 'Complete Japan concierge catalog',
      path: '/services',
      items: FALLBACK_SERVICES.slice(0, 3).map((s) => ({
        name: s.title,
        path: `/services/${s.slug}`,
        image: s.imagePath,
      })),
    },
    origin
  );
  assert.equal(col['@type'], 'CollectionPage');
  assert.equal(col.mainEntity.numberOfItems, 3);
  assert.equal(col.mainEntity.itemListElement[0].position, 1);

  const about = buildAboutPageJsonLd(FALLBACK_SITE_SETTINGS, origin);
  assert.equal(about['@type'], 'AboutPage');
  assert.equal(about.url, 'https://tanogaido.com/about');

  const crumbs = buildBreadcrumbJsonLd(
    [
      { name: 'Home', path: '/' },
      { name: 'Shop', path: '/shop' },
    ],
    origin
  );
  assert.equal(crumbs.itemListElement.length, 2);
  assert.equal(crumbs.itemListElement[1].item, 'https://tanogaido.com/shop');
});

test('normalizeGoogleVerificationToken supports raw token and full meta tag strings', () => {
  assert.equal(normalizeGoogleVerificationToken('  abc123XYZ  '), 'abc123XYZ');
  assert.equal(
    normalizeGoogleVerificationToken('<meta name="google-site-verification" content="token-9988" />'),
    'token-9988'
  );
  assert.equal(
    normalizeGoogleVerificationToken("<meta name='google-site-verification' content='singleQuoteTok'>"),
    'singleQuoteTok'
  );
  assert.equal(normalizeGoogleVerificationToken(''), '');
  assert.equal(normalizeGoogleVerificationToken(null), '');
});
