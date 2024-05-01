'use client'

import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { PortableText } from '@portabletext/react';
import Container from '@/components/components/container';

import VideoPlayer from './player';

import { Arial, Calibri } from '@/lib/constants/font';
import { Pages } from '@/lib/constants/pages';
import components from '@/lib/utils/PortableTextComponents';

import { urlForImage } from "../../../../../sanity/imageUrlBuilder";
import { ABOUT_US_LANGUAGE } from '../../../../../sanity/sanity-queries/language';

import { ImageType, UrlType, Video } from '@/types/language';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
    data: ABOUT_US_LANGUAGE[],
    locale: string
}

const About = ({ data, locale }: Props) => {
    const t = useTranslations();

    const gallery: JSX.Element[] = data[0].about_us?.about_us_images?.map((item: ImageType, index: number) => {
        const path: UrlType | any = urlForImage(item);

        return (
            <Image
                key={index}
                src={path?.src}
                alt={item?.alt}
                className={styles.image}
                width={500}
                height={500}
                priority
            />
        );
    });

    const videos = data[0]?.about_us?.about_our_daily.map((video: Video) => {
        const path: UrlType | any = urlForImage(video.video_light);

        return (
            <VideoPlayer
                key={video._key}
                light={path}
                link={video.video_url}
            />
        )
    });

    return (
        <section id='about' className={styles.container}>
            <Container>
                <div className={styles.about}>
                    <div className={styles.column}>
                        <h1 className={cn(styles.title, Arial.className)}>
                            {t('sections.about')}
                        </h1>
                        <div className={cn(styles.text, Calibri.className)}>
                            <PortableText
                                value={data[0]?.about_us?.content}
                                components={components}
                            />
                        </div>
                        <div className={styles.buttons}>
                            <Link
                                href={`/${locale}${Pages.LANGUAGE_TAKE_TEST}`}
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
                    <div className={styles.expanding_gallery}>
                        <div className={styles.expanding}>{gallery}</div>
                    </div>
                    <div className={styles.videos}>
                        {videos}
                    </div>
                </div>
            </Container>
        </section>
    )
};

export default React.memo(About);