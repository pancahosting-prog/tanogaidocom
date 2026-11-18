import type { CollectionConfig } from 'payload';
import { triggerRevalidation } from '@/lib/revalidate';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'categoryLabel', 'slug', 'showOnHome', 'sortOrder'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        await triggerRevalidation(['/', '/services', `/services/${doc.slug}`]);
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        await triggerRevalidation(['/', '/services', `/services/${doc.slug}`]);
      },
    ],
  },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'title', type: 'text', required: true },
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
      name: 'homeCategory',
      type: 'select',
      options: [
        { label: 'Tours & Guides', value: 'tours' },
        { label: 'Passes & Tickets', value: 'passes' },
        { label: 'Visa Services', value: 'visa' },
        { label: 'Luxury & Golf', value: 'luxury' },
        { label: 'Shopping & More', value: 'wellness' },
      ],
    },
    { name: 'categoryLabel', type: 'text', required: true },
    { name: 'kicker', type: 'text', required: true },
    { name: 'shortDesc', type: 'textarea', required: true },
    { name: 'imagePath', type: 'text', required: true },
    { name: 'heroImagePath', type: 'text', required: true },
    { name: 'heroImageAlt', type: 'text', required: true },
    { name: 'detailImagePath', type: 'text', required: true },
    { name: 'detailImageAlt', type: 'text', required: true },
    { name: 'homeTag', type: 'text' },
    { name: 'homeSubtitle', type: 'text' },
    {
      name: 'features',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
    { name: 'seoTitle', type: 'text', required: true },
    { name: 'metaDescription', type: 'textarea', required: true },
    { name: 'keywords', type: 'text', required: true },
    { name: 'eyebrow', type: 'text', required: true },
    { name: 'h1Lead', type: 'text', required: true },
    { name: 'h1Accent', type: 'text', required: true },
    { name: 'heroDesc', type: 'textarea', required: true },
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
    { name: 'overviewTitle', type: 'text', required: true },
    { name: 'overviewText', type: 'textarea', required: true },
    {
      name: 'included',
      type: 'array',
      fields: [{ name: 'text', type: 'text', required: true }],
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
      name: 'relatedSlugs',
      type: 'array',
      fields: [{ name: 'slug', type: 'text', required: true }],
    },
    { name: 'waText', type: 'text', required: true },
    { name: 'showOnHome', type: 'checkbox', defaultValue: false },
    { name: 'homeSortOrder', type: 'number', defaultValue: 99 },
    { name: 'sortOrder', type: 'number', defaultValue: 99 },
  ],
};
