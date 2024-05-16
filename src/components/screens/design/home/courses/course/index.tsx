'use client'

import React, { useState, useEffect } from 'react';

import Image from 'next/image';

import { ImagePaths } from '@/lib/constants';

import Container from '@/components/components/container';

import { Arial } from '@/lib/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


const data = [
    {
        index: 0,
        path: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
        index: 1,
        path: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
        index: 2,
        path: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=500'
    }
];


interface CourseProps {
    position: 'left' | 'right';
}

const Course = ({ position }: CourseProps) => {
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIndex((prevIndex) => (prevIndex + 1) % data.length);
        }, 5000);

        return () => clearTimeout(timer);
    }, [index]);

    const boxClass = position === 'left' ? 'box-left' : 'box-right';
    const cornerClass = position === 'left' ? 'corner-left' : 'corner-right';
    const cornerLargeClass = position === 'left' ? 'corner-large-left' : 'corner-large-right';
    const viewClass = position === 'left' ? 'view-left' : 'view-right';
    const partCornerClass = position === 'left' ? 'corner-part-left' : 'corner-part-right';
    const slideClass = position === 'left' ? 'slide-left' : 'slide-right';
    const titleClass = position === 'left' ? 'title-left' : 'title-right';

    return (
        <div className={styles.section}>
            <div className={styles[viewClass]}>
                <div className={styles[cornerClass]}>
                    <p className={cn(styles['view-text'], Arial.className)}>
                        Կարդալ ավելին
                    </p>
                </div>
            </div>
            <div className={styles.card}>
                <Container className='box'>
                    <div className={cn(styles.box, styles[boxClass])}>
                        <div className={styles.right}>
                            <h2 className={cn(styles.title, styles[titleClass], Arial.className)}>
                                INTERIOR {'\n'} DESIGN
                            </h2>
                            <div className={styles.design}>
                                <div className={styles[cornerLargeClass]}>
                                    <p className={cn(styles['design-title'], Arial.className)}>
                                        ԻՆՏԵՐԻԵՐԻ ԴԻԶԱՅՆ
                                    </p>
                                </div>
                            </div>
                            <p className={cn(styles.content, Arial.className)}>
                                Ինտերիեր դիզայնի մասնագիտացված
                                դասընթացներն իրենց մեջ ներառում են
                            </p>
                            <button className={styles['view-btn']}>Կարդալ ավելին</button>
                        </div>
                        <div
                            className={cn(styles[slideClass])}
                        >
                            <Image
                                src={ImagePaths.DESIGN.staplerURL.default.src}
                                alt='stapler'
                                className={styles.stapler}
                                width={500}
                                height={500}
                                priority
                            />
                            <figure className={styles.imagesContainer}>
                                {data.map((item) => (
                                    <img
                                        key={item.index}
                                        className={`${styles['design-image']} ${index === item.index ? styles.active : styles.next}`}
                                        src={item.path}
                                        alt='alt'
                                    />
                                ))}
                            </figure>
                        </div>
                    </div>
                </Container>
            </div>
            <div className={styles[partCornerClass]} />
        </div>
    )
};

export default React.memo(Course);
