import type {
  BlogPostItem,
  InternalLinkTarget,
  LexicalEditorState,
  LexicalNode,
  PageItem,
  ProductItem,
  ServiceItem,
  TocHeading,
} from '@/types/cms';

export const RESERVED_PAGE_SLUGS = new Set([
  'admin',
  'api',
  'media',
  'blog',
  'services',
  'shop',
  'product',
  'about',
  'robots.txt',
  'sitemap.xml',
  'favicon.ico',
  'assets',
  'frames',
  '_next',
]);

export function slugify(input: string): string {
  return String(input || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function isReservedPageSlug(slug: string): boolean {
  const normalized = slugify(slug);
  if (!normalized) return true;
  return RESERVED_PAGE_SLUGS.has(normalized);
}

export function getSiteOrigin(
  rawSiteUrl: string | undefined = process.env.NEXT_PUBLIC_SITE_URL
): string {
  const fallback = 'https://tanogaido.com';
  const raw = String(rawSiteUrl || '').trim();
  if (!raw) return fallback;
  try {
    const parsed = new URL(raw.startsWith('http') ? raw : `https://${raw}`);
    return parsed.origin;
  } catch {
    return fallback;
  }
}

export function extractPlainTextFromLexicalNode(node: LexicalNode | undefined): string {
  if (!node) return '';
  if (typeof node.text === 'string') return node.text;
  if (node.type === 'linebreak') return '\n';
  if (!Array.isArray(node.children)) return '';
  return node.children.map((child) => extractPlainTextFromLexicalNode(child)).join('');
}

export interface TocAndStatsResult {
  headings: TocHeading[];
  headingIdMap: WeakMap<LexicalNode, string>;
  wordCount: number;
  readingTimeMinutes: number;
}

export function extractTocAndReadingStats(
  content: LexicalEditorState | null | undefined
): TocAndStatsResult {
  const headings: TocHeading[] = [];
  const headingIdMap = new WeakMap<LexicalNode, string>();
  const usedIds = new Map<string, number>();
  let wordCount = 0;

  const nodes = content?.root?.children;
  if (!Array.isArray(nodes)) {
    return { headings, headingIdMap, wordCount: 0, readingTimeMinutes: 1 };
  }

  function walk(list: LexicalNode[]) {
    for (const node of list) {
      if (!node || typeof node !== 'object') continue;

      if (node.type === 'heading' && (node.tag === 'h2' || node.tag === 'h3' || node.tag === 'h4')) {
        const text = extractPlainTextFromLexicalNode(node).replace(/\s+/g, ' ').trim();
        if (text) {
          const baseId = slugify(text) || 'section';
          const seen = usedIds.get(baseId) || 0;
          usedIds.set(baseId, seen + 1);
          const id = seen === 0 ? baseId : `${baseId}-${seen + 1}`;
          const level = Number(node.tag.slice(1)) as 2 | 3 | 4;
          headings.push({ id, text, level });
          headingIdMap.set(node, id);
        }
      }

      if (typeof node.text === 'string') {
        const words = node.text.trim().split(/\s+/).filter(Boolean);
        wordCount += words.length;
      }

      if (Array.isArray(node.children)) {
        walk(node.children);
      }
    }
  }

  walk(nodes);

  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 210));
  return { headings, headingIdMap, wordCount, readingTimeMinutes };
}

export interface AutoLinkDictionaryOptions {
  currentHref: string;
  services?: Pick<ServiceItem, 'slug' | 'title'>[];
  products?: Pick<ProductItem, 'slug' | 'title'>[];
  posts?: Pick<BlogPostItem, 'slug' | 'title' | 'internalKeywords'>[];
  pages?: Pick<PageItem, 'slug' | 'title' | 'internalKeywords'>[];
}

export function buildInternalLinkTargets({
  currentHref,
  services = [],
  products = [],
  posts = [],
  pages = [],
}: AutoLinkDictionaryOptions): InternalLinkTarget[] {
  const targets: InternalLinkTarget[] = [];
  const seenPhrases = new Set<string>();

  const pushTarget = (target: InternalLinkTarget) => {
    const phrase = target.phrase.trim();
    if (phrase.length < 4) return;
    if (target.href === currentHref) return;
    const key = phrase.toLowerCase();
    if (seenPhrases.has(key)) return;
    seenPhrases.add(key);
    targets.push({ ...target, phrase });
  };

  // Priority 1: Explicit internal keywords from blog posts & pages
  for (const post of posts) {
    const href = `/blog/${post.slug}`;
    for (const kw of post.internalKeywords || []) {
      pushTarget({ phrase: kw, href, title: post.title, kind: 'post' });
    }
  }
  for (const page of pages) {
    const href = `/${page.slug}`;
    for (const kw of page.internalKeywords || []) {
      pushTarget({ phrase: kw, href, title: page.title, kind: 'page' });
    }
  }

  // Priority 2: Service titles (high commercial/concierge relevance)
  for (const service of services) {
    pushTarget({
      phrase: service.title,
      href: `/services/${service.slug}`,
      title: service.title,
      kind: 'service',
    });
  }

  // Priority 3: Page titles & Product titles & Blog titles
  for (const page of pages) {
    pushTarget({
      phrase: page.title,
      href: `/${page.slug}`,
      title: page.title,
      kind: 'page',
    });
  }
  for (const product of products) {
    pushTarget({
      phrase: product.title,
      href: `/shop/${product.slug}`,
      title: product.title,
      kind: 'product',
    });
  }
  for (const post of posts) {
    pushTarget({
      phrase: post.title,
      href: `/blog/${post.slug}`,
      title: post.title,
      kind: 'post',
    });
  }

  // Longest phrase first prevents partial sub-matches from hijacking longer titles
  return targets.sort((a, b) => b.phrase.length - a.phrase.length);
}

