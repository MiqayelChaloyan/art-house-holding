// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Link as ScrollLink } from 'react-scroll';

// import Link from 'next/link';
// import { useTranslations } from 'next-intl';
// import { useRouter, usePathname } from 'next/navigation';

// import LocalSwitcher from '@/components/components/local-switcher';

// import Logo from '@/lib/icons/art-house/Logo';
// import { Pages } from '@/lib/constants/pages';
// import { ArianAMU } from '@/lib/constants/font';

// import colors from '@/themes';

// import cn from 'classnames';

// import styles from './styles.module.sass';


// interface IHeaderProps {
//     locale: string;
//     typePosition: string;
// };

// const scrollLinks = [
//     { to: 'main', label: 'main' },
//     { to: 'branches', label: 'branches' },
//     { to: 'partners', label: 'partners' }
// ];

// const Header = ({ locale, typePosition }: Readonly<IHeaderProps>) => {
//     const [isSticky, setIsSticky] = useState<boolean>(false);
//     const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
//     const [linkActive, setLinkActive] = useState<string>('');
//     const t = useTranslations('navigation');
//     const pathname = usePathname();
//     const router = useRouter();

//     useEffect(() => {
//         const handleScroll = () => {
//             setIsSticky(window.scrollY > 0);
//         };
//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     const toggleMenuClick = () => {
//         setIsOpenMenu(!isOpenMenu);
//     };

//     const handleActiveLink = (activeLink: string) => {
//         setLinkActive(activeLink);
//         setIsOpenMenu(false);
//         if (pathname === `/${locale}/${Pages.HOME_ABOUT}`) {
//             router.push(`/${locale}`);

//             setTimeout(() => {
//                 const element = document.getElementById(activeLink);
//                 if (element) {
//                     element.scrollIntoView({ behavior: 'smooth' });
//                 }
//             }, 500);
//         }
//     };

//     return (
//         <header className={cn(
//             styles.box,
//             typePosition === 'fixed' && styles.boxFixed,
//             isSticky && styles.boxScrolled,
//             isOpenMenu && styles.boxOpenMenu
//         )}>
//             <div className={cn('container', styles.wrap)}>
//                 <ScrollLink
//                     to={scrollLinks[0].to}
//                     smooth={false}
//                     duration={500}
//                     className={cn(styles.logo, isSticky && styles.logoSticky)}
//                     onClick={() => handleActiveLink(scrollLinks[0].label)}>
//                     <Logo
//                         width={212}
//                         height={60}
//                         fill={colors.black}
//                     />
//                 </ScrollLink>
//                 <div className={cn(styles.content, isOpenMenu && styles.contentShow)}>
//                     <div className={styles.navbar}>
//                         <Link
//                             href={`/${locale}/${Pages.HOME_ABOUT}`}
//                             className={cn(styles.link, linkActive === Pages.HOME_ABOUT && styles.linkActive, ArianAMU.className)}
//                             onClick={() => handleActiveLink(Pages.HOME_ABOUT)}
//                         >
//                             {t('about')}
//                         </Link>
//                         {scrollLinks?.slice(1).map(link => (
// <ScrollLink
//     key={link.label}
//     to={link.to}
//     hashSpy={false}
//     offset={-150}
//     isDynamic={false}
//     smooth={false}
//     duration={500}
//     className={cn(styles.link, linkActive === link.label && styles.linkActive, ArianAMU.className)}
//     onClick={() => handleActiveLink(link.to)}
// >
//     {t(link.label)}
// </ScrollLink>
//                         ))}
//                     </div>
//                     <div>
//                         <LocalSwitcher
//                             activeColor={colors.darkRed}
//                             color={colors.black}
//                         />
//                     </div>
//                 </div>
//                 <button
//                     className={cn(styles.menuBtn, isOpenMenu && styles.menuBtnActive)}
//                     onClick={toggleMenuClick}
//                     title='Art House Holding'
//                 >
//                     <span></span>
//                 </button>
//             </div>
//         </header>
//     );
// };

// export default Header;







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
};

const scrollLinks = [
    { to: 'main', label: 'main' },
    { to: 'branches', label: 'branches' },
    { to: 'partners', label: 'partners' }
];

const Header = ({ locale, typePosition }: Readonly<IHeaderProps>) => {
    const [isSticky, setIsSticky] = useState<boolean>(false);
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const [linkActive, setLinkActive] = useState<string>('');
    const t = useTranslations('navigation');
    const pathname = usePathname();
    const router = useRouter();

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
        if (pathname === `/${locale}/${Pages.HOME_ABOUT}`) {
            router.push(`/${locale}`);
            
            setTimeout(() => {
                const element = document.getElementById(activeLink);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1000);
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
                            className={cn(styles.link, linkActive === Pages.HOME_ABOUT && styles.linkActive, ArianAMU.className)}
                            onClick={() => handleActiveLink(Pages.HOME_ABOUT)}
                        >
                            {t('about')}
                        </Link>
                        {scrollLinks?.slice(1).map(link => (
                            <ScrollLink
                                key={link.label}
                                to={link.to}
                                hashSpy={false}
                                offset={-150}
                                isDynamic={false}
                                smooth={false}
                                duration={500}
                                className={cn(styles.link, linkActive === link.label && styles.linkActive, ArianAMU.className)}
                                onClick={() => handleActiveLink(link.to)}
                            >
                                {t(link.label)}
                            </ScrollLink>
                        ))}
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

