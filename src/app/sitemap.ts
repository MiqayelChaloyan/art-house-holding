import { getCourses as getCoursesEducational } from '@/utils/data/educational-center';
import { getCourses as getCoursesDesign } from '@/utils/data/design';
import { getCourses as getCoursesLanguages } from '@/utils/data/language';

import { MetadataRoute } from 'next';
import { Pages } from '@/constants/pages';

type LocaleKeys = 'am' | 'en' | 'ru';
type LocaleValues = string;

const locales: Record<LocaleKeys, LocaleValues> = {
  am: 'am',
  en: 'en',
  ru: 'ru',
};

function escapeUrl(url: string): string {
  return url.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

async function generateSitemapEntries(locale: string): Promise<MetadataRoute.Sitemap> {
  const educationalCourses = await getCoursesEducational(locale);
  const designCourses = await getCoursesDesign(locale);
  const languageCourses = await getCoursesLanguages(locale);

  const educationalCoursesEntries = educationalCourses.map(({ slug }) => ({
    url: escapeUrl(`${process.env.NEXT_PUBLIC_DOMAIN}/${locale}${Pages.EDUCATIONAL_HOME}/${slug}`),
    lastModified: new Date().toISOString(),
    priority: 1,
  }));

  const designCoursesEntries = designCourses.map(({ slug }) => ({
    url: escapeUrl(`${process.env.NEXT_PUBLIC_DOMAIN}/${locale}${Pages.DESIGN_HOME}/${slug}`),
    lastModified: new Date().toISOString(),
    priority: 1,
  }));

  const languageCoursesEntries = languageCourses.map(({ slug }) => ({
    url: escapeUrl(`${process.env.NEXT_PUBLIC_DOMAIN}/${locale}${Pages.LANGUAGE_HOME}/${slug.current}`),
    lastModified: new Date().toISOString(),
    priority: 1,
  }));

  return [
    {
      url: escapeUrl(`${process.env.NEXT_PUBLIC_DOMAIN}/${locale}`),
      lastModified: new Date().toISOString(),
      priority: 1,
      changeFrequency: 'weekly',
    },
    {
      url: escapeUrl(`${process.env.NEXT_PUBLIC_DOMAIN}/${locale}/${Pages.HOME_ABOUT}`),
      lastModified: new Date().toISOString(),
      priority: 0.5,
      changeFrequency: 'weekly',
    },
    {
      url: escapeUrl(`${process.env.NEXT_PUBLIC_DOMAIN}/${locale}${Pages.EDUCATIONAL_HOME}`),
      lastModified: new Date().toISOString(),
      priority: 1,
      changeFrequency: 'weekly',
    },
    {
      url: escapeUrl(`${process.env.NEXT_PUBLIC_DOMAIN}/${locale}${Pages.EDUCATIONAL_ABOUT}`),
      lastModified: new Date().toISOString(),
      priority: 0.5,
      changeFrequency: 'weekly',
    },
    {
      url: escapeUrl(`${process.env.NEXT_PUBLIC_DOMAIN}/${locale}${Pages.EDUCATIONAL_PARTNERS}`),
      lastModified: new Date().toISOString(),
      priority: 0.5,
      changeFrequency: 'weekly',
    },
    {
      url: escapeUrl(`${process.env.NEXT_PUBLIC_DOMAIN}/${locale}${Pages.EDUCATIONAL_PRICE_LIST}`),
      lastModified: new Date().toISOString(),
      priority: 0.5,
      changeFrequency: 'weekly',
    },
    {
      url: escapeUrl(`${process.env.NEXT_PUBLIC_DOMAIN}/${locale}${Pages.LANGUAGE_HOME}`),
      lastModified: new Date().toISOString(),
      priority: 1,
      changeFrequency: 'weekly',
    },
    {
      url: escapeUrl(`${process.env.NEXT_PUBLIC_DOMAIN}/${locale}${Pages.LANGUAGE_LANGUAGES}`),
      lastModified: new Date().toISOString(),
      priority: 0.5,
      changeFrequency: 'weekly',
    },
    {
      url: escapeUrl(`${process.env.NEXT_PUBLIC_DOMAIN}/${locale}${Pages.LANGUAGE_PROMOTIONS}`),
      lastModified: new Date().toISOString(),
      priority: 0.5,
      changeFrequency: 'weekly',
    },
    {
      url: escapeUrl(`${process.env.NEXT_PUBLIC_DOMAIN}/${locale}${Pages.LANGUAGE_PRICE_LIST}`),
      lastModified: new Date().toISOString(),
      priority: 0.5,
      changeFrequency: 'weekly',
    },
    {
      url: escapeUrl(`${process.env.NEXT_PUBLIC_DOMAIN}/${locale}${Pages.LANGUAGE_PARTNERS}`),
      lastModified: new Date().toISOString(),
      priority: 0.5,
      changeFrequency: 'weekly',
    },
    {
      url: escapeUrl(`${process.env.NEXT_PUBLIC_DOMAIN}/${locale}${Pages.LANGUAGE_SEND_REQUEST}`),
      lastModified: new Date().toISOString(),
      priority: 0.5,
      changeFrequency: 'weekly',
    },
    {
      url: escapeUrl(`${process.env.NEXT_PUBLIC_DOMAIN}/${locale}${Pages.LANGUAGE_TAKE_TEST}`),
      lastModified: new Date().toISOString(),
      priority: 0.5,
      changeFrequency: 'weekly',
    },
    {
      url: escapeUrl(`${process.env.NEXT_PUBLIC_DOMAIN}/${locale}${Pages.LANGUAGE_ABOUT}`),
      lastModified: new Date().toISOString(),
      priority: 0.5,
      changeFrequency: 'weekly',
    },
    {
      url: escapeUrl(`${process.env.NEXT_PUBLIC_DOMAIN}/${locale}${Pages.LANGUAGE_QUIZ}`),
      lastModified: new Date().toISOString(),
      priority: 0.5,
      changeFrequency: 'weekly',
    },
    {
      url: escapeUrl(`${process.env.NEXT_PUBLIC_DOMAIN}/${locale}${Pages.DESIGN_HOME}`),
      lastModified: new Date().toISOString(),
      priority: 1,
      changeFrequency: 'weekly',
    },
    {
      url: escapeUrl(`${process.env.NEXT_PUBLIC_DOMAIN}/${locale}${Pages.DESIGN_PRICE_LIST}`),
      lastModified: new Date().toISOString(),
      priority: 0.5,
      changeFrequency: 'weekly',
    },
    {
      url: escapeUrl(`${process.env.NEXT_PUBLIC_DOMAIN}/${locale}${Pages.DESIGN_CONTACT}`),
      lastModified: new Date().toISOString(),
      priority: 0.5,
      changeFrequency: 'weekly',
    },
    {
      url: escapeUrl(`${process.env.NEXT_PUBLIC_DOMAIN}/${locale}${Pages.DESIGN_PORTFOLIOS}`),
      lastModified: new Date().toISOString(),
      priority: 0.5,
      changeFrequency: 'weekly',
    },
    {
      url: escapeUrl(`${process.env.NEXT_PUBLIC_DOMAIN}/${locale}${Pages.DESIGN_ORDERS}`),
      lastModified: new Date().toISOString(),
      priority: 0.5,
      changeFrequency: 'weekly',
    },
    ...educationalCoursesEntries,
    ...designCoursesEntries,
    ...languageCoursesEntries,
  ];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const localeSitemaps = await Promise.all(
    Object.values(locales).map((locale) => generateSitemapEntries(locale))
  );

  return localeSitemaps.flat();
};