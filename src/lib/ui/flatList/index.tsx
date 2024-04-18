// Swiper React components
import { Swiper } from 'swiper/react';

// required modules
import { Pagination, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';


interface Props {
    [key: string]: string,
}

const styles: Props = {
    "--swiper-pagination-color": "#F9CC48",
    "--swiper-pagination-bullet-inactive-color": "#006ED2",
    "--swiper-pagination-bullet-inactive-opacity": "1",
    "--swiper-pagination-bullet-size": "10px",
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
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
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
                        slidesPerView: 1.2,
                        spaceBetween: 10,
                    },
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {list}
            </Swiper>
        </>
    );
}
