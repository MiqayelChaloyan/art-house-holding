/**
 * Deletes all analyticsEvent documents from Sanity.
 * Run: npm run purge:monitoring
 */
import 'dotenv/config';

import { deleteAllAnalyticsEvents } from '../src/lib/analytics/server/ingest';

async function main() {
  const deleted = await deleteAllAnalyticsEvents();
  console.log(`Deleted ${deleted.toLocaleString()} analytics event(s) from Sanity.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
