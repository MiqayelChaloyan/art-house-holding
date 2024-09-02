'use client'

import React from 'react';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { useDispatch, useSelector } from 'react-redux';
import { onPlay, setPath } from '@/store/player_reducer';

import Player from '@/components/components/player';
import Container from '@/components/components/container';

import { Arial } from '@/constants/font';
import { Pages } from '@/constants/pages';
import { Image, ImagePath } from '@/types/general';
import { ReduxType } from '@/types/language';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface PROCESS {
    video_light: Image;
    video_url: string;
};

interface Props {
    course_process: PROCESS;
};

const VideoPlayer = ({ course_process }: Readonly<Props>) => {
    const path: ImagePath = urlForImage(course_process?.video_light)
    const isPlay = useSelector((state: ReduxType) => state.player.isPlay);
    const dispatch = useDispatch();
    const t = useTranslations();
    const localActive = useLocale();

    const handlePlayVideo = (path: string) => {
        dispatch(onPlay(!isPlay));
        dispatch(setPath(path));
    };

    return (
        <div className={styles.container}>
            <Container className='container'>
                <div className={styles.player}>
                    <Player
                        path={path}
                        video_url={course_process?.video_url}
                        handlePlayVideo={handlePlayVideo}
                    />
                </div>
            </Container>
            <div className={styles.button_group}>
                <Link
                    href={`/${localActive}${Pages.DESIGN_CONTACT}`}
                    aria-label={Pages.DESIGN_CONTACT}
                    className={cn(styles.link, Arial.className)}
                    prefetch={true}
                    passHref
                >
                    {t('buttons.register-now')}
                </Link>
            </div>
        </div>
    )
};

export default React.memo(VideoPlayer);