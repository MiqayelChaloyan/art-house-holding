'use client'

import React from 'react';

import useWindowSize from '@/hooks/useWindowSize';

import { Course, CourseMobileCard, Gallery } from '../Course';

import { LESSON } from '../../../../../../../sanity/sanity-queries/educational-center';

import styles from './styles.module.sass';


type Props = {
    data: LESSON[]
}

const Courses = ({ data }: Readonly<Props>) => {
    const windowSize = useWindowSize();

    const courses: JSX.Element[] = data?.map((course: LESSON) => <Course key={course._key} course={course} />);
    const gallery: JSX.Element[] = data?.map((course: LESSON) => <Gallery key={course._key} course={course} />);
    const mobile: JSX.Element[] = data?.map((course: LESSON) => <CourseMobileCard key={course._key} course={course} />);

    return windowSize.width < 768 ? (mobile) : (
        <div className={styles.column}>
            <div className={styles.row}>
                {courses}
            </div>
            <div className={styles.row}>
                {gallery}
            </div>
        </div>
    )
};

export default React.memo(Courses);