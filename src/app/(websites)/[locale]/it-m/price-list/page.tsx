'use server'

import Prices from '@/components/screens/it-m/price-list';
import { getPriceList } from '@/utils/data/it-m/data';
import { notFound } from 'next/navigation';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const data = await getPriceList(locale);

    return (<Prices data={data} />);
};