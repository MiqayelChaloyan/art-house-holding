'use client'

import React from 'react';

import Image from 'next/image';

import { Arial } from '@/constants/font';
import { ImagePath } from '@/types/general';

import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';

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
        <div key={_id} className={styles.card}>
            <Image
                src={path?.src}
                alt={logo.alt}
                className={styles.img}
                width={500}
                height={500}
                priority
            />
            <div className={styles.overlay}>
                <h1 className={cn(styles['text-h1'], Arial.className)}>
                    {company_name}
                </h1>
                <p className={cn(styles['text-p'], Arial.className)}>
                    {cooperation}
                </p>
                <p className={cn(styles['text-p'], Arial.className)}>
                    {implemented_projects}
                </p>
            </div>
        </div>
    )
};

export default React.memo(Partner);