'use client';

import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

import Container from '@/components/components/container';

import LogoFooter from '@/lib/icons/art-house/LogoFooter';
import Facebook from '@/lib/icons/art-house/Facebook';
import Instagram from '@/lib/icons/art-house/Instagram';
import X from '@/lib/icons/art-house/X';
import Tiktok from '@/lib/icons/art-house/Tiktok';
import Telegram from '@/lib/icons/art-house/Telegram';
import YouTube from '@/lib/icons/art-house/YouTube';
import Pinterest from '@/lib/icons/art-house/Pinterest';
import WhatsApp from '@/lib/icons/art-house/WhatsApp';
import Viber from '@/lib/icons/art-house/Viber';
import Gmail from '@/lib/icons/art-house/Gmail';
import Linkedin from '@/lib/icons/art-house/Linkedin';

import { Pages } from '@/constants/pages';
import { ArianAMU } from '@/constants/font';

import useWindowSize from '@/hooks/useWindowSize';

import { socialNetwork } from '@/types/general';

import { HOSTS, Social_Links } from '../../../../../sanity/sanity-queries/art-house';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    locale: string;
    socialData?: HOSTS;
    linkActive: string,
    handleChangeActiveLink: (link: string) => void;
};

const socialNetworkComponents: socialNetwork = {
    facebook: Facebook,
    instagram: Instagram,
    gmail: Gmail,
    linkedin: Linkedin,
    x: X,
    tiktok: Tiktok,
    telegram: Telegram,
    youtube: YouTube,
    pinterest: Pinterest,
    whatsapp: WhatsApp,
    viber: Viber
};

const Footer = ({ locale, socialData, linkActive, handleChangeActiveLink }: Readonly<Props>) => {
    const windowSize = useWindowSize();
    const currentYear = new Date().getFullYear();
    const t = useTranslations();
    const pathname = usePathname();
    const router = useRouter();

    const phoneNumbers = socialData?.phone_numbers?.map((number: string, index: number) => {
        const phoneNumber = index < socialData.phone_numbers.length - 1 ? `${number}, ` : number;
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

    const hosts = socialData?.social_links?.map((host: Social_Links) => {
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
                target='_blank'
            >
                <SocialIcon
                    width={windowSize.width <= 1280 ? 20 : 40}
                    height={windowSize.width <= 1280 ? 20 : 40}
                    fill=''
                />
            </Link>
        )
    });

    const handleRouteChangeComplete = (scrollTo: string) => {
        const observer = new MutationObserver((_, obs) => {
            const element = document.getElementById(scrollTo);
            if (element) {
                const topPosition = element.offsetTop;
                window.scrollTo({ top: topPosition, behavior: 'smooth' });
                obs.disconnect();
            }
        });

        observer.observe(document, { childList: true, subtree: true });
    };

    const handleActiveLink = (newPath: string) => {
        handleChangeActiveLink(newPath);

        if (pathname.includes('/about')) {
            router.push('/');

            setTimeout(() => {
                handleRouteChangeComplete(newPath);
            }, 500);
        }
    };


    return (
        <footer id='footer' className={styles.footer}>
            <Container className='container'>
                <div className={styles.section}>
                    <div className={styles.box}>
                        <Link
                            href={`/${locale}/${Pages.HOME_ABOUT}`}
                            aria-label='About us'
                            className={styles.icon}
                            onClick={() => handleActiveLink(Pages.HOME_ABOUT)}
                        >
                            <p className={cn(styles.info_web,  pathname.includes(Pages.HOME_ABOUT) && styles.linkActive, ArianAMU.className)}>
                                {t('footer.about-us')}
                            </p>
                        </Link>
                        <ScrollLink
                            to='partners'
                            smooth={false}
                            duration={500}
                            className={styles.icon}
                            onClick={() => handleActiveLink('partners')}
                        >
                            <p className={cn(styles.info_web,  linkActive === 'partners' && styles.linkActive, ArianAMU.className)}>
                                {t('footer.partners')}
                            </p>
                        </ScrollLink>
                    </div>
                    <div className={styles.box}>
                        <h2 className={cn(styles.addres, ArianAMU.className)}>
                            {socialData?.address || t('address.address')}
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
