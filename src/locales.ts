export const locales = ['en', 'am', 'ru'] as const;
export type Locale = (typeof locales)[number];