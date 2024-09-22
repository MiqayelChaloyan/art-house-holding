'use client'

import React from 'react';

import { Calibri } from '@/src/constants/font';

import { ImagePath } from '@/src/types/general';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


const Partner = ({
    _id, 
    company_name, 
    cooperation, 
    implemented_projects,
    logo
 }: Readonly<PARTNER_Result>) => {
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
