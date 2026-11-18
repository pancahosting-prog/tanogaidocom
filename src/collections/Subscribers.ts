import type { CollectionConfig } from 'payload';

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    group: 'Users',
    useAsTitle: 'email',
    defaultColumns: ['email', 'source', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true },
    { name: 'source', type: 'text', defaultValue: 'website-newsletter' },
  ],
};
