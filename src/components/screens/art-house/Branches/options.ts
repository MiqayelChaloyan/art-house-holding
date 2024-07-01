import { EffectCoverflow, Pagination } from 'swiper/modules';
import { SwiperTypes } from '@/types/art-house';
import styles from './styles.module.sass';

export const options: SwiperTypes = {
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