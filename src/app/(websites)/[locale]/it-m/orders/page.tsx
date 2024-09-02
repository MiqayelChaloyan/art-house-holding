'use server'

import Orders from '@/components/screens/it-m/orders';
import { getSelectOptions } from '@/utils/data/it-m/data';
import { notFound } from 'next/navigation';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const orders = await getSelectOptions(locale);
    const ordersArmenianKeyword = await getSelectOptions('am');

    if (!orders || !ordersArmenianKeyword) {
        notFound();
    };

    return (
        <Orders
            orders={orders?.orders_names}
            ordersArmenianKeyword={ordersArmenianKeyword?.orders_names}
        />
    );
};