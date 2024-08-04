'use client';

import { useEffect, useState } from 'react';

import { notFound } from 'next/navigation';

import Header from '@/lib/outlets/art-house/Header';
import Footer from '@/lib/outlets/art-house/Footer';

import { client } from '../../../../sanity/client';
import { querySocial } from '../../../../sanity/services/art-house-service';
import { HOSTS } from '../../../../sanity/sanity-queries/art-house';


interface Props {
    children: React.ReactNode;
    headerPosition?: 'fixed' | 'sticky';
    locale: string
};

const Layout = ({
    children,
    headerPosition,
    locale
}: Readonly<Props>) => {
    const [linkActive, setLinkActive] = useState<string>('');
    const [socialData, setSocialData] = useState<HOSTS | any>(null);
    const typePosition = headerPosition === 'fixed' ? 'fixed' : 'sticky';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await client.fetch(querySocial, { language: locale }, { next: { revalidate: 100 } });
                setSocialData(data[0]);
            } catch (_) {
                notFound();
            }
        };

        fetchData();
    }, []);

    const handleChangeActiveLink = (link: string) => setLinkActive(link);

    return (
        <>
            <Header
                locale={locale}
                typePosition={typePosition}
                linkActive={linkActive}
                handleChangeActiveLink={handleChangeActiveLink}
            />
            <main>
                {children}
            </main>
            <Footer
                locale={locale}
                socialData={socialData}
                linkActive={linkActive}
                handleChangeActiveLink={handleChangeActiveLink}
            />
        </>
    );
}

export default Layout;
