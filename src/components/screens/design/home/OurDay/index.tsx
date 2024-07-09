'use client'

import React from 'react';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { useDispatch, useSelector } from 'react-redux';
import { onPlay, setPath } from '@/store/player_reducer';

import Player from '@/components/components/player';
import Container from '@/components/components/container';

import { Arial } from '@/lib/constants/font';
import { Pages } from '@/lib/constants/pages';
import { Titles } from '@/lib/constants';
import { ImagePath } from '@/types/general';
import { ReduxType } from '@/types/language';

import { OUR_DAY } from '../../../../../../sanity/sanity-queries/design';
import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    our_day: OUR_DAY;
};

const OurDay = ({ our_day }: Readonly<Props>) => {
    const path: ImagePath = urlForImage(our_day?.video_light)
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
            <div className={styles.titles}>
                <div>
                    <div className={cn(styles['title-line'], styles['back-line'])} />
                    <h2 className={cn(styles['title-back'], Arial.className)}>
                        {Titles.ourDay}
                    </h2>
                </div>
                <div className={styles['bottom-title']}>
                    <h1 className={cn(styles.title, Arial.className)}>
                        {t('sections.our-day')}
                    </h1>
                    <div className={cn(styles['title-line'], styles['bottom-line'])} />
                </div>
            </div>
            <Container className='container'>
                <div className={styles.player}>
                    <Player
                        path={path}
                        video_url={our_day?.video_url}
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

export default React.memo(OurDay);