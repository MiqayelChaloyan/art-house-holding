'use client'

import { memo } from 'react';

import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import Player from '@/lib/ui/video-player';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import { EDUCATIONAL_CENTER_DEFAULT } from '../../../../../../sanity/sanity-queries/educational-center';

import styles from './styles.module.sass';


interface Props {
    course: EDUCATIONAL_CENTER_DEFAULT[] | any
};


const CourseProcess = ({ course }: Props) => {
    const t = useTranslations('sections');

    const path: { src: string, width: number, height: number } | any = urlForImage(course[0].course_process.video_light);

    return (
        <section id='video-player' className={styles.container}>
            <Container>
                <h1 className={styles.title}>{t('courses-process')}</h1>
                <div className={styles.video_player}>
                    <Player light={path?.src} path={course[0].course_process.video_url} />
                </div>
            </Container>
        </section>
    );
};

export default memo(CourseProcess);

