'use client';

import React, { useState, useEffect } from 'react';

import { Link as ScrollLink } from 'react-scroll';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import LocalSwitcher from '@/components/components/local-switcher';

import Logo from '@/lib/icons/art-house/Logo'
import { ArianAMU } from '@/lib/constants/font';
import { Pages } from '@/lib/constants/pages';

import cn from 'classnames';

import styles from './styles.module.sass';


type IHeaderProps = {
    typePosition: string
};

const Header = ({ typePosition }: IHeaderProps) => {
    const [isSticky, setIsSticky] = useState<boolean>(false);
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const [linkActive, setLinkActive] = useState<string>('about');
    const t = useTranslations('navigation');

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenuClick = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    const handleActiveLink = (activeLink: string) => {
        setLinkActive(activeLink);
        setIsOpenMenu(false);
    };

    return (
        <header className={cn(
            styles.box,
            typePosition === 'fixed' ? styles.boxFixed : '',
            isSticky ? styles.boxScrolled : '',
            isOpenMenu ? styles.boxOpenMenu : ''
        )}>
            <div className={`container ${styles.wrap}`}>
                <Link href={Pages.HOME} aria-label='about' className={cn(styles.logo, isSticky ? styles.logoSticky : '')}>
                    <Logo
                        width='212'
                        height='60'
                        fill='#111111'
                    />
                </Link>
                <div className={cn(
                    styles.content,
                    `${isOpenMenu ? styles.contentShow : ''}`,
                )}>
                    <div className={styles.nav}>
                        <ScrollLink to='about' smooth={false} duration={500} className={`${styles.link} ${linkActive === 'about' ? styles.linkActive : ''} ${ArianAMU.className}`} onClick={() => handleActiveLink('about')}>{t('about')}</ScrollLink>
                        <ScrollLink to='branches' smooth={false} duration={500} className={`${styles.link} ${linkActive === 'branches' ? styles.linkActive : ''} ${ArianAMU.className}`} onClick={() => handleActiveLink('branches')}>{t('branches')}</ScrollLink>
                        <ScrollLink to='partners' smooth={false} duration={500} className={`${styles.link} ${linkActive === 'partners' ? styles.linkActive : ''} ${ArianAMU.className}`} onClick={() => handleActiveLink('partners')}>{t('partners')}</ScrollLink>
                    </div>
                    <div>
                       <LocalSwitcher activeColor='#B21B1B' color='black'/>
                    </div>
                </div>
                <button
                    className={cn(
                        styles.menuBtn,
                        isOpenMenu ? styles.menuBtnActive : '',
                    )}
                    onClick={toggleMenuClick}
                    title='Art House Holding'
                ><span></span></button>
            </div>
        </header>
    );
};

export default Header;
