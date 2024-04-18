// Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

// required modules
import { Pagination } from 'swiper/modules';

const styles: any = {
    "--swiper-pagination-color": "#F9CC48",
    "--swiper-pagination-bullet-inactive-color": "#006ED2",
    "--swiper-pagination-bullet-inactive-opacity": "1",
    "--swiper-pagination-bullet-size": "10px",
    // "--swiper-pagination-bullet-horizontal-gap": "6px"
}


export default function FlatList({ list }: any) {
    return (
        <>
            <Swiper
                slidesPerView={1.2}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                style={styles}
                breakpoints={{
                    600: {
                        slidesPerView: 1.2,
                        spaceBetween: 10,
                    },
                    480: {
                        slidesPerView: 1.2,
                        spaceBetween: 10,
                    },
                    350: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {list}
            </Swiper>
        </>
    );
}
