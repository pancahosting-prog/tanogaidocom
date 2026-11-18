import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/cms';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string; source?: string };
    const email = (body.email || '').trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (process.env.MONGODB_URI) {
      try {
        const payload = await getPayloadClient();
        const existing = await payload.find({
          collection: 'subscribers',
          where: { email: { equals: email } },
          limit: 1,
        });
        if (existing.docs.length === 0) {
          await payload.create({
            collection: 'subscribers',
            data: {
              email,
              source: body.source || 'website-newsletter',
            },
          });
        }
      } catch {
        // Gracefully accept even if MongoDB is unreachable in static preview
      }
    }

    return NextResponse.json({ ok: true, email });
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
}
