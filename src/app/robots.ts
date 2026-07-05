import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const domain = process.env.NEXT_PUBLIC_DOMAIN ?? 'https://arthouse.am';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/_next/', '/admin'],
    },
    sitemap: `${domain.replace(/\/$/, '')}/sitemap.xml`,
  };
};
