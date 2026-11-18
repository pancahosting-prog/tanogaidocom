'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import type { BlogCategoryItem, BlogPostItem } from '@/types/cms';
import { formatEditorialDate } from '@/lib/editorial';

interface BlogCatalogClientProps {
  posts: BlogPostItem[];
  categories: BlogCategoryItem[];
}

const INITIAL_VISIBLE = 9;

export function BlogCatalogClient({ posts, categories }: BlogCatalogClientProps) {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qParam = params.get('q');
    if (qParam) {
      setQuery(qParam);
    }
    const catParam = params.get('category');
    if (catParam && categories.some((c) => c.slug === catParam)) {
      setSelectedCat(catParam);
    }
  }, [categories]);

  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0] || null;
  }, [posts]);

  const remainingPosts = useMemo(() => {
    if (!featuredPost) return posts;
    const rest = posts.filter((p) => p.slug !== featuredPost.slug);
    return rest.length > 0 ? rest : posts;
  }, [posts, featuredPost]);

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base =
      selectedCat === 'all' && !q
        ? remainingPosts
        : posts.filter((p) => {
            if (selectedCat !== 'all' && p.categorySlug !== selectedCat) return false;
            if (!q) return true;
            return (
              p.title.toLowerCase().includes(q) ||
              p.excerpt.toLowerCase().includes(q) ||
              p.categoryName.toLowerCase().includes(q) ||
              p.tags.some((t) => t.toLowerCase().includes(q))
            );
          });
    return base;
  }, [posts, remainingPosts, selectedCat, query]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  return (
    <div className="blog-catalog-shell">
      <header className="blog-index-header">
        <div className="blog-index-eyebrow">TANOGAIDO EDITORIAL JOURNAL</div>
        <h1 className="blog-index-title">Japan Travel Guides, Visa &amp; Cultural Stories</h1>
      </header>

      {/* Featured Hero Banner (Matches editorial showcase reference) */}
      {featuredPost && selectedCat === 'all' && !query.trim() && (
        <section className="blog-featured-section" aria-label="Featured Article">
          <Link href={`/blog/${featuredPost.slug}`} className="blog-featured-card">
            <img
              src={featuredPost.coverImagePath}
              alt={featuredPost.coverImageAlt || featuredPost.title}
              className="blog-featured-img"
              fetchPriority="high"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            <div className="blog-featured-scrim" aria-hidden="true" />
            <div className="blog-featured-overlay">
              <div className="blog-featured-copy">
                <span className="blog-featured-kicker">Featured</span>
                <h2 className="blog-featured-title">{featuredPost.title}</h2>
                <p className="blog-featured-excerpt">{featuredPost.excerpt}</p>
              </div>
              <span className="blog-featured-arrow" aria-hidden="true">
                <ArrowRight size={24} strokeWidth={1.8} />
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* Recent Blog Posts Header & Interactive Filters */}
      <section className="blog-recent-section" aria-label="Recent blog posts">
        <div className="blog-recent-header">
          <div>
            <h2 className="blog-recent-heading">
              {selectedCat === 'all' && !query.trim()
                ? 'Recent blog posts'
                : `${
                    categories.find((c) => c.slug === selectedCat)?.name || 'Filtered'
                  } articles`}
            </h2>
          </div>

          <div className="blog-controls-bar">
            <div className="blog-filter-tabs" role="tablist" aria-label="Filter articles by topic">
              <button
                type="button"
                role="tab"
                aria-selected={selectedCat === 'all'}
                className={`blog-filter-btn ${selectedCat === 'all' ? 'is-active' : ''}`}
                onClick={() => {
                  setSelectedCat('all');
                  setVisibleCount(INITIAL_VISIBLE);
                }}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  role="tab"
                  aria-selected={selectedCat === cat.slug}
                  className={`blog-filter-btn ${selectedCat === cat.slug ? 'is-active' : ''}`}
                  onClick={() => {
                    setSelectedCat(cat.slug);
                    setVisibleCount(INITIAL_VISIBLE);
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="blog-search-box">
              <Search size={14} aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisibleCount(INITIAL_VISIBLE);
                }}
                placeholder="Search Japan guides..."
                aria-label="Search blog articles"
                className="blog-search-input"
              />
            </div>
          </div>
        </div>

        {/* 3-Column Editorial Grid */}
        {visiblePosts.length > 0 ? (
          <div className="blog-posts-grid" data-testid="blog-posts-grid">
            {visiblePosts.map((post) => (
              <article key={post.slug} className="blog-card">
                <Link href={`/blog/${post.slug}`} className="blog-card-link">
                  <div className="blog-card-media">
                    <img
                      src={post.coverImagePath}
                      alt={post.coverImageAlt || post.title}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-card-title-row">
                      <h3 className="blog-card-title">{post.title}</h3>
                      <ArrowUpRight size={17} className="blog-card-arrow" aria-hidden="true" />
                    </div>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <div className="blog-card-meta">
                      <img
                        src={post.authorAvatarPath}
                        alt={post.authorName}
                        className="blog-card-avatar"
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                      <span className="blog-card-author">{post.authorName}</span>
                      <span className="blog-card-sep" aria-hidden="true">
                        &bull;
                      </span>
                      <time dateTime={post.publishedAt} className="blog-card-date">
                        {formatEditorialDate(post.publishedAt)}
                      </time>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="services-empty">
            No articles matched your search.{' '}
            <button
              type="button"
              className="blog-reset-btn"
              onClick={() => {
                setSelectedCat('all');
                setQuery('');
              }}
            >
              Show all articles
            </button>
          </div>
        )}

        {/* Centered Load More Button */}
        {hasMore && (
          <div className="blog-load-more-wrap">
            <button
              type="button"
              className="blog-load-more-btn"
              onClick={() => setVisibleCount((prev) => prev + 6)}
            >
              Load more...
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
