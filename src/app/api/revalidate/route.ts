import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const secret = process.env.REVALIDATION_SECRET;
    if (secret) {
      const auth = req.headers.get('x-revalidation-secret') || new URL(req.url).searchParams.get('secret');
      if (auth !== secret) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const body = (await req.json().catch(() => ({}))) as { paths?: string[] };
    const paths = Array.isArray(body.paths) && body.paths.length
      ? body.paths
      : ['/', '/services', '/shop', '/about', '/product'];

    for (const p of paths) {
      revalidatePath(p);
    }
    revalidateTag('tanogaido-cms');

    return NextResponse.json({ revalidated: true, paths, timestamp: new Date().toISOString() });
  } catch {
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}
