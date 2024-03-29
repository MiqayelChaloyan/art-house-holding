"use client"

import React, { memo, useEffect, useState } from 'react';

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


type IHeaderProps = {
    locale: string
};

type StickyBoundaryProps = {
    children: JSX.Element[]
    sticky: boolean
    width: number
};

type HeaderProps = {
    children: JSX.Element[]
};


const navigationLinks = [
    { path: Pages.LANGUAGE_HOME, label: 'about' },
    { path: Pages.LANGUAGE_LANGUAGES, label: 'languages' },
    { path: Pages.LANGUAGE_DISCOUNTS, label: 'discounts' },
    { path: Pages.LANGUAGE_PRICE_LIST, label: 'price-list' },
    { path: Pages.LANGUAGE_CO_WORKER, label: 'co-workers' }
];


const StickyBoundary = ({ children, sticky, width }: StickyBoundaryProps) => (
    <div className={`${styles.boundary} ${sticky ? styles.isSticky : ''}`}>{children}</div>
);

const HeaderBoundary = ({ children }: HeaderProps) => (
    <header className={styles.header}>{children}</header>
);


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
        <div className={cn(
            styles.container,
            isSticky ? styles.stickyContainer : ''
        )}>
            <HeaderBoundary>
                <div className={styles.requests}>
                    <div className={styles.send_request}>
                        <p className={`${styles.triangle_text} ${Arial.className}`}>{t("texts.send-request")}</p>
                    </div>
                    <div className={styles.take_test}>
                        <p className={`${styles.triangle_text} ${Arial.className}`}>{t("texts.take-the-test")}</p>
                    </div>
                </div>
                <div className={styles.logo}>
                    <Logo width={windowSize.width < 1280 ? 150 : 255.53} height={80} fill='#F9CC48' />
                </div>
                <div className={styles.switcher}>
                    <LocalSwitcher />
                </div>
            </HeaderBoundary>
            <StickyBoundary sticky={isSticky} width={windowSize.width}>
                <nav className={cn(
                    styles.nav,
                    isOpenMenu ? styles.active : ''
                )}>
                    {navigationLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={`/${locale}${link.path}`}
                            aria-label={`/${locale}${link.path}`}
                            className={`${styles.link} ${pathname === `/${locale}${link.path}` ? styles.linkActive : ''} ${isSticky ? styles.scrollX : styles.scrollY} ${Arial.className}`}
                            onClick={() => setIsOpenMenu(false)}
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
                </nav>
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
            </StickyBoundary>
        </div>
    )
}

export default memo(Header);


