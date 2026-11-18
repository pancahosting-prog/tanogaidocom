import { getPayload } from 'payload';
import configPromise from '../payload.config';
import { SERVICES } from '../data/services';
import { PRODUCTS } from '../data/products';
import { FEATURED_TRIPS, TESTIMONIALS, SITE_SETTINGS } from '../data/site-content';

async function seed() {
  console.log('🚀 Starting Tanogaido Payload CMS MongoDB Seed Process...');

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri || !mongoUri.trim()) {
    console.warn('⚠️  MONGODB_URI is not set in environment. Using default local fallback or check .env.');
  }

  const payload = await getPayload({ config: configPromise });

  // 1. Seed or Verify Admin User
  const adminUsername = process.env.PAYLOAD_ADMIN_USERNAME || 'admin_tanogaido';
  const adminEmail = process.env.PAYLOAD_ADMIN_EMAIL || 'admin@tanogaido.com';
  const adminPassword = process.env.PAYLOAD_ADMIN_PASSWORD || 'ChangeMeTanogaido2026!';

  try {
    const existingUsers = await payload.find({
      collection: 'users',
      where: {
        or: [
          { username: { equals: adminUsername } },
          { email: { equals: adminEmail } },
        ],
      },
      limit: 1,
    });

    if (existingUsers.totalDocs === 0) {
      console.log(`👤 Creating default admin user: ${adminUsername} (${adminEmail})...`);
      await payload.create({
        collection: 'users',
        data: {
          username: adminUsername,
          email: adminEmail,
          password: adminPassword,
          role: 'admin',
        },
      });
      console.log('✅ Admin user created successfully!');
    } else {
      console.log(`ℹ️  Admin user already exists (${adminUsername} / ${adminEmail}). Skipping creation.`);
    }
  } catch (err) {
    console.error('❌ Error checking/creating admin user:', err);
  }

  // 2. Seed Services
  console.log(`📦 Seeding ${SERVICES.length} Services...`);
  for (const svc of SERVICES) {
    try {
      const existing = await payload.find({
        collection: 'services',
        where: { slug: { equals: svc.id } },
        limit: 1,
      });

      const svcData = {
        title: svc.title,
        slug: svc.id,
        category: svc.category,
        categoryLabel: svc.categoryLabel,
        kicker: svc.kicker,
        shortDesc: svc.shortDesc,
        image: svc.image,
        features: svc.features.map((item) => ({ item })),
        seoTitle: svc.seoTitle,
        metaDescription: svc.metaDescription,
        keywords: svc.keywords,
        eyebrow: svc.eyebrow,
        h1Lead: svc.h1Lead,
        h1Accent: svc.h1Accent,
        heroDesc: svc.heroDesc,
        heroImage: svc.heroImage,
        heroImageAlt: svc.heroImageAlt,
        detailImage: svc.detailImage,
        detailImageAlt: svc.detailImageAlt,
        stats: svc.stats,
        highlights: svc.highlights,
        overviewTitle: svc.overviewTitle,
        overviewText: svc.overviewText,
        included: svc.included.map((item) => ({ item })),
        steps: svc.steps,
        faqs: svc.faqs,
        relatedIds: svc.relatedIds.map((slug) => ({ serviceSlug: slug })),
        waText: svc.waText,
        homeCard: svc.homeCard
          ? {
              categoryTab: svc.homeCard.categoryTab as any,
              kicker: svc.homeCard.kicker,
              title: svc.homeCard.title,
              shortDesc: svc.homeCard.shortDesc,
              thumb: svc.homeCard.thumb,
              backTitle: svc.homeCard.backTitle,
              backSub: svc.homeCard.backSub,
              backBullets: svc.homeCard.backBullets.map((item) => ({ item })),
            }
          : undefined,
      };

      if (existing.totalDocs === 0) {
        await payload.create({
          collection: 'services',
          data: svcData,
        });
      } else {
        await payload.update({
          collection: 'services',
          id: existing.docs[0].id,
          data: svcData,
        });
      }
    } catch (err) {
      console.error(`Failed to seed service: ${svc.id}`, err);
    }
  }
  console.log('✅ Services synced successfully.');

  // 3. Seed Products
  console.log(`📦 Seeding ${PRODUCTS.length} Products...`);
  for (const prod of PRODUCTS) {
    try {
      const existing = await payload.find({
        collection: 'products',
        where: { slug: { equals: prod.id } },
        limit: 1,
      });

      const prodData = {
        title: prod.title,
        slug: prod.id,
        origin: prod.origin,
        categoryLabel: prod.categoryLabel,
        category: prod.category,
        status: prod.status,
        rating: prod.rating,
        reviewCount: prod.reviewCount,
        price: prod.price,
        priceJpy: prod.priceJpy,
        image: prod.image,
        gallery: prod.gallery,
        shortDesc: prod.shortDesc,
        craftStory: prod.craftStory,
        variants: prod.variants.map((v: any) => ({ name: typeof v === 'string' ? v : v.name })),
        specs: Array.isArray(prod.specs) ? prod.specs.map((spec: any) => ({ spec: typeof spec === 'string' ? spec : spec.spec })) : [],
        shippingNote: prod.shippingNote,
        featured: prod.featured,
      };

      if (existing.totalDocs === 0) {
        await payload.create({
          collection: 'products',
          data: prodData,
        });
      } else {
        await payload.update({
          collection: 'products',
          id: existing.docs[0].id,
          data: prodData,
        });
      }
    } catch (err) {
      console.error(`Failed to seed product: ${prod.id}`, err);
    }
  }
  console.log('✅ Products synced successfully.');

  // 4. Seed Trips
  console.log(`📦 Seeding ${FEATURED_TRIPS.length} Featured Trips...`);
  for (const trip of FEATURED_TRIPS) {
    try {
      const existing = await payload.find({
        collection: 'trips',
        where: { slug: { equals: trip.id } },
        limit: 1,
      });

      const tripData = {
        title: trip.title,
        slug: trip.id,
        durationDays: trip.durationDays,
        priceFrom: trip.priceFrom,
        image: trip.image,
        imageAlt: trip.imageAlt,
        desc: trip.desc,
        destination: trip.destination,
        waText: trip.waText,
      };

      if (existing.totalDocs === 0) {
        await payload.create({
          collection: 'trips',
          data: tripData,
        });
      } else {
        await payload.update({
          collection: 'trips',
          id: existing.docs[0].id,
          data: tripData,
        });
      }
    } catch (err) {
      console.error(`Failed to seed trip: ${trip.id}`, err);
    }
  }
  console.log('✅ Featured Trips synced successfully.');

  // 5. Seed Testimonials
  console.log(`📦 Seeding ${TESTIMONIALS.length} Testimonials...`);
  for (const t of TESTIMONIALS) {
    try {
      const existing = await payload.find({
        collection: 'testimonials',
        where: { author: { equals: t.author } },
        limit: 1,
      });

      if (existing.totalDocs === 0) {
        await payload.create({
          collection: 'testimonials',
          data: {
            author: t.author,
            avatar: t.avatar,
            quote: t.quote,
            trip: t.trip,
          },
        });
      }
    } catch (err) {
      console.error(`Failed to seed testimonial for: ${t.author}`, err);
    }
  }
  console.log('✅ Testimonials synced successfully.');

  // 6. Seed SiteSettings Global
  try {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: SITE_SETTINGS,
    });
    console.log('✅ Site Settings global updated successfully.');
  } catch (err) {
    console.error('Failed to update SiteSettings global:', err);
  }

  console.log('\n======================================================');
  console.log('🎉 Tanogaido Payload CMS + MongoDB Seed Finished!');
  console.log(`🔑 Admin URL: /admin`);
  console.log(`👤 Username : ${adminUsername}`);
  console.log(`📧 Email    : ${adminEmail}`);
  console.log(`🔐 Password : ${adminPassword}`);
  console.log('======================================================\n');

  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Fatal error during seed:', err);
  process.exit(1);
});
