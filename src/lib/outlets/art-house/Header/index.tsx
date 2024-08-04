'use client';

import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

import LocalSwitcher from '@/components/components/local-switcher';

import Logo from '@/lib/icons/art-house/Logo';
import { Pages } from '@/lib/constants/pages';
import { ArianAMU } from '@/lib/constants/font';

import colors from '@/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


interface IHeaderProps {
    locale: string;
    typePosition: string;
    linkActive: string;
    handleChangeActiveLink: (link: string) => void;
};

const scrollLinks = [
    { to: 'main', label: 'main' },
    { to: 'partners', label: 'partners' }
];

const Header = ({ locale, typePosition, linkActive, handleChangeActiveLink }: Readonly<IHeaderProps>) => {
    const [isSticky, setIsSticky] = useState<boolean>(false);
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const t = useTranslations('navigation');
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);

            if(window.scrollY === 1655) {
                handleChangeActiveLink('partners')
            } else {
                handleChangeActiveLink('')
            }

        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenuClick = () => setIsOpenMenu(!isOpenMenu);

    const handleRouteChangeComplete = (scrollTo: string) => {
        const observer = new MutationObserver((_, obs) => {
            const element = document.getElementById(scrollTo);
            if (element) {
                const topPosition = element.offsetTop;
                window.scrollTo({ top: topPosition, behavior: 'smooth' });
                obs.disconnect();
            }
        });

        observer.observe(document, { childList: true, subtree: true });
    };

    const handleActiveLink = (newPath: string) => {
        handleChangeActiveLink(newPath);
        setIsOpenMenu(false);

        if (pathname.includes('/about')) {
            router.push('/');

            setTimeout(() => {
                handleRouteChangeComplete(newPath);
            }, 500);
        }
    };


    return (
        <header className={cn(
            styles.box,
            typePosition === 'fixed' && styles.boxFixed,
            isSticky && styles.boxScrolled,
            isOpenMenu && styles.boxOpenMenu
        )}>
            <div className={cn('container', styles.wrap)}>
                <ScrollLink
                    to={scrollLinks[0].to}
                    smooth={false}
                    duration={500}
                    className={cn(styles.logo, isSticky && styles.logoSticky)}
                    onClick={() => handleActiveLink(scrollLinks[0].label)}>
                    <Logo
                        width={212}
                        height={60}
                        fill={colors.black}
                    />
                </ScrollLink>
                <div className={cn(styles.content, isOpenMenu && styles.contentShow)}>
                    <div className={styles.navbar}>
                        <Link
                            href={`/${locale}/${Pages.HOME_ABOUT}`}
                            className={cn(styles.link, pathname.includes(Pages.HOME_ABOUT) && styles.linkActive, ArianAMU.className)}
                            onClick={() => handleActiveLink(Pages.HOME_ABOUT)}
                        >
                            {t('about')}
                        </Link>
                        <ScrollLink
                            to={`${scrollLinks[1].to}`}
                            smooth={false}
                            duration={500}
                            className={cn(styles.link, linkActive === scrollLinks[1].label && styles.linkActive, ArianAMU.className)}
                            onClick={() => handleActiveLink(scrollLinks[1].to)}
                        >
                            {t(scrollLinks[1].label)}
                        </ScrollLink>
                    </div>
                    <div>
                        <LocalSwitcher
                            activeColor={colors.darkRed}
                            color={colors.black}
                        />
                    </div>
                </div>
                <button
                    className={cn(styles.menuBtn, isOpenMenu && styles.menuBtnActive)}
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


