import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';
import { lexDoc, lexParagraph, slugify } from '@/lib/editorial';

export async function GET(req: NextRequest) {
  try {
    const payload = await getPayload({ config });
    const { user } = await payload.auth({ headers: req.headers });
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [postsRes, pagesRes, categoriesRes, servicesRes, productsRes, mediaRes, ordersRes] =
      await Promise.all([
        payload.find({ collection: 'posts', limit: 5, sort: '-updatedAt' }),
        payload.find({ collection: 'pages', limit: 5, sort: '-updatedAt' }),
        payload.count({ collection: 'categories' }),
        payload.count({ collection: 'services' }),
        payload.count({ collection: 'products' }),
        payload.count({ collection: 'media' }),
        payload.count({ collection: 'orders' }),
      ]);

    const publishedPosts = await payload.count({
      collection: 'posts',
      where: { status: { equals: 'published' } },
    });
    const draftPosts = await payload.count({
      collection: 'posts',
      where: { status: { equals: 'draft' } },
    });

    return NextResponse.json({
      counts: {
        posts: postsRes.totalDocs,
        publishedPosts: publishedPosts.totalDocs,
        draftPosts: draftPosts.totalDocs,
        pages: pagesRes.totalDocs,
        categories: categoriesRes.totalDocs,
        services: servicesRes.totalDocs,
        products: productsRes.totalDocs,
        media: mediaRes.totalDocs,
        orders: ordersRes.totalDocs,
      },
      recentPosts: postsRes.docs.map((p) => ({
        id: String(p.id),
        title: String(p.title || 'Untitled'),
        slug: String(p.slug || ''),
        status: String(p.status || 'draft'),
        updatedAt: String(p.updatedAt || ''),
      })),
      recentPages: pagesRes.docs.map((p) => ({
        id: String(p.id),
        title: String(p.title || 'Untitled'),
        slug: String(p.slug || ''),
        status: String(p.status || 'draft'),
        updatedAt: String(p.updatedAt || ''),
      })),
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unable to load dashboard summary' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config });
    const { user } = await payload.auth({ headers: req.headers });
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = (await req.json()) as { title?: string; notes?: string };
    const title = String(body.title || '').trim();
    const notes = String(body.notes || '').trim();

    if (!title) {
      return NextResponse.json({ error: 'Please enter a draft title.' }, { status: 400 });
    }

    const uniqueSuffix = Date.now().toString(36).slice(-4);
    const baseSlug = slugify(title) || `draft-${uniqueSuffix}`;
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: baseSlug } },
      limit: 1,
    });
    const slug = existing.docs.length > 0 ? `${baseSlug}-${uniqueSuffix}` : baseSlug;

    const created = await payload.create({
      collection: 'posts',
      data: {
        title,
        slug,
        status: 'draft',
        excerpt: notes || `Draft article notes for ${title}.`,
        authorName: String((user as { name?: string; username?: string }).name || user.username || 'Tanogaido Editor'),
        authorRole: 'Japan Editorial Desk',
        content: lexDoc([lexParagraph(notes || `Start writing "${title}" here...`)]) as unknown as Record<
          string,
          unknown
        >,
      },
      req,
    });

    return NextResponse.json({
      id: String(created.id),
      title: String(created.title),
      slug: String(created.slug),
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to create quick draft' },
      { status: 500 }
    );
  }
}
