'use client'

import React from 'react';

import Play from '@/lib/icons/educational-center/Play';
import { UrlType } from '@/types/educational-center';

import styles from './styles.module.sass';


type Props = {
    path: UrlType,
    video_url: string,
    handlePlayVideo: (argument: string) => void
};

const Player = ({ path, video_url, handlePlayVideo }: Props) => (
    <div className={styles.playing} style={{ backgroundImage: `url(${path?.src})` }}>
        <button
            className={styles.icon}
            onClick={() => handlePlayVideo(video_url)}
        >
            <Play
                width={75}
                height={75}
                fill='#fff'
            />
        </button>
    </div>
);

export default React.memo(Player);