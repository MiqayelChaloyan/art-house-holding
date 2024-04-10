// Swiper
import { Swiper } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

const FlatList = ({ list }: any) => (
    <Swiper
        watchSlidesProgress={true}
        slidesPerView={1.5}
        spaceBetween={10}
        effect={'cards'}
        className="mySwiper"
    >
        {list}
    </Swiper>
);

export default FlatList;