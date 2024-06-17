// 'use client'

// import React from 'react';

// import Image from 'next/image';
// import { useTranslations } from 'next-intl';

// import { Arial } from '@/lib/constants/font';

// import Container from '@/components/components/container';

// import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

// import { WORKER } from '../../../../../../sanity/sanity-queries/design';
// import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

// import { UrlType } from '@/types/design';

// // Swiper React required modules
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper/modules';

// // Swiper styles
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import 'swiper/css/autoplay';
// import './swiper.css';

// import cn from 'classnames';

// import styles from './styles.module.sass';


// interface Props {
//     data: WORKER[];
// };

// const OurTeam = ({ data }: Readonly<Props>) => {
//     const t = useTranslations('sections');

//     const workers = data?.map((worker: WORKER) => {
//         const path: UrlType | any = urlForImage(worker.worker_image);

//         return (
//             <SwiperSlide key={worker._key} className='card'>
//                 <div className='swiper-slide-content'>
//                     <Image
//                         priority
//                         src={path?.src}
//                         height={500}
//                         width={500}
//                         alt={worker.worker_image.alt}
//                     />
//                     <div className='overlay'>
//                         <div className='items' />
//                         <div className='worker items'>
//                             <p className={Arial.className}>{worker.worker}</p>
//                             <hr />
//                         </div>
//                         <div className='profession items'>
//                             <p className={Arial.className}>{worker.profession}</p>
//                         </div>
//                     </div>
//                 </div>
//             </SwiperSlide>
//         )
//     });

//     return (
//         <div className={styles.container}>
//             <div className={styles.titles}>
//                 <h2 className={cn(styles['title-back'], Arial.className)}>OUR TEAM</h2>
//                 <h1 className={cn(styles.title, Arial.className)}>{t('our-team')}</h1>
//             </div>
//             <Container className='container'>
//                 <Swiper
//                     effect='coverflow'
//                     grabCursor={true}
//                     centeredSlides={true}
//                     speed={800}
//                     slidesPerView='auto'
//                     modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
//                     autoplay={{
//                         delay: 3000,
//                         disableOnInteraction: false,
//                     }}
//                     coverflowEffect={{
//                         rotate: 0,
//                         stretch: 0,
//                         depth: 100,
//                         modifier: 2,
//                         slideShadows: true,
//                     }}
//                     spaceBetween={60}
//                     loop={true}
//                     pagination={{
//                         clickable: true,
//                     }}
//                     navigation={{
//                         nextEl: '.swiper-button-next',
//                         prevEl: '.swiper-button-prev',
//                     }}
//                 >
//                     {workers}
//                     <div className='swiper-pagination'></div>
//                     <div className='swiper-button-prev'>
//                         <RiArrowLeftSLine size={70} color='#362906' />
//                     </div>
//                     <div className='swiper-button-next'>
//                         <RiArrowRightSLine size={70} color='#362906' />
//                     </div>
//                 </Swiper>
//             </Container>
//         </div>
//     );
// };

// export default React.memo(OurTeam);






















'use client'

import React from 'react';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Arial } from '@/lib/constants/font';

import Container from '@/components/components/container';

import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

import { WORKER } from '../../../../../../sanity/sanity-queries/design';
import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

import { UrlType } from '@/types/design';

// // Swiper React required modules
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper/modules';

// Swiper styles
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import 'swiper/css/autoplay';
import './style.css';
import './swiper.css';

import cn from 'classnames';

import styles from './styles.module.sass';
import Slider from "react-slick";


interface Props {
    data: WORKER[];
};

const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 3,
    speed: 500,
    autoPlaySpeed: 5000,
    autoPlay: true
  };

const OurTeam = ({ data }: Readonly<Props>) => {
    const t = useTranslations('sections');

    const workers = data?.map((worker: WORKER) => {
        const path: UrlType | any = urlForImage(worker.worker_image);

        return (
            // <div key={worker._key} className='card'>
                <div key={worker._key} className='card'>
                    <Image
                        priority
                        src={path?.src}
                        height={500}
                        width={500}
                        alt={worker.worker_image.alt}
                    />
                    <div className='overlay'>
                        <div className='items' />
                        <div className='worker items'>
                            <p className={Arial.className}>{worker.worker}</p>
                            <hr />
                        </div>
                        <div className='profession items'>
                            <p className={Arial.className}>{worker.profession}</p>
                        </div>
                    </div>
                </div>
            //  </div>
        )
    });

    return (
        <div className={styles.container}>
            <div className={styles.titles}>
                <h2 className={cn(styles['title-back'], Arial.className)}>OUR TEAM</h2>
                <h1 className={cn(styles.title, Arial.className)}>{t('our-team')}</h1>
            </div>
            <Container className='container'>
            <Slider {...settings}>
                {workers}
                </Slider>
            </Container>
        </div>
    );
};

export default React.memo(OurTeam);





















