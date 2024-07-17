'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Home from '@/components/screens/design/portfolio';

import { Locale } from '@/locales';

import { ImagePath } from '@/types/general';
import { generateMetadataDynamic } from '@/lib/utils/default-metadata';

import { client } from '../../../../../../../sanity/client';
import { courseBySlugQuery } from '../../../../../../../sanity/services/design-service/courses';
import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';


interface Props {
    params: {
        locale: string;
        courseName: string;
    }
};

async function getResources(locale: string, courseName: string | number) {
    try {
        const data = await client.fetch(courseBySlugQuery, { language: locale, slug: courseName }, { next: { revalidate: 100 } });

        if (!data.length) {
            return { data: [], isError: true };
        }

        return { data: data[0], isError: false };
    } catch (_) {
        return { data: [], isError: true };
    }
};

export default async function Page({
    params: { locale, courseName }
}: Readonly<Props>) {
    const decodedQuery = decodeURIComponent(courseName[0]);
    const { data, isError } = await getResources(locale, decodedQuery);

    if (!data || isError) {
        notFound()
    }

    return (<Home data={data}/>);
};


export async function generateMetadata({
    params: { locale, courseName },
}: {
    params: { locale: Locale, courseName: string };
}): Promise<Metadata> {
    const decodedQuery = decodeURIComponent(courseName[0]);
    const { data } = await getResources(locale, decodedQuery);

    const ogTitle = `${data?.course_name} | ${data.portfolios[0]?.author}`;
    const ogImage = data.portfolios[0]?.image;
    const ogDescription = data?.guides[0];

    const path: ImagePath = urlForImage(ogImage);
    const icon = null;

    const metadata = generateMetadataDynamic(ogDescription, ogTitle, path, icon, locale);
    return metadata;
};