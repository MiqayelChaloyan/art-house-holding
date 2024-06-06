'use client'

import React from 'react';

import Portfolio from '@/lib/ui/portfolio-image-card';

import { UrlType } from '@/types/design';

import { urlForImage } from '../../../../sanity/imageUrlBuilder';
import { COURSE, PORTFOLIO } from '../../../../sanity/sanity-queries/design';

import styles from './styles.module.sass';

import { SwiperSlide } from 'swiper/react';
import FlatList from '../flat-list';


import './style.css';

type Props = {
    projects: PORTFOLIO[],
};

const Gallery = ({ projects }: Readonly<Props>) => {
    console.log(projects)

    // console.log(projects)
    
    // const gallery: React.JSX.Element[] = projects.flatMap((item: COURSE, index: number) => {
    //     return item.portfolio.map((elem: PORTFOLIO) => {
    //         const path: UrlType | any = urlForImage(elem.image);

    //         return (
    //             // <SwiperSlide
    //             // >
    //             <Portfolio
    //                 key={elem._key + index}
    //                 src={path?.src}
    //                 alt={elem.image.alt}
    //                 author={elem.author}
    //                 course_name={item.course_name}
    //             />
    //             // </SwiperSlide>
    //         );
    //     });
    // });

   

    return (
        <div className={styles.portfolios}>
            {/* {gallery} */}
            {/* <FlatList list={gallery} /> */}
        </div>
    );
};

export default React.memo(Gallery);