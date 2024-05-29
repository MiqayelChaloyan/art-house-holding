'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import Course from './Course';

import { Arial } from '@/lib/constants/font';
import useWindowSize from '@/hooks/useWindowSize';

import { HOME_COURSES } from '../../../../../../sanity/sanity-queries/design';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    courses: HOME_COURSES[],
};

const Courses = ({ courses }: Readonly<Props>) => {
    const t = useTranslations('navigation');
    const windowSize = useWindowSize();

    return (
        <section id='design-courses' className={styles['design-courses']}>
            <div className={styles.titles}>
                <h2 className={cn(styles['title-back'], Arial.className)}>COURSES</h2>
                <h1 className={cn(styles.title, Arial.className)}>{t('courses')}</h1>
            </div>
            {courses.map((course, index) => (
                <Course
                    key={course._key}
                    course={course}
                    position={index % 2 === 0 && windowSize.width > 768 ? 'right' : 'left'}
                />
            ))}
        </section>
    )
};

export default React.memo(Courses);