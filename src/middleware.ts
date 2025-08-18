import createMiddleware from 'next-intl/middleware';

import { locales } from './locales'


export default createMiddleware({
  locales,
  defaultLocale: 'am',
  localeDetection: false,
});

export const config = {
  matcher: ['/', '/(am|en|ru)/:path*']
};





