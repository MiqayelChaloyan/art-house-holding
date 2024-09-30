'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Header from '@/src/lib/outlets/educational-center/Header';
import BottomMenu from '@/src/lib/outlets/educational-center/BottomMenu';
import RightMenu from '@/src/lib/outlets/educational-center/RightMenu';
import Footer from '@/src/lib/outlets/educational-center/Footer';
import Modal from '@/src/lib/outlets/educational-center/Modal';
import CoursesModal from '@/src/lib/outlets/educational-center/Modal/courses';
import ScrollToTopButton from '@/src/lib/outlets/general/ScrollToTopButton';
import FloatingMenu from '@/src/lib/outlets/general/FloatingMenu';
import PlayerModal from '@/src/lib/outlets/general/PlayerModal';
import GoBack from '@/src/lib/outlets/general/GoBack';

import { Locale } from '@/src/locales';

import { urlForImage } from '@/sanity/imageUrlBuilder';
import { SITE_META_QUERY } from '@/sanity/services/educational-center-service';

import { getContacts, getCourses, getSelectOptions } from '@/src/utils/data/educational-center';
import { getHomeDetails } from '@/src/utils/data/art-house';
import { generateMetadataDynamic } from '@/src/utils/default-metadata';
import { ImagePath, Site } from '@/src/types/general';
import { sanityFetch } from '@/src/api/sanity-fetch';


interface RootLayoutProps {
    children: React.ReactNode;
    params: {
        locale: string;
    }
};

const localeStrings: {
    am: string;
    ru: string;
    en: string;
    [key: string]: string;
} = {
    am: 'ուսումնական կենտրոն',
    ru: 'образовательный центр',
    en: 'educational center'
};

export default async function Layout({
    children,
    params: { locale },
}: Readonly<RootLayoutProps>) {
    const branches = await getHomeDetails(locale);
    const courses = await getCourses(locale);
    const contacts = await getContacts(locale);
    const lessons = await getSelectOptions(locale);
    const lessonsArmenianKeyword = await getSelectOptions('am');

    if (!courses || !branches || !contacts || !lessons || !lessonsArmenianKeyword) {
        notFound()
    };

    return (
        <div>
            <div className='wrapper'>
                <GoBack locale={locale} theme='#821616' />
                <RightMenu locale={locale} socialData={contacts} />
                <BottomMenu locale={locale} socialData={contacts} />
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
                <Footer
                    courses={courses}
                    socialData={contacts}
                    lessons={lessons}
                    lessonsArmenian={lessonsArmenianKeyword}
                />
            </div>
            <Modal>
                <CoursesModal
                    locale={locale}
                    courses={courses}
                />
            </Modal>
            <PlayerModal />
        </div>
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