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

import { client } from '../../../../../sanity/client';
import { urlForImage } from '../../../../../sanity/imageUrlBuilder';
import { SITE_META_QUERY } from '../../../../../sanity/services/language-service';

import { getHomeDetails } from '@/utils/data/art-house';
import { getContacts, getSelectOptions, getSelectOptionsFiltered } from '@/utils/data/language';
import { generateMetadataDynamic } from '@/utils/default-metadata';


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
    client: SanityClient,
    mutation: 'fetch' = 'fetch'
): Promise<Site> {
    const site: Site[] = await client[mutation](query);
    return site[0];
};

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    const meta: Site = await getSiteMeta(SITE_META_QUERY, client);
    const { ogDescription, ogTitle, ogImage } = meta;
    const path: ImagePath = urlForImage(ogImage);
    const icon = null;

    const metadata = generateMetadataDynamic(ogDescription, ogTitle, path, icon, locale);
    return metadata;
};