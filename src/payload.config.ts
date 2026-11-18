import path from 'path';
import { fileURLToPath } from 'url';
import { buildConfig } from 'payload';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { seoPlugin } from '@payloadcms/plugin-seo';
import sharp from 'sharp';

import { Users } from './payload/collections/Users';
import { Media } from './payload/collections/Media';
import { Services } from './payload/collections/Services';
import { Products } from './payload/collections/Products';
import { Trips } from './payload/collections/Trips';
import { Testimonials } from './payload/collections/Testimonials';
import { NewsletterSubscribers } from './payload/collections/NewsletterSubscribers';
import { SiteSettingsGlobal } from './payload/globals/SiteSettings';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Services,
    Products,
    Trips,
    Testimonials,
    NewsletterSubscribers,
  ],
  globals: [
    SiteSettingsGlobal,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'tanogaido-payload-secret-key-32-chars-long',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tanogaido',
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['services', 'products'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc?.title ? `${doc.title} — ` : ''}Tanogaido`,
      generateDescription: ({ doc }) => (doc?.shortDesc as string) || (doc?.metaDescription as string) || 'Tanogaido — Your Gateway to Japan.',
    }),
  ],
});
