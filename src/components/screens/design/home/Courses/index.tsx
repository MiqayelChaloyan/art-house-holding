'use client'

import React, { useCallback } from 'react';

import { useTranslations } from 'next-intl';

import Course from './Course';

import { Arial } from '@/lib/constants/font';
import useWindowSize from '@/hooks/useWindowSize';

import { HOME_COURSES } from '../../../../../../sanity/sanity-queries/design';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    courses: HOME_COURSES[];
};

const Courses = ({ courses }: Readonly<Props>) => {
    const t = useTranslations('navigation');
    const windowSize = useWindowSize();

    const determinePosition = useCallback((index: number) => {
        return index % 2 === 0 && (windowSize.width > 780 || windowSize.width === undefined) ? 'right' : 'left';
    }, [windowSize]);

    return (
        <section id='design-courses' className={styles['design-courses']}>
            <div className={styles.titles}>
                <h2 className={cn(styles['title-back'], Arial.className)}>COURSES</h2>
                <h1 className={cn(styles.title, Arial.className)}>{t('courses')}</h1>
            </div>
            {courses?.map((course, index) => (
                <Course
                    key={course._key}
                    course={course}
                    position={determinePosition(index)}
                />
            ))}
        </section>
    )
};

export default React.memo(Courses);