'use client'

import React from 'react';

import { Calibri } from '@/lib/constants/font';

import { ImagePath } from '@/types/general';

import { PARTNER } from '../../../../../../../sanity/sanity-queries/generic';
import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


const Partner = ({
    _id, 
    company_name, 
    cooperation, 
    implemented_projects,
    logo
 }: Readonly<PARTNER>) => {
    const path: ImagePath = urlForImage(logo);

    return (
        <div key={_id} className={styles.partner}>
            <div className={styles.image_container}>
                <img src={path?.src} className={styles.image} />
            </div>
            <p className={cn(styles.text, Calibri.className)}>{company_name}</p>
            <p className={cn(styles.text, Calibri.className)}>{cooperation}</p>
            <p className={cn(styles.text, Calibri.className)}>{implemented_projects}</p>
        </div>
    );
};

export default React.memo(Partner);
