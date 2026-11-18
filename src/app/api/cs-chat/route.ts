import { NextRequest, NextResponse } from 'next/server';
import {
  getBlogPosts,
  getPages,
  getPayloadClient,
  getProducts,
  getServices,
  getSiteSettings,
  getTrips,
} from '@/lib/cms';
import {
  buildTanogaidoKnowledgePrompt,
  buildWhatsAppContextUrl,
  callGeminiConcierge,
  executeWithRollingGeminiKeys,
  MAX_CS_AI_REPLIES,
  parseGeminiApiKeys,
  resolveGeminiModel,
  type CsChatMessage,
  type CsLeadInfo,
} from '@/lib/gemini-cs';

interface CsChatRequestBody {
  lead?: Partial<CsLeadInfo>;
  message?: string;
  history?: CsChatMessage[];
  replyCount?: number;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidWhatsApp(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 16;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CsChatRequestBody;
    const lead: CsLeadInfo = {
      name: String(body.lead?.name || '').trim(),
      whatsapp: String(body.lead?.whatsapp || '').trim(),
      email: String(body.lead?.email || '').trim(),
    };
    const userMessage = String(body.message || '').trim();
    const history: CsChatMessage[] = Array.isArray(body.history)
      ? body.history
          .filter(
            (m): m is CsChatMessage =>
              Boolean(m) &&
              (m.role === 'user' || m.role === 'assistant') &&
              typeof m.content === 'string'
          )
          .slice(-12)
      : [];

    if (!lead.name || lead.name.length < 2) {
      return NextResponse.json(
        { error: 'Please enter your full name before chatting.' },
        { status: 400 }
      );
    }
    if (!isValidWhatsApp(lead.whatsapp)) {
      return NextResponse.json(
        { error: 'Please enter a valid WhatsApp number (at least 8 digits).' },
        { status: 400 }
      );
    }
    if (!isValidEmail(lead.email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }
    if (!userMessage) {
      return NextResponse.json({ error: 'Message cannot be empty.' }, { status: 400 });
    }

    const assistantCountInHistory = history.filter((m) => m.role === 'assistant').length;
    const currentReplies = Math.max(Number(body.replyCount || 0), assistantCountInHistory);

    const [siteSettings, services, trips, products, posts, pages] = await Promise.all([
      getSiteSettings(),
      getServices(),
      getTrips(),
      getProducts(),
      getBlogPosts(),
      getPages(),
    ]);

    if (currentReplies >= MAX_CS_AI_REPLIES) {
      const whatsappUrl = buildWhatsAppContextUrl({
        whatsappNumber: siteSettings.whatsappNumber,
        lead,
        messages: history,
      });
      return NextResponse.json(
        {
          limitReached: true,
          replyCount: MAX_CS_AI_REPLIES,
          remainingReplies: 0,
          whatsappUrl,
          error:
            'You have reached the 5-reply limit for the automated assistant. Please continue directly with our human concierge on WhatsApp.',
        },
        { status: 429 }
      );
    }

    let dbKeys: string[] = [];
    let activeKeyIndex = 0;
    let selectedModel = 'gemini-3.1-flash-lite';
    let hasDb = Boolean(process.env.MONGODB_URI && process.env.MONGODB_URI.trim().length > 0);
    let payloadInstance: Awaited<ReturnType<typeof getPayloadClient>> | null = null;

    if (hasDb) {
      try {
        payloadInstance = await getPayloadClient();
        const rawSettings = (await payloadInstance.findGlobal({
          slug: 'site-settings',
          overrideAccess: true,
        })) as unknown as Record<string, unknown> | null;

        if (rawSettings) {
          dbKeys = parseGeminiApiKeys(rawSettings.geminiApiKeysBulk as string | undefined);
          activeKeyIndex = Number(rawSettings.geminiActiveKeyIndex || 0);
          selectedModel = resolveGeminiModel(rawSettings.geminiModel as string | undefined);
        }
      } catch {
        hasDb = false;
      }
    }

    const envFallbackKey = (process.env.GEMINI_API_KEY || '').trim();
    const keyPool = dbKeys.length > 0 ? dbKeys : envFallbackKey ? [envFallbackKey] : [];

    if (keyPool.length === 0) {
      const whatsappUrl = buildWhatsAppContextUrl({
        whatsappNumber: siteSettings.whatsappNumber,
        lead,
        messages: [...history, { role: 'user', content: userMessage }],
      });
      return NextResponse.json(
        {
          error:
            'AI concierge API keys are not configured in Admin Settings yet. Please continue directly via WhatsApp.',
          whatsappUrl,
        },
        { status: 503 }
      );
    }

    const nextReplyCount = currentReplies + 1;
    const remainingAfterThis = Math.max(0, MAX_CS_AI_REPLIES - nextReplyCount);

    const systemInstruction = buildTanogaidoKnowledgePrompt({
      siteSettings,
      services,
      trips,
      products,
      posts,
      pages,
      customerName: lead.name,
      remainingRepliesAfterThis: remainingAfterThis,
    });

    const result = await executeWithRollingGeminiKeys({
      keys: keyPool,
      startIndex: activeKeyIndex,
      model: selectedModel,
      fallbackModel: 'gemini-3.1-flash-lite',
      run: async (apiKey, model) =>
        callGeminiConcierge({
          apiKey,
          model,
          systemInstruction,
          history,
          userMessage,
        }),
    });

    if (
      hasDb &&
      payloadInstance &&
      dbKeys.length > 0 &&
      result.usedKeyIndex !== activeKeyIndex
    ) {
      try {
        await payloadInstance.updateGlobal({
          slug: 'site-settings',
          data: {
            geminiActiveKeyIndex: result.usedKeyIndex,
          } as Record<string, unknown>,
          overrideAccess: true,
          context: { skipRevalidate: true },
        });
      } catch {
        // Non-blocking cursor update
      }
    }

    const updatedHistory: CsChatMessage[] = [
      ...history,
      { role: 'user', content: userMessage },
      { role: 'assistant', content: result.text },
    ];

    const whatsappUrl = buildWhatsAppContextUrl({
      whatsappNumber: siteSettings.whatsappNumber,
      lead,
      messages: updatedHistory,
    });

    return NextResponse.json({
      reply: result.text,
      replyCount: nextReplyCount,
      remainingReplies: remainingAfterThis,
      limitReached: nextReplyCount >= MAX_CS_AI_REPLIES,
      whatsappUrl,
    });
  } catch (err) {
    console.error('[api/cs-chat]', err);
    return NextResponse.json(
      {
        error:
          'Unable to reach the AI concierge right now. Please connect directly with our team on WhatsApp.',
      },
      { status: 502 }
    );
  }
}
