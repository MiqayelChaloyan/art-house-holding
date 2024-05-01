'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';
import Player from '@/components/components/player';

import { useDispatch, useSelector } from 'react-redux';
import { onPlay, setPath } from '@/store/player_reducer';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import { EDUCATIONAL_CENTER_DEFAULT } from '../../../../../../sanity/sanity-queries/educational-center';

import { UrlType } from '@/types/educational-center';
import { ReduxType } from '@/types/language';

import styles from './styles.module.sass';


type Props = {
    course: EDUCATIONAL_CENTER_DEFAULT[] | any
};

const CourseProcess = ({ course }: Props) => {
    const t = useTranslations('sections');

    const path: UrlType | any = urlForImage(course[0].course_process.video_light);
    const isPlay = useSelector((state: ReduxType) => state.player.isPlay);
    const dispatch = useDispatch();

    const handlePlayVideo = (path: string) => {
        dispatch(onPlay(!isPlay));
        dispatch(setPath(path));
    };

    return (
        <section id='video-player' className={styles.container}>
            <Container>
                <h1 className={styles.title}>{t('courses-process')}</h1>
                <Player
                    path={path}
                    video_url={course[0].course_process.video_url}
                    handlePlayVideo={handlePlayVideo}
                />
            </Container>
        </section>
    );
};

export default React.memo(CourseProcess);

