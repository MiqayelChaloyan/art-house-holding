"use client"

import Logo from '@/lib/icons/language/Logo';

import styles from './styles.module.sass';

import Link from 'next/link';
import LocalSwitcher from '@/components/components/local-switcher';
import { usePathname } from 'next/navigation';
import { Pages } from '@/lib/constants/pages';
import { ArianAMU } from '@/lib/constants/font';
import { useTranslations } from 'next-intl';
import Container from '@/components/components/container';


type IHeaderProps = {
    locale: string
};


const Header = ({ locale }: IHeaderProps) => {
    const pathname = usePathname();
    const t = useTranslations()

    return (
        <header className={styles.header}>
            <div className={styles.three}>
                <div className={styles.requests}>
                    <div className={styles.send_request}>
                        <p className={styles.triangle_text}>{t("texts.send-request")}</p>
                    </div>
                    <div className={styles.take_test}>
                        <p className={styles.triangle_text}>{t("texts.take-the-test")}</p>
                    </div>
                </div>
                <div className={styles.logo}>
                    <Logo width={255.53} height={80} fill='#F9CC48' />
                </div>
                <div className={styles.switcher}>
                    <LocalSwitcher />
                </div>
            </div>
            <Container>
                <div className={styles.nav}>
                    <Link href={`/${locale}${Pages.LANGUAGE_HOME}`} aria-label='about' className={`${styles.link} ${pathname === `/${locale}${Pages.LANGUAGE_HOME}` ? styles.linkActive : ''} ${ArianAMU.className}`}>{t('navigation.about')}</Link>
                    <Link href={`/${locale}${Pages.LANGUAGE_LANGUAGES}`} aria-label='languages' className={`${styles.link} ${pathname === `/${locale}${Pages.LANGUAGE_LANGUAGES}` ? styles.linkActive : ''} ${ArianAMU.className}`}>{t('navigation.languages')}</Link>
                    <Link href={`/${locale}${Pages.LANGUAGE_DISCOUNTS}`} aria-label='discounts' className={`${styles.link} ${pathname === `/${locale}${Pages.LANGUAGE_DISCOUNTS}` ? styles.linkActive : ''} ${ArianAMU.className}`}>{t('navigation.discounts')}</Link>
                    <Link href={`/${locale}${Pages.LANGUAGE_PRICE_LIST}`} aria-label='price-list' className={`${styles.link} ${pathname === `/${locale}${Pages.LANGUAGE_PRICE_LIST}` ? styles.linkActive : ''} ${ArianAMU.className}`}>{t('navigation.price-list')}</Link>
                    <Link href={`/${locale}${Pages.LANGUAGE_CO_WORKER}`} aria-label='co-workers' className={`${styles.link} ${pathname === `/${locale}${Pages.LANGUAGE_CO_WORKER}` ? styles.linkActive : ''} ${ArianAMU.className}`}>{t('navigation.co-workers')}</Link>
                </div>
            </Container>
        </header>
    )
}

export default Header;