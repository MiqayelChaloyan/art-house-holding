import { createClient, type SanityClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from './env';

let cachedServerClient: SanityClient | null = null;

function resolveServerToken(): string | undefined {
  return (
    process.env.SANITY_API_WRITE_TOKEN ||
    process.env.SANITY_API_READ_TOKEN ||
    process.env.SANITY_API_TOKEN
  );
}

/**
 * Server-only Sanity client for authenticated reads (e.g. monitoring login).
 * Accepts write, read, or generic API token env vars.
 */
export function getServerClient(): SanityClient {
  if (cachedServerClient) return cachedServerClient;

  const token = resolveServerToken();
  if (!token) {
    throw new Error('SANITY_SERVER_TOKEN_MISSING');
  }

  cachedServerClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  });

  return cachedServerClient;
}

export function hasServerSanityToken(): boolean {
  return Boolean(resolveServerToken());
}
