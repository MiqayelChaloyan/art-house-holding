'use client'

import React from 'react';

import Container from '@/src/components/components/container';
import Player from '@/src/components/components/player';

import { useDispatch, useSelector } from 'react-redux';
import { onPlay, setPath } from '@/src/store/player_reducer';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import { Inter } from '@/src/constants/font';

import { ImagePath } from '@/src/types/general';
import { ReduxType } from '@/src/types/language';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: VIDEO;
};

const CookingCourses = ({ data }: Readonly<Props>) => {
    const path: ImagePath = urlForImage(data?.video_light);
    const isPlay = useSelector((state: ReduxType) => state.player.isPlay);

    const dispatch = useDispatch();

    const handlePlayVideo = (path: string) => {
        dispatch(onPlay(!isPlay));
        dispatch(setPath(path));
    };

    return (
        <section id='video-player' className={styles.section}>
            <div className={styles.shapes}>
                <div className={cn(styles.shape, styles['shape-1'])} />
                <div className={cn(styles.shape, styles['shape-2'])} />
            </div>
            <Container className='container'>
                <h1 className={cn(styles.title, Inter.className)}>
                    {data?.video_section_title}
                </h1>
                <div className={styles.player}>
                    <Player
                        path={path}
                        video_url={data?.video_url}
                        handlePlayVideo={handlePlayVideo}
                    />
                </div>
            </Container>
        </section>
    );
};

export default React.memo(CookingCourses);

