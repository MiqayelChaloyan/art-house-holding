'use client'

import React from 'react';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import Play from '@/lib/icons/educational-center/Play';

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
                <div className={styles.playing}>
                    <Image
                        src={path?.src}
                        alt='alt'
                        className={styles.video_play}
                        width={500}
                        height={500}
                        sizes="100vw"
                        priority
                    />
                    <div className={styles.overlay}>
                        <button
                            className={styles.icon}
                            onClick={() => handlePlayVideo(course[0].course_process.video_url)}
                        >
                            <Play
                                width={75}
                                height={75}
                                fill='#fff'
                            />
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default React.memo(CourseProcess);

