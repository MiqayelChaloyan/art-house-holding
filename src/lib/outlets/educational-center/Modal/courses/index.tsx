'use client'

import React from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { notFound, useParams } from 'next/navigation';

import { useDispatch } from 'react-redux';
import { closeModal } from '@/store/modal_reducer';

import { Pages } from '@/lib/constants/pages';
import { Arial } from '@/lib/constants/font';

import { COURSES } from '../../../../../../sanity/sanity-queries/educational-center';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    locale: string;
    courses: COURSES[];
};

const CoursesModal = ({
    locale, 
    courses
}: Props) => {
    const params = useParams();    
    const { slug } = params;

    const t = useTranslations('navigation');

    const dispatch = useDispatch();


    if (!courses) {
        return notFound();
    };

    const handlecloseModal = () => setTimeout(() => dispatch(closeModal(false)), 1500);

    return (
        <div className={styles.courses_container}>
            <p className={cn(styles.title, Arial.className)}>
                {t('courses')}
            </p>
            <div className={styles.list}>
                {courses.map((course: any) => (
                    <Link
                        key={course._id}
                        href={`/${locale}${Pages.EDUCATIONAL_HOME}/${course.slug}`}
                        className={styles.link}
                        onClick={handlecloseModal}
                    >
                        <p className={cn(styles.course, slug && slug[0] === course.slug ? styles['active-lessons'] : styles.lessons, Arial.className)}>
                            {course.course_name}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default React.memo(CoursesModal);
