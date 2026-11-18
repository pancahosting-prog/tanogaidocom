import type { GlobalConfig } from 'payload';
import { triggerRevalidation } from '@/lib/revalidate';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async () => {
        await triggerRevalidation(['/', '/about', '/services', '/shop']);
      },
    ],
  },
  fields: [
    { name: 'brandName', type: 'text', required: true, defaultValue: 'tanogaido' },
    { name: 'companyName', type: 'text', required: true, defaultValue: 'PT. Tanogaido Fantasi Pratama' },
    { name: 'nibNumber', type: 'text', required: true, defaultValue: '2003230101593' },
    { name: 'ahuDecree', type: 'text', required: true, defaultValue: 'AHU-0022369.AH.01.01.TAHUN 2023' },
    {
      name: 'address',
      type: 'text',
      required: true,
      defaultValue: 'Jl. Boulevard Artha Gading, Blok A6B No. 32 Kelapa Gading, Jakarta Utara',
    },
    { name: 'email', type: 'email', required: true, defaultValue: 'tanogaidocom@gmail.com' },
    { name: 'whatsappNumber', type: 'text', required: true, defaultValue: '6281318939319' },
    {
      name: 'heroEyebrow',
      type: 'text',
      required: true,
      defaultValue: 'DISCOVER THE LAND OF THE RISING SUN',
    },
    { name: 'heroTitleLead', type: 'text', required: true, defaultValue: 'Explore Every Wonder.' },
    { name: 'heroTitleAccent', type: 'text', required: true, defaultValue: 'Across Japan.' },
    {
      name: 'heroDescription',
      type: 'textarea',
      required: true,
      defaultValue:
        "Curated private tours, seamless rail transport, and licensed bilingual guides for travelers who seek authentic Japan. From Kyoto's quiet shrines to Mount Fuji.",
    },
    {
      name: 'heroVideoUrl',
      type: 'text',
      required: true,
      defaultValue: 'https://res.cloudinary.com/dn4jqfz3s/video/upload/f_auto,q_auto/japan_3_y7b62u.mp4',
    },
  ],
};
