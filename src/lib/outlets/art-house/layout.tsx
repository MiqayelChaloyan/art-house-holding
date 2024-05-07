'use client'

import { notFound } from 'next/navigation';

import Header from '@/lib/outlets/art-house/Header';
import Footer from '@/lib/outlets/art-house/Footer';

import { client } from '../../../../sanity/client';
import { querySocial } from '../../../../sanity/services/art-house-service';


interface Props {
    children: React.ReactNode
    headerPosition?: 'fixed' | 'sticky'
};

const fetchData = async () => {
    try {
        const data = await client.fetch(querySocial, { language: 'en' }, { next: { revalidate: 100 } });
        return data[0];
    } catch (error) {
        notFound();
    }
};

const Layout = async ({
    children,
    headerPosition
}: Props) => {
    const socialData = await fetchData();
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
