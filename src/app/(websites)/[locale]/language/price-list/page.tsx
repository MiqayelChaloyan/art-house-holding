'use server'

import { notFound } from 'next/navigation';
import Home from '@/src/components/screens/language/price-list';
import { getPriceList } from '@/src/utils/data/language';


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

    return (<Home data={data} />);
};
