'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDown, List } from 'lucide-react';
import type { TocHeading } from '@/types/cms';

interface TableOfContentsProps {
  headings: TocHeading[];
  readingTimeMinutes?: number;
}

export function TableOfContents({ headings, readingTimeMinutes }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id || '');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!headings.length || typeof IntersectionObserver === 'undefined') return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-96px 0px -65% 0px', threshold: 0 }
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <aside className="toc-aside" aria-label="Table of contents">
      <div className="toc-card">
        <button
          type="button"
          className="toc-mobile-toggle"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span className="toc-title-row">
            <List size={15} aria-hidden="true" />
            <span>Table of Contents</span>
            {readingTimeMinutes ? (
              <span className="toc-read-meta">&middot; {readingTimeMinutes} min</span>
            ) : null}
          </span>
          <ChevronDown
            size={16}
            className={`toc-chevron ${mobileOpen ? 'is-open' : ''}`}
            aria-hidden="true"
          />
        </button>

        <div className="toc-desktop-header">
          <span className="toc-title-row">
            <List size={14} aria-hidden="true" />
            <span>Table of Contents</span>
          </span>
          {readingTimeMinutes ? (
            <span className="toc-read-meta">{readingTimeMinutes} min read</span>
          ) : null}
        </div>

        <nav
          className={`toc-nav ${mobileOpen ? 'is-mobile-open' : ''}`}
          aria-label="Article sections"
        >
          <ol className="toc-list">
            {headings.map((h) => {
              const isActive = activeId === h.id;
              return (
                <li key={h.id} className={`toc-item toc-item--h${h.level}`}>
                  <a
                    href={`#${h.id}`}
                    className={`toc-link ${isActive ? 'is-active' : ''}`}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={() => {
                      setActiveId(h.id);
                      setMobileOpen(false);
                    }}
                  >
                    {h.text}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </aside>
  );
}
