'use client'

import React, { useState } from 'react';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import Button from '@/lib/ui/Button';
import { Arial, Inter } from '@/lib/constants/font';

import { Content as ContentType, UrlType } from '@/types/educational-center';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import { ABOUT } from '../../../../../../sanity/sanity-queries/educational-center';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
    data: ABOUT
}

const Content = ({ content, isReadMore, minimumHeight }: ContentType) => (
    <p className={cn(styles.content, Inter.className)}>{isReadMore ? content.slice(0, minimumHeight) + '...' : content}</p>
);

const About = ({
    data: { about_us_content, about_us_image }
}: Readonly<Props>) => {
    const [isReadMore, setIsReadMore] = useState<boolean>(true);
    const path: UrlType | any = urlForImage(about_us_image);
    const minimumHeight = 1000;
    const t = useTranslations();

    const toggleReadMore = () => setIsReadMore(!isReadMore);

    return (
        <section id='about-us' className={styles.container}>
            <div className={styles.triangle} />
            <Container className='container'>
                <h1 className={cn(styles.title, Inter.className)}>
                    {t('sections.about')}
                </h1>
                <div className={styles.about}>
                    <div className={styles.box}>
                        {about_us_content.length > minimumHeight ?
                            <>
                                <Content content={about_us_content} isReadMore={isReadMore} minimumHeight={minimumHeight} />
                                <Button
                                    text={isReadMore ? t('buttons.view-more') : t('buttons.show-less')}
                                    className={cn(styles.button, styles['view-more-btn'], Arial.className)}
                                    onClick={toggleReadMore}
                                />
                            </>
                            :
                            <p className={cn(styles.content, Inter.className)}>{about_us_content}</p>
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