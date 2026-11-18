import type { CollectionConfig } from 'payload';
import { slugify } from '@/lib/editorial';
import { triggerRevalidation } from '@/lib/revalidate';
import { wpLexicalEditor } from './wpLexicalEditor';

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Post',
    plural: 'All Posts',
  },
  admin: {
    group: 'Posts',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'featured', 'publishedAt'],
    description: 'Write and publish Japan travel articles at /blog/slug with auto-TOC, internal links & Schema.org SEO.',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data;
        if (!data.slug && data.title) {
          data.slug = slugify(String(data.title));
        } else if (data.slug) {
          data.slug = slugify(String(data.slug));
        }
        if (data.status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
    afterChange: [
      async ({ doc }) => {
        await triggerRevalidation(['/', '/blog', `/blog/${doc.slug}`, '/sitemap.xml']);
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        await triggerRevalidation(['/', '/blog', `/blog/${doc.slug}`, '/sitemap.xml']);
      },
    ],
  },
  fields: [
    // Main WordPress-like Editor Column
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Add Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'URL Slug',
      admin: {
        description: 'Auto-generated from title if empty. Published at /blog/<slug>.',
      },
    },
    {
      name: 'permalinkPreview',
      type: 'ui',
      admin: {
        components: {
          Field: '/components/admin/PermalinkField#BlogPermalinkField',
        },
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Excerpt / Lead Summary',
      admin: {
        description: 'Shown on blog cards and used as default SEO meta description.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Article Content (H2–H4 headings automatically build Table of Contents)',
      editor: wpLexicalEditor,
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'Article FAQ (Generates FAQPage Rich Snippet Schema)',
      fields: [
        { name: 'q', type: 'text', required: true, label: 'Question' },
        { name: 'a', type: 'textarea', required: true, label: 'Answer' },
      ],
    },

    // Right Sidebar Metaboxes (WordPress Publish / Featured Image / Taxonomy / SEO)
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
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Feature as Hero Post on /blog',
      admin: { position: 'sidebar' },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Category',
      admin: { position: 'sidebar' },
    },
    {
      name: 'uploadedCover',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image (ImageKit)',
      admin: { position: 'sidebar' },
    },
    {
      name: 'coverImagePath',
      type: 'text',
      label: 'Featured Image Fallback Path',
      defaultValue: '/assets/tokyo-pulse.jpg',
      admin: {
        position: 'sidebar',
        description: 'Used when no ImageKit media is attached above.',
      },
    },
    {
      name: 'coverImageAlt',
      type: 'text',
      label: 'Featured Image Alt Text (SEO)',
      admin: { position: 'sidebar' },
    },
    {
      name: 'authorName',
      type: 'text',
      defaultValue: 'Rina Takahashi',
      label: 'Author Name',
      admin: { position: 'sidebar' },
    },
    {
      name: 'authorRole',
      type: 'text',
      defaultValue: 'Japan Travel Concierge',
      label: 'Author Role',
      admin: { position: 'sidebar' },
    },
    {
      name: 'authorAvatarMedia',
      type: 'upload',
      relationTo: 'media',
      label: 'Author Avatar (ImageKit)',
      admin: { position: 'sidebar' },
    },
    {
      name: 'authorAvatarPath',
      type: 'text',
      defaultValue: '/assets/avatars/traveler-1.jpg',
      label: 'Author Avatar Fallback Path',
      admin: { position: 'sidebar' },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      admin: { position: 'sidebar' },
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    {
      name: 'internalKeywords',
      type: 'array',
      label: 'Auto-Internal Link Keywords',
      admin: {
        position: 'sidebar',
        description: 'Other articles/pages mentioning these phrases will automatically link to this post.',
      },
      fields: [{ name: 'keyword', type: 'text', required: true }],
    },
    {
      name: 'enableToc',
      type: 'checkbox',
      defaultValue: true,
      label: 'Enable Automatic Table of Contents',
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
      name: 'seoPreview',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '/components/admin/SeoMetaboxField#BlogSeoMetaboxField',
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
