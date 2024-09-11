'use server'

import { notFound } from 'next/navigation';

import Home from '@/components/screens/design/price-list';

import { getPriceList } from '@/utils/data/design';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const data = await getPriceList(locale);

    if (!data) {
        notFound()
    }

    return (<Home data={data}/>);
};