'use client'

import React from 'react';

import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import Play from '@/lib/icons/educational-center/Play';
import { DAILY_LIFE_IMAGE, DAILY_LIFE_VIDEO, ReduxType, UrlType } from '@/types/language';
import { Arial, Vrdznagir } from '@/lib/constants/font';

import { useDispatch, useSelector } from 'react-redux';
import { onPlay, setPath } from '@/store/player_reducer';

import { client } from '../../../../../../sanity/client';
import { queryId } from '../../../../../../sanity/services/language-service/languages';

import { ABOUT_US_LANGUAGE } from '../../../../../../sanity/sanity-queries/language';
import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
    data: ABOUT_US_LANGUAGE[],
    locale: string
}

type Video = {
    item: DAILY_LIFE_VIDEO,
    locale: string
}

type Image = {
    item: DAILY_LIFE_IMAGE
}

const DailyLifeImage = ({ item }: Image) => {
    const path: UrlType | any = urlForImage(item);

    return (
        <div className={styles.image}>
            <Image
                src={path?.src}
                alt={item?.alt}
                className={styles.images}
                width={500}
                height={500}
                priority
            />
        </div>
    )
};


const DailyLifeVideo = ({ item, locale }: Readonly<Video>) => {
    const t = useTranslations('buttons');
    const router = useRouter();
    const dispatch = useDispatch();

    const isPlay = useSelector((state: ReduxType) => state.player.isPlay);
    const light: UrlType | any = urlForImage(item.video_light);

    const getResources = async () => {
        const _id = item.languages._ref;

        try {
            const data = await client.fetch(queryId, { _id, language: locale }, { cache: 'no-store' });
            router.push(`language/languages/${data.slug.current}`);
        } catch (error) {
            notFound();
        }
    };

    const handlePlayVideo = (path: string) => {
        dispatch(onPlay(!isPlay));
        dispatch(setPath(path));
    }

    return (
        <div className={styles.video}>
            <div className={styles.playing}>
                <Image
                    src={light?.src}
                    alt={item?.video_light.alt}
                    className={styles.video_play}
                    width={500}
                    height={500}
                    priority
                />
                <button
                    className={styles.icon}
                    onClick={() => handlePlayVideo(item.video_url)}
                >
                    <Play
                        width={75}
                        height={75}
                        fill='#fff'
                    />
                </button>
            </div>
            <div className={styles.navigate}>
                <span className={cn(styles.text, Arial.className)}>
                    {item.news}
                </span>
                <div className={styles.btn}>
                    <button
                        className={cn(styles.view, Arial.className)}
                        onClick={getResources}
                    >
                        {t('view')}
                    </button>
                </div>
            </div>
        </div>
    )
};


const OurDailyLife = ({ data, locale }: Readonly<Props>) => {
    const t = useTranslations('sections');

    const images: JSX.Element[] = data[0].our_daily_life.our_daily_life_images.map((item: DAILY_LIFE_IMAGE | any) =>
        <DailyLifeImage key={item.slug.current} item={item} />
    );

    const videos: JSX.Element[] = data[0].our_daily_life.about_our_daily.map((item: DAILY_LIFE_VIDEO | any) =>
        <DailyLifeVideo key={item._key} item={item} locale={locale} />
    );

    const mixData = images.reduce((acc: any, image: any, index: number) => {
        acc.push(videos[index], image);
        return acc;
    }, []);

    const column1 = mixData.slice(0, Math.ceil(mixData.length / 2));
    const column2 = mixData.slice(Math.ceil(mixData.length / 2));

    return (
        <section id='our-daily' className={styles.section}>
            <Container>
                <div className={styles.ourDaily}>
                    <h2 className={cn(styles.title, Vrdznagir.className)}>
                        {t('our-daily')}
                    </h2>
                    <div className={styles.column}>
                        {column1}
                    </div>
                    <div className={styles.column}>
                        {column2}
                    </div>
                </div>
            </Container>
        </section>
    )
};

export default React.memo(OurDailyLife);