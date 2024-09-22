'use client'

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { useDispatch } from 'react-redux';
import { openModal } from '@/src/store/modal_reducer';

import Button from '@/src/lib/ui/Button';
import { Pages } from '@/src/constants/pages';
import { Arial, ArianAMU } from '@/src/constants/font';
import { ImagePaths } from '@/src/constants';

import LocalSwitcher from '@/src/components/components/local-switcher';

import cn from 'classnames';

import styles from './styles.module.sass';


interface IHeaderProps {
    typePosition: string;
    locale: string;
};

const navigationLinks = [
    { path: Pages.DESIGN_PRICE_LIST, label: 'price-list' },
    { path: Pages.DESIGN_ORDERS, label: 'orders' },
    { path: Pages.DESIGN_PORTFOLIOS, label: 'portfolios' },
    { path: Pages.DESIGN_CONTACT, label: 'contact' },
];

const Header = ({ typePosition, locale }: Readonly<IHeaderProps>) => {
    const [isSticky, setIsSticky] = useState<boolean>(false);
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const t = useTranslations('navigation');
    const pathname = usePathname();
    const dispatch = useDispatch();

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

    const handleSubmit = () => {
        setIsOpenMenu(false);
        setTimeout(() => dispatch(openModal(true)), 500);
    };

    return (
        <header className={cn(
            styles.box,
            typePosition === 'fixed' ? styles.boxFixed : '',
            isSticky ? styles.boxScrolled : '',
            isOpenMenu ? styles.boxOpenMenu : ''
        )}>
            <div className={`container ${styles.wrap}`}>
                <Link
                    href={`/${locale}${Pages.DESIGN_HOME}`}
                    aria-label={Pages.DESIGN_HOME}
                    className={styles.logo}
                >
                    <Image
                        src={ImagePaths.DESIGN.headerLogoURL}
                        alt='logo'
                        className={styles.image}
                        width={500}
                        height={500}
                        priority
                    />
                </Link>
                <div className={cn(
                    styles.content,
                    isOpenMenu ? styles.contentShow : '',
                    isSticky && isOpenMenu ? styles.contentSticky : '',
                )}>
                    <div className={styles.nav}>
                        <Button
                            text={t('departments')}
                            onClick={handleSubmit}
                            className={cn(styles.link, ArianAMU.className)}
                        />
                        {navigationLinks.map((link, key) => (
                            <Link
                                key={key}
                                href={`/${locale}${link.path}`}
                                aria-label={link.path}
                                className={`${styles.link} ${styles.from_center} ${pathname === `/${locale}${link.path}` ? styles.linkActive : ''} ${isSticky ? styles.scrollX : styles.scrollY} ${Arial.className}`}
                                prefetch={true}
                                passHref
                                onClick={() => setIsOpenMenu(false)}
                            >
                                {t(`${link.label}`)}
                            </Link>
                        ))}
                    </div>
                    <LocalSwitcher activeColor='#8E685C' color='#fff' />
                </div>
                <button
                    className={cn(
                        styles.menuBtn,
                        isOpenMenu ? styles.menuBtnActive : '',
                    )}
                    onClick={toggleMenuClick}
                    title='Art Design Center'
                >
                    <span></span>
                </button>
            </div>
        </header>
    );
};

export default Header;