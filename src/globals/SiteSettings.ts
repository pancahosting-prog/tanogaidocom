import type { GlobalConfig } from 'payload';
import { triggerRevalidation } from '@/lib/revalidate';
import { GEMINI_MODEL_OPTIONS } from '@/lib/gemini-cs';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ req }) => {
        if (req.context?.skipRevalidate) return;
        await triggerRevalidation(['/', '/about', '/services', '/shop', '/blog'], { layout: true });
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
      defaultValue: '/assets/hero-japan.mp4',
    },
    {
      name: 'heroVideoMedia',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Background Video (ImageKit Proxy Upload)',
      admin: {
        description:
          'Opsional: Upload video MP4/WebM melalui Media (tersimpan di ImageKit, disajikan via /media/...). Jika kosong, memakai Hero Video URL.',
      },
    },
    {
      name: 'googleSiteVerification',
      type: 'text',
      label: 'Google Site Verification (Search Console)',
      admin: {
        placeholder: 'Tempel kode token atau seluruh tag <meta name="google-site-verification" ...>',
        description:
          'Dikelola langsung dari Settings ini: tempel token verifikasi Google Search Console atau seluruh tag <meta name="google-site-verification" content="..." />.',
      },
    },
    {
      type: 'collapsible',
      label: 'AI Customer Service (Gemini Auto-Rolling Pool)',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'geminiModel',
          type: 'select',
          label: 'Gemini Model',
          defaultValue: 'gemini-3.1-flash-lite',
          options: GEMINI_MODEL_OPTIONS.map((opt) => ({
            label: opt.label,
            value: opt.value,
          })),
          admin: {
            description:
              'Pilih model Gemini untuk Floating AI Customer Service (tersimpan di database).',
          },
        },
        {
          name: 'geminiApiKeysBulk',
          type: 'textarea',
          label: 'Gemini API Keys Pool (Bisa Tempel > 10 Key Sekaligus)',
          access: {
            read: ({ req }) => Boolean(req.user),
            update: ({ req }) => Boolean(req.user),
          },
          admin: {
            placeholder: 'AIzaSy...\nAIzaSy...\nAIzaSy...',
            description:
              'Tempel banyak Gemini API Key sekaligus (lebih dari 10 key didukung — pisahkan per baris baru atau koma). Sistem otomatis rolling dari key ke-1 ke key ke-2 dst jika kuota habis/limit. Disimpan di MongoDB & tidak pernah dikirim ke browser pengunjung.',
          },
        },
        {
          name: 'geminiActiveKeyIndex',
          type: 'number',
          label: 'Active Key Index (Auto-Rolling Cursor)',
          defaultValue: 0,
          min: 0,
          access: {
            read: ({ req }) => Boolean(req.user),
            update: ({ req }) => Boolean(req.user),
          },
          admin: {
            description:
              'Menunjukkan posisi index API key yang sedang aktif (dimulai dari 0). Otomatis berpindah saat key sebelumnya mencapai limit.',
          },
        },
      ],
    },
  ],
};
