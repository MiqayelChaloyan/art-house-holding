'use client'

import { memo, useEffect, useState } from 'react';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Cancel from '@/lib/icons/educational-center/Cancel';
import Button from '@/lib/ui/Button';
// import Carousel from '@/lib/ui/';

import Container from '@/components/components/container';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import { EDUCATIONAL_CENTER_COURSES } from '../../../../../../sanity/sanity-queries/educational-center';

import styles from './style.module.sass';
import { Inter } from '@/lib/constants/font';


interface Props {
    course: EDUCATIONAL_CENTER_COURSES | any
};

const StudentWork = ({ course }: Props) => {
    const [initialLoadCourses, setInitialLoadCourses] = useState<number>(8);
    const [isFullscreen, setFullscreen] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>('');
    const t = useTranslations();

    useEffect(() => setInitialLoadCourses(8), [course]);

    const scrollToElement = () => {
        const container: HTMLElement | null = document.getElementById('contact');
        if (container) {
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const images = course[0].student_works.slice(0, initialLoadCourses).map((item: any) => {
        const path: { src: string, width: number, height: number } | any = urlForImage(item);

        return (
            <div
                key={item._key}
                className={`${styles.img_block} ${isFullscreen ? styles.fullscreenContainer : ''}`}
                onClick={() => {
                    setFullscreen(true);
                    setImageUrl(path?.src);
                }}
            >
                <Image
                    src={path?.src}
                    alt={item.alt}
                    priority
                    className={styles.work_img}
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{ objectFit: 'cover' }}
                />
            </div>
        );
    });

    const handleLoad = () => setInitialLoadCourses(initialLoadCourses + 4);
    const handleBackLoad = () => setInitialLoadCourses(initialLoadCourses - 4);

    return (
        <section id='student-work' className={styles.container}>
            <div className={styles.triangle} />
            <Container>
                <h1 className={`${styles.title} ${Inter.className}`}>{t('sections.student-work')}</h1>
                <div className={styles.works}>
                    <div className={styles.student_work}>
                        {images}
                    </div>
                    {
                        isFullscreen && (
                            <div className={styles.zoom}>
                                <div>
                                    <button className={styles.close}
                                        title='Close'
                                        onClick={() => setFullscreen(false)}>
                                        <Cancel
                                            width='104'
                                            height='104'
                                            fill='white'
                                        />
                                    </button>
                                </div>
                                <Image
                                    src={imageUrl}
                                    alt='zoom-image'
                                    priority
                                    className={styles.img}
                                    width={0}
                                    height={0}
                                    sizes='100vw'
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        )
                    }
                    {course[0]?.student_works.length < initialLoadCourses ? (
                        <div className={styles.block_buttons}>
                            <div className={styles.btn_group}>
                                <Button
                                    className={styles.contact_button}
                                    text={t('buttons.contact-us')}
                                    onClick={scrollToElement}
                                />
                            </div>

                        </div>
                    ) : (
                        <div className={styles.block_buttons}>
                            <div className={styles.btn_group}>
                                <Button
                                    className={styles.view_more_button}
                                    text={course[0].student_works.length > initialLoadCourses ? t('buttons.view-more') : t('buttons.show-less')}
                                    onClick={course[0].student_works.length > initialLoadCourses ? handleLoad : handleBackLoad}
                                />
                            </div>
                            <div className={styles.btn_group}>
                                <Button
                                    className={styles.contact_button}
                                    text={t('buttons.contact-us')}
                                    onClick={scrollToElement}
                                />
                            </div>

                        </div>
                    )}
                </div>
                <div className={styles.slider}>
                    {/* <Carousel images={images} /> */}
                </div>
            </Container>
        </section>
    );
};

export default memo(StudentWork);