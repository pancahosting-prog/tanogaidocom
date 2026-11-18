'use client';

import React from 'react';
import { useFormFields } from '@payloadcms/ui';

export function PermalinkField({ prefix = '/blog/' }: { prefix?: string }) {
  const slugVal = useFormFields(([fields]) => String(fields?.slug?.value || ''));
  const titleVal = useFormFields(([fields]) => String(fields?.title?.value || ''));

  const computedSlug =
    slugVal.trim() ||
    titleVal
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') ||
    'your-slug';

  const isBlog = prefix === '/blog/' || prefix === '/blog';
  const cleanPrefix = isBlog ? '/blog/' : '/';
  const previewPath = `${cleanPrefix}${computedSlug}`;

  return (
    <div className="wp-permalink-bar">
      <span className="wp-permalink-label">Permalink:</span>
      <code className="wp-permalink-url">https://tanogaido.com{previewPath}</code>
      {slugVal.trim() && (
        <a href={previewPath} target="_blank" rel="noopener noreferrer" className="wp-permalink-view">
          View Live &rarr;
        </a>
      )}
    </div>
  );
}

export function BlogPermalinkField() {
  return <PermalinkField prefix="/blog/" />;
}

export function PagePermalinkField() {
  return <PermalinkField prefix="/" />;
}
