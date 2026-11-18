import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Services } from './collections/Services';
import { Products } from './collections/Products';
import { Trips } from './collections/Trips';
import { Testimonials } from './collections/Testimonials';
import { Subscribers } from './collections/Subscribers';
import { Orders } from './collections/Orders';
import { SiteSettings } from './globals/SiteSettings';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Tanogaido CMS',
    },
  },
  collections: [
    Users,
    Media,
    Services,
    Products,
    Trips,
    Testimonials,
    Subscribers,
    Orders,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'tanogaido-dev-secret-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tanogaido',
    connectOptions: {
      serverSelectionTimeoutMS: process.env.MONGODB_URI ? 10000 : 2500,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 20000,
    },
  }),
  sharp,
});
