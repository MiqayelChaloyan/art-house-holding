'use client'

import React from 'react';

import Branch from '@/lib/ui/branch';

import Container from '@/components/components/container';

import { SwiperTypes } from '@/types/art-house';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { BRANCH } from '../../../../../sanity/sanity-queries/art-house';

import styles from './styles.module.sass';


type Props = {
    data: BRANCH[]
};

const params: SwiperTypes = {
    effect: 'coverflow',
    grabCursor: false,
    centeredSlides: true,
    slidesPerView: 'auto',
    pagination: true,
    modules: [EffectCoverflow, Pagination],
    className: styles.mySwiper,
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
    }
};

const Branches = ({ data }: Readonly<Props>) => {
    const cards: JSX.Element[] = data?.map((item: BRANCH) =>
        <Branch key={item._key} item={item} locale={'en'} />);

    const result: JSX.Element[] = cards?.map((card: JSX.Element) => (
        <SwiperSlide key={card.key}>
            {card}
        </SwiperSlide>
    ));

    return (
        <section id='branches' className={styles.container}>
            <Container className='container'>
                <div className={styles.cards}>
                    {cards}
                </div>
                <div className={styles.slider}>
                    <Swiper {...params}>
                        {result}
                    </Swiper>
                </div>
            </Container>
        </section>
    );
};

export default React.memo(Branches);