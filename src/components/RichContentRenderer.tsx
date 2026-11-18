import React from 'react';
import Link from 'next/link';
import type {
  InternalLinkTarget,
  LexicalEditorState,
  LexicalNode,
} from '@/types/cms';
import {
  extractTocAndReadingStats,
  injectInternalLinksInText,
} from '@/lib/editorial';
import { buildProxyMediaUrl, extractProxyMediaUrl } from '@/lib/imagekit';

interface RichContentRendererProps {
  content: LexicalEditorState;
  internalLinkTargets?: InternalLinkTarget[];
  enableAutoInternalLinks?: boolean;
  maxAutoLinks?: number;
}

function renderFormattedText(
  text: string,
  format: number,
  key: string | number
): React.ReactNode {
  let node: React.ReactNode = text;
  if (format & 16) node = <code className="editorial-inline-code">{node}</code>;
  if (format & 1) node = <strong>{node}</strong>;
  if (format & 2) node = <em>{node}</em>;
  if (format & 8) node = <u>{node}</u>;
  if (format & 4) node = <s>{node}</s>;
  if (format & 32) node = <sub>{node}</sub>;
  if (format & 64) node = <sup>{node}</sup>;
  return <React.Fragment key={key}>{node}</React.Fragment>;
}

export function RichContentRenderer({
  content,
  internalLinkTargets = [],
  enableAutoInternalLinks = true,
  maxAutoLinks = 6,
}: RichContentRendererProps) {
  const { headingIdMap } = extractTocAndReadingStats(content);
  const usedAutoUrls = new Set<string>();
  const nodes = content?.root?.children || [];

  function renderInlineNodes(
    children: LexicalNode[] | undefined,
    allowAutoLink: boolean,
    prefix: string
  ): React.ReactNode[] {
    if (!Array.isArray(children)) return [];

    return children.map((child, idx) => {
      const key = `${prefix}-${idx}`;
      if (!child) return null;

      if (child.type === 'linebreak') {
        return <br key={key} />;
      }

      if (child.type === 'tab') {
        return <React.Fragment key={key}>&emsp;</React.Fragment>;
      }

      if (child.type === 'link' || child.type === 'autolink') {
        const rawUrl = String(
          child.url || (child.fields as { url?: string } | undefined)?.url || '#'
        );
        const docVal = (child.fields as { doc?: { relationTo?: string; value?: { slug?: string } } })
          ?.doc;
        let href = rawUrl;
        if (docVal?.value?.slug) {
          if (docVal.relationTo === 'posts') href = `/blog/${docVal.value.slug}`;
          else if (docVal.relationTo === 'services') href = `/services/${docVal.value.slug}`;
          else if (docVal.relationTo === 'products') href = `/shop/${docVal.value.slug}`;
          else if (docVal.relationTo === 'pages') href = `/${docVal.value.slug}`;
        }

        const inner = renderInlineNodes(child.children, false, key);
        const isInternal = href.startsWith('/');
        if (isInternal) {
          return (
            <Link key={key} href={href} className="editorial-link editorial-link--internal">
              {inner}
            </Link>
          );
        }
        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link"
          >
            {inner}
          </a>
        );
      }

      if (child.type === 'text') {
        const rawText = String(child.text || '');
        const format = Number(child.format || 0);

        if (
          allowAutoLink &&
          enableAutoInternalLinks &&
          internalLinkTargets.length > 0 &&
          !(format & 16)
        ) {
          const segments = injectInternalLinksInText(
            rawText,
            internalLinkTargets,
            usedAutoUrls,
            maxAutoLinks
          );
          if (segments.length === 1 && segments[0].type === 'text') {
            return renderFormattedText(rawText, format, key);
          }
          return (
            <React.Fragment key={key}>
              {segments.map((seg, sIdx) => {
                const segKey = `${key}-seg-${sIdx}`;
                if (seg.type === 'text') {
                  return renderFormattedText(seg.value, format, segKey);
                }
                return (
                  <Link
                    key={segKey}
                    href={seg.href}
                    title={seg.title}
                    className="editorial-link editorial-link--auto"
                  >
                    {renderFormattedText(seg.text, format, `${segKey}-inner`)}
                  </Link>
                );
              })}
            </React.Fragment>
          );
        }

        return renderFormattedText(rawText, format, key);
      }

      if (Array.isArray(child.children)) {
        return (
          <React.Fragment key={key}>
            {renderInlineNodes(child.children, allowAutoLink, key)}
          </React.Fragment>
        );
      }

      return null;
    });
  }

  function renderBlock(node: LexicalNode, idx: number, prefix = 'blk'): React.ReactNode {
    const key = `${prefix}-${idx}`;
    if (!node) return null;

    if (node.type === 'heading') {
      const tag = node.tag === 'h3' ? 'h3' : node.tag === 'h4' ? 'h4' : 'h2';
      const id = headingIdMap.get(node);
      const children = renderInlineNodes(node.children, false, key);
      if (tag === 'h3') {
        return (
          <h3 key={key} id={id} className="editorial-h3">
            {children}
          </h3>
        );
      }
      if (tag === 'h4') {
        return (
          <h4 key={key} id={id} className="editorial-h4">
            {children}
          </h4>
        );
      }
      return (
        <h2 key={key} id={id} className="editorial-h2">
          {children}
        </h2>
      );
    }

    if (node.type === 'paragraph') {
      const rendered = renderInlineNodes(node.children, true, key);
      if (rendered.length === 0) return null;
      return (
        <p key={key} className="editorial-p">
          {rendered}
        </p>
      );
    }

    if (node.type === 'quote') {
      return (
        <blockquote key={key} className="editorial-quote">
          <p>{renderInlineNodes(node.children, false, key)}</p>
        </blockquote>
      );
    }

    if (node.type === 'list') {
      const ListTag = node.listType === 'number' ? 'ol' : 'ul';
      return (
        <ListTag
          key={key}
          className={`editorial-list ${
            node.listType === 'number' ? 'editorial-list--ordered' : 'editorial-list--bullet'
          }`}
        >
          {(node.children || []).map((li, liIdx) => (
            <li key={`${key}-li-${liIdx}`}>
              {renderInlineNodes(li.children, true, `${key}-li-${liIdx}`)}
            </li>
          ))}
        </ListTag>
      );
    }

    if (node.type === 'horizontalrule') {
      return <hr key={key} className="editorial-hr" />;
    }

    if (node.type === 'upload') {
      const val = (node.value || {}) as Record<string, unknown>;
      const rawUrl =
        extractProxyMediaUrl(val) ||
        (typeof val.imagekitPath === 'string' && val.imagekitPath
          ? buildProxyMediaUrl(val.imagekitPath)
          : typeof val.url === 'string'
            ? val.url
            : '');
      const alt = String(val.alt || (node.fields as { alt?: string })?.alt || 'Tanogaido editorial photo');
      const caption = String((node.fields as { caption?: string })?.caption || '');
      if (!rawUrl) return null;

      return (
        <figure key={key} className="editorial-figure">
          <div className="editorial-figure-frame">
            <img src={rawUrl} alt={alt} referrerPolicy="no-referrer" loading="lazy" />
          </div>
          {caption && <figcaption className="editorial-figcaption">{caption}</figcaption>}
        </figure>
      );
    }

    if (node.type === 'table') {
      return (
        <div key={key} className="editorial-table-wrap">
          <table className="editorial-table">
            <tbody>
              {(node.children || []).map((row, rIdx) => (
                <tr key={`${key}-r-${rIdx}`}>
                  {(row.children || []).map((cell, cIdx) => {
                    const isHeader = Boolean((cell as { headerState?: number }).headerState);
                    const CellTag = isHeader ? 'th' : 'td';
                    return (
                      <CellTag key={`${key}-r-${rIdx}-c-${cIdx}`}>
                        {(cell.children || []).map((inner, iIdx) =>
                          renderBlock(inner, iIdx, `${key}-r-${rIdx}-c-${cIdx}`)
                        )}
                      </CellTag>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (node.type === 'block') {
      const fields = (node.fields || {}) as Record<string, unknown>;
      if (fields.blockType === 'travelTip') {
        const tone = String(fields.tone || 'tip');
        return (
          <aside key={key} className={`editorial-callout editorial-callout--${tone}`}>
            <div className="editorial-callout-title">{String(fields.title || 'Travel Tip')}</div>
            <p className="editorial-callout-body">{String(fields.body || '')}</p>
          </aside>
        );
      }
      if (fields.blockType === 'serviceEmbed') {
        const slug = String(fields.serviceSlug || 'private-japan-tour');
        return (
          <aside key={key} className="editorial-service-embed">
            <div>
              <div className="editorial-embed-kicker">Recommended Tanogaido Service</div>
              <div className="editorial-embed-title">{String(fields.heading || 'Plan With Tanogaido')}</div>
              <p className="editorial-embed-desc">{String(fields.description || '')}</p>
            </div>
            <Link href={`/services/${slug}`} className="editorial-embed-btn">
              {String(fields.ctaLabel || 'Explore Service')} &rarr;
            </Link>
          </aside>
        );
      }
    }

    if (Array.isArray(node.children)) {
      return (
        <div key={key} className="editorial-p">
          {renderInlineNodes(node.children, true, key)}
        </div>
      );
    }

    return null;
  }

  return <div className="editorial-prose">{nodes.map((node, idx) => renderBlock(node, idx))}</div>;
}
