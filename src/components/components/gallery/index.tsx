'use client'

import React from 'react';
import { SwiperSlide } from 'swiper/react';

import FlatList from '../flat-list';

import Portfolio from '@/lib/ui/portfolio-card';

import useWindowSize from '@/hooks/useWindowSize';

import { COURSE, PORTFOLIO } from '../../../../sanity/sanity-queries/design';

import styles from './styles.module.sass';


interface Props {
    projects: COURSE[];
    type: keyof COURSE;
};

const generateGalleryItems = (projects: COURSE[], type: keyof COURSE) => {
    return projects.reduce((acc, item: COURSE) => {
        const elements = item[type] as PORTFOLIO[];
        elements.forEach((elem: PORTFOLIO) => {
            const randomNumber = Math.random().toString();

            const cardElement = (
                <Portfolio
                    key={elem._key + randomNumber}
                    project={elem}
                    course_name={item.course_name}
                    slug={item.slug}
                    type={type}
                />
            );

            const desktopCard = cardElement;
            const mobileCard = (
                <SwiperSlide key={elem._key + randomNumber}>
                    {cardElement}
                </SwiperSlide>
            );

            acc.desktopCards.push(desktopCard);
            acc.mobileCards.push(mobileCard);
        });
        return acc;
    }, { desktopCards: [] as JSX.Element[], mobileCards: [] as JSX.Element[] });
};

const Gallery = ({ projects, type }: Readonly<Props>) => {
    const windowSize = useWindowSize();
    const { desktopCards, mobileCards } = generateGalleryItems(projects, type);

    return (
        <>
            {windowSize.width <= 768 ? (
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
