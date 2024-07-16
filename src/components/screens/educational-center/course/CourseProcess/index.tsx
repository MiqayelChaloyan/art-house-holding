'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';
import Player from '@/components/components/player';

import { useDispatch, useSelector } from 'react-redux';
import { onPlay, setPath } from '@/store/player_reducer';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import { VIDEO } from '../../../../../../sanity/sanity-queries/educational-center';

import { ImagePath } from '@/types/general';
import { ReduxType } from '@/types/language';

import { Arial } from '@/lib/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    course: VIDEO;
};

const CourseProcess = ({ course }: Readonly<Props>) => {
    const t = useTranslations('sections');

    const path: ImagePath = urlForImage(course?.video_light);
    const isPlay = useSelector((state: ReduxType) => state.player.isPlay);
    const dispatch = useDispatch();

    const handlePlayVideo = (path: string) => {
        dispatch(onPlay(!isPlay));
        dispatch(setPath(path));
    };

    return (
        <section id='video-player' className={styles.section}>
            <Container className='container'>
                <h1 className={cn(styles.title, Arial.className)}>
                    {t('courses-process')}
                </h1>
                <Player
                    path={path}
                    video_url={course?.video_url}
                    handlePlayVideo={handlePlayVideo}
                />
            </Container>
        </section>
    );
};

export default React.memo(CourseProcess);

