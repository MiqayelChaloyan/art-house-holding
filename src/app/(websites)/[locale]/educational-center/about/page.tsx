'use server'

import { notFound } from 'next/navigation';
import AboutUs from '@/src/components/screens/educational-center/about';
import { getHomeDetails } from '@/src/utils/data/educational-center';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const data = await getHomeDetails(locale);

    if (!data) {
        notFound()
    };

    return (<AboutUs data={data?.about_us} />);
};