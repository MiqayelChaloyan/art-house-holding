'use server'

import { notFound } from 'next/navigation';

import { getTranslations } from "next-intl/server";
import { type Metadata } from "next";

import PriceList from '@/components/screens/educational-center/price-list';

import { Locale } from '@/locales';

import { allCoursesQuery } from '../../../../../../sanity/services/educational-center-service/courses';
import { client } from '../../../../../../sanity/client';


async function getResources(locale: string) {
    const data = await client.fetch(allCoursesQuery, { language: locale }, { next: { revalidate: 100 } });

    if (!data?.length) {
        return {
            data: [],
            isError: true
        }
    }

    return {
        data,
        isError: false
    }
}


interface LayoutProps {
    params: {
        locale: string
    };
}


export default async function Page({ params: { locale } }: LayoutProps) {
    const { data, isError } = await getResources(locale);

    if (!data || isError) {
        notFound()
    }

    return <PriceList data={data} />;
}


export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: 'metadata' });

    return {
        title: t('title'),
        description: t('descriptionEducationalCenter'),
    };
}