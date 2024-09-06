'use server'

import { notFound } from 'next/navigation';

import { type Metadata } from 'next';

import ScrollToTopButton from '@/lib/outlets/general/ScrollToTopButton';
import ContactUs from '@/lib/outlets/language/ContactUs';
import Footer from '@/lib/outlets/language/Footer';
import Header from '@/lib/outlets/language/Header';
import PlayerModal from '@/lib/outlets/general/PlayerModal';
import FloatingMenu from '@/lib/outlets/general/FloatingMenu';
import GoBack from '@/lib/outlets/general/GoBack';

import { Locale } from '@/locales';
import { SanityClient } from 'sanity';

import { ImagePath, Site } from '@/types/general';
import { generateMetadataDynamic } from '@/utils/default-metadata';

import { client } from '../../../../../sanity/client';

import { query, queryFilterCourses } from '../../../../../sanity/services/language-service/courses';
import { LANGUAGE } from '../../../../../sanity/sanity-queries/language';
import { querySiteMeta } from '../../../../../sanity/services/language-service/about-us';
import { querySocial } from '../../../../../sanity/services/language-service/contact-us';
import { urlForImage } from '../../../../../sanity/imageUrlBuilder';
import { getHomeDetails } from '@/utils/data/art-house';


interface RootLayoutProps {
    children: React.ReactNode,
    params: {
        locale: string,
    };
}

const localeStrings: {
    am: string
    ru: string
    en: string
    [key: string]: string
} = {
    am: 'լեզվի կենտրոն',
    ru: 'языковой центр',
    en: 'language center'
};

async function getResources(locale: string) {
    const coursesPromise = await client.fetch(query, { language: locale }, { next: { revalidate: 100 } });
    const languagesPromise = await client.fetch(queryFilterCourses, { language: 'am' }, { next: { revalidate: 100 } });
    const socialPromise = await client.fetch(querySocial, { language: locale }, { next: { revalidate: 100 } });

    return Promise.all([coursesPromise, languagesPromise, socialPromise])
        .then(([courses, languages, social]) => {
            if (!courses?.length || !languages?.length || !social?.length) {
                return { courses: [], branches: [], languages: [], social: [], isError: true };
            }

            return { courses: courses[0], languages: languages[0], social: social[0], isError: false };
        })
        .catch(_ => {
            return { courses: [], branches: [], languages: [], social: [], isError: true };
        });
};

export default async function Layout({
    children,
    params: { locale },
}: Readonly<RootLayoutProps>) {

    const {
        courses,
        languages,
        social,
        isError
    } = await getResources(locale);

    const branches = await getHomeDetails(locale);

    if (!courses || !branches || !languages || !social || isError) {
        notFound()
    };

    return (
        <div className='languages-container'>
            <div className='wrapper-content'>
                <div>
                    <Header locale={locale} />
                </div>
                {/* <FBMessenger /> */}
                <GoBack locale={locale} theme='#006ED2' />
                <ScrollToTopButton theme='#006ED2' />
                <FloatingMenu
                    website={localeStrings[locale]}
                    branches={branches}
                    theme='#006ED2'
                    hover='#F9CC48'
                />
                <main className='languages-main'>
                    {children}
                </main>
            </div>
            <PlayerModal />
            <ContactUs courses={courses?.course_name} languages={languages} socialData={social} />
            <Footer socialData={social} />
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