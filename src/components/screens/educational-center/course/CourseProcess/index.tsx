"use client"

import { FC, memo } from 'react';

import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import Player from '@/lib/ui/video-player';

import { urlFor } from '../../../../../../sanity/imageUrlBuilder';
import { EDUCATIONAL_CENTER_DEFAULT } from '../../../../../../sanity/sanity-queries/educational-center';

import styles from './styles.module.sass';


type Props = {
    course: EDUCATIONAL_CENTER_DEFAULT[] | any
};


const CourseProcess: FC<Props> = ({ course }) => {
    const t = useTranslations('sections');

    const urlForImage = urlFor(course[0].course_process[0].video_light)
        .auto('format')
        .fit('max')
        .url();

    return (
        <section id='video-player' className={styles.container}>
            <Container>
                <h1 className={styles.title}>{t('courses-process')}</h1>
                <div className={styles.video_player}>
                    <Player light={urlForImage} path={course[0].course_process[0].video_url} />
                </div>
            </Container>
        </section>
    );
};

export default memo(CourseProcess);

