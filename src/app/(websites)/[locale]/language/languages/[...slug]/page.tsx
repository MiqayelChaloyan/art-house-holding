'use server'

import dynamic from 'next/dynamic';

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import { Locale } from '@/src/locales';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import { ImagePath } from '@/src/types/general';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';

import BlocksToText from '@/src/helpers/BlocksToText';
import { generateMetadataDynamic } from '@/src/utils/default-metadata';
import { getCourseBySlug } from '@/src/utils/data/language';

const DLanguage = dynamic(() =>
    import('@/src/components/screens/language/languages/Language'),
);


interface Props {
    params: {
        locale: string;
        slug: string;
    }
};

export default async function Page({
    params: { locale, slug }
}: Readonly<Props>) {
    const data = await getCourseBySlug(locale, slug[0]);

    if (!data) {
        notFound()
    }

    return (<DLanguage data={data} />)
};


export async function generateMetadata({
    params: { locale, slug },
}: {
    params: { locale: Locale, slug: string };
}): Promise<Metadata> {
    const course = await getCourseBySlug(locale, slug[0]);
    const ogTitle = course?.name;
    const ogImage = course?.during_courses_images[0];
    const ogDescription = BlocksToText(course?.text).slice(0, 900);

    const path: ImagePath = urlForImage(ogImage);
    const icon = null;

    const metadata = generateMetadataDynamic(ogDescription, ogTitle, path, icon, locale);
    return metadata;
};