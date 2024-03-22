"use client"

import Container from "@/components/components/container";

// // Swiper 
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { FreeMode, Pagination, Autoplay, Scrollbar } from 'swiper/modules';
// // Swiper styles
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/pagination';
// import "swiper/css/autoplay";

import styles from './styles.module.sass'
// import useWindowSize from "@/hooks/useWindowSize";


const data = [1, 2, 3, 4]

const Promotions = () => {
    // const windowSize = useWindowSize();


    // const params = {
    //     scrollbar: {
    //         hide: true,
    //     },
    //     slidesPerView: windowSize.width <= 1280 ? 2 : 4,
    //     spaceBetween: 10,
    //     freeMode: true,
    //     pagination: {
    //         clickable: true,
    //     },
    //     modules: [Scrollbar],
    //     className: styles.swiper,
    //     // autoplay: {
    //     //     delay: 3000,
    //     //     disableOnInteraction: false
    //     // },
    // };



    return (
        <div className={styles.container}>
            <Container>
                <h1>Ակցիաներ</h1>
                <div className={styles.promotions}>
                    {/* <Swiper {...params}> */}
                        {
                            data?.map((item: any, index: number) =>
                                // <SwiperSlide key={index}>
                                    <div key={index} style={{ backgroundColor: 'blue', width: '290px', height: '443px', borderRadius: '20px' }}></div>
                                // </SwiperSlide>
                            )
                        }
                    {/* </Swiper> */}
                </div>
            </Container>
        </div>
    )
}

export default Promotions;