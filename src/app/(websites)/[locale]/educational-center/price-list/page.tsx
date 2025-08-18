'use server'

import { notFound } from 'next/navigation';
import PriceList from '@/src/components/screens/educational-center/price-list';
import { getCourses } from '@/src/utils/data/educational-center';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({ 
    params: { locale } 
}: Readonly<Props>) {
    const data = await getCourses(locale);

    if (!data) {
        notFound()
    };

    return (<PriceList data={data} />);
};