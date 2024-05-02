'use client'

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Logo from '@/lib/icons/language/Logo';
import Gmail from '@/lib/icons/language/Gmail';
import Instagram from '@/lib/icons/language/Instagram';
import Facebook from '@/lib/icons/language/Facebook';

import { Hosts } from '@/lib/constants/hosts';
import { Arial } from '@/lib/constants/font';

import useWindowSize from '@/hooks/useWindowSize';

import styles from './styles.module.sass';


const Footer = () => {
    const windowSize = useWindowSize();
    const t = useTranslations('address');

    return (
        <footer className={styles.footer}>
            <div className={styles.column}>
                <div className={styles.logo}>
                    <Logo width={windowSize.width > 1280 ? 255.53: windowSize.width > 1024 ? 200 : 150} height={80} fill='#F9CC48' />
                </div>
                <div>
                    <div className={styles.address}>
                        <span className={Arial.className}>{t('street')}</span>
                        <Link href='tel:+37477543455' aria-label='+374 (77) 54 34 55' className={styles.icon}>
                            <p className={`${styles.phone} ${Arial.className}`}>+374 (77) 54 34 55</p>
                        </Link>
                    </div>
                    <p className={`${styles.reserved} ${Arial.className}`}>2024 ART HOUSE</p>
                </div>
                <div className={styles.hosts}>
                    <Link href={Hosts.gmail} aria-label='Gmail' className={styles.social_network} target="_blank">
                        <Gmail width={windowSize.width <= 1280 ? 20 : 30} height={windowSize.width <= 1024 ? 20 : 30} fill='#F9CC48' />
                    </Link>
                    <Link href={Hosts.instagram} aria-label='Instagram' className={styles.social_network} target="_blank">
                        <Instagram width={windowSize.width <= 1280 ? 20 : 30} height={windowSize.width <= 1024 ? 20 : 30} fill='#F9CC48' />
                    </Link>
                    <Link href={Hosts.facebook} aria-label='Facebook' className={styles.social_network} target="_blank">
                        <Facebook width={windowSize.width <= 1280 ? 20 : 30} height={windowSize.width <= 1024 ? 20 : 30} fill='#F9CC48' />
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;