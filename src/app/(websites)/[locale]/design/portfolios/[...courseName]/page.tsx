'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Home from '@/src/components/screens/design/portfolio';

import { Locale } from '@/src/locales';
import { urlForImage } from '@/sanity/imageUrlBuilder';

import { ImagePath } from '@/src/types/general';
import { generateMetadataDynamic } from '@/src/utils/default-metadata';
import { getCourseBySlug } from '@/src/utils/data/design';


interface Props {
    params: {
        locale: string;
        courseName: string;
    }
};

export default async function Page({
    params: { locale, courseName }
}: Readonly<Props>) {
    const decodedQuery = decodeURIComponent(courseName[0]);
    const course = await getCourseBySlug(locale, decodedQuery);

    if (!course) {
        notFound()
    }

    return (<Home data={course}/>);
};


export async function generateMetadata({
    params: { locale, courseName },
}: {
    params: { locale: Locale, courseName: string };
}): Promise<Metadata> {
    const decodedQuery = decodeURIComponent(courseName[0]);
    const data = await getCourseBySlug(locale, decodedQuery);

    const ogTitle = `${data?.course_name} | ${data.portfolios[0]?.author}`;
    const ogImage = data.portfolios[0]?.image;
    const ogDescription = data?.guides[0];

    const path: ImagePath = urlForImage(ogImage);
    const icon = null;
    const keywords = null;

    const metadata = generateMetadataDynamic(ogDescription, ogTitle, path, icon, locale, keywords);
    return metadata;
};