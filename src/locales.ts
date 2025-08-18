export const locales = ['am', 'en', 'ru'] as const;
export type Locale = (typeof locales)[number];