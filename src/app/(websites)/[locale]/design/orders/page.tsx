'use server'

import { notFound } from 'next/navigation';

import Home from '@/components/screens/design/orders';

import { getCourses, getSelectOptions } from '@/utils/data/design';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const courses = await getCourses(locale);
    const lessons = await getSelectOptions(locale);
    const lessonsArmenianKeyword = await getSelectOptions('am');

    if (!lessons || !lessonsArmenianKeyword || !courses) {
        notFound()
    }

    return (
        <Home
            orders={lessons.order_name}
            ordersArmenian={lessonsArmenianKeyword.order_name}
            courses={courses}
        />
    )
};