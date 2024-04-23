'use client'

import React, { useState, useEffect, ReactNode, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { onPlay, setPath } from '@/store/player_reducer';

import ReactPlayer from 'react-player';

import { IoClose } from 'react-icons/io5';

import cn from 'classnames';

import styles from './styles.module.sass';


const PlayerModal = () => {
    const [video, setVideo] = useState<ReactNode | any>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    const componentRef = useRef<HTMLDivElement>(null);

    const isPlay: boolean = useSelector((state: any) => state.player.isPlay);
    const path: string | null | any = useSelector((state: any) => state.player.path);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isPlay) {
            const timerId = setTimeout(() => setShowModal(true), 1);
            return () => clearTimeout(timerId);
        } else {
            setShowModal(false);
        }
    }, [isPlay]);

    useEffect(() => {
        setVideo(
            <ReactPlayer
                className='react-player'
                url={path}
                controls
                width='100%'
                height='100%'
                playing={isPlay}
            />
        )
    }, [path, isPlay]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
                setShowModal(false);
                dispatch(onPlay(false));
                dispatch(setPath(null));
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={cn(styles.box, `${isPlay && showModal ? styles.boxOpen : ''}`)}>
            <div className={styles.wrap}>
                <div
                    className={cn(styles.overlay, { [styles.overlayShow]: showModal })}
                    onClick={() => {
                        setShowModal(false);
                        setTimeout(() => dispatch(onPlay(false)));
                    }}
                ></div>
                <div className={cn(styles.content, { [styles.contentShow]: showModal })}>
                    <button className={styles.close}
                        title='Close'
                        onClick={() => {
                            setShowModal(false);
                            setTimeout(() => {
                                dispatch(onPlay(false));
                                dispatch(setPath(null));
                            });
                        }}>
                        <IoClose
                            size={100}
                            fill='white'
                        />
                    </button>
                    <div ref={componentRef} className={styles.video}>
                        {video}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerModal;



