'use server'

import { notFound } from 'next/navigation';

import Promotions from '@/components/screens/language/promotions';

import { getDiscounts } from '@/utils/data/language';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const data = await getDiscounts(locale);

    if (!data) {
        notFound()
    }

    return (<Promotions data={data} />);
}
