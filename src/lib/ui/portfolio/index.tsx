'use client'

import React from 'react';

import Image from 'next/image';
import { Arial } from '@/lib/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
    src: string,
    alt: string,
    author: string,
    course_name: string,
};

const Portfolio = ({
    src,
    alt,
    author,
    course_name
}: Readonly<Props>) => (
    <figure className={styles.figure}>
        <Image
            priority
            src={src}
            height={500}
            width={500}
            alt={alt}
            className={styles.image}
            // objectFit='cover'
        />
        <div className={styles.overlay}>
            <div className={styles.items}/>
            <div className={cn(styles.author, styles.items)}>
                <p className={Arial.className}>{author}</p>
                <hr />
            </div>
            <div className={cn(styles['course-name'], styles.items)}>
                <p className={Arial.className}>{course_name}</p>
            </div>
        </div>
    </figure>
);

export default React.memo(Portfolio);