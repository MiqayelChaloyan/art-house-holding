"use client"

import { FC, ReactNode, memo, useEffect, useState } from 'react';

import ReactPlayer from 'react-player';

import Image from 'next/image';

import Play from '@/lib/icons/educational-center/Play';

import styles from './styles.module.sass';


type Props = {
    light?: string | any
    path?: string
};


const Player: FC<Props> = ({ light, path }) => {
    const [filter, setFilter] = useState<boolean>(true);
    const [video, setVideo] = useState<ReactNode | any>(null);

    useEffect(() => {
        setVideo(
            <ReactPlayer
                className='react-player'
                url={path}
                controls
                width='100%'
                height='100%'
                muted
                loop={false}
                light={
                    <Image
                        src={light}
                        alt='background-image'
                        priority
                        className={styles.image}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ filter: filter ? 'brightness(0.5)' : 'brightness(1)' }}
                    />
                }
                loading="lazy"
                playing={true}
                config={{ youtube: { playerVars: { origin: 'https://www.youtube.com' } } }}
                playIcon={
                    <div className={styles.icon}>
                        <Play
                            width='90'
                            height='90'
                            fill='white'
                        />
                    </div>
                }
                onPlay={() => setFilter(false)}
            />
        );
    }, [filter]);


    return (
        <div className={styles.player}>
            {video}
        </div>
    )
};

export default memo(Player);

