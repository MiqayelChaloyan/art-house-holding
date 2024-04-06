'use server'

import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { type Metadata } from "next";

import { Locale } from '@/locales';

import { client } from '../../../../../sanity/client';

import Home from '@/components/screens/educational-center/home';

import { query } from '../../../../../sanity/services/educational-center-service/about-us';


interface RootLayoutProps {
    params: {
        locale: string;
    };
}


async function getResources(locale: string) {
    const data = await client.fetch(query, { language: locale }, { next: { revalidate: 100 } });

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


export default async function Page({ params: { locale } }: Readonly<RootLayoutProps>) {
    const { data, isError } = await getResources(locale);

    if (!data || isError) {
        notFound()
    }

    return <Home data={data} />;
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

