import type { CollectionConfig } from 'payload';
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'kicker', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateCollection('/services')],
    afterDelete: [revalidateCollectionDelete('/services')],
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
      admin: {
        description: 'URL identifier (e.g. japan-tour-guide)',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Tours & Guides', value: 'tours' },
        { label: 'Visa Concierge', value: 'visa' },
        { label: 'Transport & Passes', value: 'transport' },
        { label: 'Specialty & Golf', value: 'specialty' },
        { label: 'Shopping & Essentials', value: 'essentials' },
      ],
    },
    {
      name: 'categoryLabel',
      type: 'text',
      required: true,
    },
    {
      name: 'kicker',
      type: 'text',
      required: true,
    },
    {
      name: 'shortDesc',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      type: 'text',
      required: true,
      admin: {
        description: 'Path or URL to primary catalog card image (e.g. /assets/cards/card-4.jpg)',
      },
    },
    {
      name: 'features',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'seoTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'keywords',
      type: 'text',
      required: true,
    },
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
    },
    {
      name: 'h1Lead',
      type: 'text',
      required: true,
    },
    {
      name: 'h1Accent',
      type: 'text',
      required: true,
    },
    {
      name: 'heroDesc',
      type: 'textarea',
      required: true,
    },
    {
      name: 'heroImage',
      type: 'text',
      required: true,
    },
    {
      name: 'heroImageAlt',
      type: 'text',
      required: true,
    },
    {
      name: 'detailImage',
      type: 'text',
      required: true,
    },
    {
      name: 'detailImageAlt',
      type: 'text',
      required: true,
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'val', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'textarea', required: true },
      ],
    },
    {
      name: 'overviewTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'overviewText',
      type: 'textarea',
      required: true,
    },
    {
      name: 'included',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'steps',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'textarea', required: true },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      fields: [
        { name: 'q', type: 'text', required: true },
        { name: 'a', type: 'textarea', required: true },
      ],
    },
    {
      name: 'relatedIds',
      type: 'array',
      fields: [{ name: 'serviceSlug', type: 'text', required: true }],
    },
    {
      name: 'waText',
      type: 'text',
      required: true,
    },
    {
      name: 'homeCard',
      type: 'group',
      admin: {
        description: 'Optional override when this service is featured in the 12 3D flip cards on the home page',
      },
      fields: [
        {
          name: 'categoryTab',
          type: 'select',
          options: [
            { label: 'Tours & Guides', value: 'tours' },
            { label: 'Transport & Rail', value: 'transport' },
            { label: 'Visa & WiFi', value: 'visa-wifi' },
            { label: 'Theme Parks', value: 'parks' },
            { label: 'Shopping & Studio', value: 'shopping' },
          ],
        },
        { name: 'kicker', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'shortDesc', type: 'textarea' },
        { name: 'thumb', type: 'text' },
        { name: 'backTitle', type: 'text' },
        { name: 'backSub', type: 'textarea' },
        {
          name: 'backBullets',
          type: 'array',
          fields: [{ name: 'item', type: 'text', required: true }],
        },
      ],
    },
  ],
};
