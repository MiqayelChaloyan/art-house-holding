'use client'

import { useEffect, useState } from 'react';

import { notFound } from 'next/navigation';

import Header from '@/lib/outlets/art-house/Header';
import Footer from '@/lib/outlets/art-house/Footer';

import { client } from '../../../../sanity/client';
import { querySocial } from '../../../../sanity/services/art-house-service';
import { HOSTS } from '../../../../sanity/sanity-queries/art-house';


interface Props {
    children: React.ReactNode
    headerPosition?: 'fixed' | 'sticky'
};


const Layout = ({
    children,
    headerPosition
}: Props) => {
    const [socialData, setSocialData] = useState<HOSTS | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await client.fetch(querySocial, { language: 'en' }, { next: { revalidate: 100 } });
                setSocialData(data[0]);
            } catch (error) {
                notFound();
            }
        };

        fetchData();
    }, []); 

    return (
        <div>
            <Header
                typePosition={`${headerPosition === 'fixed' ? 'fixed' : 'sticky'}`}
            />
            <main>
                {children}
            </main>
            <Footer socialData={socialData} />
        </div>
    );
}

export default Layout;
