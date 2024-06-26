'use client'

import React from 'react';

import Container from '@/components/components/container';

import Courses from './Courses';

import { Inter } from '@/lib/constants/font';

import { SECTON } from '../../../../../../sanity/sanity-queries/educational-center';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
    data: SECTON
};

const News = ({ data }: Readonly<Props>) => (
    <section id='cooking-courses' className={styles.container}>
        <div className={styles.triangle} />
        <Container className='container'>
            <h1 className={cn(styles.title, Inter.className)}>
                {data?.section_title}
            </h1>
            <div className={styles.news}>
                <Courses data={data?.lessons} />
            </div>
        </Container>
    </section>
);

export default React.memo(News);