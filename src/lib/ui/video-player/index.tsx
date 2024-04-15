'use client'

import { ReactNode, memo, useEffect, useState } from 'react';

import ReactPlayer from 'react-player';

// import { IoIosPlayCircle } from 'react-icons/io';

import Image from 'next/image';

import Play from '@/lib/icons/educational-center/Play';

import styles from './styles.module.sass';
import { useDispatch, useSelector } from 'react-redux';
import { onPlay } from '@/store/player_reducer';


type Props = {
    light?: string | any
    path?: string
    radius?: number | undefined
};


const Player = ({ light, path, radius }: Props) => {
    const [filter, setFilter] = useState<boolean>(true);
    const [video, setVideo] = useState<ReactNode | any>(null);

    const dispatch = useDispatch();
    // const isPlay = useSelector((state: any) => state.player.isPlay);


    const handlePlayVideo = () => {
        setFilter(false)
        // dispatch(onPlay(true))
    }

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
                        style={{ filter: filter ? 'brightness(0.5)' : 'brightness(1)', borderRadius: radius ? `${radius}px` : 0 }}
                    />
                }
                loading="lazy"
                playing={true}
                config={{ youtube: { playerVars: { origin: 'https://www.youtube.com' } } }}
                playIcon={
                    <div className={styles.icon}>
                        <Play
                            width={75}
                            height={75}
                            fill='white'
                        />
                        {/* <IoIosPlayCircle fill='white' size={iconSize}/> */}
                    </div>
                }
                onPlay={handlePlayVideo}
                // onPause={handlePlayVideo}
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

