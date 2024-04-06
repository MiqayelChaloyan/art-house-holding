'use client'

import { FC } from 'react';

import Branch from '@/lib/ui/branch';

import Container from '@/components/components/container';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { ART_HOUSE_HOME } from '../../../../../sanity/sanity-queries/art-house';

import styles from './styles.module.sass';


type Props = {
    data: ART_HOUSE_HOME[] | any
};

type Branch = {
    company_name?: string
    words?: string
    website_logo_front?: {
        _type: string
        alt: string
        asset: { _type: string, _ref: string }
    },
    website_logo_back?: {
        _type: string
        alt: string
        asset: { _ref: string, _type: string }
    },
    slug?: string
    web_site_url?: string
}

type SwiperTypes = {
    effect: 'coverflow'
    grabCursor: boolean
    centeredSlides: boolean
    slidesPerView: 'auto'
    pagination: boolean
    modules: (typeof EffectCoverflow | typeof Pagination)[]
    className: string
    coverflowEffect: {
        rotate: number
        stretch: number
        depth: number
        modifier: number
        slideShadows: boolean
    };
};


const Branches = ({ data }: Props) => {

    const cards: JSX.Element[] = data?.our_websites.map((item: any) => <Branch key={item.slug} item={item} locale={'en'} />);

    const result: JSX.Element[] = cards?.map((card: JSX.Element) => (
        <SwiperSlide key={card.key}>
            {card}
        </SwiperSlide>
    ));

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


    return (
        <section id='branches' className={styles.container}>
            <Container>
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

export default Branches;