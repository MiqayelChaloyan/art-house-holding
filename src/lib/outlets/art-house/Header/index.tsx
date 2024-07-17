'use client';

import React, { useState, useEffect } from 'react';

import { Link as ScrollLink } from 'react-scroll';

import { useTranslations } from 'next-intl';

import LocalSwitcher from '@/components/components/local-switcher';

import Logo from '@/lib/icons/art-house/Logo'
import { ArianAMU } from '@/lib/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


interface IHeaderProps {
    typePosition: string;
};

const navigationLinks = [
    { to: 'about', label: 'about' },
    { to: 'branches', label: 'branches' },
    { to: 'partners', label: 'partners' }
];

const Header = ({ typePosition }: Readonly<IHeaderProps>) => {
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
            <div className={cn('container', styles.wrap)}>
                <ScrollLink
                    to='about'
                    smooth={false}
                    duration={500}
                    className={cn(styles.logo, isSticky ? styles.logoSticky : '')}
                    onClick={() => handleActiveLink('about')}>
                    <Logo
                        width='212'
                        height='60'
                        fill='#111111'
                    />
                </ScrollLink>
                <div className={cn(styles.content, isOpenMenu ? styles.contentShow : '')}>
                    <div className={styles.navbar}>
                        {navigationLinks?.map(link => (
                            <ScrollLink
                                key={link.label}
                                to={link.to}
                                offset={-150}
                                smooth={false}
                                duration={500}
                                className={cn(styles.link, linkActive === link.label ? styles.linkActive : '', ArianAMU.className)}
                                onClick={() => handleActiveLink(link.to)}>
                                {t(link.label)}
                            </ScrollLink>
                        ))}
                    </div>
                    <div>
                        <LocalSwitcher
                            activeColor='#B21B1B'
                            color='black'
                        />
                    </div>
                </div>
                <button
                    className={cn(styles.menuBtn, isOpenMenu ? styles.menuBtnActive : '')}
                    onClick={toggleMenuClick}
                    title='Art House Holding'
                >
                    <span></span>
                </button>
            </div>
        </header>
    );
};

export default Header;




