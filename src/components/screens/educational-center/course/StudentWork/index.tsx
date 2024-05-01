'use client'

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Button from '@/lib/ui/Button';
import { Arial, Inter } from '@/lib/constants/font';

import Container from '@/components/components/container';
import Fancybox from '@/components/components/fancybox';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import { EDUCATIONAL_CENTER_COURSES } from '../../../../../../sanity/sanity-queries/educational-center';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
    course: EDUCATIONAL_CENTER_COURSES[]
};

const options = {
    compact: false,
    hideScrollbar: false,
    Toolbar: {
        display: {
            left: [
                "infobar",
            ],
            middle: [],
            right: [
                "close",
                "fullScreen"
            ],
        }
    },
    Images: {
        zoom: false,
    },
};

const StudentWork = ({ course }: Props) => {
    const [initialLoadCourses, setInitialLoadCourses] = useState<number>(8);
    const t = useTranslations();

    useEffect(() => setInitialLoadCourses(8), [course]);

    const scrollToElement = () => {
        const container: HTMLElement | null = document.getElementById('contact');
        if (container) {
            container.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    };

    const images = course[0].student_works.slice(0, initialLoadCourses).map((item: any) => {
        const path: { src: string, width: number, height: number } | any = urlForImage(item);

        return (
            <Link key={item._key} data-fancybox="gallery" href={path?.src}>
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
            </Link>
        );
    });

    const handleLoad = () => setInitialLoadCourses(initialLoadCourses + 4);
    const handleBackLoad = () => setInitialLoadCourses(initialLoadCourses - 4);

    return (
        <section id='student-work' className={styles.container}>
            <div className={styles.triangle} />
            <Container>
                <h1 className={`${styles.title} ${Inter.className}`}>{t('sections.student-work')}</h1>
                <div className={styles.student_work}>
                    <Fancybox options={options}>
                        {images}
                    </Fancybox>
                </div>
                <div className={styles.block_buttons}>
                    {course[0].student_works.length > 8 && course[0].student_works.length !== initialLoadCourses &&
                        <div className={styles.btn_group}>
                            <Button
                                className={cn(styles['view-more-btn'], Arial.className)}
                                text={course[0].student_works.length >= initialLoadCourses ? t('buttons.view-more') : t('buttons.show-less')}
                                onClick={course[0].student_works.length >= initialLoadCourses ? handleLoad : handleBackLoad}
                            />
                        </div>
                    }
                    {course[0].student_works.length === initialLoadCourses && course[0].student_works.length > 8 &&
                        <div className={styles.btn_group}>
                            <Button
                                className={cn(styles['view-more-btn'], Arial.className)}
                                text={t('buttons.show-less')}
                                onClick={handleBackLoad}
                            />
                        </div>
                    }
                    <div className={styles.btn_group}>
                        <Button
                            className={cn(styles.contact_button, Arial.className)}
                            text={t('buttons.contact-us')}
                            onClick={scrollToElement}
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default React.memo(StudentWork);