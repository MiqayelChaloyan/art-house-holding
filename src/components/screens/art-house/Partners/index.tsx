'use client'

import React, { useState } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

import { useTranslations } from 'next-intl';

import Slider from 'react-slick';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';

import Partner from '@/lib/ui/parnter';
import { ArianAMU } from '@/lib/constants/font';

import useWindowSize from '@/hooks/useWindowSize';

import { PARTNER } from '../../../../../sanity/sanity-queries/generic';

import cn from 'classnames';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './styles.module.sass';


interface Props {
    partners: PARTNER[];
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

const Partners = ({ partners }: Readonly<Props>) => {
    const [slideIndex, setSlideIndex] = useState<number>(0);
    const windowSize = useWindowSize();
    const t = useTranslations('navigation');

    const params = {
        slidesPerView: windowSize.width <= 1280 ? 5 : 9,
        spaceBetween: 90,
        freeMode: true,
        pagination: {
            clickable: true,
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

    if(!partners.length) return null

    return (
        <section id='partners' className={styles.container}>
            <h2 className={cn(styles.title, ArianAMU.className)}>
                {t('partners')}
            </h2>
            <div className={styles.desktop}>
                <Swiper {...params}>
                    {partners?.map((partner: PARTNER) =>
                        <SwiperSlide key={partner._id}>
                            <Partner partner={partner} />
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
            <div className={styles.mobile}>
                <Slider {...settings}>
                    {partners?.map((partner: PARTNER, index: number) => (
                        <div
                            key={index}
                            className={index === slideIndex ? styles.slide_active  : styles.slide}
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