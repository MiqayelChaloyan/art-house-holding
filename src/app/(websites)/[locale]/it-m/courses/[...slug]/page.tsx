'use server'

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Course from '@/components/screens/it-m/course';

import { Locale } from '@/locales';
import { ImagePath } from '@/types/general';

import { getCourse } from '@/utils/data/it-m/data';
import { generateMetadataDynamic } from '@/utils/default-metadata';

import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';


interface Props {
    params: {
        locale: string;
        slug: string;
    }
};

export default async function Page({
    params: { locale, slug }
}: Readonly<Props>) {
    const data = await getCourse(locale, slug[0]);

    if (!data) {
        notFound();
    };

    return (<Course data={data} locale={locale} />);
};


export async function generateMetadata({
    params: { locale, slug },
}: {
    params: { locale: Locale, slug: string };
}): Promise<Metadata> {
    const decodedQuery = decodeURIComponent(slug[0]);
    const data = await getCourse(locale, decodedQuery);

    const ogTitle = data.course_name;
    const ogImage = data.course_image;
    const ogDescription = data?.ogDescription;

    const path: ImagePath = urlForImage(ogImage);
    const icon = null;

    const metadata = generateMetadataDynamic(ogDescription, ogTitle, path, icon, locale);
    return metadata;
};