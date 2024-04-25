'use client'

import React from 'react';

import useWindowSize from '@/hooks/useWindowSize';

import { Course, CourseMobileCard, Gallery } from '../Course';

import { Course as CourseProps } from '@/types/educational-center';

import styles from './styles.module.sass';


type Props = {
    data: CourseProps[]
}

const Courses = ({ data }: Props) => {
    const windowSize = useWindowSize();

    const courses: JSX.Element[] = data?.map((course: CourseProps) => <Course key={course.slug} course={course} />);
    const gallery: JSX.Element[] = data?.map((course: CourseProps) => <Gallery key={course.slug} course={course} />);
    const mobile: JSX.Element[] = data?.map((course: CourseProps) => <CourseMobileCard key={course.slug} course={course} />);

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