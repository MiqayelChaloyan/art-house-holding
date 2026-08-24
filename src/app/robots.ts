import type { MetadataRoute } from 'next';

import { siteUrl } from '@/src/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /monitoring is intentionally crawlable so Googlebot can read its noindex
      // directive; blocking it here would let the URL be indexed link-only.
      disallow: ['/admin', '/api/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
};
