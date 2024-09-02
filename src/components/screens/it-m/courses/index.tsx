'use client'

import Image from 'next/image';
import Link from 'next/link';

import Container from '@/components/components/container';

import { urlForImage } from '../../../../../sanity/imageUrlBuilder';


import { ImagePath } from '@/types/general';
import { Pages } from '@/constants/pages';
import { MMArmenU } from '@/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: COURSES_QUERYResult;
    locale: string;
};

const Courses = ({ data, locale }: Readonly<Props>) => {
    const courses = data?.map(((course: COURSES_QUERYResult) => {
        const path: ImagePath = urlForImage(course?.course_image);

        return (
            <Link
                key={course.slug}
                href={`/${locale}${Pages.ITM_COURSES}/${course.slug}`}
                aria-label={course.slug}
                className={styles.course}
            >
                <Image
                    src={path?.src}
                    alt={course?.course_image?.alt}
                    className={styles.image}
                    width={500}
                    height={500}
                    priority
                />
                <h2 className={cn(styles['course-title'], MMArmenU.className)}>
                    {course.course_name}
                </h2>
            </Link>
        )
    }));


    return (
        <section id='courses' className={styles.section}>
            <Container className='container'>
                <div className={styles.block}>
                    {courses}
                </div>
            </Container>
        </section>
    )
};

export default Courses;