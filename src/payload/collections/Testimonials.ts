import type { CollectionConfig } from 'payload';
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'trip', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateCollection('/')],
    afterDelete: [revalidateCollectionDelete('/')],
  },
  fields: [
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'avatar',
      type: 'text',
      required: true,
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'trip',
      type: 'text',
      required: true,
    },
  ],
};
