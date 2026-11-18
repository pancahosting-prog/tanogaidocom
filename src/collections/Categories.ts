import type { CollectionConfig } from 'payload';
import { slugify } from '@/lib/editorial';
import { triggerRevalidation } from '@/lib/revalidate';

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Category',
    plural: 'Categories',
  },
  admin: {
    group: 'Posts',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'description'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data;
        if (!data.slug && data.name) {
          data.slug = slugify(String(data.name));
        } else if (data.slug) {
          data.slug = slugify(String(data.slug));
        }
        return data;
      },
    ],
    afterChange: [
      async () => {
        await triggerRevalidation(['/blog', '/sitemap.xml']);
      },
    ],
    afterDelete: [
      async () => {
        await triggerRevalidation(['/blog', '/sitemap.xml']);
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Category Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-friendly category slug (auto-generated from Name if left empty).',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'seoTitle',
      type: 'text',
      label: 'SEO Title (Optional)',
      admin: { position: 'sidebar' },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'SEO Meta Description (Optional)',
      admin: { position: 'sidebar' },
    },
  ],
};
