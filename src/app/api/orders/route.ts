import { NextResponse } from 'next/server';
import { getPayloadClient } from '@/lib/cms';

interface OrderItemInput {
  productSlug: string;
  title: string;
  variant: string;
  price: number;
  qty: number;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      customerName?: string;
      deliveryLocation?: string;
      items?: OrderItemInput[];
      subtotal?: number;
    };

    const customerName = (body.customerName || '').trim();
    const deliveryLocation = (body.deliveryLocation || '').trim();
    const items = Array.isArray(body.items) ? body.items : [];
    const subtotal = Number(body.subtotal || 0);

    if (!customerName || !deliveryLocation || items.length === 0) {
      return NextResponse.json(
        { error: 'Customer name, delivery location, and at least one item are required.' },
        { status: 400 }
      );
    }

    const orderNumber = `TG-${Math.floor(1000 + Math.random() * 9000)}`;

    if (process.env.MONGODB_URI) {
      try {
        const payload = await getPayloadClient();
        await payload.create({
          collection: 'orders',
          data: {
            orderNumber,
            customerName,
            deliveryLocation,
            items,
            subtotal,
            status: 'pending',
          },
        });
      } catch {
        // Fallback smoothly when DB is offline
      }
    }

    return NextResponse.json({ ok: true, orderNumber });
  } catch {
    return NextResponse.json({ error: 'Failed to create order.' }, { status: 400 });
  }
}
