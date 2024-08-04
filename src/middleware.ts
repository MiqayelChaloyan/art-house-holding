import createMiddleware from 'next-intl/middleware';

import { locales } from './locales'

export default createMiddleware({
  locales,
  defaultLocale: 'am',
});

export const config = {
  matcher: ['/', '/(am|ru|en)/:path*']
};