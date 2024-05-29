'use client'

import { useTranslations } from 'next-intl';

import { Arial } from '@/lib/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


const OurTeam = () => {
    const t = useTranslations('sections');

    return (
        <div className={styles.container}>
            <div className={styles.titles}>
                <h2 className={cn(styles['title-back'], Arial.className)}>OUR TEAM</h2>
                <h1 className={cn(styles.title, Arial.className)}>{t('our-team')}</h1>
            </div>
        </div>
    )
};

export default OurTeam;