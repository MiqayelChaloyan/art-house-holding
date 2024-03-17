import { FC, memo } from 'react';

import Link from 'next/link';

import { useTranslation } from 'react-i18next';


import styles from './style.module.sass';
import { EDUCATIONAL_CENTER_COURSES } from '../../../../../../../sanity/sanity-queries/educational-center';

type CoursesModalProps = {
    courses: EDUCATIONAL_CENTER_COURSES[]
};

const chunkSize = 7;

const chunkArray = (arr: any, size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    );
};

const CoursesModal: FC<CoursesModalProps> = ({ courses }) => {
    const data = chunkArray(courses, chunkSize);
    const { t } = useTranslation();

    if (!courses) {
        return null;
    };

    const coursesList = courses.map((course: any) => (
        <Link href={`/educational-center/${course.slug}`} aria-label={course.course_name} key={course._id} className={styles.link}>
            <p className={styles.course}>{course.course_name}</p>
        </Link>
    ));

    return (
        <div className={styles.courses_container}>
            <p className={styles.title}>{t('pages.courses')}</p>
            <div className={styles.list}>
                {coursesList}
            </div>
        </div>
    );
};

export default memo(CoursesModal);
