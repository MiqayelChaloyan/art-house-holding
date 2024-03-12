import createMiddleware from 'next-intl/middleware';

import { locales } from './navigation';

export default createMiddleware({
    locales,
    defaultLocale: 'am'
});

export const config = {
    matcher: ['/', '/(ru|en|am)/:path*']
};