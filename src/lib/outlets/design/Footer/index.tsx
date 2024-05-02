'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';
import { IoMailSharp } from 'react-icons/io5';
import { GrLinkedinOption } from 'react-icons/gr';

import { Hosts } from '@/lib/constants/hosts';
import { Arial } from '@/lib/constants/font';
import { ImagePaths } from '@/lib/constants';

import useWindowSize from '@/hooks/useWindowSize';

import styles from './styles.module.sass';


const Footer = () => {
    const windowSize = useWindowSize();
    const t = useTranslations('address');

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
                        <Link href='tel:+37477543455' aria-label='+374 (77) 54 34 55' className={styles.icon}>
                            <p className={`${styles.phone} ${Arial.className}`}>+374 (77) 54 34 55</p>
                        </Link>
                    </div>
                    <p className={`${styles.reserved} ${Arial.className}`}>2024 ART HOUSE</p>
                </div>
                <div className={styles.hosts}>
                    <Link href={Hosts.facebook} aria-label='Facebook' className={styles.social_network} target="_blank">
                        <FaFacebookF size={windowSize.width <= 1280 ? 20 : 30} fill='#FFFFFF' />
                    </Link>
                    <Link href={Hosts.twitter} aria-label='Twitter ' className={styles.social_network} target="_blank">
                        <FaTwitter size={windowSize.width <= 1280 ? 20 : 30} fill='#FFFFFF' />
                    </Link>
                    <Link href={Hosts.instagram} aria-label='Instagram' className={styles.social_network} target="_blank">
                        <FaInstagram size={windowSize.width <= 1280 ? 20 : 30} fill='#FFFFFF' />
                    </Link>                
                    <Link href={Hosts.gmail} aria-label='Gmail' className={styles.social_network} target="_blank">
                        <IoMailSharp size={windowSize.width <= 1280 ? 20 : 30} color='#FFFFFF' />
                    </Link>
                    <Link href={Hosts.linkedin} aria-label='Facebook' className={styles.social_network} target="_blank">
                        <GrLinkedinOption size={windowSize.width <= 1280 ? 20 : 30} fill='#FFFFFF' />
                    </Link>
                </div>
            </div>
        </footer>
    )
};

export default Footer;