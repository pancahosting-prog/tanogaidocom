export const MAX_CS_AI_REPLIES = 5;

export interface CsLeadInfo {
  name: string;
  whatsapp: string;
  email: string;
}

export interface CsChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function extractConversationContextSummary(messages: CsChatMessage[]): string {
  const userInquiries = messages
    .filter((m) => m.role === 'user')
    .map((m) => m.content.replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  if (!userInquiries.length) {
    return 'General inquiry regarding Tanogaido Japan services.';
  }

  const combinedText = userInquiries.join(' ').toLowerCase();
  const detectedTopics: string[] = [];
  const topicMatchers: Array<[RegExp, string]> = [
    [/tour\s*guide|pemandu|guide/i, 'Japan Tour Guide'],
    [/visa|e-?visa|embassy|vafs/i, 'Japan Visa Concierge'],
    [/jr\s*pass|shinkansen|rail|train|transport|car|alphard|hiace|airport|transfer/i, 'Rail Pass & Private Transport'],
    [/private\s*tour|itinerary|tokyo|kyoto|osaka|fuji|hokkaido|trip|days/i, 'Private Japan Itinerary'],
    [/matcha|shop|product|ceramic|bottle|wifi|esim|sim|bag|tumbler|gift/i, 'Tanogaido Japan Shop & Essentials'],
    [/study|school|university|medical|hospital|interpre|business|translate/i, 'Study / Business / Medical Concierge'],
  ];

  for (const [pattern, label] of topicMatchers) {
    if (pattern.test(combinedText)) {
      detectedTopics.push(label);
    }
  }

  const compactQuestions = userInquiries
    .slice(-4)
    .map((q) => (q.length > 90 ? `${q.slice(0, 87)}...` : q))
    .map((q, i) => `${i + 1}) ${q}`)
    .join(' | ');

  const topicHeader = detectedTopics.length ? `Topics: ${detectedTopics.join(', ')}\n` : '';
  const digest = `${topicHeader}Inquiry context: ${compactQuestions}`;
  return digest.length > 420 ? `${digest.slice(0, 417)}...` : digest;
}

export function buildWhatsAppContextUrl(params: {
  whatsappNumber: string;
  lead: CsLeadInfo;
  messages: CsChatMessage[];
}): string {
  const cleanTargetNumber =
    String(params.whatsappNumber || '6281318939319').replace(/\D/g, '') || '6281318939319';
  const contextDigest = extractConversationContextSummary(params.messages);

  const text = [
    'Hello Tanogaido Concierge,',
    `Name: ${params.lead.name.trim()}`,
    `WhatsApp: ${params.lead.whatsapp.trim()}`,
    `Email: ${params.lead.email.trim()}`,
    '',
    'Conversation Context:',
    contextDigest,
  ].join('\n');

  return `https://wa.me/${cleanTargetNumber}?text=${encodeURIComponent(text)}`;
}
