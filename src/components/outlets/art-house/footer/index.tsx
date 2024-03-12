import React from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';
import LogoFooter from '@/components/icons/art-house/LogoFooter';
import Facebook from '@/components/icons/art-house/Facebook';
import Instagram from '@/components/icons/art-house/Instagram';
import Gmail from '@/components/icons/art-house/Gmail';
import Linkedin from '@/components/icons/art-house/Linkedin';

import { Hosts } from '@/constants/hosts';
import { ArianAMU } from '@/constants/font';

import styles from './styles.module.sass';


const Footer = () => {
    const t = useTranslations();

    return (
        <footer id='footer' className={styles.wrap}>
            <Container>
                <div className={styles.footer}>
                    <div>
                        <Link href='#about-us' aria-label='About us' className={styles.icon}>
                            <p className={`${styles.info_web} ${ArianAMU.className}`}>{t('footer.about-us')}</p>
                        </Link>
                        <Link href='#branches' aria-label='Branches' className={styles.icon}>
                            <p className={`${styles.info_web} ${ArianAMU.className}`}>{t('footer.branches')}</p>
                        </Link>
                        <Link href='#' aria-label='Programs' className={styles.icon}>
                            <p className={`${styles.info_web} ${ArianAMU.className}`}>{t('footer.programs')}</p>
                        </Link>
                        <Link href='#co-workers' aria-label='Co-workers' className={styles.icon}>
                            <p className={`${styles.info_web} ${ArianAMU.className}`}> {t('footer.partners')}</p>
                        </Link>
                    </div>
                    <div>
                        <h2 className={`${styles.addres} ${ArianAMU.className}`}>{t('adress.street')}</h2>
                        <div className={styles.phone_numbers}>
                            <Link href='tel:+37477543455' aria-label='+374 (77) 54 34 55' className={styles.icon}>
                                <p className={`${styles.info_web} ${ArianAMU.className}`}>+374 (77) 54 34 55,</p>
                            </Link>
                            <Link href='tel:+37433543455' aria-label='+374 (33) 54 34 55' className={styles.icon}>
                                <p className={`${styles.info_web} ${ArianAMU.className} ${styles.phone}`}>+374 (33) 54 34 55,</p>
                            </Link>
                            <Link href='tel:010543455' aria-label='(010) 54 34 55' className={styles.icon}>
                                <p className={`${styles.info_web} ${ArianAMU.className} ${styles.phone}`}>(010) 54 34 55</p>
                            </Link>
                        </div>
                        <div>
                            <h2 className={`${styles.hosts_title} ${ArianAMU.className}`}>{t('texts.follow-us')}</h2>
                            <div className={styles.hosts}>
                                <Link href={Hosts.facebook} aria-label='Facebook' className={styles.social_network} target="_blank">
                                    <Facebook width='40' height='40' fill='white' />
                                </Link>
                                <Link href={Hosts.gmail} aria-label='Gmail' className={styles.social_network} target="_blank">
                                    <Gmail width='40' height='40' fill='white' />
                                </Link>
                                <Link href={Hosts.instagram} aria-label='Instagram' className={styles.social_network} target="_blank">
                                    <Instagram width='40' height='40' fill='white' />
                                </Link>
                                <Link href={Hosts.linkedin} aria-label='LinkedIn' className={styles.social_network} target="_blank">
                                    <Linkedin width='40' height='40' fill='white' />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.logo_footer}>
                            <LogoFooter width='274' height='75' fill='white' />
                        </div>
                        <p className={`${styles.reserved} ${ArianAMU.className}`}>{`©️ 2024  ${t('texts.rights')}`}</p>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
