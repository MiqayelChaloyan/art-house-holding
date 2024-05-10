'use client'

import React from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import LogoFooter from '@/lib/icons/art-house/LogoFooter';
import Facebook from '@/lib/icons/art-house/Facebook';
import Instagram from '@/lib/icons/art-house/Instagram';
import Gmail from '@/lib/icons/art-house/Gmail';
import Linkedin from '@/lib/icons/art-house/Linkedin';
import { ArianAMU } from '@/lib/constants/font';

import useWindowSize from '@/hooks/useWindowSize';

import { socialNetwork } from '@/types/art-house';

import { HOSTS, Social_Links } from '../../../../../sanity/sanity-queries/art-house';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    socialData: any | HOSTS
};

const socialNetworkComponents: socialNetwork = {
    facebook: Facebook,
    instagram: Instagram,
    gmail: Gmail,
    linkedin: Linkedin
};

const Footer = ({ socialData }: Props) => {
    const windowSize = useWindowSize();
    const currentYear = new Date().getFullYear();
    const t = useTranslations();

    const phoneNumbers = socialData?.phone_numbers.map((number: string, index: number) => {
        const phoneNumber = index < socialData.phone_numbers.length - 1 ? `${number}, ` : `${number}`;
        const tel = 'tel:' + number.replace(/\s/g, '');
        const className = index !== 0 && styles.phone;

        return (
            <Link key={number} href={tel} aria-label={number} className={styles.icon}>
                <p className={cn(styles.info_web, ArianAMU.className, className)}>
                    {phoneNumber}
                </p>
            </Link>
        )
    });

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
                    width={windowSize.width <= 1024 ? 20 : 40}
                    height={windowSize.width <= 1024 ? 20 : 40}
                    fill=''
                />
            </Link>
        )
    });

    return (
        <footer id='footer' className={styles.footer}>
            <Container>
                <div className={styles.section}>
                    <div className={styles.box}>
                        <Link href='#about-us' aria-label='About us' className={styles.icon}>
                            <p className={cn(styles.info_web, ArianAMU.className)}>
                                {t('footer.about-us')}
                            </p>
                        </Link>
                        <Link href='#branches' aria-label='Branches' className={styles.icon}>
                            <p className={cn(styles.info_web, ArianAMU.className)}>
                                {t('footer.branches')}
                            </p>
                        </Link>
                        <Link href='#' aria-label='Programs' className={styles.icon}>
                            <p className={cn(styles.info_web, ArianAMU.className)}>
                                {t('footer.programs')}
                            </p>
                        </Link>
                        <Link href='#partners' aria-label='Partners' className={styles.icon}>
                            <p className={cn(styles.info_web, ArianAMU.className)}>
                                {t('footer.partners')}
                            </p>
                        </Link>
                    </div>
                    <div className={styles.box}>
                        <h2 className={cn(styles.addres, ArianAMU.className)}>
                            {t('address.street')}
                        </h2>
                        <div className={styles.phone_numbers}>
                            {phoneNumbers}
                        </div>
                        <div>
                            <h2 className={cn(styles.hosts_title, ArianAMU.className)}>
                                {t('texts.follow-us')}
                            </h2>
                            <div className={styles.hosts}>
                                {hosts}
                            </div>
                        </div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.logo_footer}>
                            <LogoFooter
                                width={windowSize.width <= 1024 ? 170 : 274}
                                height={windowSize.width <= 1024 ? 50 : 75}
                                fill='#FFFFFF'
                            />
                        </div>
                        <p className={cn(styles.reserved, ArianAMU.className)}>
                            {`©️ ${currentYear}  ${t('texts.rights')}`}
                        </p>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default React.memo(Footer);
