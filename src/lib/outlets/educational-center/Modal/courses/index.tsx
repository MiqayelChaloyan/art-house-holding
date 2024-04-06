import { FC, memo } from 'react';

import Link from 'next/link';



import styles from './style.module.sass';
import { useTranslations } from 'next-intl';
import { EDUCATIONAL_CENTER_COURSES } from '../../../../../../sanity/sanity-queries/educational-center';

interface CoursesModalProps {
    locale: string
    courses: EDUCATIONAL_CENTER_COURSES[] 
};

// const chunkSize = 7;

// const chunkArray = (arr: any, size: number) => {
//     return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
//         arr.slice(i * size, i * size + size)
//     );
// };

const CoursesModal = ({ locale, courses }: CoursesModalProps) => {
    // const data = chunkArray(courses, chunkSize);
    const t = useTranslations('navigation');

    if (!courses) {
        return null;
    };

    const coursesList = courses.map((course: any) => (
        <Link href={`/${locale}/educational-center/${course.slug}`} key={course._id} className={styles.link}>
            <p className={styles.course}>{course.course_name}</p>
        </Link>
    ));

    return (
        <div className={styles.courses_container}>
            <p className={styles.title}>{t('courses')}</p>
            <div className={styles.list}>
                {coursesList}
            </div>
        </div>
    );
};

export default memo(CoursesModal);
