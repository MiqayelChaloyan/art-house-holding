'use server'

import { notFound } from 'next/navigation';

import Contacts from '@/components/screens/it-m/contact';

import { getContacts, getSelectOptions } from '@/utils/data/it-m/data';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const lessons = await getSelectOptions(locale);
    const lessonsArmenianKeyword = await getSelectOptions('am');
    const contacts = await getContacts(locale);

    if (!lessons || !lessonsArmenianKeyword || !contacts) {
        notFound();
    };

    return (
        <Contacts
            lessons={lessons?.courses_names}
            lessonsArmenianKeyword={lessonsArmenianKeyword?.courses_names}
            contacts={contacts}
        />
    );
};