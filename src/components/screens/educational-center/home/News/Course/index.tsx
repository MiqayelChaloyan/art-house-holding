'use client'

import { useState } from 'react';

import { useLocale, useTranslations } from 'next-intl';
import { notFound, useRouter } from 'next/navigation';

import Button from '@/lib/ui/Button';
import { Arial, Inter } from '@/lib/constants/font';

import { Content as Props, UrlType } from '@/types/educational-center';

import { client } from '../../../../../../../sanity/client';
import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';
import { queryId } from '../../../../../../../sanity/services/educational-center-service/courses';

import cn from 'classnames';

import styles from './styles.module.sass';


const Content = ({ content, isReadMore, minimumHeight }: Props) => (
    <p className={cn(styles.content, Inter.className)}>{isReadMore ? content.slice(0, minimumHeight) + '...' : content}</p>
);

const Course = ({ course }: any) => {
    const [isReadMore, setIsReadMore] = useState<boolean>(true);
    const router = useRouter();
    const t = useTranslations();
    const localActive = useLocale();
    const minimumHeight = 200;

    const scrollToElement = () => {
        const container: HTMLElement | null = document.getElementById('contact');
        if (container) {
            container.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    };

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    const getResources = async () => {
        const _id = course.categories._ref;

        try {
            const data = await client.fetch(queryId, { _id, language: localActive }, { cache: 'no-store' });
            router.push(`educational-center/${data.slug}`);
        } catch (error) {
            notFound()
        }
    };

    return (
        <div className={styles.left}>
            <h2 className={cn(styles.subtitle, Inter.className)}>{course.subtitle}</h2>
            <Content content={course.content} isReadMore={isReadMore} minimumHeight={minimumHeight} />
            <div className={styles.group}>
                <div className={styles['btn-group']}>
                    <Button
                        text={isReadMore ? t('buttons.view-more') : t('buttons.show-less')}
                        className={cn(styles.button, styles['view-more-btn'], Arial.className)}
                        onClick={toggleReadMore}
                    />
                    <Button
                        text={t('buttons.contact-us')}
                        className={cn(styles.button, styles['contact-us-btn'], Arial.className)}
                        onClick={scrollToElement}
                    />
                </div>
                <Button
                    text={t('texts.more')}
                    className={cn(styles['more-btn-mobile'], Arial.className)}
                    onClick={getResources}
                />

                <li className={styles.arrow}>
                    <a className={styles['animated-arrow']} onClick={getResources}>
                        <span className={cn(styles['the-arrow'], styles['-left'])}>
                            <span className={styles.shaft}></span>
                        </span>
                        <span className={styles.main}>
                            <span className={cn(styles.text, Arial.className)}>
                                {t('texts.more')}
                            </span>
                            <span className={cn(styles['the-arrow'], styles['-right'])}>
                                <span className={styles.shaft}></span>
                            </span>
                        </span>
                    </a>
                </li>

            </div>
        </div>
    )
};

const Gallery = ({ course }: any) => {
    const leftPath: UrlType | any = urlForImage(course.news_image_one);
    const rightPath: UrlType | any = urlForImage(course.news_image_two);

    return (
        <div className={styles.right}>
            <img src={leftPath.src} alt={course.news_image_one.alt} className={styles.image} />
            <img src={rightPath.src} alt={course.news_image_two.alt} className={styles.image} />
        </div>
    )
};


const CourseMobileCard = ({ course }: any) => {
    const leftPath: UrlType | any = urlForImage(course.news_image_one);
    const rightPath: UrlType | any = urlForImage(course.news_image_two);

    return (
        <div className={styles.card}>
            <div className={styles.right}>
                <img src={leftPath.src} alt={course.news_image_one.alt} className={styles.image} />
                <img src={rightPath.src} alt={course.news_image_two.alt} className={styles.image} />
            </div>
            <Course course={course} />
        </div>
    )
}

export {
    Course,
    Gallery,
    CourseMobileCard
};