'use server'

import Home from '@/components/screens/design/orders';

import { client } from '../../../../../../sanity/client';
import { LESSONS, ORDER } from '../../../../../../sanity/sanity-queries/design';
import { query as lessonsQuery } from '../../../../../../sanity/services/design-service/lessons';
import { notFound } from 'next/navigation';

interface Props {
    params: {
        locale: string,
    }
}

type TYPES = {
    orders: LESSONS[],
    ordersArmenian: LESSONS[],
    isError: boolean,
}

async function getResources(locale: string) {
    const ordersPromise = await client.fetch(lessonsQuery, { language: locale }, { next: { revalidate: 100 } });
    const ordersAmPromise = await client.fetch(lessonsQuery, { language: 'am' }, { next: { revalidate: 100 } });

    return Promise.all([ordersPromise, ordersAmPromise])
        .then(([orders, ordersArmenian]) => {
            if (!orders?.length || !ordersArmenian?.length) {
                return { orders: [], ordersArmenian: [], isError: true };
            }

            return { orders, ordersArmenian, isError: false };
        })
        .catch(error => {
            return { orders: [], ordersArmenian: [], isError: true };
        });
}

export default async function Page({
    params: { locale }
}: Readonly<Props>) {

    const { orders, ordersArmenian, isError }: TYPES = await getResources(locale);

    if (!orders || !ordersArmenian || isError) {
        notFound()
    }

    return (
        <Home
            orders={orders[0].order_name}
            ordersArmenian={ordersArmenian[0].order_name}
        />
    )
}