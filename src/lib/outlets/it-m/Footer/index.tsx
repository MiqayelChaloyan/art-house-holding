'use client'

import { useState, ChangeEvent, FormEvent } from 'react';
import cn from 'classnames';

import styles from './styles.module.sass';
import { MMArmenU } from '@/constants/font';
import { Pages } from '@/constants/pages';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl';
import BulbIcon from '@/lib/icons/it-m/Bulb';



const testCourses = [
    {
        name: 'test course'
    },
    {
        name: 'test course'
    },
    {
        name: 'test course'
    },
    {
        name: 'test course test course'
    }
]

const navigationLinks = [
    { path: Pages.DESIGN_PRICE_LIST, label: 'about' },
    { path: Pages.DESIGN_ORDERS, label: 'courses' },
    { path: Pages.DESIGN_PORTFOLIOS, label: 'orders' },
    { path: Pages.DESIGN_CONTACT, label: 'price-list' },
    { path: Pages.DESIGN_CONTACT, label: 'our-team' },
    { path: Pages.DESIGN_CONTACT, label: 'contact' }
];


interface Props {
    locale: string;
};


const Footer = ({ locale }: Readonly<Props>) => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');

    const t = useTranslations();
    const pathname = usePathname();

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
        setError(''); // Reset error on input change
    };

    const validateEmail = (email: string): boolean => {
        // Basic email regex pattern
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError('Խնդրում ենք մուտքագրել վավեր էլ․ հասցե');
            return;
        }

        console.log('Submitted:', email);
    };


    return (
        <>
            <div id='advertisement' className={cn(styles.article, MMArmenU.className)}>
                <div className={styles.bulb}>
                    <BulbIcon width={130} height={130} />
                </div>
                <h2 className={styles['advertisement-title']}>
                    ITM Training Centre
                </h2>
                <h2 className={styles['advertisement-text']}>
                    Դարձրու՛ երազանքդ իրականություն
                </h2>
            </div>
            <footer className={styles.footer}>
                <div className={styles.request}>
                    <div>
                        <p className={cn(styles['request-text'], MMArmenU.className)}>
                            <span>Գրանցվիր հիմա․</span> Ուղարկիր հայտ կամ կապվիր մեզ հետ {'\n'}
                            Էլ․ փոստի միջոցով՝ հետադարձ կապ հաստատելու համար
                        </p>
                    </div>
                    <div className={styles.newsletter}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles['form-input']}>
                                <input
                                    type="email"
                                    className={cn(styles.input, MMArmenU.className)}
                                    placeholder="էլ․ հասցե"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div className={styles['form-button']}>
                                <button
                                    type="submit"
                                    className={cn(styles.btnEnviar, MMArmenU.className)}
                                >
                                    Ուղարկել
                                </button>
                            </div>
                        </form>
                        {error && <p className={cn(styles.error, MMArmenU.className)}>{error}</p>}
                    </div>
                </div>
                <div className={styles.links}>
                    <div className={styles.nav}>
                        {navigationLinks.map((link, key) => (
                            <Link
                                key={key}
                                href={`/${locale}${link.path}`}
                                aria-label={link.path}
                                className={`${MMArmenU.className} ${styles.link} ${pathname === `/${locale}${link.path}` ? styles.linkActive : ''}`}
                                prefetch={true}
                                passHref
                            // onClick={() => setIsOpenMenu(false)}
                            >
                                {t(`navigation.${link.label}`)}
                            </Link>
                        ))}
                    </div>
                    <div className={styles.courses}>
                        {testCourses.map((link, key) => (
                            <Link
                                key={key}
                                href={`/${locale}${link.name}`}
                                aria-label={link.name}
                                className={`${MMArmenU.className} ${styles.link} ${pathname === `/${locale}${link}` ? styles.linkActive : ''}`}
                                prefetch={true}
                                passHref
                            // onClick={() => setIsOpenMenu(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className={styles.contact}>
                        <p className={styles.link}>+374 96 200 408</p>
                        <p className={styles.link}>+374 96 200 408</p>
                        <p className={styles.link}>+374 96 200 408</p>
                        <p className={styles.link}>+374 96 200 408</p>
                        <p className={styles.link}>+374 96 200 408</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
