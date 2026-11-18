'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface SummaryResponse {
  counts: {
    posts: number;
    publishedPosts: number;
    draftPosts: number;
    pages: number;
    categories: number;
    services: number;
    products: number;
    media: number;
    orders: number;
  };
  recentPosts: Array<{
    id: string;
    title: string;
    slug: string;
    status: string;
    updatedAt: string;
  }>;
  recentPages: Array<{
    id: string;
    title: string;
    slug: string;
    status: string;
    updatedAt: string;
  }>;
}

export function WpDashboardWidget() {
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftNotes, setDraftNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string; editHref?: string } | null>(
    null
  );

  async function loadSummary() {
    try {
      const res = await fetch('/api/wp-summary', { credentials: 'include' });
      if (!res.ok) return;
      const json = (await res.json()) as SummaryResponse;
      setSummary(json);
    } catch {
      // Ignore silent failure on initial mount
    }
  }

  useEffect(() => {
    loadSummary();
  }, []);

  async function handleQuickDraft(e: React.FormEvent) {
    e.preventDefault();
    if (!draftTitle.trim() || saving) return;
    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/wp-summary', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: draftTitle, notes: draftNotes }),
      });
      const json = (await res.json()) as { id?: string; title?: string; error?: string };
      if (!res.ok || !json.id) {
        setFeedback({ ok: false, msg: json.error || 'Could not save draft.' });
      } else {
        setDraftTitle('');
        setDraftNotes('');
        setFeedback({
          ok: true,
          msg: `Saved draft "${json.title}".`,
          editHref: `/admin/collections/posts/${json.id}`,
        });
        await loadSummary();
      }
    } catch {
      setFeedback({ ok: false, msg: 'Network error while saving draft.' });
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="wp-dashboard-wrap" aria-label="WordPress Style Dashboard Overview">
      <div className="wp-welcome-panel">
        <div className="wp-welcome-copy">
          <h2>Welcome to Tanogaido Publishing Studio</h2>
          <p>
            Write SEO-ready blog articles (<code>/blog/slug</code>), manage standalone pages (
            <code>/slug</code>), upload media through ImageKit, and sync travel services in one place.
          </p>
        </div>
        <div className="wp-welcome-actions">
          <Link href="/admin/collections/posts/create" className="wp-btn wp-btn--primary">
            Write New Post
          </Link>
          <Link href="/admin/collections/pages/create" className="wp-btn wp-btn--secondary">
            Add New Page
          </Link>
          <a href="/blog" target="_blank" rel="noopener noreferrer" className="wp-btn wp-btn--ghost">
            View Live Blog &rarr;
          </a>
        </div>
      </div>

      <div className="wp-metabox-grid">
        {/* Metabox 1: At a Glance */}
        <div className="wp-postbox">
          <div className="wp-postbox-header">
            <h3>At a Glance</h3>
          </div>
          <div className="wp-postbox-inside">
            <ul className="wp-glance-list">
              <li>
                <Link href="/admin/collections/posts">
                  <strong>{summary?.counts.posts ?? '—'}</strong> Posts (
                  {summary?.counts.publishedPosts ?? 0} published · {summary?.counts.draftPosts ?? 0}{' '}
                  drafts)
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/pages">
                  <strong>{summary?.counts.pages ?? '—'}</strong> Pages (root <code>/slug</code>)
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/categories">
                  <strong>{summary?.counts.categories ?? '—'}</strong> Categories
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/media">
                  <strong>{summary?.counts.media ?? '—'}</strong> Media Assets (ImageKit)
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/services">
                  <strong>{summary?.counts.services ?? '—'}</strong> Travel Services
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/products">
                  <strong>{summary?.counts.products ?? '—'}</strong> Shop Products
                </Link>
              </li>
            </ul>
            <p className="wp-glance-note">
              Automatic Table of Contents, internal keyword linking, and Schema.org JSON-LD run
              automatically on published Posts and Pages.
            </p>
          </div>
        </div>

        {/* Metabox 2: Quick Draft */}
        <div className="wp-postbox">
          <div className="wp-postbox-header">
            <h3>Quick Draft</h3>
          </div>
          <div className="wp-postbox-inside">
            <form onSubmit={handleQuickDraft} className="wp-quickdraft-form">
              <div className="wp-field">
                <label htmlFor="wp-quickdraft-title">Title</label>
                <input
                  id="wp-quickdraft-title"
                  type="text"
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  placeholder="e.g. Best Autumn Maple Spots in Kyoto"
                  required
                />
              </div>
              <div className="wp-field">
                <label htmlFor="wp-quickdraft-notes">Outline or Opening Paragraph</label>
                <textarea
                  id="wp-quickdraft-notes"
                  rows={3}
                  value={draftNotes}
                  onChange={(e) => setDraftNotes(e.target.value)}
                  placeholder="What is on your mind for this Japan guide?"
                />
              </div>
              <div className="wp-quickdraft-footer">
                <button type="submit" disabled={saving} className="wp-btn wp-btn--primary">
                  {saving ? 'Saving...' : 'Save Draft'}
                </button>
                {feedback && (
                  <span className={feedback.ok ? 'wp-feedback wp-feedback--ok' : 'wp-feedback wp-feedback--err'}>
                    {feedback.msg}{' '}
                    {feedback.editHref && (
                      <Link href={feedback.editHref} className="wp-inline-link">
                        Open in Editor &rarr;
                      </Link>
                    )}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Metabox 3: Activity (Recent Posts & Pages) */}
        <div className="wp-postbox">
          <div className="wp-postbox-header">
            <h3>Activity — Recent Posts &amp; Pages</h3>
          </div>
          <div className="wp-postbox-inside">
            <div className="wp-activity-group">
              <div className="wp-activity-heading">Recently Updated Posts</div>
              {summary?.recentPosts.length ? (
                <ul className="wp-activity-list">
                  {summary.recentPosts.map((post) => (
                    <li key={post.id}>
                      <Link href={`/admin/collections/posts/${post.id}`}>{post.title}</Link>
                      <span className={`wp-status-text wp-status-text--${post.status}`}>
                        {post.status}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="wp-empty-text">No posts in database yet (run seed or click Write New Post).</p>
              )}
            </div>

            <div className="wp-activity-group">
              <div className="wp-activity-heading">Standalone Pages (/slug)</div>
              {summary?.recentPages.length ? (
                <ul className="wp-activity-list">
                  {summary.recentPages.map((pg) => (
                    <li key={pg.id}>
                      <Link href={`/admin/collections/pages/${pg.id}`}>{pg.title}</Link>
                      <span className={`wp-status-text wp-status-text--${pg.status}`}>{pg.status}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="wp-empty-text">No pages in database yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
