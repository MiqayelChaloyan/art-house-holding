import createMiddleware from 'next-intl/middleware';

import {Locale, locales} from './locales'
 
export default createMiddleware({
  // A list of all locales that are supported
  locales,
 
  // Used when no locale matches
  defaultLocale: 'am', //satisfies Locale
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ru|am|en)/:path*']
};