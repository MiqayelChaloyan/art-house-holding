import createMiddleware from 'next-intl/middleware';

import { locales } from './locales'

export default createMiddleware({
  locales,
  defaultLocale: 'am',
});

export const config = {
  matcher: ['/', '/(ru|am|en)/:path*']
};