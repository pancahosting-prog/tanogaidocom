import type { GlobalConfig } from 'payload';
import { revalidatePath } from 'next/cache';

export const SiteSettingsGlobal: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      () => {
        try {
          revalidatePath('/', 'layout');
        } catch {
          // Safe outside request scope
        }
      },
    ],
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Tanogaido',
      required: true,
    },
    {
      name: 'siteTagline',
      type: 'text',
      defaultValue: 'PT. Tanogaido Fantasi Pratama — Your Gateway to Japan since 2007.',
      required: true,
    },
    {
      name: 'companyLegalName',
      type: 'text',
      defaultValue: 'PT. Tanogaido Fantasi Pratama',
      required: true,
    },
    {
      name: 'establishedYear',
      type: 'number',
      defaultValue: 2007,
      required: true,
    },
    {
      name: 'nib',
      type: 'text',
      defaultValue: '2003230101593',
      required: true,
    },
    {
      name: 'decreeNumber',
      type: 'text',
      defaultValue: 'AHU-0022369.AH.01.01.TAHUN 2023',
      required: true,
    },
    {
      name: 'address',
      type: 'textarea',
      defaultValue: 'Jl. Boulevard Raya Blok PD 9 No. 12, Kelapa Gading, North Jakarta 14240, Indonesia',
      required: true,
    },
    {
      name: 'contactEmail',
      type: 'text',
      defaultValue: 'tanogaidocom@gmail.com',
      required: true,
    },
    {
      name: 'contactPhone',
      type: 'text',
      defaultValue: '+62 813-1893-9319',
      required: true,
    },
    {
      name: 'waNumber',
      type: 'text',
      defaultValue: '6281318939319',
      required: true,
    },
    {
      name: 'socials',
      type: 'group',
      fields: [
        { name: 'instagram', type: 'text', defaultValue: 'https://instagram.com/tanogaido' },
        { name: 'facebook', type: 'text', defaultValue: 'https://facebook.com/tanogaido' },
        { name: 'youtube', type: 'text', defaultValue: 'https://youtube.com/@tanogaido' },
        { name: 'whatsapp', type: 'text', defaultValue: 'https://wa.me/6281318939319' },
      ],
    },
  ],
};
