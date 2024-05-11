'use client'

import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import { Pages } from '@/lib/constants/pages';
import { Arial, Calibri } from '@/lib/constants/font';
import { ImageType, UrlType } from '@/types/language';
import blocksToText from '@/lib/utils/BlocksToText';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import { ABOUT_US_LANGUAGE } from '../../../../../../sanity/sanity-queries/language';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
    data: ABOUT_US_LANGUAGE[],
    locale: string
}

const navigationLinks = [
    { path: Pages.LANGUAGE_SEND_REQUEST, label: 'send-request', className: 'send-btn' },
    { path: `${Pages.LANGUAGE_HOME}${Pages.LANGUAGE_ABOUT}`, label: 'more', className: 'more-btn' },
];

const About = ({ data, locale }: Readonly<Props>) => {
    const t = useTranslations();
    const content: string = blocksToText(data[0].about_us.content).slice(0, 900);

    const gallery: JSX.Element[] = data[0].about_us.about_us_images?.map((image: ImageType, index: number) => {
        const path: UrlType | any = urlForImage(image);

        return (
            <Image
                key={index}
                src={path?.src}
                alt={image?.alt}
                className={styles.image}
                width={500}
                height={500}
                priority
            />
        );
    });

    return (
        <section id='about' className={styles.container}>
            <Container>
                <div className={styles.about}>
                    <div className={styles.column}>
                        <h1 className={cn(styles.title, Arial.className)}>
                            {t('sections.about')}
                        </h1>
                        <p className={cn(styles.text, Calibri.className)}>
                            {content}...
                        </p>
                        <div className={styles.buttons}>
                            {navigationLinks.map(({ path, label, className }) => (
                                <Link
                                    key={label}
                                    href={`/${locale}${path}`}
                                    aria-label={path}
                                    prefetch={true}
                                    className={cn(
                                        styles.button,
                                        Arial.className,
                                        styles[className]
                                    )}
                                >
                                    {t(`texts.${label}`)}
                                </Link>
                            ))}
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
                </div>
                <div className={styles.expanding_gallery}>
                    <div className={styles.expanding}>{gallery}</div>
                </div>
            </Container>
        </section>
    )
};

export default React.memo(About);