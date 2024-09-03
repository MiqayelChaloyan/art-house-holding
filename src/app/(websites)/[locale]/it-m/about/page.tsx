'use server'

import About from '@/components/screens/it-m/about';
import { getAboutDetails } from '@/utils/data/it-m/data';
import { notFound } from 'next/navigation';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const data = await getAboutDetails(locale);

    return (<About data={data}/>);
};