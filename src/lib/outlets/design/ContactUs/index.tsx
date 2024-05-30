'use client'

import React from 'react';

import { usePathname } from 'next/navigation';

import ContactUsForm from '@/components/components/form-design'

import { LESSONS } from '../../../../../sanity/sanity-queries/design';


interface Props {
    locale: string,
    lessons: LESSONS[],
    lessonsArmenian: LESSONS[]
};

const ContactUs = ({
    locale,
    lessons,
    lessonsArmenian
}: Readonly<Props>) => {
    const pathname = usePathname();
    let isOpen = true;

    switch (pathname) {
        case `/${locale}/design/contact`:
            isOpen = false
            break;
        case `/${locale}/design/orders`:
            isOpen = false
            break;
        case `/${locale}/design`:
            isOpen = false
            break;
        default:
            isOpen = true
    };

    return isOpen && (
        <ContactUsForm
            lessons={lessons}
            lessonsArmenian={lessonsArmenian}
            classNameProperty='small'
        />
    )
};

export default React.memo(ContactUs);