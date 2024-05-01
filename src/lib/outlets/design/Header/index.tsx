'use client'

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl';

import { useDispatch } from 'react-redux';
import { openModal } from '@/store/modal_reducer';

import Logo from '@/lib/icons/educational-center/Logo';
import Button from '@/lib/ui/Button';
import { Pages } from '@/lib/constants/pages';
import { ArianAMU } from '@/lib/constants/font';

import LocalSwitcher from '@/components/components/local-switcher';

import cn from 'classnames';

import styles from './styles.module.sass';


type IHeaderProps = {
    typePosition: string
    locale: string
};

const Header = ({ typePosition, locale }: IHeaderProps) => {
    const [isSticky, setIsSticky] = useState<boolean>(false);
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const pathname = usePathname();
    const t = useTranslations('navigation');

    const dispatch = useDispatch();

    useEffect(() => {
        if(!isSticky) {
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

    const handleSubmit = () => {
        setIsOpenMenu(false);
        setTimeout(() => dispatch(openModal(true)), 500);
    }

    return (
        <header className={cn(
            styles.box,
            `${typePosition === 'fixed' ? styles.boxFixed : ''}`,
            `${isSticky ? styles.boxScrolled : ''}`,
            `${isOpenMenu ? styles.boxOpenMenu : ''}`
        )}>
            <div className={`container ${styles.wrap}`}>
                <Link
                    href={`/${locale}${Pages.EDUCATIONAL_HOME}`}
                    aria-label={`${Pages.EDUCATIONAL_HOME}`}
                    className={cn(styles.logo, `${isSticky ? styles.logoSticky : ''}`)}
                >
                    <Logo
                        width='162'
                        height='44'
                        fill='#111111'
                    />
                </Link>
                <div className={cn(
                    styles.content,
                    `${isOpenMenu ? styles.contentShow : ''}`,
                    `${isSticky && isOpenMenu ? styles.contentSticky : ''}`,
                )}>
                    <div className={styles.nav}>
                        <Link
                            onClick={toggleMenuClick}
                            href={`/${locale}${Pages.EDUCATIONAL_HOME}`}
                            aria-label={`${Pages.EDUCATIONAL_HOME}`}
                            className={`${styles.link} ${pathname === `/${locale}${Pages.EDUCATIONAL_HOME}` ? styles.linkActive : ""} ${ArianAMU.className}`}
                        >
                            {t('about')}
                        </Link>
                        <Button
                            text={t('courses')}
                            onClick={handleSubmit}
                            className={cn(styles.btn, ArianAMU.className)}
                        />
                        <Link
                            onClick={toggleMenuClick}
                            href={`/${locale}${Pages.EDUCATIONAL_PARTNERS}`}
                            aria-label={`${Pages.EDUCATIONAL_PARTNERS}`}
                            className={`${styles.link} ${pathname === `/${locale}${Pages.EDUCATIONAL_PARTNERS}` ? styles.linkActive : ""} ${ArianAMU.className}`}
                        >
                            {t('partners')}
                        </Link>
                        <Link
                            onClick={toggleMenuClick}
                            href={`/${locale}${Pages.EDUCATIONAL_PRICE_LIST}`}
                            aria-label={`${Pages.EDUCATIONAL_PRICE_LIST}`}
                            className={`${styles.link} ${pathname === `/${locale}${Pages.EDUCATIONAL_PRICE_LIST}` ? styles.linkActive : ""} ${ArianAMU.className}`}
                        >
                            {t('price-list')}
                        </Link>
                    </div>
                    <div>
                        <LocalSwitcher activeColor='#B21B1B' color='#fff' />
                    </div>
                </div>
                <button
                    className={cn(
                        styles.menuBtn,
                        `${isOpenMenu ? styles.menuBtnActive : ''}`,
                    )}
                    onClick={toggleMenuClick}
                    title='Art Training Center'
                >
                    <span></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
