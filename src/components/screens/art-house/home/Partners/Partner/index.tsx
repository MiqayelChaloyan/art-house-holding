'use client'

import React from 'react';

import { ImagePath } from '@/src/types/general';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import styles from './styles.module.sass';


const Partner = ({ _id, logo }: Readonly<PARTNER_Result>) => {
    const path: ImagePath = urlForImage(logo);

    return (
        <div key={_id} className={styles.partner}>
            <div className={styles.image_container}>
                <img src={path?.src} className={styles.image} />
            </div>
        </div>
    );
};

export default React.memo(Partner);
