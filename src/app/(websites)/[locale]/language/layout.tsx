'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import ScrollToTopButton from '@/src/lib/outlets/general/ScrollToTopButton';
import ContactUs from '@/src/lib/outlets/language/ContactUs';
import Footer from '@/src/lib/outlets/language/Footer';
import Header from '@/src/lib/outlets/language/Header';
import PlayerModal from '@/src/lib/outlets/general/PlayerModal';
import FloatingMenu from '@/src/lib/outlets/general/FloatingMenu';
import GoBack from '@/src/lib/outlets/general/GoBack';

import colors from '@/src/themes';

import { Locale } from '@/src/locales';

import { ImagePath, Site } from '@/src/types/general';

import { urlForImage } from '@/sanity/imageUrlBuilder';
import { SITE_META_QUERY } from '@/sanity/services/language-service';

import { getHomeDetails } from '@/src/utils/data/art-house';
import { getContacts, getSelectOptions, getSelectOptionsFiltered } from '@/src/utils/data/language';
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
    am: 'լեզվի կենտրոն',
    ru: 'языковой центр',
    en: 'language center'
};

export default async function Layout({
    children,
    params: { locale },
}: Readonly<RootLayoutProps>) {
    const courses = await getSelectOptions(locale);
    const languages = await getSelectOptionsFiltered(locale);
    const contacts = await getContacts(locale);
    const branches = await getHomeDetails(locale);

    if (!courses || !branches || !languages || !contacts) {
        notFound()
    };

    return (
        <div className='languages-container'>
            <div className='wrapper-content'>
                <Header locale={locale} />
                <GoBack locale={locale} theme={colors.blue} />
                <ScrollToTopButton theme={colors.blue} />
                <FloatingMenu
                    website={localeStrings[locale]}
                    branches={branches}
                    theme={colors.blue}
                    hover={colors.yellow}
                />
                <main className='languages-main'>
                    {children}
                </main>
            </div>
            <PlayerModal />
            <ContactUs
                courses={courses?.course_name}
                languages={languages}
                socialData={contacts}
            />
            <Footer socialData={contacts} />
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

    const metadata = generateMetadataDynamic(ogDescription, ogTitle, path, icon, locale, keywords );
    return metadata;
};