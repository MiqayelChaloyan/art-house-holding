'use client'

import React from 'react';

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
    data: EDUCATIONAL_CENTER_DEFAULT[]
};

const CookingCourses = ({ data }: Props) => {
    const path: UrlType | any = urlForImage(data[0].cooking_courses.video_light)
    const isPlay = useSelector((state: ReduxType) => state.player.isPlay);
    const dispatch = useDispatch();

    const handlePlayVideo = (path: string) => {
        dispatch(onPlay(!isPlay));
        dispatch(setPath(path));
    };

    return (
        <section id='video-player' className={styles.container}>
            <div className={styles.triangle} />
            <Container>
                <h1 className={styles.title}>{data[0].cooking_courses.video_section_title}</h1>
                <div className={styles.player}>
                    <Player
                        path={path}
                        video_url={data[0].cooking_courses.video_url}
                        handlePlayVideo={handlePlayVideo}
                    />
                </div>
            </Container>
        </section>
    );
};

export default React.memo(CookingCourses);

