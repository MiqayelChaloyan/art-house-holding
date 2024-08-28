'use server'

import Contacts from '@/components/screens/it-m/contact';
import { notFound } from 'next/navigation';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {


    return (<Contacts/>);
};