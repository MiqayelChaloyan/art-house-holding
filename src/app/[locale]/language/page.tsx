import Home from '@/components/screens/language/home';

import { getTranslations } from "next-intl/server";

import { type Metadata } from "next";

import { Locale } from "@/locales";
import { getHomeData } from '../../../../sanity/services/educational-center-service/about-us';
import { notFound } from 'next/navigation';



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

    return <Home locale={locale}/>;
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

