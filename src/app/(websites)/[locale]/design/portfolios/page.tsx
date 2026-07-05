'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Home from '@/src/components/screens/design/portfolios';

import { Locale } from '@/src/locales';

import { buildSiteMetadata, fetchSiteMetaEntry } from '@/src/utils/site-meta';
import { SITE_META_QUERY } from '@/sanity/services/design-service';
import { getCourses, getPortfolio } from '@/src/utils/data/design';
import { Pages } from '@/src/constants/pages';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const courses = await getCourses(locale);
    const portfolio = await getPortfolio(locale);

    if (!courses || !portfolio) {
        notFound()
    }

    return (<Home courses={courses} data={portfolio} />);
};

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    const meta = await fetchSiteMetaEntry(SITE_META_QUERY, locale, 0);
    return buildSiteMetadata(meta, locale, `/${locale}${Pages.DESIGN_PORTFOLIOS}`);
};