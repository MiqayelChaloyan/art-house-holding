'use client'

import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import { Arial, Inter } from '@/constants/font';
import { Pages } from '@/constants/pages';

import { PortableText } from '@portabletext/react';
import components from '@/utils/PortableTextComponents';
import { flattenText, getTotalTextLength, truncateText } from '@/utils/ArrayMaxItems';

import { Content as ContentType } from '@/types/educational-center';
import { ImagePath } from '@/types/general';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: ABOUT;
};

const Content = ({ content, minimumHeight }: ContentType) => {
    const flatText = flattenText(content);
    const text = flatText.length > minimumHeight
        ? truncateText(content, minimumHeight)
        : content;

    return (
        <div className={cn(styles.content, Inter.className)}>
            <PortableText
                value={text}
                components={components}
            />
        </div>
    );
};

const About = ({
    data: { about_us_content, about_us_image }
}: Readonly<Props>) => {
    const activeLocale = useLocale();
    const path: ImagePath = urlForImage(about_us_image);
    const minimumHeight = 900;
    const t = useTranslations();


    return (
        <section id='about-us' className={styles.section}>
            <div className={styles.triangle} />
            <Container className='container'>
                <h1 className={cn(styles.title, Inter.className)}>
                    {t('sections.about')}
                </h1>
                <div className={styles.about}>
                    <div className={styles.box}>
                        {getTotalTextLength(about_us_content) > minimumHeight ?
                            <>
                                <Content content={about_us_content} minimumHeight={minimumHeight} />
                                <button className={cn(styles.button, styles['view-more-btn'], Arial.className)}>
                                    <Link
                                        href={`/${activeLocale}${Pages.EDUCATIONAL_ABOUT}`}
                                        aria-label={Pages.EDUCATIONAL_ABOUT}
                                        scroll={false}
                                    >
                                        {t('buttons.view-more')}
                                    </Link>
                                </button>
                            </>
                            :
                            <div className={cn(styles.content, Inter.className)}>
                                <PortableText
                                    value={about_us_content}
                                    components={components}
                                />
                            </div>
                        }
                    </div>
                    <div className={styles.box}>
                        <Image
                            src={path?.src}
                            alt={about_us_image?.alt}
                            className={styles.image_courses}
                            width={500}
                            height={500}
                            priority
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default React.memo(About);