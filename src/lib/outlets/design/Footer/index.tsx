'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';
import { IoMailSharp } from 'react-icons/io5';
import { GrLinkedinOption } from 'react-icons/gr';

// import { Hosts } from '@/lib/constants/hosts';
import { Arial } from '@/lib/constants/font';
import { ImagePaths } from '@/lib/constants';

import useWindowSize from '@/hooks/useWindowSize';

import { socialNetwork } from '@/types/design';

import { HOSTS, Social_Links } from '../../../../../sanity/sanity-queries/design';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    socialData: HOSTS
};

const socialNetworkComponents: socialNetwork = {
    facebook: FaFacebookF,
    x: FaTwitter,
    instagram: FaInstagram,
    gmail: IoMailSharp,
    linkedin: GrLinkedinOption,
};

const Footer = ({ socialData }: Readonly<Props>) => {
    const currentYear = new Date().getFullYear();
    const windowSize = useWindowSize();
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
                    size={windowSize.width <= 1024 ? 20 : 30}
                    fill='#F9CC48'
                />
            </Link>
        )
    });

    return (
        <footer className={styles.footer}>
            <div className={styles.column}>
                <div className={styles.logo}>
                    <Image
                        src={ImagePaths.DESIGN.logoURL}
                        alt='logo'
                        className={styles.image}
                        width={500}
                        height={500}
                        priority
                    />
                </div>
                <div>
                    <div className={styles.address}>
                        <span className={Arial.className}>{t('street')}</span>
                        <Link href={tel} aria-label={socialData?.phone_number} className={styles.icon}>
                            <p className={cn(styles.phone, Arial.className)}>{socialData?.phone_number}</p>
                        </Link>
                    </div>
                    <p className={`${styles.reserved} ${Arial.className}`}>
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

export default Footer;