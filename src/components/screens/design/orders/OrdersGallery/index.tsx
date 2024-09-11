'use client'

import Gallery from '@/components/components/gallery';


interface Props {
    courses: COURSES_DESIGN_QUERYResult[];
};

const OrdersGallery = ({ courses }: Readonly<Props>) => (
    <Gallery projects={courses} type='orders' />
);

export default OrdersGallery;