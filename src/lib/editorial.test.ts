import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildInternalLinkTargets,
  extractTocAndReadingStats,
  getSiteOrigin,
  injectInternalLinksInText,
  isReservedPageSlug,
  lexDoc,
  lexHeading,
  lexList,
  lexParagraph,
  normalizeMetaDescription,
  normalizeSeoTitle,
  slugify,
} from './editorial';

test('slugify and reserved slug validation', () => {
  assert.equal(slugify('Panduan JR Pass & Shinkansen 2026!'), 'panduan-jr-pass-shinkansen-2026');
  assert.equal(slugify('  Kyoto Hidden Temples  '), 'kyoto-hidden-temples');

  assert.equal(isReservedPageSlug('admin'), true);
  assert.equal(isReservedPageSlug('Blog'), true);
  assert.equal(isReservedPageSlug('services'), true);
  assert.equal(isReservedPageSlug('shop'), true);
  assert.equal(isReservedPageSlug('japan-visa-guide'), false);
  assert.equal(isReservedPageSlug('terms-of-service'), false);
});

test('extractTocAndReadingStats extracts unique IDs for duplicate headings and computes read time', () => {
  const doc = lexDoc([
    lexHeading('h2', 'Planning Your Route'),
    lexParagraph('Start with Tokyo and Kyoto for a balanced first visit across Japan.'),
    lexHeading('h3', 'Day Passes'),
    lexParagraph('Compare regional passes before buying a full ticket.'),
    lexHeading('h2', 'Planning Your Route'),
    lexList(['Reserve seats early', 'Carry an IC card']),
  ]);

  const stats = extractTocAndReadingStats(doc);
  assert.equal(stats.headings.length, 3);
  assert.deepEqual(stats.headings, [
    { id: 'planning-your-route', text: 'Planning Your Route', level: 2 },
    { id: 'day-passes', text: 'Day Passes', level: 3 },
    { id: 'planning-your-route-2', text: 'Planning Your Route', level: 2 },
  ]);
  assert.ok(stats.wordCount >= 20);
  assert.equal(stats.readingTimeMinutes, 1);
});

test('automatic internal linker prioritizes longest matches, skips current page, and caps links', () => {
  const targets = buildInternalLinkTargets({
    currentHref: '/blog/tokyo-itinerary',
    services: [
      { slug: 'japan-tour-guide', title: 'Japan Tour Guide' },
      { slug: 'private-japan-tour', title: 'Private Japan Tour' },
      { slug: 'jr-pass-tickets', title: 'JR Pass Tickets' },
    ],
    posts: [
      {
        slug: 'tokyo-itinerary',
        title: 'Tokyo Itinerary',
        internalKeywords: ['Tokyo Itinerary'],
      },
      {
        slug: 'kyoto-ryokan-guide',
        title: 'Kyoto Ryokan Etiquette',
        internalKeywords: ['Kyoto ryokan'],
      },
    ],
    pages: [
      {
        slug: 'japan-visa-guide',
        title: 'Japan Visa Requirements',
        internalKeywords: ['Japan visa'],
      },
    ],
  });

  // Self link must be excluded
  assert.equal(
    targets.some((t) => t.href === '/blog/tokyo-itinerary'),
    false
  );

  const usedUrls = new Set<string>();
  const segments = injectInternalLinksInText(
    'Book a Private Japan Tour with JR Pass Tickets, check Japan visa rules, and stay in a Kyoto ryokan. JR Pass Tickets are great too.',
    targets,
    usedUrls,
    6
  );

  const linked = segments.filter((s) => s.type === 'link');
  assert.equal(linked.length, 4);
  assert.equal(linked[0].type === 'link' ? linked[0].href : '', '/services/private-japan-tour');
  assert.equal(linked[1].type === 'link' ? linked[1].href : '', '/services/jr-pass-tickets');
  assert.equal(linked[2].type === 'link' ? linked[2].href : '', '/japan-visa-guide');
  assert.equal(linked[3].type === 'link' ? linked[3].href : '', '/blog/kyoto-ryokan-guide');

  // Second occurrence of JR Pass Tickets must NOT be linked again
  assert.equal(
    linked.filter((l) => l.type === 'link' && l.href === '/services/jr-pass-tickets').length,
    1
  );
});

test('SEO metadata normalizers enforce clean title and 160-char description limit', () => {
  assert.equal(normalizeSeoTitle('Kyoto Guide', ''), 'Kyoto Guide | Tanogaido');
  assert.equal(normalizeSeoTitle('Kyoto Guide', 'Custom SEO Title'), 'Custom SEO Title');

  const longText = 'A'.repeat(200);
  const meta = normalizeMetaDescription(longText, '');
  assert.ok(meta.length <= 160);
  assert.ok(meta.endsWith('...'));

  assert.equal(getSiteOrigin('http://localhost:3000/admin'), 'http://localhost:3000');
  assert.equal(getSiteOrigin('https://tanogaido.com/admin/posts'), 'https://tanogaido.com');
  assert.equal(getSiteOrigin(''), 'https://tanogaido.com');
});
