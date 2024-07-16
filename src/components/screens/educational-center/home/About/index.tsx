'use client'

import React, { useState } from 'react';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import Button from '@/lib/ui/Button';
import { Arial, Inter } from '@/lib/constants/font';

import { PortableText } from '@portabletext/react';
import components from '@/lib/utils/PortableTextComponents';
import { flattenText, getTotalTextLength, truncateText } from '@/lib/utils/ArrayMaxItems';

import { Content as ContentType } from '@/types/educational-center';
import { ImagePath } from '@/types/general';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import { ABOUT } from '../../../../../../sanity/sanity-queries/educational-center';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: ABOUT;
};

const Content = ({ content, isReadMore, minimumHeight }: ContentType) => {
    const flatText = flattenText(content);
    const text = isReadMore && flatText.length > minimumHeight
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
    const [isReadMore, setIsReadMore] = useState<boolean>(true);
    const path: ImagePath = urlForImage(about_us_image);
    const minimumHeight = 900;
    const t = useTranslations();

    const toggleReadMore = () => setIsReadMore(!isReadMore);

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
                                <Content
                                    content={about_us_content}
                                    isReadMore={isReadMore}
                                    minimumHeight={minimumHeight}
                                />
                                <Button
                                    text={isReadMore ? t('buttons.view-more') : t('buttons.show-less')}
                                    className={cn(styles.button, styles['view-more-btn'], Arial.className)}
                                    onClick={toggleReadMore}
                                />
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