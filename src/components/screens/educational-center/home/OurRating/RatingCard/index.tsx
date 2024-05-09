'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import Image from 'next/image';

import Search from '@/lib/icons/educational-center/Search';
import Star from '@/lib/icons/educational-center/Star';
import { Inter } from '@/lib/constants/font';

import { Options } from '@/types/educational-center';

import cn from 'classnames';

import styles from './styles.module.sass';


const RatingCard = ({ options }: Readonly<Options | any>) => {
    const t = useTranslations('texts');

    return (
        <div className={styles.column} style={{ backgroundImage: `url(${options.urlForImageBackground})` }}>
            <div className={styles.rating_card_blog} style={{ marginTop: `${options.top ? options.top : 20}px` }}>
                <div className={styles.header} style={{ marginBottom: `${options.bottom ? options.bottom : 20}px` }}>
                    <div className={styles.header_text}>
                        <p className={Inter.className}>
                            {t('rating-title')}
                        </p>
                    </div>
                    <div className={styles.header_icon}>
                        <Search
                            width='25'
                            height='25'
                            fill='white'
                        />
                    </div>
                </div>
                <div className={styles.card} style={{ marginLeft: `${options.left ? options.left : 10}px` }}>
                    <div className={styles.left}>
                        <Image
                            src={options.urlForImage}
                            alt={options.urlImageAlt}
                            priority
                            className={styles.user_image}
                            width={0}
                            height={0}
                            sizes='100vw'
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className={styles.right}>
                        <p className={styles.name}>{options.name}</p>
                        <div className={styles.rating}>
                            {Array.from(Array(options.rating).keys()).map((star, index) => (
                                <Star
                                    width='20'
                                    height='20'
                                    fill={star ? 'black' : 'white'}
                                    key={index}
                                />
                            ))}
                        </div>
                        <p className={cn(styles.thinking, Inter.className)}>
                            {options.result.slice(0, 100)}...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(RatingCard);