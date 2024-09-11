import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';

export type SwiperTypes = {
    effect: 'coverflow',
    grabCursor: boolean,
    centeredSlides: boolean,
    slidesPerView: 'auto',
    pagination: boolean,
    modules: (typeof EffectCoverflow | typeof Pagination)[],
    className: string,
    coverflowEffect: {
        rotate: number,
        stretch: number,
        depth: number,
        modifier: number,
        slideShadows: boolean
    };
};

export interface SwiperType {
    effect: 'coverflow';
    grabCursor: boolean;
    centeredSlides: boolean;
    slidesPerView: number;
    loop: boolean,
    pagination: {
        clickable: boolean,
        el: string,
    };
    navigation: {
        nextEl: string,
        prevEl: string,
    },
    modules: (typeof Navigation | typeof Pagination)[],
    className: string;
};

export interface Content {
    content: TEXT;
    isReadMore: boolean;
    minimumHeight: number;
};
