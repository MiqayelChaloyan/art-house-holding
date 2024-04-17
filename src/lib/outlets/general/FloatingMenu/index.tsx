'use client'

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { useLocale } from 'next-intl';

import { GoProjectSymlink } from 'react-icons/go';

import { ArianAMU } from '@/lib/constants/font';

import { client } from '../../../../../sanity/client';
import { query } from '../../../../../sanity/services/art-house-service';
import { urlForImage } from '../../../../../sanity/imageUrlBuilder';
import { ART_HOUSE_HOME } from '../../../../../sanity/sanity-queries/art-house';

import cn from 'classnames';

import styles from './styles.module.sass';


async function getResources(locale: string) {
    try {
        const branches = await client.fetch(query, { language: locale }, { next: { revalidate: 100 } });

        if (!branches[0]) {
            return { branches: [], isError: true };
        }

        return { branches, isError: false };
    } catch (error) {
        return { branches: [], isError: true };
    }
};

const FloatingMenu = ({ website, theme }: any) => {
    const [data, setData] = useState<ART_HOUSE_HOME[]>([]);
    const componentRef = useRef<HTMLDivElement>(null);
    const activeLocale = useLocale();
    const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        (async () => {
            const { branches } = await getResources('en');
            const websites = branches[0].our_websites.filter((branch: any, index: number) => branch.words !== website);
            setData(websites);
        })()
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
                setIsActive(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const links = data.map((link: any, index: number) => {
        const path: { src: string, width: number, height: number } | any = urlForImage(link.website_logo_front);

        return (
            <li
                key={link.slug}
                style={{background: hoveredIndex === index ? '#F9CC48' : '', padding: '10px', transition: 'background 0.2s'}}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
            >
                <Link
                    href={`/${activeLocale}/${link.web_site_url}`}
                    aria-label={`/${activeLocale}/${link.web_site_url}`}
                >
                    <div className={styles.link}>
                        <img src={path?.src} className={styles.logo} />
                        <div className={styles.column}>
                            <p className={cn(styles.word, ArianAMU.className)}>{link.company_name}</p>
                            <p className={cn(styles.word, ArianAMU.className)}>{link.words}</p>
                        </div>
                        <div className={styles.column}>
                            <GoProjectSymlink/>
                        </div>
                    </div>
                </Link>
            </li>
        )
    });

    const toggleNavigation = () => setIsActive(!isActive);

    return (
        <div  ref={componentRef} className={styles.float}>
            <div className={`${styles.navigation} ${isActive ? styles.active : ''}`} style={{ background: theme }}>
                <div className={styles['menu-toggle']} onClick={toggleNavigation}></div>
                <ul className={styles.menu}>
                    {links}
                </ul>
            </div>
        </div>

    );
};

export default FloatingMenu;