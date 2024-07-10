'use client'

import React from 'react';

import Image from 'next/image';

import useWindowSize from '@/hooks/useWindowSize';

import { Swiper, SwiperSlide } from 'swiper/react';

import settings from './settings';

import { ImagePath } from '@/types/general';
import { ImageType as Type } from '@/types/language';

import { COURSE_IMAGES } from '../../../../../../../sanity/sanity-queries/language';
import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    during_courses: COURSE_IMAGES[];
};

const renderImages = (images: Type[], type: string) =>
    images?.map((image: Type, index: number) => {
        const path: ImagePath = urlForImage(image);

        let className = (type === 'odd')
            ? (index % 2 !== 0 ? styles['high-altitude-image'] : styles['low-altitude-image'])
            : (index % 2 === 0 ? styles['high-altitude-image'] : styles['low-altitude-image']);

        return (
            <Image
                key={image._key}
                src={path?.src}
                alt={image?.alt}
                className={className}
                width={500}
                height={500}
                priority
            />
        );
    });


const Gallery = ({ during_courses }: Readonly<Props>) => {
    const windowSize = useWindowSize();

    const one = during_courses.slice(0, 3);
    const two = during_courses.slice(3, 6);

    const swiperItems = during_courses?.map((image: COURSE_IMAGES) => {
        const path: ImagePath = urlForImage(image);

        return (
            <SwiperSlide key={image._key}>
                <Image
                    src={path?.src}
                    alt={image?.alt}
                    className={styles.swipe_image}
                    width={500}
                    height={500}
                    priority
                />
            </SwiperSlide>
        )
    });

    return (
        <div className={styles.gallery}>
            {windowSize.width < 600 ?
                <Swiper {...settings}>
                    {swiperItems}
                </Swiper>
                :
                <>
                    <div className={cn(styles.row, styles.one)}>
                        {renderImages(one, 'odd')}
                    </div>
                    <div className={cn(styles.row, styles.two)}>
                        {renderImages(two, 'even')}
                    </div>
                </>
            }
        </div>
    )
};

export default React.memo(Gallery);