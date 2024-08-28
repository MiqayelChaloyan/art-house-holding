'use client'

import React from 'react';

import { Link as ScrollLink } from 'react-scroll';

import { useTranslations } from 'next-intl';

import { Inter, Arial } from '@/constants/font';

import { SlideItem as Props } from '@/types/educational-center';

import cn from 'classnames';

import styles from './styles.module.sass';


const SlideItem = ({
    url,
    subtitle,
    content
}: Readonly<Props>) => {
    const description = content.length <= 312 ? content : content.slice(0, 313) + '...';
    const t = useTranslations('buttons');

    return (
        <div className={styles.article} style={{ backgroundImage: `url(${url})` }}>
            <div className={styles.container}>
                <div className={styles.contact}>
                    <h1 className={cn(styles.title, Inter.className)}>
                        {subtitle}
                    </h1>
                    <p className={Arial.className}>
                        {description}
                    </p>
                    <ScrollLink
                        to='footer'
                        offset={-250}
                        smooth={false}
                        duration={500}
                        className={cn(styles.contact_us_button, Arial.className)}
                    >
                        {t('contact-us')}
                    </ScrollLink>
                </div>
            </div>
        </div>
    );
};

export default React.memo(SlideItem);