import { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { SwiperOptions } from 'swiper/types';

export const swiperSettings: SwiperOptions = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    speed: 800,
    slidesPerView: 'auto',
    modules: [EffectCoverflow, Pagination, Navigation, Autoplay],
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: true,
    },
    spaceBetween: 60,
    loop: true,
    pagination: {
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
};

export const SwiperNavButtons = () => (
    <>
        <div className='swiper-button-prev'>
            <RiArrowLeftSLine size={70} color='#362906' />
        </div>
        <div className='swiper-button-next'>
            <RiArrowRightSLine size={70} color='#362906' />
        </div>
    </>
);








