'use server'

import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { type Metadata } from 'next';

import Partners from '@/components/screens/educational-center/partners';

import { Locale } from '@/locales';

import { client } from '../../../../../../sanity/client';
import { partnersQuery } from '../../../../../../sanity/services/generic-service';


async function getResources(locale: string) {
    const partners = await client.fetch(partnersQuery, { language: locale }, { next: { revalidate: 100 } });

    if (!partners?.length || !partners?.length) {
        return {
            partners: [],
            isError: true
        }
    }

    return {
        partners,
        isError: false
    }
}


interface LayoutProps {
    params: {
        locale: string
    };
}


export default async function Page({ params: { locale } }: LayoutProps) {
    const { partners, isError } = await getResources(locale);

    if (!partners || isError) {
        notFound()
    }

    return <Partners data={partners} />;
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