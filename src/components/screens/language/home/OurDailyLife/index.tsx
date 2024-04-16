'use client'

import Container from "@/components/components/container"

import { Arial, Vrdznagir } from "@/lib/constants/font";
import { ABOUT_US_LANGUAGE } from "../../../../../../sanity/sanity-queries/language";
import Image from "next/image";
import { urlForImage } from "../../../../../../sanity/imageUrlBuilder";

import Player from '@/lib/ui/video-player';
import { useTranslations } from "next-intl";
import { client } from "../../../../../../sanity/client";
import { query, queryId } from "../../../../../../sanity/services/language-service/languages";

import Play from '@/lib/icons/educational-center/Play';

import { useDispatch, useSelector } from "react-redux";
import * as Action from '@/store/question_reducer';
import { onPlay, setPath } from "@/store/player_reducer";
import { useRouter } from "next/navigation";

import styles from './styles.module.sass';

// import { useDispatch, useSelector } from "react-redux";
// import useWindowSize from "@/hooks/useWindowSize";
// import { useEffect, useRef } from "react";


type Props = {
    data: ABOUT_US_LANGUAGE[];
    locale: string
}

const DailyLifeImage = ({ item }: any) => {
    const path: { src: string, width: number, height: number } | any = urlForImage(item);

    return (
        <div className={styles.image}>
            <Image
                src={path?.src}
                alt={item.alt}
                priority
                className={styles.images}
                width={0}
                height={0}
                sizes="100vw"
                loading="eager"
                quality={50}
            />
        </div>
    )
};


const DailyLifeVideo = ({ item, locale }: any) => {
    const router = useRouter();
    const isPlay = useSelector((state: any) => state.player.isPlay);
    const t = useTranslations("buttons");
    const light: { src: string, width: number, height: number } | any = urlForImage(item.video_light);
    const dispatch = useDispatch();

    const getResources = async () => {
        const _id = item.languages._ref;

        try {
            const data = await client.fetch(queryId, { _id, language: locale }, { cache: 'no-store' });
            router.push(`language/languages/${data.slug.current}`);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePlayVideo = (path: string) => {
        dispatch(onPlay(!isPlay));
        dispatch(setPath(path));
    }

    return (
        <div className={styles.video}>
            <div className={styles.playing}>
                <img src={light.src} alt='ss' className={styles.video_play} />
                <button className={styles.icon} onClick={() => handlePlayVideo(item.video_url)}>
                    <Play
                        width={75}
                        height={75}
                        fill='white'
                    />
                </button>
            </div>
            <div className={styles.navigate}>
                <span className={`${styles.text} ${Arial.className}`}>{item.news}</span>
                <div className={styles.btn}>
                    <button className={`${styles.view} ${Arial.className}`} onClick={getResources}>{t("view")}</button>
                </div>
            </div>
        </div>
    )
};


const OurDailyLife = ({ data, locale }: Props) => {
    const t = useTranslations("sections");

    const images: JSX.Element[] = data[0].our_daily_life.our_daily_life_images.map((item: any, index: number) =>
        <DailyLifeImage key={item.slug.current} item={item} index={index} />
    );

    const videos: JSX.Element[] = data[0].our_daily_life.about_our_daily.map((item: any, index: number) =>
        <DailyLifeVideo key={item.slug} item={item} locale={locale} />
    );

    const mixData = images.reduce((acc: any, image: any, index: number) => {
        acc.push(videos[index], image);
        return acc;
    }, []);

    const column1 = mixData.slice(0, Math.ceil(mixData.length / 2));
    const column2 = mixData.slice(Math.ceil(mixData.length / 2));

    return (
        <section className={styles.section}>
            <Container>
                <div className={styles.ourDaily}>
                    <h2 className={`${styles.title} ${Vrdznagir.className}`}>{t("our-daily")}</h2>
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

export default OurDailyLife;