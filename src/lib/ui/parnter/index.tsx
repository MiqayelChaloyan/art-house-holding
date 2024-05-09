'use client'

import React from 'react';

import { UrlType } from '@/types/art-house';

import { urlForImage } from '../../../../sanity/imageUrlBuilder';
import { PARTNER } from '../../../../sanity/sanity-queries/generic';

import styles from './styles.module.sass';


const Partner = ({ partner }: Readonly<PARTNER | any>) => {
    const path: UrlType | any = urlForImage(partner.logo);

    return (
        <div className={styles.co_worker}>
            <div className={styles.logo}>
                <img src={path?.src} alt={partner.logo.alt} className={styles.svg_icon} />
            </div>
        </div>
    );
};

export default React.memo(Partner);