'use server'

import dynamic from 'next/dynamic';

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import { Locale } from '@/locales';

import { querySlug } from '../../../../../../../sanity/services/language-service/languages';
import { client } from '../../../../../../../sanity/client';
import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import { ImagePath } from '@/types/general';
import { generateMetadataDynamic } from '@/utils/default-metadata';
import BlocksToText from '@/utils/BlocksToText';

const DLanguage = dynamic(() =>
    import('@/components/screens/language/languages/Language'),
);


interface Props {
    params: {
        locale: string;
        slug: string;
    }
};

async function getResources(slug: string, locale: string) {
    try {
        const data = await client.fetch(querySlug, { slug, language: locale }, { next: { revalidate: 100 } });

        if (!data?.length) {
            return { data: [], isError: true };
        }

        return { data, isError: false };
    } catch (_) {
        return { data: [], isError: true };
    }
};

export default async function Page({
    params: { locale, slug }
}: Readonly<Props>) {
    const { data } = await getResources(slug[0], locale);

    if (!data.length) {
        notFound()
    }

    return (<DLanguage data={data[0]} />)
};


export async function generateMetadata({
    params: { locale, slug },
}: {
    params: { locale: Locale, slug: string };
}): Promise<Metadata> {
    const course = await getResources(slug[0], locale);
    const ogTitle = course.data[0]?.name;
    const ogImage = course.data[0]?.during_courses_images[0];
    const ogDescription = BlocksToText(course.data[0]?.text).slice(0, 900);

    const path: ImagePath = urlForImage(ogImage);
    const icon = null;

    const metadata = generateMetadataDynamic(ogDescription, ogTitle, path, icon, locale);
    return metadata;
};