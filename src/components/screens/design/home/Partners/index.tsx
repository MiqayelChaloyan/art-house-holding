'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import { Arial, Calibri } from '@/lib/constants/font';
import { Titles } from '@/lib/constants';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import { PARTNER } from '../../../../../../sanity/sanity-queries/generic';

import { ImagePath } from '@/types/general';

import Slider from 'react-slick';

import { settings } from './settings';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: PARTNER[];
};

const Partners = ({ data }: Readonly<Props>) => {
    const t = useTranslations('sections');

    const partners = data?.map((item: PARTNER) => {
        const path: ImagePath = urlForImage(item.logo);

        return (
            <div key={item._id} className={styles.partner}>
                <div className={styles.image_container}>
                    <img src={path?.src} className={styles.image} />
                </div>
                <p className={`${styles.text} ${Calibri.className}`}>{item.company_name}</p>
                <p className={`${styles.text} ${Calibri.className}`}>{item.cooperation}</p>
                <p className={`${styles.text} ${Calibri.className}`}>{item.implemented_projects}</p>
            </div>
        );
    });

    return (
        <section id='partners' className={styles.container}>
            <div className={styles.titles}>
                <div>
                    <div className={cn(styles['title-line'], styles['back-line'])} />
                    <h2 className={cn(styles['title-back'], Arial.className)}>{Titles.ourPartners}</h2>
                </div>
                <div className={styles['bottom-title']}>
                    <h1 className={cn(styles.title, Arial.className)}>{t('our-partners')}</h1>
                    <div className={cn(styles['title-line'], styles['bottom-line'])} />
                </div>
            </div>
            <div className={styles.partners}>
                <Slider {...settings}>
                    {partners}
                </Slider>
            </div>
        </section>
    );
};

export default React.memo(Partners);