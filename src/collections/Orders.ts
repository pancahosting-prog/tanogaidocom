import type { CollectionConfig } from 'payload';

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'customerName', 'deliveryLocation', 'subtotal', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'orderNumber', type: 'text', required: true, unique: true },
    { name: 'customerName', type: 'text', required: true },
    { name: 'deliveryLocation', type: 'text', required: true },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'productSlug', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'variant', type: 'text', required: true },
        { name: 'price', type: 'number', required: true },
        { name: 'qty', type: 'number', required: true },
      ],
    },
    { name: 'subtotal', type: 'number', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Completed', value: 'completed' },
      ],
    },
  ],
};
