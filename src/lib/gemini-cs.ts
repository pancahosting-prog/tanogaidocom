import { GoogleGenAI } from '@google/genai';
import type {
  BlogPostItem,
  PageItem,
  ProductItem,
  ServiceItem,
  SiteSettingsData,
  TripItem,
} from '@/types/cms';
import { getSiteOrigin } from './editorial';
export {
  MAX_CS_AI_REPLIES,
  buildWhatsAppContextUrl,
  extractConversationContextSummary,
  type CsChatMessage,
  type CsLeadInfo,
} from './cs-context';

export const GEMINI_MODEL_OPTIONS = [
  { label: 'Gemini 3.1 Flash Lite (Recommended)', value: 'gemini-3.1-flash-lite' },
  { label: 'Gemini 3.5 Flash Lite', value: 'gemini-3.5-flash-lite' },
  { label: 'Gemini 3.1 Pro Preview', value: 'gemini-3.1-pro-preview' },
  { label: 'Gemini 4 Flash (Hydrogen)', value: 'gemini-4-hydrogen' },
] as const;

export type AllowedGeminiModel = (typeof GEMINI_MODEL_OPTIONS)[number]['value'];

const ALLOWED_MODEL_SET = new Set<string>(GEMINI_MODEL_OPTIONS.map((m) => m.value));

export function resolveGeminiModel(selected?: string | null): AllowedGeminiModel {
  const cleaned = String(selected || '').trim();
  if (ALLOWED_MODEL_SET.has(cleaned)) {
    return cleaned as AllowedGeminiModel;
  }
  return 'gemini-3.1-flash-lite';
}

