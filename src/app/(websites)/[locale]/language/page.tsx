import Home from '@/components/screens/language/home';

import { getTranslations } from "next-intl/server";

import { type Metadata } from "next";

import { Locale } from "@/locales";
import { notFound } from 'next/navigation';
import { client } from '../../../../../sanity/client';
import { query } from '../../../../../sanity/services/language-service/about-us';
import { query as discountsQuery } from "../../../../../sanity/services/language-service/promotions";
import { partnersQuery } from '../../../../../sanity/services/generic-service';


interface RootLayoutProps {
    params: {
        locale: string;
    };
}


async function getResources(locale: string) {
    const discounts = await client.fetch(discountsQuery, { language: locale }, { next: { revalidate: 100 } });
    const data = await client.fetch(query, { language: locale }, { next: { revalidate: 100 } });
    const partners = await client.fetch(partnersQuery, { language: locale }, { next: { revalidate: 100 } });

    return {
        data,
        discounts,
        partners
    }
}


export default async function Page({ params: { locale } }: Readonly<RootLayoutProps>) {
    const { data, discounts, partners } = await getResources(locale);

    if (!data || !discounts || !partners) {
        notFound()
    }

    return <Home data={data} discounts={discounts} partners={partners} locale={locale} />;
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

