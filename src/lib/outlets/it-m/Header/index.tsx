'use client'

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import useWindowSize from '@/hooks/useWindowSize';

import { Pages } from '@/constants/pages';
import { Arial, MMArmenU } from '@/constants/font';
import { ImagePaths } from '@/constants';
import LogoMobile from '@/lib/icons/it-m/LogoMobile'
import Logo from '@/lib/icons/it-m/Logo'

import LocalSwitcher from '@/components/components/local-switcher';

import cn from 'classnames';

import styles from './styles.module.sass';

interface IHeaderProps {
    typePosition: string;
    locale: string;
};

const navigationLinks = [
    { path: Pages.ITM_ABOUT, label: 'about' },
    { path: Pages.ITM_COURSES, label: 'courses' },
    { path: Pages.ITM_ORDERS, label: 'orders' },
    { path: Pages.ITM_PRICE_LIST, label: 'price-list' },
    { path: Pages.ITM_OUR_TEAM, label: 'our-team' },
    { path: Pages.ITM_CONTACT, label: 'contact' }
];

const Header = ({ typePosition, locale }: Readonly<IHeaderProps>) => {
    const [isSticky, setIsSticky] = useState<boolean>(false);
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const windowSize = useWindowSize();
    const switchColor = windowSize.width <= 991 ? 'white' : '#706F73';

    const t = useTranslations();
    const pathname = usePathname();

    useEffect(() => {
        if (!isSticky) {
            setIsSticky(window.scrollY > 0);
        }

        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    const toggleMenuClick = () => setIsOpenMenu(!isOpenMenu);



    return (
        <header className={cn(
            styles.box,
            typePosition === 'fixed' ? styles.boxFixed : '',
            isSticky ? styles.boxScrolled : '',
            isOpenMenu ? styles.boxOpenMenu : '',
        )}>
            <div className={`block ${styles.wrap}`}>
                {windowSize.width <= 1280 ? (
                    <Link
                        href={`/${locale}${Pages.ITM}`}
                        aria-label={Pages.ITM}
                        className={styles.logoMobile}
                    >
                        <LogoMobile width={40} height={40} />
                    </Link>) : (
                    <Link
                        href={`/${locale}${Pages.ITM}`}
                        aria-label={Pages.ITM}
                        className={styles.logo}
                    >
                        {/* <Image
                            src={ImagePaths.ITM.logoURL}
                            alt='logo'
                            width={500}
                            height={500}
                            className={styles.image}
                            priority
                        /> */}
                        <Logo width={204} height={84} />
                    </Link>
                )}
                <div className={cn(
                    styles.content,
                    isOpenMenu ? styles.contentShow : '',
                    isSticky && isOpenMenu ? styles.contentSticky : '',
                )}>
                    <div className={styles.nav}>
                        {navigationLinks.map((link, key) => (
                            <Link
                                key={key}
                                href={`/${locale}${link.path}`}
                                aria-label={link.path}
                                className={`${styles.link} ${styles.from_center} ${pathname === `/${locale}${link.path}` ? styles.linkActive : ''} ${isSticky ? styles.scrollX : styles.scrollY} ${MMArmenU.className}`}
                                prefetch={true}
                                passHref
                                onClick={() => setIsOpenMenu(false)}
                            >
                                {t(`navigation.${link.label}`)}
                            </Link>
                        ))}
                    </div>
                    <LocalSwitcher activeColor='#B2D01B' color={switchColor} />
                </div>
                <Link
                    href={`/${locale}${Pages.ITM_CONTACT}`}
                    aria-label={Pages.ITM_CONTACT}
                    className={cn(MMArmenU.className, styles.register)}
                >
                    {t('buttons.register')}
                </Link>
                <button
                    className={cn(
                        styles.menuBtn,
                        isOpenMenu ? styles.menuBtnActive : '',
                    )}
                    onClick={toggleMenuClick}
                    title='Itm Center'
                >
                    <span></span>
                </button>
            </div>
        </header>
    );
};

export default Header;