export type TextOrInternalLinkSegment =
  | { type: 'text'; value: string }
  | { type: 'link'; text: string; href: string; title: string; kind: InternalLinkTarget['kind'] };

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function injectInternalLinksInText(
  text: string,
  targets: InternalLinkTarget[],
  usedUrls: Set<string>,
  maxLinks = 6
): TextOrInternalLinkSegment[] {
  if (!text || !targets.length || usedUrls.size >= maxLinks) {
    return [{ type: 'text', value: text }];
  }

  interface MatchSpan {
    start: number;
    end: number;
    matchedText: string;
    target: InternalLinkTarget;
  }

  const occupied: Array<[number, number]> = [];
  const matches: MatchSpan[] = [];

  for (const target of targets) {
    if (usedUrls.size >= maxLinks) break;
    if (usedUrls.has(target.href)) continue;

    const pattern = new RegExp(
      `(?<![A-Za-z0-9])${escapeRegExp(target.phrase)}(?![A-Za-z0-9])`,
      'i'
    );
    const exec = pattern.exec(text);
    if (!exec || typeof exec.index !== 'number') continue;

    const start = exec.index;
    const end = start + exec[0].length;
    const overlaps = occupied.some(([oStart, oEnd]) => !(end <= oStart || start >= oEnd));
    if (overlaps) continue;

    occupied.push([start, end]);
    usedUrls.add(target.href);
    matches.push({
      start,
      end,
      matchedText: exec[0],
      target,
    });
  }

  if (matches.length === 0) {
    return [{ type: 'text', value: text }];
  }

  matches.sort((a, b) => a.start - b.start);

  const segments: TextOrInternalLinkSegment[] = [];
  let cursor = 0;

  for (const m of matches) {
    if (m.start > cursor) {
      segments.push({ type: 'text', value: text.slice(cursor, m.start) });
    }
    segments.push({
      type: 'link',
      text: m.matchedText,
      href: m.target.href,
      title: m.target.title,
      kind: m.target.kind,
    });
    cursor = m.end;
  }

  if (cursor < text.length) {
    segments.push({ type: 'text', value: text.slice(cursor) });
  }

  return segments;
}

export function normalizeSeoTitle(title: string, seoTitle?: string | null): string {
  const candidate = (seoTitle || '').trim();
  if (candidate) return candidate;
  return `${title.trim()} | Tanogaido`;
}

export function normalizeMetaDescription(
  excerpt?: string | null,
  metaDescription?: string | null
): string {
  const raw = (metaDescription || excerpt || '').replace(/\s+/g, ' ').trim();
  if (raw.length <= 160) return raw;
  return `${raw.slice(0, 157).trimEnd()}...`;
}

export function formatEditorialDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// Helpers for deterministic seeded Lexical documents
export function lexText(text: string, format = 0): LexicalNode {
  return {
    type: 'text',
    text,
    format,
    mode: 'normal',
    style: '',
    detail: 0,
    version: 1,
  };
}

export function lexHeading(tag: 'h2' | 'h3' | 'h4', text: string): LexicalNode {
  return {
    type: 'heading',
    tag,
    format: '',
    indent: 0,
    direction: 'ltr',
    version: 1,
    children: [lexText(text)],
  };
}

export function lexParagraph(children: string | Array<string | LexicalNode>): LexicalNode {
  const list = Array.isArray(children) ? children : [children];
  return {
    type: 'paragraph',
    format: '',
    indent: 0,
    direction: 'ltr',
    version: 1,
    children: list.map((c) => (typeof c === 'string' ? lexText(c) : c)),
  };
}

export function lexQuote(text: string): LexicalNode {
  return {
    type: 'quote',
    format: '',
    indent: 0,
    direction: 'ltr',
    version: 1,
    children: [lexText(text)],
  };
}

export function lexList(items: string[], listType: 'bullet' | 'number' = 'bullet'): LexicalNode {
  return {
    type: 'list',
    listType,
    start: 1,
    tag: listType === 'number' ? 'ol' : 'ul',
    format: '',
    indent: 0,
    direction: 'ltr',
    version: 1,
    children: items.map((item, idx) => ({
      type: 'listitem',
      value: idx + 1,
      format: '',
      indent: 0,
      direction: 'ltr',
      version: 1,
      children: [lexText(item)],
    })),
  };
}

export function lexDoc(children: LexicalNode[]): LexicalEditorState {
  return {
    root: {
      type: 'root',
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
      children,
    },
  };
}
