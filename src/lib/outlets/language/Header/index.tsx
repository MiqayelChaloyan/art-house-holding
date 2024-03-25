"use client"

import { memo, useEffect, useState } from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import LocalSwitcher from '@/components/components/local-switcher';

import useWindowSize from '@/hooks/useWindowSize';

import { Pages } from '@/lib/constants/pages';
import { Arial } from '@/lib/constants/font';
import Logo from '@/lib/icons/language/Logo';

import cn from 'classnames';

import styles from './styles.module.sass';


const navigationLinks = [
    { path: Pages.LANGUAGE_HOME, label: 'about' },
    { path: Pages.LANGUAGE_LANGUAGES, label: 'languages' },
    { path: Pages.LANGUAGE_DISCOUNTS, label: 'discounts' },
    { path: Pages.LANGUAGE_PRICE_LIST, label: 'price-list' },
    { path: Pages.LANGUAGE_CO_WORKER, label: 'co-workers' }
];


type IHeaderProps = {
    locale: string
};


const Header = ({ locale }: IHeaderProps) => {
    const [isSticky, setIsSticky] = useState<boolean>(false);
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

    const pathname = usePathname();
    const windowSize = useWindowSize();
    const t = useTranslations()

    useEffect(() => {
        const handleScroll = () => {
            const winTop = window.scrollY;
            if (winTop >= 30) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenuClick = () => setIsOpenMenu(!isOpenMenu);

    return (
        <div className={`${isSticky ? styles.sticky_header : ''}`}>
            <header className={styles.header}>
                <div className={styles.body}>
                    <div className={styles.requests}>
                        <div className={styles.send_request}>
                            <p className={`${styles.triangle_text} ${Arial.className}`}>{t("texts.send-request")}</p>
                        </div>
                        <div className={styles.take_test}>
                            <p className={`${styles.triangle_text} ${Arial.className}`}>{t("texts.take-the-test")}</p>
                        </div>
                    </div>
                    <div className={styles.logo}>
                        <Logo width={windowSize.width > 1280 ? 255.53: windowSize.width > 1024 ? 200 : 150} height={80} fill='#F9CC48' />
                    </div>
                    <div className={styles.switcher}>
                        <LocalSwitcher />
                    </div>
                </div>
                <div className={cn(
                    styles.nav,
                    isSticky ? styles.scrollY : '',
                    isOpenMenu ? styles.active : ''
                )}>
                    {navigationLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={`/${locale}${link.path}`}
                            aria-label={`/${locale}${link.path}`}
                            className={`${styles.link} ${pathname === `/${locale}${link.path}` ? styles.linkActive : ''} ${Arial.className}`}
                        >
                            {t(`navigation.${link.label}`)}
                        </Link>
                    ))}
                    <div className={styles.mobile}>
                        <p className={`${styles.mobile_triangle_text_one} ${Arial.className}`}>{t("texts.send-request")}</p>
                        <p className={`${styles.mobile_triangle_text_two} ${Arial.className}`}>{t("texts.take-the-test")}</p>
                        <div className={styles.mobile_switcher}>
                            <LocalSwitcher />
                        </div>
                        <Logo width={150} height={80} fill='#fff' />
                    </div>
                </div>
            </header>
            <div className={styles.menuMobile}>
                <button
                    className={cn(
                        styles.menuBtn,
                        `${isOpenMenu ? styles.menuBtnActive : ''}`,
                    )}
                    onClick={toggleMenuClick}
                    title='Language'
                ><span></span></button>
            </div>
        </div>
    );
};


export default memo(Header);









{/*  TODO - pordzeluc heto jnjel
    <Link href={`/${locale}${Pages.LANGUAGE_HOME}`} aria-label={`/${locale}${Pages.LANGUAGE_HOME}`} className={`${styles.link} ${pathname === `/${locale}${Pages.LANGUAGE_HOME}` ? styles.linkActive : ''} ${ArianAMU.className}`}>{t('navigation.about')}</Link>
    <Link href={`/${locale}${Pages.LANGUAGE_LANGUAGES}`} aria-label={`/${locale}${Pages.LANGUAGE_LANGUAGES}`} className={`${styles.link} ${pathname === `/${locale}${Pages.LANGUAGE_LANGUAGES}` ? styles.linkActive : ''} ${ArianAMU.className}`}>{t('navigation.languages')}</Link>
    <Link href={`/${locale}${Pages.LANGUAGE_DISCOUNTS}`} aria-label={`/${locale}${Pages.LANGUAGE_DISCOUNTS}`} className={`${styles.link} ${pathname === `/${locale}${Pages.LANGUAGE_DISCOUNTS}` ? styles.linkActive : ''} ${ArianAMU.className}`}>{t('navigation.discounts')}</Link>
    <Link href={`/${locale}${Pages.LANGUAGE_PRICE_LIST}`} aria-label={`/${locale}${Pages.LANGUAGE_PRICE_LIST}`} className={`${styles.link} ${pathname === `/${locale}${Pages.LANGUAGE_PRICE_LIST}` ? styles.linkActive : ''} ${ArianAMU.className}`}>{t('navigation.price-list')}</Link>
    <Link href={`/${locale}${Pages.LANGUAGE_CO_WORKER}`} aria-label={`/${locale}${Pages.LANGUAGE_CO_WORKER}`} className={`${styles.link} ${pathname === `/${locale}${Pages.LANGUAGE_CO_WORKER}` ? styles.linkActive : ''} ${ArianAMU.className}`}>{t('navigation.co-workers')}</Link> 
*/}