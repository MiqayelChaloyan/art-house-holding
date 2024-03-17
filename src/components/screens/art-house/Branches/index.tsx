"use client"

import { FC, memo } from 'react';

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
    data: ART_HOUSE_HOME[]
};

interface SwiperTypes {
    effect: 'coverflow';
    grabCursor: boolean;
    centeredSlides: boolean;
    slidesPerView: 'auto';
    pagination: boolean;
    modules: (typeof EffectCoverflow | typeof Pagination)[];
    className: string;
    coverflowEffect: {
        rotate: number;
        stretch: number;
        depth: number;
        modifier: number;
        slideShadows: boolean;
    };
};


const Branches: FC<Props> = ({ data }) => {
    // const { locale } = useRouter();

    const cards: JSX.Element[] = data?.map((item: any) => <Branch key={item.slug} item={item} locale={'en'}/>);

    // console.log(locale)
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
        <div id='branches' className={styles.container}>
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
        </div>
    );
};

export default memo(Branches);