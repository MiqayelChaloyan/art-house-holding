'use client'

import React from 'react';

import { ImagePath } from '@/types/general';

import { urlForImage } from '../../../../sanity/imageUrlBuilder';
import { PARTNER } from '../../../../sanity/sanity-queries/generic';

import styles from './styles.module.sass';


interface Props {
    partner: PARTNER;
};

const Partner = ({ partner }: Readonly<Props>) => {
    const path: ImagePath = urlForImage(partner.logo);

    return (
        <div className={styles.partner}>
            <div className={styles.logo}>
                <img
                    src={path?.src}
                    alt={partner.logo.alt}
                    className={styles.svg_icon}
                    loading='eager'
                />
            </div>
        </div>
    );
};

export default React.memo(Partner);