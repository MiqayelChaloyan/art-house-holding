'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Partner from './Partner';

import Container from '@/components/components/container';

import { Vrdznagir } from '@/lib/constants/font';
import ArrowLeft from '@/lib/icons/language/ArrowLeft';
import ArrowRight from '@/lib/icons/language/ArrowRight';

import useWindowSize from '@/hooks/useWindowSize';

import { PARTNER } from '../../../../../../sanity/sanity-queries/generic';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    partners: PARTNER[]
};

const SampleNextArrow = ({ onClick, fill }: any) => (
    <div className={cn(styles.arrow, styles.arrow_right)} onClick={onClick}>
        <ArrowRight width={21} height={50} fill={fill} />
    </div>
);

const SamplePrevArrow = ({ onClick, fill }: any) => (
    <div className={cn(styles.arrow, styles.arrow_left)} onClick={onClick}>
        <ArrowLeft width={21} height={50} fill={fill} />
    </div>
);


const Partners = ({ partners }: Readonly<Props>) => {
    const t = useTranslations('navigation');
    const windowSize = useWindowSize();

    const slidesItems: JSX.Element[] = partners?.map((partner: PARTNER) =>
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
        nextArrow: <SampleNextArrow fill={windowSize.width > 1024 ? '#006ED2' : '#fff'} />,
        prevArrow: <SamplePrevArrow fill={windowSize.width > 1024 ? '#006ED2' : '#fff'} />,
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
            <Container className='container'>
                <h2 className={cn(styles.title, Vrdznagir.className)}>
                    {t('partners')}
                </h2>
                <div className={styles.slider}>
                    <Slider {...settings}>
                        {slidesItems}
                    </Slider>
                </div>
            </Container>
        </section>
    );
};

export default React.memo(Partners);


