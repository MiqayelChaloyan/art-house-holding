'use client'

import React from 'react';

import { usePathname } from 'next/navigation';

import { PiPlayCircleBold } from 'react-icons/pi';
import { MdPlayCircle } from 'react-icons/md';

import { UrlType } from '@/types/educational-center';

import colors from '@/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


const key = '/it-m';

interface Props {
    path: UrlType;
    video_url: string;
    handlePlayVideo: (argument: string) => void;
};

const Player = ({ path, video_url, handlePlayVideo }: Readonly<Props>) => {
    const pathname = usePathname();

    return (
        <div className={styles.playing} style={{ backgroundImage: `url(${path?.src})` }}>
            <button
                className={cn(pathname.includes(key) ? styles.icon : styles['default-icon'])}
                onClick={() => handlePlayVideo(video_url)}
            >
                {pathname.includes(key) ?
                    (<PiPlayCircleBold size={178} color={colors.white} />)
                    : (<MdPlayCircle size={75} color={colors.white} />)}
            </button>
        </div>
    );
};

export default React.memo(Player);