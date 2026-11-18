import type { CollectionConfig } from 'payload';
import { triggerRevalidation } from '@/lib/revalidate';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    group: 'Tanogaido',
    useAsTitle: 'author',
    defaultColumns: ['author', 'trip', 'sortOrder'],
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
    { name: 'author', type: 'text', required: true },
    { name: 'trip', type: 'text', required: true },
    { name: 'quote', type: 'textarea', required: true },
    { name: 'avatarPath', type: 'text', required: true },
    {
      name: 'uploadedAvatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Upload Avatar (ImageKit Proxy)',
    },
    { name: 'sortOrder', type: 'number', defaultValue: 1 },
  ],
};
