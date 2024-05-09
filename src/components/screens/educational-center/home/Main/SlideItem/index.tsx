'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import Button from '@/lib/ui/Button';
import { Inter } from '@/lib/constants/font';

import { SlideItem as Props } from '@/types/educational-center';

import cn from 'classnames';

import styles from './styles.module.sass';


const SlideItem = ({
    url,
    subtitle,
    content,
    scrollToElement
}: Readonly<Props>) => {
    const description = content.length <= 312 ? content : content.slice(0, 313) + '...';
    const t = useTranslations('buttons');

    return (
        <div className={styles.emplay_slide} style={{ backgroundImage: `url(${url})` }}>
            <div className={styles.container}>
                <div className={styles.contact}>
                    <h1 className={cn(styles.title, Inter.className)}>{subtitle}</h1>
                    <p className={Inter.className}>{description}</p>
                    <Button
                        className={cn(styles.contact_us_button, Inter.className)}
                        text={t('contact-us')}
                        onClick={scrollToElement}
                    />
                </div>
            </div>
        </div>
    );
};

export default React.memo(SlideItem);