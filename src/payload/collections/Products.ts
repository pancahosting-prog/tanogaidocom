import type { CollectionConfig } from 'payload';
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate';

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'price', 'featured', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateCollection('/shop'), revalidateCollection('/product')],
    afterDelete: [revalidateCollectionDelete('/shop'), revalidateCollectionDelete('/product')],
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
      name: 'origin',
      type: 'text',
      required: true,
    },
    {
      name: 'categoryLabel',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Ceramics & Tea', value: 'tea' },
        { label: 'Travel Essentials', value: 'travel' },
        { label: 'Artisan Craft', value: 'craft' },
        { label: 'Home & Fragrance', value: 'home' },
      ],
    },
    {
      name: 'status',
      type: 'text',
      required: true,
    },
    {
      name: 'rating',
      type: 'text',
      defaultValue: '5.0',
    },
    {
      name: 'reviewCount',
      type: 'number',
      defaultValue: 25,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'priceJpy',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'text',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'src', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'shortDesc',
      type: 'textarea',
      required: true,
    },
    {
      name: 'craftStory',
      type: 'textarea',
      required: true,
    },
    {
      name: 'variants',
      type: 'array',
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    {
      name: 'specs',
      type: 'array',
      fields: [{ name: 'spec', type: 'text', required: true }],
    },
    {
      name: 'shippingNote',
      type: 'text',
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
};
