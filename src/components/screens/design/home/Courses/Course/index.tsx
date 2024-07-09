'use client'

import React from 'react';

import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';


import Container from '@/components/components/container';
import AnimationCarousel from '../AnimationCarousel';

import { Arial } from '@/lib/constants/font';
import { ImagePaths } from '@/lib/constants';

import { client } from '../../../../../../../sanity/client';
import { queryId } from '../../../../../../../sanity/services/design-service/courses';
import { HOME_COURSES } from '../../../../../../../sanity/sanity-queries/design';

import cn from 'classnames';

import styles from './styles.module.sass';


interface CourseProps {
    course: HOME_COURSES;
    position: 'left' | 'right';
};

const Course = ({ course, position }: Readonly<CourseProps>) => {
    const t = useTranslations('buttons');
    const localActive = useLocale();
    const router = useRouter();

    const { name, course_name, about_course, categories, gallery_of_course } = course;
    let modifiedName = name.replace(" ", "\n");

    let nameStyles = name.length >= 30 ? styles['title-large'] : styles.title;
    let courseNameStyles = course_name.length >= 30 ? styles['design-title-large'] : styles['design-title'];
    let aboutCourse = about_course.slice(0, 65) + '..'

    const boxClass = position === 'left' ? 'box-left' : 'box-right';
    const cornerClass = position === 'left' ? 'corner-left' : 'corner-right';
    const cornerLargeClass = position === 'left' ? 'corner-large-left' : 'corner-large-right';
    const viewClass = position === 'left' ? 'view-left' : 'view-right';
    const slideClass = position === 'left' ? 'slide-left' : 'slide-right';
    const titleClass = position === 'left' ? 'title-left' : 'title-right';
    const titleDesignClass = position === 'left' ? 'design-title-left' : 'design-title-right';

    const getResources = async () => {
        const _id = categories._ref;

        try {
            const data = await client.fetch(queryId, { _id, language: localActive }, { cache: 'no-store' });
            router.push(`design/${data.slug}`);
        } catch (error) {
            notFound();
        }
    };

    return (
        <div className={styles.section}>
            <div className={styles[viewClass]}>
                <div className={styles[cornerClass]}>
                    <button
                        onClick={getResources}
                        className={cn(styles['view-text'], Arial.className)}
                    >
                        {t('read-more')}
                    </button>
                </div>
            </div>
            <div className={styles.card}>
                <Container className='container'>
                    <div className={cn(styles.box, styles[boxClass])}>
                        <div className={styles.right}>
                            <h2 className={cn(nameStyles, styles[titleClass], Arial.className)}>
                                {modifiedName}
                            </h2>
                            <p className={cn(courseNameStyles, styles[titleDesignClass], Arial.className)}>
                                {course_name}
                            </p>
                            <div className={styles[cornerLargeClass]} />
                            <p className={cn(styles['design-title-mobile'], styles[titleDesignClass], Arial.className)}>
                                {course_name}
                            </p>
                            <p className={cn(styles.content, Arial.className)}>
                                {aboutCourse}
                            </p>
                            <button
                                onClick={getResources}
                                className={cn(styles['view-btn'], Arial.className)}
                            >
                                {t('read-more')}
                            </button>
                        </div>
                        <div className={cn(styles[slideClass])}>
                            <Image
                                src={ImagePaths.DESIGN.staplerURL.default.src}
                                alt='stapler'
                                className={styles.stapler}
                                width={500}
                                height={500}
                                priority
                            />
                            <AnimationCarousel gallery={gallery_of_course} />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
};

export default React.memo(Course);
