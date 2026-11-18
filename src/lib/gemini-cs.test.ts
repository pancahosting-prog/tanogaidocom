import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildWhatsAppContextUrl,
  executeWithRollingGeminiKeys,
  extractConversationContextSummary,
  isKeyRotationError,
  parseGeminiApiKeys,
  resolveGeminiModel,
} from './gemini-cs';

test('parseGeminiApiKeys parses 12+ bulk pasted keys with newlines, commas, quotes, and deduplication', () => {
  const bulk = `
    AIzaSyKeyOne1234567890
    "AIzaSyKeyTwo1234567890", AIzaSyKeyThree123456789
    AIzaSyKeyTwo1234567890
    AIzaSyKeyFour123456789; AIzaSyKeyFive123456789
    AIzaSyKeySix1234567890
    AIzaSyKeySeven12345678
    AIzaSyKeyEight12345678
    AIzaSyKeyNine123456789
    AIzaSyKeyTen1234567890
    AIzaSyKeyEleven1234567
    AIzaSyKeyTwelve1234567
    short
  `;
  const parsed = parseGeminiApiKeys(bulk);
  assert.equal(parsed.length, 12);
  assert.equal(parsed[0], 'AIzaSyKeyOne1234567890');
  assert.equal(parsed[11], 'AIzaSyKeyTwelve1234567');
});

test('executeWithRollingGeminiKeys rolls automatically from exhausted/invalid keys to next working key', async () => {
  const keys = Array.from({ length: 12 }, (_, idx) => `AIzaSyMockKeyNumber_${idx + 1}_123456`);
  const tried: string[] = [];

  const result = await executeWithRollingGeminiKeys({
    keys,
    startIndex: 0,
    model: 'gemini-3.1-flash-lite',
    run: async (apiKey) => {
      tried.push(apiKey);
      if (apiKey === keys[0]) {
        throw Object.assign(new Error('429 RESOURCE_EXHAUSTED quota exceeded'), { status: 429 });
      }
      if (apiKey === keys[1]) {
        throw Object.assign(new Error('API_KEY_INVALID'), { status: 400 });
      }
      return 'Tanogaido offers licensed bilingual guides across Tokyo and Kyoto.';
    },
  });

  assert.equal(tried.length, 3);
  assert.equal(result.usedKeyIndex, 2);
  assert.equal(result.rotated, true);
  assert.match(result.text, /licensed bilingual guides/);
});

test('executeWithRollingGeminiKeys wraps around cleanly from non-zero start index and fails loudly if all keys fail', async () => {
  const keys = ['key_0_01234567890123', 'key_1_01234567890123', 'key_2_01234567890123'];
  const order: number[] = [];

  const res = await executeWithRollingGeminiKeys({
    keys,
    startIndex: 2,
    model: 'gemini-3.5-flash-lite',
    run: async (apiKey) => {
      const idx = keys.indexOf(apiKey);
      order.push(idx);
      if (idx === 2) {
        throw new Error('quota exceeded');
      }
      return 'Tokyo itinerary ready';
    },
  });

  assert.deepEqual(order, [2, 0]);
  assert.equal(res.usedKeyIndex, 0);
  assert.equal(res.rotated, true);

  await assert.rejects(
    () =>
      executeWithRollingGeminiKeys({
        keys,
        startIndex: 0,
        model: 'gemini-3.1-flash-lite',
        run: async () => {
          throw new Error('429 RESOURCE_EXHAUSTED');
        },
      }),
    /ALL_GEMINI_KEYS_EXHAUSTED/
  );

  assert.equal(isKeyRotationError({ status: 429, message: 'Too Many Requests' }), true);
  assert.equal(resolveGeminiModel('gemini-3.5-flash-lite'), 'gemini-3.5-flash-lite');
  assert.equal(resolveGeminiModel('unknown-model'), 'gemini-3.1-flash-lite');
});

test('buildWhatsAppContextUrl carries customer lead info and concise conversation context only', () => {
  const messages = [
    { role: 'user' as const, content: 'Do you help with Japan tourist visa from Jakarta?' },
    {
      role: 'assistant' as const,
      content:
        'Very long verbose AI paragraph that should NOT be copied verbatim into WhatsApp URLs because the user asked for conversation context only.',
    },
    { role: 'user' as const, content: 'Also need private tour guide in Kyoto for 4 days.' },
  ];

  const context = extractConversationContextSummary(messages);
  assert.match(context, /Japan Tour Guide/);
  assert.match(context, /Japan Visa Concierge/);
  assert.doesNotMatch(context, /Very long verbose AI paragraph/);

  const url = buildWhatsAppContextUrl({
    whatsappNumber: '6281318939319',
    lead: {
      name: 'Budi Santoso',
      whatsapp: '+628123456789',
      email: 'budi@example.com',
    },
    messages,
  });

  assert.ok(url.startsWith('https://wa.me/6281318939319?text='));
  const decoded = decodeURIComponent(url.split('?text=')[1]);
  assert.match(decoded, /Name: Budi Santoso/);
  assert.match(decoded, /WhatsApp: \+628123456789/);
  assert.match(decoded, /Email: budi@example\.com/);
  assert.match(decoded, /Conversation Context:/);
  assert.doesNotMatch(decoded, /Very long verbose AI paragraph/);
});
