'use client'

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

// import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux';
import { openModal } from '@/store/modal_reducer';
// import { useAppDispatch } from '@/hooks/useStore';
// import { openModal } from '@/store/stateModalSlice';
// import { openModalLoading } from '@/store/stateLoadingLanguage';

import Logo from '@/lib/icons/educational-center/Logo';
import Button from '@/lib/ui/Button';
import { Pages } from '@/lib/constants/pages';

import { ArianAMU } from '@/lib/constants/font';
import { usePathname } from 'next/navigation'
import LocalSwitcher from '@/components/components/local-switcher';

import cn from 'classnames';

import styles from './styles.module.sass';


interface IHeaderProps {
    typePosition: string
    locale: string
};


const Header = ({ typePosition, locale }: IHeaderProps) => {
    const [isSticky, setIsSticky] = useState<boolean>(false);
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const pathname = usePathname();
    const t = useTranslations('navigation');

    const dispatch = useDispatch();

    // console.log(`${locale}/${Pages.EDUCATIONAL_CO_WORKER}`, pathname)


    useEffect(() => {
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
        // setTimeout(() => dispatch(openModal()), 500);
        dispatch(openModal(true))
    }

    return (
        <header className={cn(
            styles.box,
            `${typePosition === 'fixed' ? styles.boxFixed : ''}`,
            `${isSticky ? styles.boxScrolled : ''}`,
            `${isOpenMenu ? styles.boxOpenMenu : ''}`
        )}>
            <div className={`container ${styles.wrap}`}>
                <Link href={`/${locale}${Pages.EDUCATIONAL_HOME}`} aria-label={`/${locale}${Pages.EDUCATIONAL_HOME}`} className={cn(styles.logo, `${isSticky ? styles.logoSticky : ''}`)}>
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
                        <Link href={`/${locale}${Pages.EDUCATIONAL_HOME}`} aria-label='about' className={`${styles.link} ${pathname === `/${locale}${Pages.EDUCATIONAL_HOME}` ? styles.linkActive : ''} ${ArianAMU.className}`}>{t('about')}</Link>
                        <Button
                            text={t('courses')}
                            onClick={handleSubmit}
                            className={`${styles.btn} ${ArianAMU.className}`}
                        />
                        <Link href={`/${locale}${Pages.EDUCATIONAL_CO_WORKER}`} aria-label='co-workers' className={`${styles.link} ${pathname === `/${locale}${Pages.EDUCATIONAL_CO_WORKER}` ? styles.linkActive : ''} ${ArianAMU.className}`}>{t('co-workers')}</Link>
                        <Link href={`/${locale}${Pages.EDUCATIONAL_PRICE_LIST}`} aria-label='price-list' className={`${styles.link} ${pathname === `/${locale}${Pages.EDUCATIONAL_PRICE_LIST}` ? styles.linkActive : ''} ${ArianAMU.className}`}>{t('price-list')}</Link>
                    </div>
                    <div>
                        <LocalSwitcher />
                    </div>
                </div>
                <button
                    className={cn(
                        styles.menuBtn,
                        `${isOpenMenu ? styles.menuBtnActive : ''}`,
                    )}
                    onClick={toggleMenuClick}
                    title='Art Training Center Menu'
                ><span></span></button>
            </div>
        </header>
    );
};

export default Header;
