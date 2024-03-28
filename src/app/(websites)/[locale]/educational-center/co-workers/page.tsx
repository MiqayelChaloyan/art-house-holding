"use server"

import { getTranslations } from "next-intl/server";
import { notFound } from 'next/navigation';
import { type Metadata } from "next";

import CoWorkers from "@/components/screens/educational-center/co-workers";

import { Locale } from "@/locales";

import { getCoWorkers } from "../../../../../../sanity/services/educational-center-service/co-workers";


async function getResources(locale: string) {
    const co_workers = await getCoWorkers(locale);

    if (!co_workers?.length) {
        return {
            data: [],
            isError: true
        }
    }

    return {
        data: co_workers,
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

    return <CoWorkers data={data} />;
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