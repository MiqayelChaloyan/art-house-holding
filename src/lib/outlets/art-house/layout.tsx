'use client';

import { useEffect, useState } from 'react';

import { notFound } from 'next/navigation';
import { useLocale } from 'next-intl';

import Header from '@/lib/outlets/art-house/Header';
import Footer from '@/lib/outlets/art-house/Footer';

import { client } from '../../../../sanity/client';
import { SOCIAL_QUERY } from '../../../../sanity/services/art-house-service';


interface Props {
    children: React.ReactNode;
    headerPosition?: 'fixed' | 'sticky';
};

const Layout = ({
    children,
    headerPosition,
}: Readonly<Props>) => {
    const [linkActive, setLinkActive] = useState<string>('');
    const [socialData, setSocialData] = useState<SOCIAL_QUERYResult[]>([]);
    const activeLocale = useLocale();

    const typePosition = headerPosition === 'fixed' ? 'fixed' : 'sticky';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await client.fetch(SOCIAL_QUERY, { language: activeLocale }, { next: { revalidate: 100 } });
                setSocialData(data);
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
                locale={activeLocale}
                typePosition={typePosition}
                linkActive={linkActive}
                handleChangeActiveLink={handleChangeActiveLink}
            />
            {children}
            <Footer
                locale={activeLocale}
                socialData={socialData[0]}
                linkActive={linkActive}
                handleChangeActiveLink={handleChangeActiveLink}
            />
        </>
    );
}

export default Layout;
