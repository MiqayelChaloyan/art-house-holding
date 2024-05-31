'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import { PortableText } from '@portabletext/react';

import useWindowSize from '@/hooks/useWindowSize';

import components from '@/lib/utils/PortableTextComponents';
import Vector from '@/lib/icons/design/Vector';
import { Arial } from '@/lib/constants/font';

import { PROMOTIONS as Props } from '@/types/design';

import cn from 'classnames';

import styles from './styles.module.sass';


interface BoxProps {
    advantages: string,
    iconSize: number
};

const Box = ({ advantages, iconSize }: BoxProps) => (
    <div className={cn(styles.hex, styles['gradient-bg'])}>
        <Vector width={iconSize > 980 ? 68.42 : 30} height={38.07} fill='#FFFFFF' />
        <p className={cn(styles['our-advantages'], Arial.className)}>{advantages}</p>
    </div>
);

const Promotions = ({ informatie, our_advantages }: Readonly<Props>) => {
    const t = useTranslations('sections');
    const windoSize = useWindowSize();

    const advantages = our_advantages.map((elem: any, index: number) => <Box key={index} advantages={elem} iconSize={windoSize.width}/>);

    return (
        <section id='promotions' className={styles.container}>
            <div className={styles.titles}>
                <h2 className={cn(styles['title-back'], Arial.className)}>PROMOTIONS</h2>
                <h1 className={cn(styles.title, Arial.className)}>{t('promotions')}</h1>
            </div>
            <div className={cn(styles.informatie, Arial.className)}>
                <PortableText
                    value={informatie}
                    components={components}
                />
            </div>
            <div className={styles.advantages}>
                {advantages}
            </div>
        </section>
    )
};

export default Promotions;