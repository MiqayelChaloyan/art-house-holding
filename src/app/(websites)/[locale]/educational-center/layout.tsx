'use server'

import { notFound } from 'next/navigation';

import { type Metadata } from 'next';

import Header from '@/lib/outlets/educational-center/Header';
import BottomMenu from '@/lib/outlets/educational-center/BottomMenu';
import RightMenu from '@/lib/outlets/educational-center/RightMenu';
import Footer from '@/lib/outlets/educational-center/Footer';
import Modal from '@/lib/outlets/educational-center/Modal';
import CoursesModal from '@/lib/outlets/educational-center/Modal/courses';
import ScrollToTopButton from '@/lib/outlets/general/ScrollToTopButton';
import FloatingMenu from '@/lib/outlets/general/FloatingMenu';
import PlayerModal from '@/lib/outlets/general/PlayerModal';
import GoBack from '@/lib/outlets/general/GoBack';

import { generateMetadataDynamic } from '@/lib/utils/default-metadata';
import { ImagePath, Site } from '@/types/general';

import { Locale } from '@/locales';
import { SanityClient } from 'sanity';

import { client } from '../../../../../sanity/client';
import { allCoursesQuery } from '../../../../../sanity/services/educational-center-service/courses';
import { querySiteMeta } from '../../../../../sanity/services/educational-center-service/about-us';
import { query as queryBranches } from '../../../../../sanity/services/art-house-service';
import { query as lessonsQuery } from '../../../../../sanity/services/educational-center-service/lessons';
import { urlForImage } from '../../../../../sanity/imageUrlBuilder';
import { LANGUAGE, RootProps } from '../../../../../sanity/sanity-queries/language';
import { querySocial } from '../../../../../sanity/services/educational-center-service/contact-us';


interface RootLayoutProps {
    children: React.ReactNode;
    params: {
        locale: string;
    }
};

const localeStrings: {
    am: string
    ru: string
    en: string
    [key: string]: string
} = {
    am: 'ուսումնական կենտրոն',
    ru: 'образовательный центр',
    en: 'educational center'
};


async function getResources(locale: string) {
    const coursesPromise = await client.fetch(allCoursesQuery, { language: locale }, { next: { revalidate: 100 } });
    const branchesPromise = await client.fetch(queryBranches, { language: locale }, { next: { revalidate: 100 } });
    const socialPromise = await client.fetch(querySocial, { language: 'en' }, { next: { revalidate: 100 } });
    const lessonsPromise = await client.fetch(lessonsQuery, { language: locale }, { next: { revalidate: 100 } });
    const lessonsAmPromise = await client.fetch(lessonsQuery, { language: 'am' }, { next: { revalidate: 100 } });

    return Promise.all([coursesPromise, branchesPromise, socialPromise, lessonsPromise, lessonsAmPromise])
        .then(([courses, branches, social, lessons, lessonsArmenian]) => {
            if (!courses?.length || !branches?.length || !social?.length || !lessons?.length || !lessonsArmenian?.length) {
                return { courses: [], branches: [], social: [], lessons: [], lessonsArmenian: [], isError: true };
            }

            return { courses, branches: branches[1], social: social[0], lessons, lessonsArmenian, isError: false };
        })
        .catch(error => {
            return { courses: [], branches: [], social: [], lessons: [], lessonsArmenian: [], isError: true };
        });
}

export default async function Layout({
    children,
    params: { locale },
}: Readonly<RootLayoutProps>) {
    const {
        courses,
        branches,
        social,
        lessons,
        lessonsArmenian,
        isError
    }: RootProps = await getResources(locale);

    if (!courses || !branches || !social || !lessons || !lessonsArmenian || isError) {
        notFound()
    };

    return (
        <div>
            <div className='wrapper'>
                <GoBack locale={locale} theme='#821616' />
                <RightMenu locale={locale} socialData={social} />
                <BottomMenu locale={locale} socialData={social} />
                <ScrollToTopButton theme='#821616' />
                <FloatingMenu
                    website={localeStrings[locale]}
                    branches={branches}
                    theme='#821616'
                    hover='#111111'
                />
                <div className='wrapper-content'>
                    <Header typePosition="fixed" locale={locale} />
                    <main className='wrapper-main'>
                        {children}
                    </main>
                </div>
                <Footer courses={courses} socialData={social} lessons={lessons} lessonsArmenian={lessonsArmenian} />
            </div>
            <Modal>
                <CoursesModal locale={locale} courses={courses} />
            </Modal>
            <PlayerModal />
        </div>
    );
};


async function getSiteMeta(
    query: string = querySiteMeta,
    client: SanityClient | any,
    mutation = 'fetch'
): Promise<Site> {
    const site: Site[] = await client[mutation](query);
    return site[0];
};

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    const meta: Site = await getSiteMeta(querySiteMeta, client);
    const { ogDescription, ogTitle, ogImage } = meta;
    const path: ImagePath = urlForImage(ogImage);
    const icon = null;

    const metadata = generateMetadataDynamic(ogDescription, ogTitle, path, icon, locale);
    return metadata;
};