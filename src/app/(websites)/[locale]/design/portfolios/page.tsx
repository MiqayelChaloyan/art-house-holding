'use server'

import { notFound } from 'next/navigation';

import Home from '@/components/screens/design/portfolios';

import { getCourses, getPortfolio } from '@/utils/data/design';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const courses = await getCourses(locale);
    const portfolio = await getPortfolio(locale);

    if (!courses || !portfolio) {
        notFound()
    }

    return (<Home courses={courses} data={portfolio} />);
};