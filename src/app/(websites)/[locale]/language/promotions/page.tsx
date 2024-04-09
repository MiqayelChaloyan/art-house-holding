import Promotions from "@/components/screens/language/promotions";

import { getTranslations } from "next-intl/server";

import { type Metadata } from "next";
import { notFound } from 'next/navigation';

import { Locale } from "@/locales";

import { client } from "../../../../../../sanity/client";
import { query } from "../../../../../../sanity/services/language-service/promotions";


interface Props {
    params: {
        locale: string;
    };
}


async function getResources(locale: string) {
    const data = await client.fetch(query, { language: locale }, { next: { revalidate: 100 } });
    return data
}


export default async function Page({ params: { locale } }: Readonly<Props>) {
    const data = await getResources(locale);

    if (!data) {
        notFound()
    }

    return (<Promotions data={data}/>);
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