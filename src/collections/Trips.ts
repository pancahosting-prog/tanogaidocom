import type { CollectionConfig } from 'payload';
import { triggerRevalidation } from '@/lib/revalidate';

export const Trips: CollectionConfig = {
  slug: 'trips',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'daysLabel', 'locationLabel', 'priceFrom', 'sortOrder'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async () => {
        await triggerRevalidation(['/']);
      },
    ],
    afterDelete: [
      async () => {
        await triggerRevalidation(['/']);
      },
    ],
  },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'title', type: 'text', required: true },
    { name: 'daysLabel', type: 'text', required: true },
    { name: 'locationLabel', type: 'text', required: true },
    { name: 'priceFrom', type: 'text', required: true },
    { name: 'shortDesc', type: 'textarea', required: true },
    { name: 'imagePath', type: 'text', required: true },
    {
      name: 'uploadedImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Upload Trip Image (ImageKit Proxy)',
    },
    { name: 'waText', type: 'text', required: true },
    { name: 'sortOrder', type: 'number', defaultValue: 1 },
  ],
};
