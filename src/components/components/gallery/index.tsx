'use client'

import React from 'react';
import { SwiperSlide } from 'swiper/react';

import FlatList from '../flat-list';

import Portfolio from '@/lib/ui/portfolio-image-card';

import useWindowSize from '@/hooks/useWindowSize';

import { COURSE, PORTFOLIOS } from '../../../../sanity/sanity-queries/design';

import styles from './styles.module.sass';


interface Props {
    projects: COURSE[],
};

const generateGalleryItems = (projects: COURSE[]) => {
    return projects.reduce((acc, item: COURSE) => {
        item.portfolios.forEach((elem: PORTFOLIOS) => {
            const randomNumber = Math.random();

            const portfolioElement = (
                <Portfolio
                    key={elem._key + randomNumber}
                    project={elem}
                    course_name={item.course_name}
                    slug={item.slug}
                />
            );

            const desktopCard = portfolioElement;
            const mobileCard = (
                <SwiperSlide key={elem._key + randomNumber}>
                    {portfolioElement}
                </SwiperSlide>
            );

            acc.desktopCards.push(desktopCard);
            acc.mobileCards.push(mobileCard);
        });
        return acc;
    }, { desktopCards: [] as JSX.Element[], mobileCards: [] as JSX.Element[] });
};


const Gallery = ({ projects }: Readonly<Props>) => {
    const windoSize = useWindowSize();
    const { desktopCards, mobileCards } = generateGalleryItems(projects);

    return (
        <>
            {windoSize.width <= 768 ? (
                <div className={styles['portfolios-mobile']}>
                    <FlatList list={mobileCards} />
                </div>
            ) : (
                <div className={styles.portfolios}>
                {desktopCards}
            </div>
            )} 
        </>
    );
};

export default React.memo(Gallery);