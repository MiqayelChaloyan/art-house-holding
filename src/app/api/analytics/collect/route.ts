import { NextResponse } from 'next/server';

import { ingestAnalyticsEvents } from '@/src/lib/analytics/server/ingest';
import { getClientIp } from '@/src/lib/analytics/server/client-ip';
import { payloadToDocument, validateCollectPayload } from '@/src/lib/analytics/server/validate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const events = validateCollectPayload(body);

    if (!events) {
      return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
    }

    const clientIp = getClientIp(request);

    const documents = events.map((event) => {
      const doc = payloadToDocument(event);
      doc.clientIp = clientIp;
      return doc;
    });

    void ingestAnalyticsEvents(documents).catch(() => {
      // swallow ingestion errors to avoid impacting client
    });

    return NextResponse.json({ ok: true, accepted: events.length });
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
