import { createClient, type SanityClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from './env';

let cachedWriteClient: SanityClient | null = null;

/** Server-only Sanity client with write permissions for analytics ingestion. */
export function getWriteClient(): SanityClient {
  if (cachedWriteClient) return cachedWriteClient;

  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) {
    throw new Error('Missing environment variable: SANITY_API_WRITE_TOKEN');
  }

  cachedWriteClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  });

  return cachedWriteClient;
}
