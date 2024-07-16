'use client'

import React from 'react';

import Container from '@/components/components/container';
import Player from '@/components/components/player';

import { useDispatch, useSelector } from 'react-redux';
import { onPlay, setPath } from '@/store/player_reducer';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import { VIDEO } from '../../../../../../sanity/sanity-queries/educational-center';

import { Inter } from '@/lib/constants/font';

import { ImagePath } from '@/types/general';
import { ReduxType } from '@/types/language';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: VIDEO;
};

const CookingCourses = ({ data }: Readonly<Props>) => {
    const path: ImagePath = urlForImage(data?.video_light)
    const isPlay = useSelector((state: ReduxType) => state.player.isPlay);

    const dispatch = useDispatch();

    const handlePlayVideo = (path: string) => {
        dispatch(onPlay(!isPlay));
        dispatch(setPath(path));
    };

    return (
        <section id='video-player' className={styles.section}>
            <div className={styles.triangle} />
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

