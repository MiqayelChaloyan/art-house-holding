'use client'

import Course from './Course';

import { useTranslations } from 'next-intl';

import { Arial } from '@/lib/constants/font';

import { HOME_COURSES } from '../../../../../../sanity/sanity-queries/design';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
    courses: HOME_COURSES[],
};

const Courses = ({ courses }: Readonly<Props>) => {
    const t = useTranslations('navigation');

    return (
        <section id='design-courses' className={styles['design-courses']}>
            <div className={styles.titles}>
                <h2 className={cn(styles['title-back'], Arial.className)}>COURSES</h2>
                <h1 className={cn(styles.title, Arial.className)}>{t('courses')}</h1>
            </div>

            {courses.map((course, index) => (
                <Course key={course._key} position={index % 2 === 0 ? 'left' : 'right'} course={course} />
            ))}

        </section>
    )
};

export default Courses;