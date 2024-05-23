import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';


// const settings = {
//     autoplay: {
//         delay: 5000,
//         speed: 500
//     }
// };

export default function Header() {
    return (
        <>
            <Swiper
                // rewind={true}
                navigation={true}
                // {...settings}
                modules={[Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div style={{ width: '100%', height: '700px', backgroundColor: 'red' }}>
                        Slide 1
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{ width: '100%', height: '700px', backgroundColor: 'black' }}>
                        Slide 2
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{ width: '100%', height: '700px', backgroundColor: 'yellow' }}>
                        Slide 3
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{ width: '100%', height: '700px', backgroundColor: 'green' }}>
                        Slide 4
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}
