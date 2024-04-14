'use client'

import { memo } from 'react';

import Container from '@/components/components/container';

import { Vrdznagir } from '@/lib/constants/font';
import ArrowLeft from '@/lib/icons/language/ArrowLeft';
import ArrowRight from '@/lib/icons/language/ArrowRight';

// slick-carousel 
import Slider from 'react-slick';

// slick-carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { PARTNERS } from '../../../../../../sanity/sanity-queries/generic';

import styles from './styles.module.sass';
import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import Image from 'next/image';


const SampleNextArrow = ({ onClick }: any) => (
    <div className={`${styles.arrow} ${styles.arrow_right}`} onClick={onClick}>
        <ArrowRight width='21' height='50' fill='#006ED2' />
    </div>
);

const SamplePrevArrow = ({ onClick }: any) => (
    <div className={`${styles.arrow} ${styles.arrow_left}`} onClick={onClick}>
        <ArrowLeft width='21' height='50' fill='#006ED2' />
    </div>
);

interface Props {
    partners: PARTNERS[]
}

const Partners = ({ partners }: Props) => {

    const slidesItems = partners.map((partner: PARTNERS | any, index: number) => {
        const path: { src: string, width: number, height: number } | any = urlForImage(partner?.logo);
        return (
            <div key={index} className={styles.partner}>
                <img
                    src={path.src}
                    alt={partner?.logo.alt}
                />
            </div>
        )
    });

    const settings = {
        slidesToShow: 6,
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
        <section id='partners' className={styles.section}>
            <Container>
                <h2 className={`${styles.title} ${Vrdznagir.className}`}>Գործընկերներ</h2>
                <div>
                    <Slider {...settings}>
                        {slidesItems}
                    </Slider>
                </div>
            </Container>
        </section>
    );
};

export default memo(Partners);


