'use client'

import React, { useState } from 'react';

import { useTranslations } from 'next-intl';

import { PortableText } from '@portabletext/react';

import { flattenText, getTotalTextLength, truncateText } from '@/lib/utils/ArrayMaxItems';
import components from '@/lib/utils/PortableTextComponents';
import { ArianAMU } from '@/lib/constants/font';
import Button from '@/lib/ui/Button';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

import { Content as ContentType } from '@/types/art-house';
import { ImagePath } from '@/types/general';

import cn from 'classnames';

import styles from './styles.module.sass';


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

const About = ({ content, image }: any) => {
    const [isReadMore, setIsReadMore] = useState<boolean>(true);
    const path: ImagePath = urlForImage(image);
    const t = useTranslations('');
    const minimumHeight = 700;

    const toggleReadMore = () => setIsReadMore(!isReadMore);

    return (
        <section className={styles.section} id='about'>
            <div className={styles.box}>
                <div className={styles.contentLeft}>
                    <div className={styles.row}>
                        <img className={styles.image} src={path?.src} alt='' />
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