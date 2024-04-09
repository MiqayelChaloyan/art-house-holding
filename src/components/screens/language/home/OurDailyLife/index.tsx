'use client'

import Container from "@/components/components/container"

import { Arial, Vrdznagir } from "@/lib/constants/font";
import { ABOUT_US_LANGUAGE } from "../../../../../../sanity/sanity-queries/language";
import Image from "next/image";
import { urlForImage } from "../../../../../../sanity/imageUrlBuilder";

import Player from '@/lib/ui/video-player';
import { useTranslations } from "next-intl";
import { client } from "../../../../../../sanity/client";
import { query } from "../../../../../../sanity/services/language-service/languages";

import styles from './styles.module.sass';
// import { useDispatch, useSelector } from "react-redux";
// import useWindowSize from "@/hooks/useWindowSize";
// import { useEffect, useRef } from "react";


type Props = {
    data: ABOUT_US_LANGUAGE[];
    locale: string
}

const DailyLifeImage = ({ item }: any) => {
    const path: {
        src: string;
        width: number;
        height: number;
    } | any = urlForImage(item);

    const result: string = path.src;

    return (
        <div className={styles.image}>
            <Image
                src={result}
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
    const t = useTranslations("buttons");
    const light: { src: string, width: number, height: number } | any = urlForImage(item.video_light);

    const getResources = async () => {
        const slug = "english" || item.languages._ref;
        const language = locale;

        try {
            const data = await client.fetch(query, { slug, language }, { cache: 'no-store' });
            console.log(data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        // return router.push(`/${locale}/languages`);
    };


    return (
        <div className={styles.video}>
            <div className={styles.video_player}>
                <Player light={light} path={item.video_url} radius={17} />
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
    // const dispatch = useDispatch();
    // const isPlay = useSelector((state: any) => state.player.isPlay);
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
















// {
//     news: 'A new group of English language courses started...',
//     languages: { _type: 'reference', _ref: '0dc29003-7c5a-437d-824c-6f4d60f5393d' },
//     video_url: 'https://www.youtube.com/watch?v=KLuTLF3x9sA',
//     video_light: {
//       _type: 'image',
//       alt: 'video light',
//       asset: {
//         _ref: 'image-04189acb379b928a88a1ccf4911b8e341299791c-313x271-png',
//         _type: 'reference'
//       }
//     }
//   }