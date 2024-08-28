'use client'

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { ArianAMU } from '@/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


const WebSite = ({
    locale,
    title,
    about,
    imgPath,
    site_url
}: any) => {
    const t = useTranslations('buttons');

    return (
        <div
            className={`${styles.item} item`}
            style={{ backgroundImage: `url(${imgPath})` }}
        >
            <div className={styles.content}>
                <h3 className={cn(styles.name, ArianAMU.className)}>{title}</h3>
                <p className={cn(styles.des, ArianAMU.className)}>{about}</p>
                <Link
                    href={`/${locale}/${site_url}`}
                    aria-label={site_url}
                    className={cn(styles.navgate_button, ArianAMU.className)}
                >
                    {t('see-more')}
                </Link>
            </div>
        </div>
    )
}

export default WebSite;