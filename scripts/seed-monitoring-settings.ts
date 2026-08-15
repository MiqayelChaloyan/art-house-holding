/**
 * Creates the monitoringSettings singleton if it does not exist yet.
 * Run: npm run seed:monitoring
 */
import 'dotenv/config';

import { createClient } from 'next-sanity';

import { MONITORING_SETTINGS_DOCUMENT_ID } from '../sanity/constants/monitoring';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-02';

async function main() {
  if (!projectId || !dataset || !token) {
    console.error('Missing NEXT_PUBLIC_SANITY_* or SANITY_API_WRITE_TOKEN in .env');
    process.exit(1);
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });

  const existing = await client.fetch<{ _id: string } | null>(
    `*[_id == $id][0]{ _id }`,
    { id: MONITORING_SETTINGS_DOCUMENT_ID },
  );

  if (existing) {
    console.log('Monitoring settings already exist:', MONITORING_SETTINGS_DOCUMENT_ID);
    console.log('Open /admin → MONITORING → Monitoring Settings to set username and password.');
    return;
  }

  await client.createOrReplace({
    _id: MONITORING_SETTINGS_DOCUMENT_ID,
    _type: 'monitoringSettings',
    username: 'admin',
    enabled: true,
    updatedAt: new Date().toISOString(),
  });

  console.log('Created monitoring settings document:', MONITORING_SETTINGS_DOCUMENT_ID);
  console.log('Next steps:');
  console.log('1. Open /admin → MONITORING → Monitoring Settings');
  console.log('2. Change username if needed');
  console.log('3. Set New Password → Publish');
  console.log('4. Log in at /monitoring/auth');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
