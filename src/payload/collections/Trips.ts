import type { CollectionConfig } from 'payload';
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate';

export const Trips: CollectionConfig = {
  slug: 'trips',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'durationDays', 'priceFrom', 'destination'],
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
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'durationDays',
      type: 'text',
      required: true,
    },
    {
      name: 'priceFrom',
      type: 'number',
      required: true,
    },
    {
      name: 'image',
      type: 'text',
      required: true,
    },
    {
      name: 'imageAlt',
      type: 'text',
      required: true,
    },
    {
      name: 'desc',
      type: 'textarea',
      required: true,
    },
    {
      name: 'destination',
      type: 'text',
      required: true,
    },
    {
      name: 'waText',
      type: 'text',
      required: true,
    },
  ],
};
