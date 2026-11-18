'use client';

import React from 'react';
import Link from 'next/link';

export function WpQuickLinks() {
  return (
    <div className="wp-nav-quicklinks" aria-label="WordPress Quick Actions">
      <div className="wp-nav-quicklinks-title">Quick Publish</div>
      <div className="wp-nav-quicklinks-grid">
        <Link href="/admin/collections/posts/create" className="wp-nav-quickbtn wp-nav-quickbtn--primary">
          + New Post
        </Link>
        <Link href="/admin/collections/pages/create" className="wp-nav-quickbtn">
          + New Page
        </Link>
      </div>
      <div className="wp-nav-visit-row">
        <a href="/blog" target="_blank" rel="noopener noreferrer" className="wp-nav-visit-link">
          View Blog &rarr;
        </a>
        <a href="/" target="_blank" rel="noopener noreferrer" className="wp-nav-visit-link">
          Visit Site &rarr;
        </a>
      </div>
    </div>
  );
}
