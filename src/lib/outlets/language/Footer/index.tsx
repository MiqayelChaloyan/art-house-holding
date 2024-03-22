"use client"

import Logo from '@/lib/icons/language/Logo';
import Gmail from '@/lib/icons/language/Gmail';
import Instagram from '@/lib/icons/language/Instagram';
import Facebook from '@/lib/icons/language/Facebook';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Hosts } from '@/lib/constants/hosts';
import useWindowSize from '@/hooks/useWindowSize';
import Container from '@/components/components/container';

import styles from './styles.module.sass';


const Footer = () => {
    const windowSize = useWindowSize();
    const t = useTranslations('address');


    return (
        <footer className={styles.container}>
            {/* <Container> */}
                <div className={styles.column}>
                    <div className={styles.logo}>
                        <Logo width={255.53} height={80} fill='#F9CC48' />
                    </div>
                    <div>
                        <div className={styles.address}>
                            <span>{t('street')}</span>
                            <Link href='tel:+37477543455' aria-label='+374 (77) 54 34 55' className={styles.icon}>
                                <p className={styles.phone}>+374 (77) 54 34 55</p>
                            </Link>
                        </div>
                        <p className={styles.reserved}>2024 ART HOUSE</p>
                    </div>
                    <div className={styles.hosts}>
                        <Link href={Hosts.gmail} aria-label='Gmail' className={styles.social_network} target="_blank">
                            <Gmail width={windowSize.width <= 1024 ? 20 : 30} height={windowSize.width <= 1024 ? 20 : 30} fill='#F9CC48' />
                        </Link>
                        <Link href={Hosts.instagram} aria-label='Instagram' className={styles.social_network} target="_blank">
                            <Instagram width={windowSize.width <= 1024 ? 20 : 30} height={windowSize.width <= 1024 ? 20 : 30} fill='#F9CC48' />
                        </Link>
                        <Link href={Hosts.facebook} aria-label='Facebook' className={styles.social_network} target="_blank">
                            <Facebook width={windowSize.width <= 1024 ? 20 : 30} height={windowSize.width <= 1024 ? 20 : 30} fill='#F9CC48' />
                        </Link>
                    </div>
                </div>
            {/* </Container> */}
        </footer>
    )
}

export default Footer;