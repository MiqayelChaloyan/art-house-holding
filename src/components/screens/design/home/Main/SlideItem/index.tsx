'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import Button from '@/lib/ui/Button';
import { Arial, Belleza, Inter } from '@/lib/constants/font';

import { SlideItem as Props } from '@/types/design';

import cn from 'classnames';

import styles from './styles.module.sass';


const SlideItem = ({
    url,
    company_name,
    title,
    scrollToElement
}: Readonly<Props>) => {
    const t = useTranslations('buttons');

    return (
        <div className={styles.emplay_slide} style={{ backgroundImage: `url(${url})` }}>
            <div className={styles.container}>
                <div className={styles.contact}>
                    <h2 className={cn(styles.company_name, Belleza.className)}>{company_name}</h2>
                    <h1 className={cn(styles.title, Arial.className)}>{title}</h1>
                    <Button
                        className={cn(styles.contact_us_button, Inter.className)}
                        text={t('register')}
                        onClick={scrollToElement}
                    />
                </div>
            </div>
        </div>
    );
};

export default React.memo(SlideItem);