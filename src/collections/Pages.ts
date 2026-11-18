import type { CollectionConfig } from 'payload';
import { isReservedPageSlug, slugify } from '@/lib/editorial';
import { triggerRevalidation } from '@/lib/revalidate';
import { wpLexicalEditor } from './wpLexicalEditor';

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'All Pages',
  },
  admin: {
    group: 'Pages',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'showInFooter', 'updatedAt'],
    description: 'Standalone CMS pages served directly at /slug (separate from /blog/slug).',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data;
        const candidateSlug = data.slug ? slugify(String(data.slug)) : slugify(String(data.title || ''));
        if (isReservedPageSlug(candidateSlug)) {
          throw new Error(
            `Slug "${candidateSlug}" is reserved for a core system route (/services, /shop, /blog, /admin, /about, etc.). Please choose another slug.`
          );
        }
        data.slug = candidateSlug;
        if (data.status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
    afterChange: [
      async ({ doc }) => {
        await triggerRevalidation(['/', `/${doc.slug}`, '/sitemap.xml']);
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        await triggerRevalidation(['/', `/${doc.slug}`, '/sitemap.xml']);
      },
    ],
  },
  fields: [
    // Main WordPress-like Page Editor Column
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Root Page Slug (/slug)',
      admin: {
        description: 'Served directly at /<slug>. Reserved system slugs (blog, services, shop, about, admin, api) are blocked.',
      },
    },
    {
      name: 'permalinkPreview',
      type: 'ui',
      admin: {
        components: {
          Field: '/components/admin/PermalinkField#PagePermalinkField',
        },
      },
    },
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'TANOGAIDO GUIDE',
      label: 'Section Eyebrow',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      label: 'Page Lead Subtitle',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Page Body Content',
      editor: wpLexicalEditor,
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'Page FAQ (Generates FAQPage Schema)',
      fields: [
        { name: 'q', type: 'text', required: true, label: 'Question' },
        { name: 'a', type: 'textarea', required: true, label: 'Answer' },
      ],
    },

    // Sidebar Metaboxes
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'published',
      label: 'Publish Status',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Publish Date',
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'uploadedHeroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Banner Image (ImageKit)',
      admin: { position: 'sidebar' },
    },
    {
      name: 'heroImagePath',
      type: 'text',
      label: 'Banner Image Fallback Path',
      admin: { position: 'sidebar' },
    },
    {
      name: 'heroImageAlt',
      type: 'text',
      label: 'Banner Image Alt Text (SEO)',
      admin: { position: 'sidebar' },
    },
    {
      name: 'showToc',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Table of Contents',
      admin: { position: 'sidebar' },
    },
    {
      name: 'enableAutoInternalLinks',
      type: 'checkbox',
      defaultValue: true,
      label: 'Enable Automatic Internal Links',
      admin: { position: 'sidebar' },
    },
    {
      name: 'showInFooter',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show Link in Site Footer',
      admin: { position: 'sidebar' },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 1,
      label: 'Footer Order',
      admin: { position: 'sidebar' },
    },
    {
      name: 'internalKeywords',
      type: 'array',
      label: 'Auto-Internal Link Keywords',
      admin: {
        position: 'sidebar',
        description: 'Articles mentioning these phrases automatically link to /<slug>.',
      },
      fields: [{ name: 'keyword', type: 'text', required: true }],
    },
    {
      name: 'seoPreview',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '/components/admin/SeoMetaboxField#PageSeoMetaboxField',
        },
      },
    },
    {
      name: 'focusKeyword',
      type: 'text',
      label: 'Focus Keyword',
      admin: { position: 'sidebar' },
    },
    {
      name: 'seoTitle',
      type: 'text',
      label: 'SEO Title (30–60 chars)',
      admin: { position: 'sidebar' },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'SEO Meta Description (120–160 chars)',
      admin: { position: 'sidebar' },
    },
    {
      name: 'canonicalUrl',
      type: 'text',
      label: 'Canonical URL Override (Optional)',
      admin: { position: 'sidebar' },
    },
    {
      name: 'noIndex',
      type: 'checkbox',
      defaultValue: false,
      label: 'Discourage search engines (noindex)',
      admin: { position: 'sidebar' },
    },
  ],
};
