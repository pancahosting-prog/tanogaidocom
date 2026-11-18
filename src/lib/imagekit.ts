export interface ImageKitUploadResult {
  fileId: string;
  name: string;
  filePath: string;
  url: string;
  size: number;
  width?: number;
  height?: number;
  fileType?: string;
}

function trimSlashes(value: string): string {
  return value.replace(/^\/+|\/+$/g, '');
}

export function getImageKitConfig() {
  const privateKey = (process.env.IMAGEKIT_PRIVATE_KEY || '').trim();
  const publicKey = (process.env.IMAGEKIT_PUBLIC_KEY || '').trim();
  const urlEndpoint = (process.env.IMAGEKIT_URL_ENDPOINT || '').trim().replace(/\/+$/, '');
  const folder = trimSlashes((process.env.IMAGEKIT_FOLDER || 'tanogaido').trim()) || 'tanogaido';

  return {
    privateKey,
    publicKey,
    urlEndpoint,
    folder,
  };
}

export function isImageKitConfigured(): boolean {
  const { privateKey, urlEndpoint } = getImageKitConfig();
  return Boolean(privateKey && urlEndpoint);
}

export function hasImageKitEndpoint(): boolean {
  const { urlEndpoint } = getImageKitConfig();
  return Boolean(urlEndpoint);
}

export function buildProxyMediaUrl(filePath?: string | null): string {
  const cleaned = trimSlashes((filePath || '').trim());
  if (!cleaned) return '';
  return `/media/${cleaned
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/')}`;
}

export function extractProxyMediaUrl(mediaDoc: unknown): string {
  if (!mediaDoc || typeof mediaDoc !== 'object') return '';
  const doc = mediaDoc as Record<string, unknown>;
  if (typeof doc.imagekitPath === 'string' && doc.imagekitPath.trim()) {
    return buildProxyMediaUrl(doc.imagekitPath);
  }
  if (typeof doc.proxyUrl === 'string' && doc.proxyUrl.startsWith('/media/')) {
    return doc.proxyUrl;
  }
  if (typeof doc.filename === 'string' && doc.filename.trim()) {
    return buildProxyMediaUrl(doc.filename);
  }
  if (typeof doc.url === 'string' && doc.url.trim()) {
    return doc.url.trim();
  }
  return '';
}

export function buildImageKitUpstreamUrl(
  rawPath: string,
  searchParams?: URLSearchParams
): string {
  const { urlEndpoint } = getImageKitConfig();
  if (!urlEndpoint) return '';

  const cleanPath = trimSlashes(rawPath);
  const baseUrl = `${urlEndpoint}/${cleanPath
    .split('/')
    .map((seg) => encodeURIComponent(seg))
    .join('/')}`;

  if (!searchParams) return baseUrl;

  const transforms: string[] = [];
  const w = searchParams.get('w');
  const h = searchParams.get('h');
  const q = searchParams.get('q');
  const f = searchParams.get('f');
  const c = searchParams.get('c');

  if (w && /^\d{1,4}$/.test(w)) transforms.push(`w-${w}`);
  if (h && /^\d{1,4}$/.test(h)) transforms.push(`h-${h}`);
  if (q && /^\d{1,3}$/.test(q)) transforms.push(`q-${q}`);
  if (f && /^(auto|webp|avif|jpg|png)$/.test(f)) transforms.push(`f-${f}`);
  if (c && /^(maintain_ratio|force|at_least|at_max)$/.test(c)) transforms.push(`c-${c}`);

  if (transforms.length === 0) return baseUrl;
  return `${baseUrl}?tr=${transforms.join(',')}`;
}

export async function uploadToImageKit(params: {
  buffer: Buffer;
  fileName: string;
  mimeType?: string;
  folder?: string;
}): Promise<ImageKitUploadResult> {
  const { privateKey, folder: defaultFolder } = getImageKitConfig();
  if (!privateKey) {
    throw new Error('IMAGEKIT_PRIVATE_KEY is not configured');
  }

  const targetFolder = `/${trimSlashes(params.folder || defaultFolder)}`;
  const form = new FormData();
  const blob = new Blob([new Uint8Array(params.buffer)], {
    type: params.mimeType || 'application/octet-stream',
  });
  form.append('file', blob, params.fileName);
  form.append('fileName', params.fileName);
  form.append('folder', targetFolder);
  form.append('useUniqueFileName', 'true');

  const authHeader = `Basic ${Buffer.from(`${privateKey}:`).toString('base64')}`;

  const res = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
    method: 'POST',
    headers: {
      Authorization: authHeader,
    },
    body: form,
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => res.statusText);
    throw new Error(`ImageKit upload failed (${res.status}): ${errorText}`);
  }

  const data = (await res.json()) as ImageKitUploadResult;
  return data;
}

export async function deleteFromImageKit(fileId?: string | null): Promise<void> {
  if (!fileId) return;
  const { privateKey } = getImageKitConfig();
  if (!privateKey) return;

  const authHeader = `Basic ${Buffer.from(`${privateKey}:`).toString('base64')}`;
  try {
    await fetch(`https://api.imagekit.io/v1/files/${encodeURIComponent(fileId)}`, {
      method: 'DELETE',
      headers: {
        Authorization: authHeader,
      },
    });
  } catch {
    // Ignore non-fatal cleanup errors on deletion
  }
}
