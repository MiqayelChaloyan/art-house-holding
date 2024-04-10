'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { PortableText } from "@portabletext/react";
import Container from '@/components/components/container';

import Player from '@/lib/ui/video-player';
import { Arial, Calibri } from '@/lib/constants/font';
import { Pages } from '@/lib/constants/pages';
import components from "@/lib/utils/PortableTextComponents";

import { urlForImage } from "../../../../../sanity/imageUrlBuilder";
import { ABOUT_US_LANGUAGE } from "../../../../../sanity/sanity-queries/language";

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: ABOUT_US_LANGUAGE[]
    locale: string
}

interface Image {
    _type: string
    alt: string
    _key: string
    asset: { _ref: string, _type: string }
}

interface Video {
    video_url: string
    _type: string,
    _key: string,
    video_light: {
        _type: string,
        alt: string,
        asset: { _ref: string, _type: string }
    }
}


const About = ({ data, locale }: Props) => {
    const t = useTranslations();

    const gallery: any = data[0].about_us?.about_us_images?.map((item: Image, index: number) => {
        const path: { src: string, width: number, height: number } | any = urlForImage(item);

        return (
            <Image
                key={index}
                src={path?.src}
                alt={item.alt}
                priority
                className={styles.image}
                width={0}
                height={0}
                sizes="100vw"
                loading="eager"
                quality={50}
            />
        );
    });

    const videos = data[0]?.about_us?.about_our_daily?.map((video: Video) => {
        const light = urlForImage(video.video_light);

        return (
            <div className={styles.video_player} key={video._key}>
                <Player light={light} path={video.video_url} />
            </div>
        )
    });


    return (
        <div className={styles.container}>
            <Container>
                <div className={styles.about}>
                    <div className={styles.column}>
                        <h1 className={`${styles.title} ${Arial.className} ${Arial.className}`}>
                            {t('sections.about')}
                        </h1>
                        <div className={`${styles.text} ${Calibri.className}`}>
                            <PortableText
                                value={data[0]?.about_us?.content}
                                components={components}
                            />
                        </div>
                        <div className={styles.buttons}>
                            <Link
                                href={`/${locale}${Pages.LANGUAGE_HOME}${Pages.LANGUAGE_TAKE_TEST}`}
                                prefetch={true}
                                className={cn(
                                    styles.button,
                                    Arial.className,
                                    styles.send_btn
                                )}
                            >
                                {t('texts.take-the-test')}
                            </Link>
                        </div>
                    </div>
                    <div className={styles.gallery}>
                        <div className={styles.gallery_one}>
                            {gallery[0]}
                        </div>
                        <div className={styles.gallery_two}>
                            {gallery[1]}
                        </div>
                        <div className={styles.gallery_three}>
                            {gallery[2]}
                        </div>
                    </div>
                    <div className={styles.videos}>
                        {videos}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default About;