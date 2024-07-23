import { EffectCoverflow, Pagination } from 'swiper/modules';
import { TEXT } from '../../../sanity/sanity-queries/art-house';

export interface UrlType {
    src: string,
    width: number,
    height: number,
};

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

export interface Content {
    content: TEXT;
    isReadMore: boolean;
    minimumHeight: number;
};
