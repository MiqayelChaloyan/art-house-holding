'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Footer from '@/src/lib/outlets/design/Footer';
import Header from '@/src/lib/outlets/design/Header';
import ScrollToTopButton from '@/src/lib/outlets/general/ScrollToTopButton';
import FloatingMenu from '@/src/lib/outlets/general/FloatingMenu';
import Modal from '@/src/lib/outlets/design/Modal';
import CoursesModal from '@/src/lib/outlets/design/Modal/courses';
import ContactUs from '@/src/lib/outlets/design/ContactUs';
import PlayerModal from '@/src/lib/outlets/general/PlayerModal';
import GoBack from '@/src/lib/outlets/general/GoBack';

import { Locale } from '@/src/locales';

import { SITE_META_QUERY } from '@/sanity/services/design-service';
import { urlForImage } from '@/sanity/imageUrlBuilder';

import { getHomeDetails } from '@/src/utils/data/art-house';
import { getContacts, getCourses, getSelectOptions } from '@/src/utils/data/design';
import { ImagePath, Site } from '@/src/types/general';
import { generateMetadataDynamic } from '@/src/utils/default-metadata';
import { sanityFetch } from '@/src/api/sanity-fetch';


interface RootLayoutProps {
    children: React.ReactNode;
    params: {
        locale: string;
    };
};

const localeStrings: {
    am: string;
    ru: string;
    en: string;
    [key: string]: string;
} = {
    am: 'դիզայն ստուդիա',
    ru: 'студия дизайна',
    en: 'design studio'
};

export default async function Layout({
    children,
    params: { locale },
}: Readonly<RootLayoutProps>) {
    const courses = await getCourses(locale);
    const contacts = await getContacts(locale);
    const lessons = await getSelectOptions(locale);
    const lessonsArmenianKeyword = await getSelectOptions('am');
    const branches = await getHomeDetails(locale);

    if (!branches || !courses || !contacts || !lessons || !lessonsArmenianKeyword) {
        notFound()
    };

    return (
        <>
            <Header typePosition='fixed' locale={locale} />
            <div className='design-container'>
                <GoBack locale={locale} theme='#8E685C' />
                <ScrollToTopButton theme='#8E685C' />
                <FloatingMenu
                    website={localeStrings[locale]}
                    branches={branches}
                    theme='#8E685C'
                    hover='#4B352B'
                />
                {children}
                <ContactUs lessons={lessons} lessonsArmenian={lessonsArmenianKeyword} />
                <Footer socialData={contacts} />
            </div>
            <Modal>
                <CoursesModal courses={courses} />
            </Modal>
            <PlayerModal />
        </>
    );
};


async function getSiteMeta(
    query: string = SITE_META_QUERY,
    locale?: Locale,
): Promise<Site> {
    const site = await sanityFetch<Site[]>({
        query,
        params: { language: locale },
    });

    return site[0];
};

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    const meta: Site = await getSiteMeta(SITE_META_QUERY, locale);
    const { ogDescription, ogTitle, ogImage, keywords } = meta;
    const path: ImagePath = urlForImage(ogImage);
    const icon = null;

    const metadata = generateMetadataDynamic(ogDescription, ogTitle, path, icon, locale, keywords);
    return metadata;
};