'use client'

import React, { useState } from 'react';

import { useTranslations } from 'next-intl';

import { PortableText } from '@portabletext/react';
import components from '@/src/helpers/PortableTextComponents';

import Button from '@/src/lib/ui/Button';
import { flattenText, getTotalTextLength, truncateText } from '@/src/helpers/ArrayMaxItems';
import { ArianAMU } from '@/src/constants/font';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import { Content as ContentType } from '@/src/types/art-house';
import { ImagePath } from '@/src/types/general';

import cn from 'classnames';

import styles from './styles.module.sass';
import Image from 'next/image';


interface Props {
    content: TEXT;
    image: Asset;
};

const Content = ({ content, isReadMore, minimumHeight }: ContentType) => {
    const flatText = flattenText(content);
    const text = isReadMore && flatText.length > minimumHeight
        ? truncateText(content, minimumHeight)
        : content;

    return (
        <div className={cn(styles.content, ArianAMU.className)}>
            <PortableText
                value={text}
                components={components}
            />
        </div>
    );
};


const About = ({ content, image }: Readonly<Props>) => {
    const [isReadMore, setIsReadMore] = useState<boolean>(true);
    const path: ImagePath = urlForImage(image);
    const t = useTranslations('');
    const minimumHeight = 700;

    const toggleReadMore = () => setIsReadMore(!isReadMore);

    return (
        <section id='about-us' className={styles.section}>
            <div className={styles.box}>
                <div className={styles.contentLeft}>
                    <div className={styles.row}>
                        <Image
                            src={path?.src}
                            alt={image?.alt}
                            className={styles.image}
                            width={500}
                            height={500}
                            priority
                        />
                    </div>
                </div>
                <div className={styles.contentRight}>
                    <div className={styles.right}>
                        <h2 className={ArianAMU.className}>
                            {t('navigation.about')}
                        </h2>
                        <div className={styles.about}>
                            {getTotalTextLength(content) > minimumHeight ?
                                <>
                                    <Content
                                        content={content}
                                        isReadMore={isReadMore}
                                        minimumHeight={minimumHeight}
                                    />
                                    <Button
                                        text={isReadMore ? t('buttons.read-more') + '...' : t('buttons.show-less')}
                                        className={cn(styles.button, styles['view-more-btn'], ArianAMU.className)}
                                        onClick={toggleReadMore}
                                    />
                                </>
                                :
                                <div className={cn(styles.content, ArianAMU.className)}>
                                    <PortableText
                                        value={content}
                                        components={components}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default About;