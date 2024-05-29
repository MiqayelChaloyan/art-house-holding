'use client'

import React, { useState } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

import { useTranslations } from 'next-intl';

import Partner from '@/lib/ui/parnter';
import { Arial, Calibri, Inter } from '@/lib/constants/font';

import useWindowSize from '@/hooks/useWindowSize';

import { UrlType } from '@/types/design';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import { PARTNER } from '../../../../../../sanity/sanity-queries/generic';

// Swiper 
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';

// slick-carousel 
import Slider from 'react-slick';

import cn from 'classnames';

// Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// slick-carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './styles.module.sass';


type Props = {
    data: PARTNER[]
};

interface SampleNextArrowProps { onClick: () => void };
interface SamplePrevArrowProps { onClick: () => void };

const SampleNextArrow = ({ onClick }: SampleNextArrowProps | any) => (
    <div className={cn(styles.arrow, styles.arrow_right)} onClick={onClick}>
        <SlArrowRight />
    </div>
);

const SamplePrevArrow = ({ onClick }: SamplePrevArrowProps | any) => (
    <div className={cn(styles.arrow, styles.arrow_left)} onClick={onClick}>
        <SlArrowLeft />
    </div>
);

const Partners = ({ data }: Readonly<Props>) => {
    const [slideIndex, setSlideIndex] = useState<number>(0);
    const t = useTranslations('sections');
    const windowSize = useWindowSize();

    const params = {
        slidesPerView: windowSize.width <= 1600 ? windowSize.width <= 1440 ? 2 : 4 : 7,
        spaceBetween: 90,
        freeMode: true,
        pagination: {
            clickable: true,
            el: styles.swiper_pagination,
        },
        modules: [FreeMode, Pagination, Autoplay],
        className: styles.swiper,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
    };

    const settings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        beforeChange: (_: unknown, next: number) => setSlideIndex(next),
        centerMode: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        cssEase: 'ease-out',
    };

    const partners = data?.map((item: PARTNER) => {
        const path: UrlType | any = urlForImage(item.logo);

        return (
            <SwiperSlide key={item._id}>
                <div className={styles.partner}>
                    <div className={styles.image_container}>
                        <img src={path?.src} className={styles.image} />
                    </div>
                    <p className={`${styles.text} ${Calibri.className}`}>{item.company_name}</p>
                    <p className={`${styles.text} ${Calibri.className}`}>{item.cooperation}</p>
                    <p className={`${styles.text} ${Calibri.className}`}>{item.implemented_projects}</p>
                </div>
            </SwiperSlide>
        );
    });

    return (
        <section id='partners' className={styles.container}>
            <div className={styles.titles}>
                <h2 className={cn(styles['title-back'], Arial.className)}>OUR PARTNERS</h2>
                <h1 className={cn(styles.title, Arial.className)}>{t('our-partners')}</h1>
            </div>
            <div className={styles.desktop}>
                <Swiper {...params}>
                    {partners}
                </Swiper>
            </div>
            <div className={styles.mobile}>
                <Slider {...settings}>
                    {data?.map((partner: PARTNER, index: number) => (
                        <div
                            key={index}
                            className={index === slideIndex ?
                                cn(styles.slide, styles.slide_active) : styles.slide
                            }
                        >
                            <Partner partner={partner} />
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default React.memo(Partners);