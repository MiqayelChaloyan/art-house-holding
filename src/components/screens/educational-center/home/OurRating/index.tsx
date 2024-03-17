"use client"

import { FC, memo, useState } from 'react';

import Container from '@/components/components/container';

import Rating from './Ratings';
import MobileCards from './MobileCards';

import { EDUCATIONAL_CENTER_DEFAULT } from '../../../../../../sanity/sanity-queries/educational-center';

// slick-carousel 
import Slider from 'react-slick';

// slick-carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './style.module.sass';
import { useTranslations } from 'next-intl';


type Props = {
    data: EDUCATIONAL_CENTER_DEFAULT[]
};


const OurRating: FC<Props> = ({ data }) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const ratings = data[0].our_rating_section.slice(0, 3);
    const t = useTranslations('sections');

    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        dots: false,
        centerMode: true,
        cssEase: 'ease-out',
        arrows: false,
        beforeChange: (current: any, next: any) => setSlideIndex(next),
    };

    return (
        <section id='our-rating' className={styles.container}>
            <Container>
                <h1 className={styles.title}>{t('rating')}</h1>
                <div className={styles.feedbacks}>
                    <div className={styles.row}>
                        <Rating data={ratings} />
                    </div>
                </div>
                <div className={styles.mobile_cards}>
                    <Slider {...settings} className={styles.slider}>
                        {MobileCards(ratings, slideIndex)}
                    </Slider>
                </div>
            </Container>
        </section>
    );
};

export default memo(OurRating);