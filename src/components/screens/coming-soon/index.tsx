'use client'

import Logo from '@/lib/icons/art-house/LogoFooter'
import { ArianAMU } from '@/lib/constants/font';

import Facebook from '@/lib/icons/art-house/Facebook';
import Instagram from '@/lib/icons/art-house/Instagram';
import Gmail from '@/lib/icons/art-house/Gmail';
import Linkedin from '@/lib/icons/art-house/Linkedin';

import cn from 'classnames';

import styles from './styles.module.sass';
import Link from 'next/link';
import { Pages } from '@/lib/constants/pages';
import { socialNetwork } from '@/types/art-house';
import useWindowSize from '@/hooks/useWindowSize';
import { Social_Links } from '../../../../sanity/sanity-queries/art-house';
import { useEffect } from 'react';

// import settings from '../../../../public/assets/gif/settings.gif';

const ComingSoon = ({ data }: any) => {
    const currentYear = new Date().getFullYear();
    const windowSize = useWindowSize();


    const socialNetworkComponents: socialNetwork = {
        facebook: Facebook,
        instagram: Instagram,
        gmail: Gmail,
        linkedin: Linkedin
    };

    const hosts = data?.social_links.map((host: Social_Links) => {
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
        <section className={styles.container}>
            <div className={styles.left}>
                <div className={styles.header}>
                    <Link href={Pages.HOME} aria-label='about' className={cn(styles.logo)}>
                        <Logo
                            width={350}
                            height={70}
                            fill='#FFFFFF'
                        />
                    </Link>
                    <h1 className={cn(styles.title, ArianAMU.className)}>Were Launching Soon</h1>
                    <h4 className={cn(styles.text, ArianAMU.className)}>Were  creating something exiting in the house and about to launch soon.</h4>
                    <div className={styles.hosts}>
                        {hosts}
                    </div>
                    <p className={cn(styles.reserved, ArianAMU.className)}>
                        {`©️ ${currentYear}  All rights reserved`}
                    </p>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.astronautas} />
            </div>
        </section>
    )
}

export default ComingSoon;