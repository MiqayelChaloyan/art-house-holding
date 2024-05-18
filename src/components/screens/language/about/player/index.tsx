'use client'

import React from 'react';

import Image from 'next/image';

import Play from '@/lib/icons/educational-center/Play';

import { useDispatch, useSelector } from 'react-redux';
import { onPlay, setPath } from '@/store/player_reducer';

import { UrlType } from '@/types/educational-center';
import { ReduxType } from '@/types/language';

import styles from './styles.module.sass'


type Props = {
    light: UrlType,
    link: string,
    alt: string
};

const VideoPlayer = ({ light, link, alt }: Readonly<Props>) => {
    const isPlay = useSelector((state: ReduxType) => state.player.isPlay);
    const dispatch = useDispatch();

    const handlePlayVideo = (path: string) => {
        dispatch(onPlay(!isPlay));
        dispatch(setPath(path));
    };

    return (
        <div className={styles.playing}>
                <Image
                    src={light?.src}
                    alt={alt}
                    className={styles.video_play}
                    width={500}
                    height={500}
                    priority
                />
                <button
                    className={styles.icon}
                    onClick={() => handlePlayVideo(link)}
                >
                    <Play
                        width={75}
                        height={75}
                        fill='#fff'
                    />
                </button>
            </div>
    )
};

export default React.memo(VideoPlayer);