export function parseGeminiApiKeys(rawBulk?: string | null): string[] {
  const raw = String(rawBulk || '').trim();
  if (!raw) return [];
  const tokens = raw
    .split(/[\r\n,;\s]+/)
    .map((part) => part.replace(/^["'`]+|["'`]+$/g, '').trim())
    .filter((part) => part.length >= 16);

  const seen = new Set<string>();
  const unique: string[] = [];
  for (const key of tokens) {
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(key);
    }
  }
  return unique;
}

export function isKeyRotationError(err: unknown): boolean {
  const obj = err && typeof err === 'object' ? (err as Record<string, unknown>) : {};
  const status = Number(obj.status ?? obj.code ?? 0);
  const msg = String(obj.message || err || '').toLowerCase();

  if (status === 429 || status === 401 || status === 403) {
    return true;
  }

  return (
    msg.includes('resource_exhausted') ||
    msg.includes('quota') ||
    msg.includes('rate limit') ||
    msg.includes('429') ||
    msg.includes('api_key_invalid') ||
    msg.includes('api key not valid') ||
    msg.includes('api key expired') ||
    msg.includes('permission_denied') ||
    msg.includes('invalid api key') ||
    msg.includes('billing') ||
    msg.includes('exceeded')
  );
}

export function isModelNotFoundError(err: unknown): boolean {
  const obj = err && typeof err === 'object' ? (err as Record<string, unknown>) : {};
  const status = Number(obj.status ?? obj.code ?? 0);
  const msg = String(obj.message || err || '').toLowerCase();
  return (
    status === 404 ||
    msg.includes('not_found') ||
    (msg.includes('model') && (msg.includes('not found') || msg.includes('not supported')))
  );
}

export interface RollingKeyAttemptResult {
  text: string;
  usedKeyIndex: number;
  rotated: boolean;
  attempts: number;
  modelUsed: string;
}

export type KeyAttemptRunner = (apiKey: string, model: string) => Promise<string>;

export async function executeWithRollingGeminiKeys(params: {
  keys: string[];
  startIndex?: number;
  model: string;
  fallbackModel?: string;
  run: KeyAttemptRunner;
}): Promise<RollingKeyAttemptResult> {
  const { keys, model, fallbackModel = 'gemini-3.1-flash-lite', run } = params;
  if (!keys.length) {
    throw new Error('NO_GEMINI_KEYS_CONFIGURED');
  }

  const total = keys.length;
  const safeStart = ((Math.floor(params.startIndex || 0) % total) + total) % total;
  let lastError: unknown;

  for (let offset = 0; offset < total; offset++) {
    const idx = (safeStart + offset) % total;
    const key = keys[idx];
    try {
      const text = await run(key, model);
      return {
        text,
        usedKeyIndex: idx,
        rotated: idx !== safeStart,
        attempts: offset + 1,
        modelUsed: model,
      };
    } catch (err) {
      if (isModelNotFoundError(err) && fallbackModel && fallbackModel !== model) {
        try {
          const text = await run(key, fallbackModel);
          return {
            text,
            usedKeyIndex: idx,
            rotated: idx !== safeStart,
            attempts: offset + 1,
            modelUsed: fallbackModel,
          };
        } catch (fallbackErr) {
          lastError = fallbackErr;
          if (isKeyRotationError(fallbackErr)) {
            continue;
          }
          throw fallbackErr;
        }
      }

      lastError = err;
      if (isKeyRotationError(err)) {
        continue;
      }
      throw err;
    }
  }

  const exhaustedError = new Error(
    `ALL_GEMINI_KEYS_EXHAUSTED: ${lastError instanceof Error ? lastError.message : String(lastError || '')}`
  );
  throw exhaustedError;
}

export async function callGeminiConcierge(params: {
  apiKey: string;
  model: string;
  systemInstruction: string;
  history: Array<{ role: 'user' | 'assistant'; content: string }>;
  userMessage: string;
}): Promise<string> {
  const ai = new GoogleGenAI({
    apiKey: params.apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const contents = [
    ...params.history
      .filter((m) => m.content.trim().length > 0)
      .slice(-10)
      .map((m) => ({
        role: m.role === 'assistant' ? ('model' as const) : ('user' as const),
        parts: [{ text: m.content.trim() }],
      })),
    {
      role: 'user' as const,
      parts: [{ text: params.userMessage.trim() }],
    },
  ];

  const response = await ai.models.generateContent({
    model: params.model,
    contents,
    config: {
      systemInstruction: params.systemInstruction,
    },
  });

  const text = (response.text || '').trim();
  if (!text) {
    throw new Error('EMPTY_GEMINI_RESPONSE');
  }
  return text;
}

export function buildTanogaidoKnowledgePrompt(params: {
  siteSettings: SiteSettingsData;
  services: ServiceItem[];
  trips: TripItem[];
  products: ProductItem[];
  posts: BlogPostItem[];
  pages: PageItem[];
  customerName: string;
  remainingRepliesAfterThis: number;
}): string {
  const origin = getSiteOrigin();

  const serviceLines = params.services
    .map(
      (s) =>
        `- ${s.title} (${s.categoryLabel}, ${origin}/services/${s.slug}): ${s.shortDesc}${
          s.features?.length ? ` Highlights: ${s.features.slice(0, 3).join('; ')}.` : ''
        }`
    )
    .join('\n');

  const tripLines = params.trips
    .map(
      (t) => `- ${t.title} (${t.daysLabel} · ${t.locationLabel} · From ${t.priceFrom}): ${t.shortDesc}`
    )
    .join('\n');

  const productLines = params.products
    .map(
      (p) =>
        `- ${p.title} (${p.origin}, $${p.price} USD, ${origin}/shop/${p.slug}): ${p.shortDesc}`
    )
    .join('\n');

  const guideLines = [
    ...params.posts.slice(0, 6).map((p) => `- Blog: ${p.title} (${origin}/blog/${p.slug})`),
    ...params.pages.slice(0, 4).map((p) => `- Page: ${p.title} (${origin}/${p.slug})`),
  ].join('\n');

  const handoffNote =
    params.remainingRepliesAfterThis <= 0
      ? 'This is the 5th and final automated reply in this chat session. Answer their question concisely and politely invite them to click "Continue on WhatsApp" below to speak directly with a human Tanogaido Japan consultant.'
      : 'Keep responses concise (2-4 clear sentences or brief bullet points) and easy to read.';

  return [
    `You are the official Tanogaido Customer Service Concierge representing ${params.siteSettings.companyName || 'PT. Tanogaido Fantasi Pratama'} (brand: Tanogaido, official website: ${origin} and tanogaido.com).`,
    `You are speaking with ${params.customerName}.`,
    '',
    'MANDATORY RULES:',
    '1. LANGUAGE: You MUST ALWAYS reply strictly in clear, warm, professional ENGLISH. Even if the customer writes in Indonesian, Japanese, or any other language, reply exclusively in English.',
    '2. SCOPE RESTRICTION: Answer ONLY questions related to Tanogaido (tanogaido.com) services, private Japan tours, licensed bilingual guides, Japan visa concierge, JR Pass & transport, private car rentals, business/medical interpretation, study in Japan consultation, curated Japanese shop products, booking workflows, pricing details listed below, company credentials, or official contact info.',
    '3. OFF-TOPIC REFUSAL: If the customer asks anything unrelated to Tanogaido or Japan travel/services (e.g., general coding, math homework, politics, medical diagnosis, unrelated trivia), politely explain in English that you can only assist with Tanogaido Japan services and ask how you can help with their Japan trip, visa, or order.',
    '4. ACCURACY: Never invent prices, visa approvals, or unverified claims. If exact custom pricing depends on itinerary dates/group size, state that clearly and offer to connect them with the WhatsApp concierge.',
    `5. BREVITY & HANDOFF: ${handoffNote}`,
    '',
    'COMPANY PROFILE (tanogaido.com):',
    `- Legal Entity: ${params.siteSettings.companyName} (Established 2007)`,
    `- NIB: ${params.siteSettings.nibNumber} | AHU Decree: ${params.siteSettings.ahuDecree}`,
    `- Jakarta Office: ${params.siteSettings.address}`,
    `- Official Email: ${params.siteSettings.email} | WhatsApp: +${params.siteSettings.whatsappNumber}`,
    '',
    'TANOGAIDO SERVICES CATALOG:',
    serviceLines,
    '',
    'FEATURED JAPAN TRIPS:',
    tripLines,
    '',
    'TANOGAIDO JAPAN GOODS SHOP (USD):',
    productLines,
    '',
    'PUBLISHED GUIDES & PAGES:',
    guideLines,
  ].join('\n');
}
