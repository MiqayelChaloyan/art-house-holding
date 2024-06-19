'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import Container from '@/components/components/container';
import { SwiperNavButtons, swiperSettings } from './swiperSettings';
import HoneyCombLoader from '@/lib/ui/honeyCombLoader';
import { Arial } from '@/lib/constants/font';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import { WORKER } from '../../../../../../sanity/sanity-queries/design';

import { ImagePath } from '@/types/general';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import './swiper.css';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: WORKER[];
};

const OurTeam = ({ data }: Readonly<Props>) => {
    const [initSlides, setInitSlides] = useState<boolean>(false);
    const t = useTranslations('sections');

    useEffect(() => {
        setInitSlides(true);
    }, []);

    const workers = data?.map((worker: WORKER) => {
        const path: ImagePath = urlForImage(worker.worker_image);

        return (
            <SwiperSlide key={worker._key} className='card'>
                <div className='swiper-slide-content'>
                    <Image
                        priority
                        src={path?.src}
                        height={500}
                        width={500}
                        alt={worker.worker_image.alt}
                    />
                    <div className='overlay'>
                        <div className='items' />
                        <div className='worker items'>
                            <p className={Arial.className}>{worker.worker}</p>
                            <hr />
                        </div>
                        <div className='profession items'>
                            <p className={Arial.className}>{worker.profession}</p>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        );
    });

    return (
        <div className={styles.container}>
            <div className={styles.titles}>
                <h2 className={cn(styles['title-back'], Arial.className)}>OUR TEAM</h2>
                <h1 className={cn(styles.title, Arial.className)}>{t('our-team')}</h1>
            </div>
            {initSlides ? (
                <Container className='container'>
                    <Swiper {...swiperSettings}>
                        {workers}
                        <div className='swiper-pagination'></div>
                        <SwiperNavButtons />
                    </Swiper>
                </Container>
            ) : (
                <div className={styles.loader}>
                    <HoneyCombLoader/>
                </div>
            )}
        </div>
    );
};

export default React.memo(OurTeam);
