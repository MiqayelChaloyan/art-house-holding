'use client'

import Gallery from '@/components/components/gallery';

import { COURSE } from '../../../../../../sanity/sanity-queries/design';

import styles from './styles.module.sass';


interface Props {
    courses: COURSE[],
};


const OrdersGallery = ({ courses }: Readonly<Props>) => (
    <div className={styles.gallery}>
        <Gallery
            projects={courses}
            type='orders'
        />
    </div>
);

export default OrdersGallery;