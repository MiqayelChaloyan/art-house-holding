import React from 'react';

import Link from 'next/link';

import LocalSwitcher from './local-switcher';

import { useLocale, useTranslations } from 'next-intl';



const Header = () => {
    const localActive = useLocale();

    const t = useTranslations('navigation');

    return (
        <header className='p-4'>
            <nav className='flex items-center justify-between'>
                <Link href={`/${localActive}`}>{t('branches')}</Link>
                {/* <Link href={`/${localActive}/about`}>{t('about')}</Link> */}
                <LocalSwitcher />
            </nav>
        </header>
    );
};

export default Header;