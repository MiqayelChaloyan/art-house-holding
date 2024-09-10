'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Course from '@/components/screens/educational-center/course';

import { Locale } from '@/locales';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

import BlocksToText from '@/utils/BlocksToText';
import { ImagePath } from '@/types/general';
import { generateMetadataDynamic } from '@/utils/default-metadata';
import { getContacts, getCourse, getSelectOptions } from '@/utils/data/educational-center';


interface Props {
    params: {
        locale: string;
        slug: string;
    }
};

export default async function Page({
    params: { locale, slug }
}: Readonly<Props>) {
    const course = await getCourse(locale, slug[0]);
    const contacts = await getContacts(locale);
    const lessons = await getSelectOptions(locale);
    const lessonsArmenianKeyword = await getSelectOptions('am');

    if (!course || !contacts || !lessons || !lessonsArmenianKeyword) {
        notFound()
    };

    return (
        <Course
            course={course}
            socialData={contacts}
            lessons={lessons}
            lessonsArmenian={lessonsArmenianKeyword}
        />
    );
};


export async function generateMetadata({
    params: { locale, slug },
}: {
    params: { locale: Locale, slug: string };
}): Promise<Metadata> {
    const data = await getCourse(locale, slug[0]);

    const ogTitle = data?.course_name;
    const ogImage = data.course_main[0]?.image;
    const ogDescription = BlocksToText(data?.about_us_content).slice(0, 900);

    const path: ImagePath = urlForImage(ogImage);
    const icon: ImagePath = urlForImage(data?.svg);

    const metadata = generateMetadataDynamic(ogDescription, ogTitle, path, icon, locale);
    return metadata;
};