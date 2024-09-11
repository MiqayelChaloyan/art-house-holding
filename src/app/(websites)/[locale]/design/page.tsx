'use server'

import Home from '@/components/screens/design/home';

import { notFound } from 'next/navigation';

import { getPartners } from '@/utils/data';
import { getHomeDetails } from '@/utils/data/design';


interface RootProps {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}:
    Readonly<RootProps>) {
    const data = await getHomeDetails(locale);
    const partners = await getPartners(locale);

    if (!data || !partners) {
        notFound()
    }

    return (<Home data={data} partners={partners} />);
};

