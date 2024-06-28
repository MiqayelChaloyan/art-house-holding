'use client'

import React from 'react';

import { Arial } from '@/lib/constants/font';
import { ImagePath } from '@/types/general';
import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface CardProps {
    data: any;
    dataIndex: number;
    isCenterSlide: boolean;
}

const Card = ({ data, dataIndex, isCenterSlide }: Readonly<CardProps>) => {
    const { _key, worker, profession, worker_image } = data[dataIndex];
    const path: ImagePath = urlForImage(worker_image);

    return (
        <div
            key={_key}
            style={{ userSelect: 'none' }}
            className={cn(styles.card, isCenterSlide && styles['active-slide'])}
        >
            <img
                draggable={false}
                src={path?.src}
            />
            <div className={styles.overlay}>
                <div className={styles.items} />
                <div className={cn(styles.worker, styles.items)}>
                    <p className={Arial.className}>{worker}</p>
                    <hr />
                </div>
                <div className={cn(styles.profession, styles.items)}>
                    <p className={Arial.className}>{profession}</p>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Card);