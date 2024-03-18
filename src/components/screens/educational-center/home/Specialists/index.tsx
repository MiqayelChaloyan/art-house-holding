"use client"

import { FC, memo } from 'react';

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import Item from './Item';

// slick-carousel 
import Slider from 'react-slick';

// slick-carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { EDUCATIONAL_CENTER_DEFAULT } from '../../../../../../sanity/sanity-queries/educational-center';

import styles from './styles.module.sass';


type SectionCoursesProps = {
    data: EDUCATIONAL_CENTER_DEFAULT[]
};


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


const Specialists: FC<SectionCoursesProps> = ({ data }) => {
    const t = useTranslations('sections');

    const slidesItems = data[0].specialists_section.map((item: any, index: number) => (
        <Item key={item.slug} item={item} index={index} />
    ));

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
            <Container>
                <h1 className={styles.title}>{t('specialists')}</h1>
                <div className={styles.specialists}>
                    <Slider {...settings}>
                        {slidesItems}
                    </Slider>
                </div>
            </Container>
        </section>
    );
};

export default memo(Specialists);


