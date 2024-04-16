'use client'

import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

import { GoProjectSymlink } from 'react-icons/go';

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

const CircleNavigation = ({ website, theme }: any) => {
    const [menuOpened, setMenuOpened] = useState<boolean>(false);
    const [data, setData] = useState<ART_HOUSE_HOME[]>([]);
    const componentRef = useRef<HTMLDivElement>(null);
    const activeLocale = useLocale();
    const router = useRouter();

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
                setMenuOpened(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpened(!menuOpened);
    };

    const closeMenu = () => {
        setMenuOpened(false);
    };

    const handleNavigate = (link: string, event: React.MouseEvent<HTMLButtonElement>) => {
        // event.preventDefault();
        router.push(`/${activeLocale}/${link}`);
    };

    const links = data.map((link: any, index: number) => {
        const path: { src: string, width: number, height: number } | any = urlForImage(link.website_logo_front);
        const menuClassName = `menu${index + 1}`;

        return (
            <div key={link.slug} className={cn(styles.menu, styles[menuClassName])} style={{ background: theme }}>
                <button onClick={(e) => handleNavigate(link.web_site_url, e)}>
                    <img src={path?.src} className={styles.logo} />
                </button>
            </div>
        )
    });


    return (
        <div ref={componentRef}>
            <div className={`${styles.menu_overlay}`} onClick={closeMenu}></div>
            <div className={styles.button} onClick={toggleMenu} style={{ background: theme }}>
                <GoProjectSymlink size={22} />
            </div>
            <div className={`${styles.cornerMenu} ${menuOpened ? styles.menuOpened : ''}`} style={{ background: theme }}>
                {links}
            </div>
        </div>
    );
};

export default CircleNavigation;
