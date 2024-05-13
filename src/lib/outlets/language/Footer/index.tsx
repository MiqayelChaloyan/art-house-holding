'use client'

import React from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Logo from '@/lib/icons/language/Logo';
import Gmail from '@/lib/icons/language/Gmail';
import Instagram from '@/lib/icons/language/Instagram';
import Facebook from '@/lib/icons/language/Facebook';

import { Arial } from '@/lib/constants/font';

import useWindowSize from '@/hooks/useWindowSize';

import { socialNetwork } from '@/types/language';

import { HOSTS, Social_Links } from '../../../../../sanity/sanity-queries/language';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    socialData: HOSTS
};

const socialNetworkComponents: socialNetwork = {
    facebook: Facebook,
    instagram: Instagram,
    gmail: Gmail,
};

const Footer = ({ socialData }: Readonly<Props>) => {
    const windowSize = useWindowSize();
    const currentYear = new Date().getFullYear();
    const tel = 'tel:' + socialData?.phone_number.replace(/\s/g, '');
    const t = useTranslations('address');

    const hosts = socialData?.social_links.map((host: Social_Links) => {
        const socialName = host?.social_name.toLowerCase();
        const link = socialName === 'gmail' ? `mailto:${host?.social_link}` : host?.social_link;
        const SocialIcon = (socialNetworkComponents as any)[socialName];
        if (!SocialIcon) return null;

        return (
            <Link
                key={host._key}
                href={link}
                aria-label={host?.social_name}
                className={styles.social_network}
                target="_blank"
            >
                <SocialIcon
                    width={windowSize.width <= 1024 ? 20 : 30}
                    height={windowSize.width <= 1024 ? 20 : 30}
                    fill='#F9CC48'
                />
            </Link>
        )
    });

    return (
        <footer className={styles.footer}>
            <div className={styles.column}>
                <div className={styles.logo}>
                    <Logo
                        width={windowSize.width > 1280 ? 255.53 : windowSize.width > 1024 ? 200 : 150}
                        height={80}
                        fill='#F9CC48'
                    />
                </div>
                <div>
                    <div className={styles.address}>
                        <span className={Arial.className}>
                            {t('street')}
                        </span>
                        <Link href={tel} aria-label={socialData?.phone_number} className={styles.icon}>
                            <p className={cn(styles.phone, Arial.className)}>{socialData?.phone_number}</p>
                        </Link>
                    </div>
                    <p className={cn(styles.reserved, Arial.className)}>
                        {`©️ ${currentYear} ART HOUSE`}
                    </p>
                </div>
                <div className={styles.hosts}>
                    {hosts}
                </div>
            </div>
        </footer>
    )
};

export default React.memo(Footer);