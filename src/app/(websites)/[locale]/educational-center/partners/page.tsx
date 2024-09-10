'use server'

import { notFound } from 'next/navigation';

import Partners from '@/components/screens/educational-center/partners';

import { getPartners } from '@/utils/data';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const partners = await getPartners(locale);

    if (!partners) {
        notFound()
    };

    return (<Partners data={partners} />);
};