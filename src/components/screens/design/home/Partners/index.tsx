'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Partner from './Partner';

import { Arial } from '@/constants/font';
import { Titles } from '@/constants';

import ArrowLeft from '@/lib/icons/language/ArrowLeft';
import ArrowRight from '@/lib/icons/language/ArrowRight';

import useWindowSize from '@/hooks/useWindowSize';

import { PARTNER } from '../../../../../../sanity/sanity-queries/generic';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: PARTNER[];
};

const SampleNextArrow = ({ onClick, fill }: any) => (
    <div className={cn(styles.arrow, styles.arrow_right)} onClick={onClick}>
        <ArrowRight width='18' height='50' fill={fill} />
    </div>
);

const SamplePrevArrow = ({ onClick, fill }: any) => (
    <div className={cn(styles.arrow, styles.arrow_left)} onClick={onClick}>
        <ArrowLeft width='18' height='50' fill={fill} />
    </div>
);

const Partners = ({ data }: Readonly<Props>) => {
    const t = useTranslations('sections');
    const windowSize = useWindowSize();

    const slidesItems: JSX.Element[] = data?.map((partner: PARTNER) =>
        <Partner
            key={partner._id}
            _id={partner._id}
            company_name={partner.company_name}
            cooperation={partner.cooperation}
            implemented_projects={partner.implemented_projects}
            logo={partner.logo}
        />
    );

    const settings = {
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: true,
        speed: 500,
        autoplay: false,
        dots: false,
        nextArrow: <SampleNextArrow fill={windowSize.width > 1024 ? '#4B352B' : '#fff'} />,
        prevArrow: <SamplePrevArrow fill={windowSize.width > 1024 ? '#4B352B' : '#fff'} />,
        cssEase: 'ease-out',
        centerMode: true,
        centerPadding: "0",
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    dots: false
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: false,
                    centerPadding: "5px",
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                    centerPadding: "5px",
                }
            }
        ]
    };

    return (
        <section id='partners' className={styles.section}>
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
            <div className={styles.slider}>
                <Slider {...settings}>
                    {slidesItems}
                </Slider>
            </div>
        </section>
    );
};

export default React.memo(Partners);


