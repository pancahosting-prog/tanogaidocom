import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body?.email?.trim()?.toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Valid email address is required.' },
        { status: 400 }
      );
    }

    if (process.env.MONGODB_URI?.trim()) {
      try {
        const payload = await getPayload({ config: configPromise });
        const existing = await payload.find({
          collection: 'newsletter-subscribers',
          where: { email: { equals: email } },
          limit: 1,
        });

        if (existing.totalDocs === 0) {
          await payload.create({
            collection: 'newsletter-subscribers',
            data: {
              email,
              subscribedAt: new Date().toISOString(),
            },
          });
        }
      } catch (dbErr) {
        console.warn('Could not store subscriber in Payload/MongoDB:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing to Tanogaido travel updates!',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to process subscription' },
      { status: 500 }
    );
  }
}
