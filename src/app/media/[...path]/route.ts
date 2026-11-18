import fs from 'node:fs/promises';
import path from 'node:path';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { buildImageKitUpstreamUrl, hasImageKitEndpoint } from '@/lib/imagekit';

export const runtime = 'nodejs';

const MIME_BY_EXT: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ico': 'image/x-icon',
};

function sanitizeSegments(segments: string[]): string[] | null {
  if (!segments || segments.length === 0) return null;
  const cleaned: string[] = [];
  for (const raw of segments) {
    const decoded = decodeURIComponent(raw);
    if (
      !decoded ||
      decoded === '.' ||
      decoded === '..' ||
      decoded.includes('/') ||
      decoded.includes('\\') ||
      decoded.includes('\0')
    ) {
      return null;
    }
    cleaned.push(decoded);
  }
  return cleaned;
}

async function tryLocalMediaFallback(segments: string[], req: NextRequest): Promise<Response | null> {
  const mediaRoot = path.resolve(process.cwd(), 'public', 'media');
  const targetPath = path.resolve(mediaRoot, ...segments);

  if (!targetPath.startsWith(mediaRoot + path.sep)) {
    return null;
  }

  try {
    const stat = await fs.stat(targetPath);
    if (!stat.isFile()) return null;

    const ext = path.extname(targetPath).toLowerCase();
    const contentType = MIME_BY_EXT[ext] || 'application/octet-stream';
    const rangeHeader = req.headers.get('range');

    if (rangeHeader && stat.size > 0) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader);
      if (match) {
        const start = match[1] ? parseInt(match[1], 10) : 0;
        const end = match[2] ? Math.min(parseInt(match[2], 10), stat.size - 1) : stat.size - 1;
        if (start <= end && start < stat.size) {
          const handle = await fs.open(targetPath, 'r');
          try {
            const chunkSize = end - start + 1;
            const buffer = Buffer.allocUnsafe(chunkSize);
            await handle.read(buffer, 0, chunkSize, start);
            return new NextResponse(req.method === 'HEAD' ? null : new Uint8Array(buffer), {
              status: 206,
              headers: {
                'Content-Type': contentType,
                'Content-Length': String(chunkSize),
                'Content-Range': `bytes ${start}-${end}/${stat.size}`,
                'Accept-Ranges': 'bytes',
                'Cache-Control': 'public, max-age=31536000, stale-while-revalidate=86400',
                'X-Content-Type-Options': 'nosniff',
              },
            });
          } finally {
            await handle.close();
          }
        }
      }
    }

    const body = req.method === 'HEAD' ? null : new Uint8Array(await fs.readFile(targetPath));
    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(stat.size),
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=31536000, stale-while-revalidate=86400',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return null;
  }
}

async function handleMediaProxy(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
): Promise<Response> {
  const { path: rawSegments } = await context.params;
  const segments = sanitizeSegments(rawSegments);
  if (!segments) {
    return NextResponse.json({ error: 'Invalid media path' }, { status: 400 });
  }

  // If ImageKit endpoint is configured, proxy upstream first while masking vendor headers
  if (hasImageKitEndpoint()) {
    const joinedPath = segments.join('/');
    const upstreamUrl = buildImageKitUpstreamUrl(joinedPath, req.nextUrl.searchParams);

    const upstreamHeaders = new Headers();
    const forwardHeaderNames = ['accept', 'range', 'if-none-match', 'if-modified-since'];
    for (const name of forwardHeaderNames) {
      const value = req.headers.get(name);
      if (value) upstreamHeaders.set(name, value);
    }

    try {
      const upstreamRes = await fetch(upstreamUrl, {
        method: req.method === 'HEAD' ? 'HEAD' : 'GET',
        headers: upstreamHeaders,
      });

      if (upstreamRes.ok || upstreamRes.status === 206 || upstreamRes.status === 304) {
        const responseHeaders = new Headers();
        const safePassHeaders = [
          'content-type',
          'content-length',
          'content-range',
          'accept-ranges',
          'etag',
          'last-modified',
        ];

        for (const h of safePassHeaders) {
          const val = upstreamRes.headers.get(h);
          if (val) responseHeaders.set(h, val);
        }

        responseHeaders.set('Cache-Control', 'public, max-age=31536000, stale-while-revalidate=86400');
        responseHeaders.set('Vary', 'Accept');
        responseHeaders.set('X-Content-Type-Options', 'nosniff');

        return new NextResponse(req.method === 'HEAD' ? null : upstreamRes.body, {
          status: upstreamRes.status,
          headers: responseHeaders,
        });
      }
    } catch {
      // Fall through to local file fallback if upstream is unreachable
    }
  }

  // Local fallback if asset exists under public/media
  const localRes = await tryLocalMediaFallback(segments, req);
  if (localRes) return localRes;

  return NextResponse.json({ error: 'Media not found' }, { status: 404 });
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
): Promise<Response> {
  return handleMediaProxy(req, context);
}

export async function HEAD(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
): Promise<Response> {
  return handleMediaProxy(req, context);
}
