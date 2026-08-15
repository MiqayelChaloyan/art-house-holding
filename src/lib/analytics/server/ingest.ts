import { getWriteClient } from '@/sanity/client-write';

import type { AnalyticsEventDocument } from '../types';

export async function ingestAnalyticsEvents(events: AnalyticsEventDocument[]): Promise<void> {
  if (events.length === 0) return;

  const transaction = getWriteClient().transaction();

  for (const doc of events) {
    transaction.create({
      ...doc,
      _id: `analyticsEvent.${crypto.randomUUID()}`,
    });
  }

  await transaction.commit({ visibility: 'async' });
}

export async function deleteEventsOlderThan(cutoffIso: string): Promise<number> {
  const ids = await getWriteClient().fetch<string[]>(
    `*[_type == "analyticsEvent" && timestamp < $cutoff]._id`,
    { cutoff: cutoffIso },
  );

  return deleteAnalyticsEventsByIds(ids);
}

export async function deleteAllAnalyticsEvents(): Promise<number> {
  const ids = await getWriteClient().fetch<string[]>(`*[_type == "analyticsEvent"]._id`);
  return deleteAnalyticsEventsByIds(ids);
}

async function deleteAnalyticsEventsByIds(ids: string[]): Promise<number> {
  if (!ids.length) return 0;

  const batchSize = 100;
  let deleted = 0;

  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);
    const transaction = getWriteClient().transaction();
    batch.forEach((id) => transaction.delete(id));
    await transaction.commit();
    deleted += batch.length;
  }

  return deleted;
}
