export const locales = ['en', 'ru', 'am'] as const;
export type Locale = (typeof locales)[number];