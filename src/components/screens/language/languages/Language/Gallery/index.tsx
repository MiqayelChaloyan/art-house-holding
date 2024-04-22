'use client'

import Image from 'next/image';

import useWindowSize from '@/hooks/useWindowSize';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';

import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


type Image = {
    _type: string
    alt: string
    _key: string
    asset: {
        _ref: string
        _type: string
    }
}

interface Style {
    [key: string]: string,
}

const style: Style = {
    "--swiper-pagination-color": "#F9CC48",
    "--swiper-pagination-bullet-inactive-color": "#006ED2",
    "--swiper-pagination-bullet-inactive-opacity": "1",
    "--swiper-pagination-bullet-size": "10px",
    "--swiper-pagination-bullet-horizontal-gap": "5px"
};

const renderImages = (images: Image[], type: string) =>
    images?.map((image: Image, index: number) => {
        const path: { src: string, width: number, height: number } | any = urlForImage(image);

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
                width={0}
                height={0}
                sizes='100vw'
            />
        );
    });


const Gallery = ({ during_courses }: any) => {
    const windowSize = useWindowSize();

    const one = during_courses.slice(0, 3);
    const two = during_courses.slice(3, 6);

    const swiperItems = during_courses?.map((image: Image) => {
        const path: { src: string, width: number, height: number } | any = urlForImage(image);

        return (
            <SwiperSlide key={image._key}>
                <Image
                    key={image._key}
                    src={path?.src}
                    alt={image?.alt}
                    width={0}
                    height={0}
                    sizes='100vw'
                />
            </SwiperSlide>
        )
    });

    return (
        <div className={styles.gallery}>
            {windowSize.width < 600 ?
                <Swiper
                    grabCursor={true}
                    effect={'creative'}
                    style={style}
                    creativeEffect={{
                        prev: {
                            shadow: true,
                            translate: [0, 0, -400],
                        },
                        next: {
                            translate: ['100%', 0, 0],
                        },
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[EffectCreative, Pagination]}
                    className="mySwiper"
                >
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