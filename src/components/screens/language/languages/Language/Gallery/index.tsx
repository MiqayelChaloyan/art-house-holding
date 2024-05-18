'use client'

import Image from 'next/image';

import useWindowSize from '@/hooks/useWindowSize';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Pagination } from 'swiper/modules';

import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';

import { ImageType as Type, UrlType } from '@/types/language';

import { COURSE_IMAGES } from '../../../../../../../sanity/sanity-queries/language';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
    during_courses: COURSE_IMAGES[],
}

interface Style {
    [key: string]: string,
};

const style: Style = {
    "--swiper-pagination-color": "#F9CC48",
    "--swiper-pagination-bullet-inactive-color": "#006ED2",
    "--swiper-pagination-bullet-inactive-opacity": "1",
    "--swiper-pagination-bullet-size": "10px",
    "--swiper-pagination-bullet-horizontal-gap": "5px"
};

const renderImages = (images: Type[], type: string) =>
    images?.map((image: Type, index: number) => {
        const path: UrlType | any = urlForImage(image);

        let className;

        if (type === 'odd') {
            className = index % 2 !== 0 ? styles['high-altitude-image'] : styles['low-altitude-image'];

        } else {
            className = index % 2 === 0 ? styles['high-altitude-image'] : styles['low-altitude-image'];
        }

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

const settings = {
    grabCursor: true,
    effect: 'creative',
    style: style,
    creativeEffect: {
        prev: {
            shadow: true,
            translate: [0, 0, -400],
        },
        next: {
            translate: ['100%', 0, 0],
        },
    },
    pagination: {
        clickable: true,
    },
    modules: [EffectCreative, Pagination]
};

const Gallery = ({ during_courses }: Readonly<Props>) => {
    const windowSize = useWindowSize();

    const one = during_courses.slice(0, 3);
    const two = during_courses.slice(3, 6);

    const swiperItems = during_courses?.map((image: COURSE_IMAGES) => {
        const path: UrlType | any = urlForImage(image);

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

export default Gallery;