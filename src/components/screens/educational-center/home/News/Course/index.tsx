"use client"

import { FC, memo, useState } from 'react';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import Content from '@/lib/ui/readMore';
import Button from '@/lib/ui/Button';

import { getCourseById } from '../../../../../../../sanity/services/educational-center-service/courses';

import styles from './styles.module.sass';


type Props = {
    altTwo: string
    altOne: string
    urlForImageOne: string
    urlForImageTwo: string
    scrollToElement: any
    content: any
    subtitle: string
    categories: any
};


const Course: FC<Props> = (course) => {
    const t = useTranslations('buttons');
    const [isReadMore, setIsReadMore] = useState<boolean>(true);
    const localActive = useLocale();

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    const goCoursePage = async () => {
        // const data = await getCourseById(course.categories._ref, localActive);
        // return router.push(`/${localActive}/courses/${data.slug}`);
    };

    return (
        <div className={styles.course}>
            <div className={styles.content}>
                <h3 className={styles.subtitle}>{course.subtitle}</h3>
                <Content content={course.content} isReadMore={isReadMore} />
                <div className={styles.buttons_group}>
                    <Button
                        className={styles.view_btn}
                        text={isReadMore ? t('view-more') : t('show-less')}
                        onClick={toggleReadMore}
                    />
                    <Button
                        className={styles.button}
                        text={t('contact-us')}
                        onClick={course.scrollToElement}
                    />
                    <button
                        // onClick={goCoursePage} 
                        className={styles.courses_link_btn_arrow}
                    >
                        <div className={styles.arrow}>
                            <div className={styles.arrow_top}></div>
                            <div className={styles.arrow_bottom}></div>
                        </div>
                    </button>
                </div>
            </div>
            <div className={styles.images}>
                <Image
                    src={course.urlForImageOne}
                    alt={course.altOne}
                    priority
                    className={styles.image}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                />
                <Image
                    src={course.urlForImageTwo}
                    alt={course.altTwo}
                    priority
                    className={styles.image}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div 
            // onClick={goCoursePage} 
            className={styles.courses_link_btn_arrow_mobile}>
                <div className={styles.arrow_long_right}></div>
            </div>
        </div>
    );
};

export default memo(Course);