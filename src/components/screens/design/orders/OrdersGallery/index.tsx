'use client'

import Gallery from '@/components/components/gallery';

import { COURSE } from '../../../../../../sanity/sanity-queries/design';


interface Props {
    courses: COURSE[],
};


const OrdersGallery = ({
    courses
}: Readonly<Props>) => (
    <>
        <Gallery
            projects={courses}
            type='orders'
        />
    </>
);

export default OrdersGallery;