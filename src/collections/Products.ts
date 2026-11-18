import type { CollectionConfig } from 'payload';
import { triggerRevalidation } from '@/lib/revalidate';

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    group: 'Tanogaido',
    useAsTitle: 'title',
    defaultColumns: ['title', 'origin', 'categoryLabel', 'price', 'featured'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        await triggerRevalidation(['/', '/shop', '/product', `/shop/${doc.slug}`]);
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        await triggerRevalidation(['/', '/shop', '/product', `/shop/${doc.slug}`]);
      },
    ],
  },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'title', type: 'text', required: true },
    { name: 'origin', type: 'text', required: true },
    { name: 'categoryLabel', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Tea & Ceramics', value: 'tea' },
        { label: 'Travel & Rail Gear', value: 'travel' },
        { label: 'Artisan Crafts', value: 'craft' },
        { label: 'Home Sanctuary', value: 'home' },
      ],
    },
    { name: 'status', type: 'text', required: true },
    { name: 'rating', type: 'text', required: true, defaultValue: '4.9' },
    { name: 'reviewCount', type: 'number', required: true, defaultValue: 20 },
    { name: 'price', type: 'number', required: true },
    { name: 'priceJpy', type: 'text', required: true },
    { name: 'imagePath', type: 'text', required: true },
    {
      name: 'uploadedImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Upload Product Image (ImageKit Proxy)',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'src', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    { name: 'shortDesc', type: 'textarea', required: true },
    { name: 'craftStory', type: 'textarea', required: true },
    {
      name: 'variants',
      type: 'array',
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    {
      name: 'specs',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'shippingNote', type: 'text', required: true },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'sortOrder', type: 'number', defaultValue: 99 },
  ],
};
