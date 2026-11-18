import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const { secret, path } = await req.json();

    const expectedSecret = process.env.REVALIDATE_SECRET || 'tanogaido-revalidate-secret-token';
    if (!secret || secret !== expectedSecret) {
      return NextResponse.json({ message: 'Invalid revalidation secret' }, { status: 401 });
    }

    if (!path || typeof path !== 'string') {
      return NextResponse.json({ message: 'Path string is required' }, { status: 400 });
    }

    revalidatePath(path);

    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: Date.now(),
    });
  } catch (err: any) {
    return NextResponse.json({ message: err?.message || 'Revalidation failed' }, { status: 500 });
  }
}
