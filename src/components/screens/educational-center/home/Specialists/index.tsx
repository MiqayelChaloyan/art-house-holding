'use client'

import React from 'react';

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import Item from './Item';

// slick-carousel 
import Slider from 'react-slick';

import { SPECIALIST } from '../../../../../../sanity/sanity-queries/educational-center';

import cn from 'classnames';

// slick-carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './styles.module.sass';


type Props = {
    data: SPECIALIST[]
};

interface SampleNextArrowProps { onClick: () => void };
interface SamplePrevArrowProps { onClick: () => void };

const SampleNextArrow = ({ onClick }: SampleNextArrowProps | any) => (
    <div className={cn(styles.arrow, styles.arrow_right)} onClick={onClick}>
        <SlArrowRight />
    </div>
);

const SamplePrevArrow = ({ onClick }: SamplePrevArrowProps |any) => (
    <div className={cn(styles.arrow, styles.arrow_left)} onClick={onClick}>
        <SlArrowLeft />
    </div>
);

const Specialists = ({ data }: Readonly<Props>) => {
    const t = useTranslations('sections');

    const slidesItems = data?.map((item: SPECIALIST, index: number) =>
        <Item key={item._key} item={item} index={index} />);

    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        speed: 600,
        autoplay: false,
        autoplaySpeed: 5000,
        dots: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        cssEase: 'ease-out',
    };

    return (
        <section id='specialists' className={styles.container}>
            <div className={styles.triangle} />
            <Container className='container'>
                <h1 className={styles.title}>
                    {t('specialists')}
                </h1>
                <div className={styles.specialists}>
                    <Slider {...settings}>
                        {slidesItems}
                    </Slider>
                </div>
            </Container>
        </section>
    );
};

export default React.memo(Specialists);


