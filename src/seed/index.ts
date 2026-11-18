import fs from 'node:fs';
import path from 'node:path';
import { getPayload } from 'payload';

function loadLocalEnv() {
  for (const filename of ['.env.local', '.env']) {
    const filePath = path.resolve(process.cwd(), filename);
    if (!fs.existsSync(filePath)) continue;
    const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx <= 0) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

loadLocalEnv();
import config from '../payload.config';
import {
  FALLBACK_PRODUCTS,
  FALLBACK_SERVICES,
  FALLBACK_SITE_SETTINGS,
  FALLBACK_TESTIMONIALS,
  FALLBACK_TRIPS,
} from '../data/fallback-data';

const ADMIN_USERNAME = process.env.SEED_ADMIN_USERNAME || 'admin';
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin@tanogaido.com';
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'TanogaidoAdmin2026!';

async function seed() {
  console.log('Connecting to MongoDB via Payload CMS...');
  const payload = await getPayload({ config });

  // 1. Admin User (username + email login)
  const existingUsers = await payload.find({
    collection: 'users',
    where: {
      or: [{ username: { equals: ADMIN_USERNAME } }, { email: { equals: ADMIN_EMAIL } }],
    },
    limit: 1,
  });

  if (existingUsers.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: {
        username: ADMIN_USERNAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        name: 'Tanogaido Super Admin',
        role: 'admin',
      },
    });
    console.log(`Created admin user -> username: "${ADMIN_USERNAME}", email: "${ADMIN_EMAIL}"`);
  } else {
    console.log(`Admin user already exists -> username: "${existingUsers.docs[0].username}"`);
  }

  // 2. Services (20 items)
  for (const s of FALLBACK_SERVICES) {
    const existing = await payload.find({
      collection: 'services',
      where: { slug: { equals: s.slug } },
      limit: 1,
    });
    const data = {
      slug: s.slug,
      title: s.title,
      category: s.category,
      homeCategory: (s.homeCategory || undefined) as
        | 'tours'
        | 'passes'
        | 'visa'
        | 'luxury'
        | 'wellness'
        | undefined,
      categoryLabel: s.categoryLabel,
      kicker: s.kicker,
      shortDesc: s.shortDesc,
      imagePath: s.imagePath,
      heroImagePath: s.heroImagePath,
      heroImageAlt: s.heroImageAlt,
      detailImagePath: s.detailImagePath,
      detailImageAlt: s.detailImageAlt,
      homeTag: s.homeCardTag || s.kicker,
      homeSubtitle: s.homeCardSubtitle || s.shortDesc,
      features: s.features.map((text) => ({ text })),
      seoTitle: s.seoTitle,
      metaDescription: s.metaDescription,
      keywords: s.keywords,
      eyebrow: s.eyebrow,
      h1Lead: s.h1Lead,
      h1Accent: s.h1Accent,
      heroDesc: s.heroDesc,
      stats: s.stats,
      highlights: s.highlights,
      overviewTitle: s.overviewTitle,
      overviewText: s.overviewText,
      included: s.included.map((text) => ({ text })),
      steps: s.steps,
      faqs: s.faqs,
      relatedSlugs: s.relatedSlugs.map((slug) => ({ slug })),
      waText: s.waText,
      showOnHome: s.showOnHome,
      homeSortOrder: s.homeSortOrder,
      sortOrder: s.sortOrder,
    };

    if (existing.docs.length > 0) {
      await payload.update({ collection: 'services', id: existing.docs[0].id, data });
    } else {
      await payload.create({ collection: 'services', data });
    }
  }
  console.log(`Synced ${FALLBACK_SERVICES.length} services.`);

  // 3. Products (8 items)
  for (const p of FALLBACK_PRODUCTS) {
    const existing = await payload.find({
      collection: 'products',
      where: { slug: { equals: p.slug } },
      limit: 1,
    });
    const data = {
      slug: p.slug,
      title: p.title,
      origin: p.origin,
      categoryLabel: p.categoryLabel,
      category: p.category,
      status: p.status,
      rating: p.rating,
      reviewCount: p.reviewCount,
      price: p.price,
      priceJpy: p.priceJpy,
      imagePath: p.imagePath,
      gallery: p.gallery,
      shortDesc: p.shortDesc,
      craftStory: p.craftStory,
      variants: p.variants.map((name) => ({ name })),
      specs: p.specs.map((text) => ({ text })),
      shippingNote: p.shippingNote,
      featured: p.featured,
      sortOrder: p.sortOrder,
    };

    if (existing.docs.length > 0) {
      await payload.update({ collection: 'products', id: existing.docs[0].id, data });
    } else {
      await payload.create({ collection: 'products', data });
    }
  }
  console.log(`Synced ${FALLBACK_PRODUCTS.length} products.`);

  // 4. Featured Trips (3 items)
  for (const t of FALLBACK_TRIPS) {
    const existing = await payload.find({
      collection: 'trips',
      where: { slug: { equals: t.slug } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      await payload.update({ collection: 'trips', id: existing.docs[0].id, data: t });
    } else {
      await payload.create({ collection: 'trips', data: t });
    }
  }
  console.log(`Synced ${FALLBACK_TRIPS.length} featured trips.`);

  // 5. Testimonials (6 items)
  const existingReviews = await payload.find({ collection: 'testimonials', limit: 20 });
  if (existingReviews.docs.length === 0) {
    for (const r of FALLBACK_TESTIMONIALS) {
      await payload.create({
        collection: 'testimonials',
        data: {
          author: r.author,
          trip: r.trip,
          quote: r.quote,
          avatarPath: r.avatarPath,
          sortOrder: r.sortOrder,
        },
      });
    }
    console.log(`Created ${FALLBACK_TESTIMONIALS.length} testimonials.`);
  } else {
    console.log(`Testimonials already present (${existingReviews.docs.length}).`);
  }

  // 6. SiteSettings global
  await payload.updateGlobal({
    slug: 'site-settings',
    data: FALLBACK_SITE_SETTINGS,
  });
  console.log('Updated site-settings global.');
  console.log('Seed completed successfully.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
