"use client"

import { FC, memo } from 'react';

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import Container from '@/components/components/container';


// slick-carousel 
import Slider from 'react-slick';

// slick-carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


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

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


const Partners = () => {

    const slidesItems = data.map((item: any, index: number) => (
        <div key={item} style={{ width: '190px', height: '190px' }}>
            <div style={{ backgroundColor: 'green', width: '190px', height: '190px' }}>
                {item}
            </div>
        </div>
    ));

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
        <section id='partners' className={styles.partners}>
            <Container>
                <h1>Գործընկերներ</h1>
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


