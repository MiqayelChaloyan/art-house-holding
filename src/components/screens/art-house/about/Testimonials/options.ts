import { Navigation, Pagination } from 'swiper/modules';
import { SwiperType } from '@/types/art-house';

import './styles.css';

export const options: SwiperType = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: 1,
    pagination: {
        clickable: true,
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    modules: [Navigation, Pagination],
    className: 'swiper-wrapper',
};