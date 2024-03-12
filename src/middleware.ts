import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['en', 'am', 'ru'],
    defaultLocale: 'am'
});

export const config = {
    matcher: ['/', '/(en|am|ru)/:path*']
};