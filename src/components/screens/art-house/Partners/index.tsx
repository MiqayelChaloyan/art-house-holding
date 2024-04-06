'use client'

import { memo, useState } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

import { useTranslations } from 'next-intl';

// Swiper 
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';

import Partner from '@/lib/ui/parnter';
import useWindowSize from '@/hooks/useWindowSize';
import { ArianAMU } from '@/lib/constants/font';

// Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// slick-carousel 
import Slider from 'react-slick';

// slick-carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { PARTNERS } from '../../../../../sanity/sanity-queries/generic';

import styles from './styles.module.sass';


const SampleNextArrow = ({ onClick }: any) => (
    <div className={`${styles.arrow} ${styles.arrow_right}`} onClick={onClick}>
        <SlArrowRight />
    </div>
);

const SamplePrevArrow = ({ onClick }: any) => (
    <div className={`${styles.arrow} ${styles.arrow_left}`} onClick={onClick}>
        <SlArrowLeft />
    </div>
);


interface Props {
    partners?: PARTNERS[]
};


const Partners = ({ partners }: Props) => {
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
        beforeChange: (_: unknown, next: any) => setSlideIndex(next),
        centerMode: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        cssEase: 'ease-out',
    };


    return (
        <section id='co-workers' className={styles.container}>
            <h2 className={`${styles.title} ${ArianAMU.className}`}>
                {t('co-workers')}
            </h2>
            <div className={styles.desktop}>
                <Swiper {...params}>
                    {
                        partners?.map((item, index) =>
                            <SwiperSlide key={index}>
                                <Partner item={item} />
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            </div>
            <div className={styles.mobile}>
                <Slider {...settings}>
                    {
                        partners?.map((item, index) => (
                            <div
                                key={index}
                                className={index === slideIndex ? `${styles.slide} ${styles.slide_active}` : styles.slide}
                            >
                                <Partner item={item} />
                            </div>
                        ))
                    }
                </Slider>
            </div>
        </section>
    );
};

export default memo(Partners);