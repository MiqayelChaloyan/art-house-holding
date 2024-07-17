'use server'

import { notFound } from 'next/navigation';

import Home from '@/components/screens/design/orders';

import { client } from '../../../../../../sanity/client';
import { allCoursesQuery } from '../../../../../../sanity/services/design-service/courses';
import { query as lessonsQuery } from '../../../../../../sanity/services/design-service/lessons';


interface Props {
    params: {
        locale: string;
    }
};

async function getResources(locale: string) {
    const coursesPromise = await client.fetch(allCoursesQuery, { language: locale }, { next: { revalidate: 100 } });
    const ordersPromise = await client.fetch(lessonsQuery, { language: locale }, { next: { revalidate: 100 } });
    const ordersAmPromise = await client.fetch(lessonsQuery, { language: 'am' }, { next: { revalidate: 100 } });

    return Promise.all([ordersPromise, ordersAmPromise, coursesPromise])
        .then(([orders, ordersArmenian, courses]) => {
            if (!orders?.length || !ordersArmenian?.length  || !courses?.length) {
                return { orders: [], ordersArmenian: [], courses: [], isError: true };
            }

            return { orders, ordersArmenian, courses, isError: false };
        })
        .catch(_ => {
            return { orders: [], ordersArmenian: [], courses: [], isError: true };
        });
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {

    const { 
        orders, 
        ordersArmenian, 
        courses, 
        isError 
    } = await getResources(locale);

    if (!orders || !ordersArmenian || !courses || isError) {
        notFound()
    }

    return (
        <Home
            orders={orders[0].order_name}
            ordersArmenian={ordersArmenian[0].order_name}
            courses={courses}
        />
    )
};