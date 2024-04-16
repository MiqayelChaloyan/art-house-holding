'use server'

import { notFound } from 'next/navigation';

import ScrollToTopButton from '@/lib/outlets/general/ScrollToTopButton';
import ContactUs from '@/lib/outlets/language/ContactUs';
import Footer from '@/lib/outlets/language/Footer';
import Header from '@/lib/outlets/language/Header';
import PlayerModal from '@/lib/outlets/language/Modal';

import { client } from '../../../../../sanity/client';

import { query } from '../../../../../sanity/services/language-service/courses';
import { LANGUAGE } from '../../../../../sanity/sanity-queries/language';


interface RootLayoutProps {
    children: React.ReactNode,
    params: {
        locale: string,
    };
}

async function getResources(locale: string) {
    try {
        const data = await client.fetch(query, { language: locale }, { next: { revalidate: 100 } });

        if (!data?.length) {
            return { data: [], isError: true };
        }

        return { data, isError: false };
    } catch (error) {
        return { data: [], isError: true };
    }
}

async function Layout({
    children,
    params: { locale },
}: Readonly<RootLayoutProps>) {

    const result: LANGUAGE[] | any = await getResources(locale);

    if (!result || !result.data[0]) {
        notFound()
    }    

    return (
        <div className='languages-container'>
            <div className='wrapper-content'>
                <div>
                    <Header locale={locale} />
                </div>
                {/* <FBMessenger /> */}
                <ScrollToTopButton/>
                <main className='languages-main'>
                    {children}
                </main>
            </div>
            <PlayerModal/>
            <ContactUs courses={result.data[0]?.languages} />
            <Footer/>
        </div>
    );
}

export default Layout;


