"use server"

import { getTranslations } from "next-intl/server";
import { notFound } from 'next/navigation';
import { type Metadata } from "next";

import PriceList from "@/components/screens/educational-center/price-list";

import { Locale } from "@/locales";

import { getCourses } from "../../../../../../sanity/services/educational-center-service/courses";


async function getResources(locale: string) {
    const courses = await getCourses(locale);

    if (!courses?.length) {
        return {
            data: [],
            isError: true
        }
    }

    return {
        data: courses,
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