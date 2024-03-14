import { getTranslations } from "next-intl/server";

import { notFound } from 'next/navigation';

import { type Metadata } from "next";

import { Locale } from "@/locales";

import Home from '@/components/screens/educational-center';

import { getHomeData } from '../../../../sanity/services/educational-center-service/about-us';


interface RootLayoutProps {
    params: {
        locale: string;
    };
}


async function getResources(locale: string) {
    const res = await getHomeData(locale);
    return res
}


export default async function Page({ params: { locale } }: Readonly<RootLayoutProps>) {
    const data = await getResources(locale);

    if (!data) {
        notFound()
    }

    return <Home data={data}/>;
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

