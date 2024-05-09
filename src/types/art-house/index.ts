import { EffectCoverflow, Pagination } from 'swiper/modules';

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

export interface socialNetwork {
    facebook: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    instagram: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    gmail: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    linkedin: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
};
