import type { CollectionConfig } from 'payload';
import {
  buildProxyMediaUrl,
  deleteFromImageKit,
  isImageKitConfigured,
  uploadToImageKit,
} from '@/lib/imagekit';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Media',
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'public/media',
    disableLocalStorage: isImageKitConfigured(),
    mimeTypes: ['image/*', 'video/mp4', 'video/webm'],
    adminThumbnail: ({ doc }) => {
      const record = doc as Record<string, unknown>;
      if (typeof record?.imagekitPath === 'string' && record.imagekitPath) {
        return buildProxyMediaUrl(record.imagekitPath);
      }
      if (typeof record?.proxyUrl === 'string' && record.proxyUrl) {
        return record.proxyUrl;
      }
      if (typeof record?.filename === 'string' && record.filename) {
        return buildProxyMediaUrl(record.filename);
      }
      return null;
    },
  },
  hooks: {
    beforeChange: [
      async ({ data, req, originalDoc }) => {
        if (req.file && isImageKitConfigured()) {
          if (originalDoc?.imagekitFileId) {
            await deleteFromImageKit(String(originalDoc.imagekitFileId));
          }

          const uploaded = await uploadToImageKit({
            buffer: req.file.data,
            fileName: req.file.name || data.filename || `media-${Date.now()}`,
            mimeType: req.file.mimetype,
          });

          const cleanPath = uploaded.filePath.replace(/^\/+/, '');
          const firstPartyUrl = buildProxyMediaUrl(cleanPath);

          return {
            ...data,
            imagekitFileId: uploaded.fileId,
            imagekitPath: cleanPath,
            proxyUrl: firstPartyUrl,
            url: firstPartyUrl,
            filename: uploaded.name || req.file.name,
            mimeType: req.file.mimetype,
            filesize: uploaded.size || req.file.size,
            width: uploaded.width ?? data.width,
            height: uploaded.height ?? data.height,
          };
        }

        if (typeof data?.filename === 'string' && data.filename && !data.proxyUrl) {
          const firstPartyUrl = buildProxyMediaUrl(data.filename);
          return {
            ...data,
            proxyUrl: firstPartyUrl,
          };
        }

        return data;
      },
    ],
    afterRead: [
      ({ doc }) => {
        if (!doc) return doc;
        const cleanPath =
          (typeof doc.imagekitPath === 'string' && doc.imagekitPath) ||
          (typeof doc.filename === 'string' && doc.filename) ||
          '';
        if (cleanPath) {
          const firstPartyUrl = buildProxyMediaUrl(cleanPath);
          doc.proxyUrl = firstPartyUrl;
          doc.url = firstPartyUrl;
          doc.thumbnailURL = firstPartyUrl;
        }
        return doc;
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        if (doc?.imagekitFileId && isImageKitConfigured()) {
          await deleteFromImageKit(String(doc.imagekitFileId));
        }
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'proxyUrl',
      type: 'text',
      label: 'First-Party Proxy URL',
      admin: {
        readOnly: true,
        description:
          'Copy URL ini (format /media/...) untuk dipakai di Services, Products, Trips, atau SiteSettings agar sumber file tampil dari domain website langsung.',
      },
    },
    {
      name: 'imagekitPath',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'imagekitFileId',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
  ],
};
