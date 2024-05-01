'use client'

import React from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';

import { Pages } from '@/lib/constants/pages';

import { EDUCATIONAL_CENTER_COURSES } from '../../../../../../sanity/sanity-queries/educational-center';

import styles from './styles.module.sass';


type Props = {
    locale: string
    courses: EDUCATIONAL_CENTER_COURSES[]
};

const CoursesModal = ({
    locale, courses
}: Props) => {
    const t = useTranslations('navigation');

    if (!courses) {
        return notFound();
    };

    return (
        <div className={styles.courses_container}>
            <p className={styles.title}>
                {t('courses')}
            </p>
            <div className={styles.list}>
                {courses.map((course: any) => (
                    <Link
                        key={course._id}
                        href={`/${locale}${Pages.EDUCATIONAL_HOME}/${course.slug}`}
                        className={styles.link}
                    >
                        <p className={styles.course}>{course.course_name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default React.memo(CoursesModal);
