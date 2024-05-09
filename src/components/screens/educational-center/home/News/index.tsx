'use client'

import React from 'react';

import Container from '@/components/components/container';

import Courses from './Courses';

import { EDUCATIONAL_CENTER_DEFAULT } from '../../../../../../sanity/sanity-queries/educational-center';

import styles from './styles.module.sass';

type Props = {
    data: EDUCATIONAL_CENTER_DEFAULT[] | any
};

const News = ({ data }: Props) => (
    <section id='cooking-courses' className={styles.container}>
        <div className={styles.triangle} />
        <Container>
            <h1 className={styles.title}>
                {data?.section_title}
            </h1>
            <div className={styles.news}>
                <Courses data={data?.lessons} />
            </div>
        </Container>
    </section>
);

export default React.memo(News);