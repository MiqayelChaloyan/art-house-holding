'use client'

import React from 'react';

import Image from 'next/image';

import { useDispatch, useSelector } from 'react-redux';
import { onPlay, setPath } from '@/store/player_reducer';

import { MdPlayCircle } from 'react-icons/md';

import { UrlType } from '@/types/educational-center';
import { ReduxType } from '@/types/language';

import styles from './styles.module.sass'


interface Props {
    light: UrlType;
    link: string;
    alt: string;
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
                    <MdPlayCircle
                        size={75}
                        color='#fff'
                    />
                </button>
            </div>
    )
};

export default React.memo(VideoPlayer);