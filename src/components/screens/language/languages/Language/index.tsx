'use client'

import React from 'react';

import About from './About';
import Teachers from './Teachers';
import Gallery from './Gallery';

import Container from '@/components/components/container';
import Player from '@/components/components/player';

import { ReduxType, UrlType } from '@/types/language';

import { useDispatch, useSelector } from 'react-redux';
import { onPlay, setPath } from '@/store/player_reducer';

import { LANGUAGE } from '../../../../../../sanity/sanity-queries/language';
import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

import styles from './styles.module.sass';


type Props = {
    data: LANGUAGE
    locale: string
};

const Language = ({ 
    locale, 
    data 
}: Readonly<Props>) => {
    const { during_courses_images, course_process, teachers } = data;
    const path: UrlType | any = urlForImage(course_process.video_light);

    const isPlay = useSelector((state: ReduxType) => state.player.isPlay);
    const dispatch = useDispatch();

    const handlePlayVideo = (path: string) => {
        dispatch(onPlay(!isPlay));
        dispatch(setPath(path));
    };

    return (
        <Container>
            <section id='language' className={styles.container}>
                <About
                    image={data.image}
                    text={data.text}
                />
                <Gallery during_courses={during_courses_images} />
                <div className={styles.row_three}>
                    <div className={styles.video_player}>
                        <Player
                            path={path}
                            video_url={course_process.video_url}
                            handlePlayVideo={handlePlayVideo}
                        />
                    </div>
                </div>
                <Teachers teachers={teachers} />
            </section>
        </Container>
    );
};

export default React.memo(Language);