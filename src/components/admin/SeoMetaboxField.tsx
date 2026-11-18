'use client';

import React from 'react';
import { useFormFields } from '@payloadcms/ui';

function Meter({ label, len, idealMin, idealMax }: { label: string; len: number; idealMin: number; idealMax: number }) {
  const pct = Math.min(100, Math.round((len / idealMax) * 100));
  const status =
    len === 0 ? 'empty' : len < idealMin ? 'short' : len <= idealMax ? 'good' : 'long';

  return (
    <div className="wp-seo-meter">
      <div className="wp-seo-meter-head">
        <span>{label}</span>
        <span>
          {len}/{idealMax} chars
        </span>
      </div>
      <div className="wp-seo-meter-track">
        <div className={`wp-seo-meter-fill wp-seo-meter-fill--${status}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function SeoMetaboxField({ pathPrefix = '/blog/' }: { pathPrefix?: string }) {
  const title = useFormFields(([fields]) => String(fields?.title?.value || ''));
  const slug = useFormFields(([fields]) => String(fields?.slug?.value || ''));
  const excerpt = useFormFields(([fields]) =>
    String(fields?.excerpt?.value || fields?.subtitle?.value || '')
  );
  const seoTitle = useFormFields(([fields]) => String(fields?.seoTitle?.value || ''));
  const metaDescription = useFormFields(([fields]) =>
    String(fields?.metaDescription?.value || '')
  );
  const focusKeyword = useFormFields(([fields]) => String(fields?.focusKeyword?.value || ''));

  const resolvedTitle = (seoTitle || title || 'Untitled Article | Tanogaido').trim();
  const resolvedDesc = (
    metaDescription ||
    excerpt ||
    'Write a compelling 120–160 character meta description to maximize search click-through rates.'
  ).trim();
  const resolvedSlug = slug.trim() || 'your-url-slug';
  const normalizedPrefix = pathPrefix === '/blog/' ? '/blog/' : '/';

  const kw = focusKeyword.trim().toLowerCase();
  const kwInTitle = kw ? resolvedTitle.toLowerCase().includes(kw) : false;
  const kwInDesc = kw ? resolvedDesc.toLowerCase().includes(kw) : false;

  return (
    <div className="wp-seo-preview-box">
      <div className="wp-seo-preview-kicker">Google SERP Snippet Preview</div>
      <div className="wp-seo-serp-card">
        <div className="wp-seo-serp-url">
          https://tanogaido.com{normalizedPrefix}
          {resolvedSlug}
        </div>
        <div className="wp-seo-serp-title">{resolvedTitle}</div>
        <div className="wp-seo-serp-desc">
          {resolvedDesc.length > 160 ? `${resolvedDesc.slice(0, 157)}...` : resolvedDesc}
        </div>
      </div>

      <Meter label="SEO Title Length" len={resolvedTitle.length} idealMin={30} idealMax={60} />
      <Meter label="Meta Description Length" len={resolvedDesc.length} idealMin={110} idealMax={160} />

      {kw && (
        <div className="wp-seo-checks">
          <div className={kwInTitle ? 'wp-seo-check is-ok' : 'wp-seo-check is-warn'}>
            {kwInTitle ? '✓' : '•'} Focus keyword in title
          </div>
          <div className={kwInDesc ? 'wp-seo-check is-ok' : 'wp-seo-check is-warn'}>
            {kwInDesc ? '✓' : '•'} Focus keyword in meta description
          </div>
        </div>
      )}
    </div>
  );
}

export function BlogSeoMetaboxField() {
  return <SeoMetaboxField pathPrefix="/blog/" />;
}

export function PageSeoMetaboxField() {
  return <SeoMetaboxField pathPrefix="/" />;
}
