'use client';

import React, { useEffect } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import WebSite from './WebSite';

import { ImagePath } from '@/types/general';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

import colors from '@/themes';

import styles from './styles.module.sass';


const PortfolioSlides = ({ locale, data }: any) => {
    return data?.map((website: any) => {
        const path: ImagePath = urlForImage(website.website_image);

        return (
            <WebSite
                key={website._key}
                locale={locale}
                title={website.website_title}
                about={website.about_website}
                imgPath={path?.src}
                site_url={website.web_site_url}
            />)
    })
};


const WebSitesPortfolio = ({ locale, data }: any) => {
    useEffect(() => {
        const next = document.getElementById('next') as HTMLButtonElement | null;
        const prev = document.getElementById('prev') as HTMLButtonElement | null;

        const disableButtonsTemporarily = () => {
            if (next && prev) {
                next.disabled = true;
                prev.disabled = true;
                setTimeout(() => {
                    next.disabled = false;
                    prev.disabled = false;
                }, 500);
            }
        };

        const handleNextClick = () => {
            const items = document.querySelectorAll('.item') as NodeListOf<HTMLElement>;
            const slide = document.getElementById('slide') as HTMLElement;
            if (items.length > 0 && slide) {
                slide.appendChild(items[0]);
                disableButtonsTemporarily();
            }
        };

        const handlePrevClick = () => {
            const items = document.querySelectorAll('.item') as NodeListOf<HTMLElement>;
            const slide = document.getElementById('slide') as HTMLElement;
            if (items.length > 0 && slide) {
                slide.prepend(items[items.length - 1]);
                disableButtonsTemporarily();
            }
        };

        next?.addEventListener('click', handleNextClick);
        prev?.addEventListener('click', handlePrevClick);

        return () => {
            next?.removeEventListener('click', handleNextClick);
            prev?.removeEventListener('click', handlePrevClick);
        };
    }, []);


    return (
        <section className={styles.portfolio}>
            <div className={styles.slides}>
                <div className={styles.test}>
                    <div id='slide' className={styles.slide}>
                        <PortfolioSlides locale={locale} data={data} />
                    </div>
                    <div className={styles.button}>
                        <button id='prev' className={styles.prev}>
                            <MdKeyboardArrowLeft size={30} color={colors.white} />
                        </button>
                        <button id='next' className={styles.next}>
                            <MdKeyboardArrowRight size={30} color={colors.white} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(WebSitesPortfolio);














//website_title
//about_website
//website_image
//web_site_url