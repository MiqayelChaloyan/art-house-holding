"use client"

import { FC, memo } from 'react';

import { useTranslations } from 'next-intl';

import useWindowSize from '@/hooks/useWindowSize';

import AccordionArrow from '@/lib/icons/educational-center/AccordionArrow';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

import styles from './style.module.sass';


function daysBetweenDates(dateStr1: any, dateStr2: any) {
    const startDate = new Date(dateStr1);
    const endDate = new Date(dateStr2);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    return daysDifference;
};

type Props = {
    name: string
    list: any
    svg: string
    alt: string | undefined
    activeTab: boolean
    index: boolean
    activateTab: () => void
};

const Panel: FC<Props> = ({ name, list, svg, alt, activeTab, index, activateTab }) => {
    const size = useWindowSize();
    const t = useTranslations('price-list');

    const innerStyle = {
        height: `${activeTab === index ? `max-content` : `0px`}`,
    };

    const table = list && list.map((item: any, index: string) => {
        const result = daysBetweenDates(item.startDate, item.endDate);
        
        return (
            <table key={index}>
                <thead>
                    <tr>
                        <td>{item.course_title}</td>
                        <td>{item.amount} AMD</td>
                        <td>{`${result} ${t('days')}`}</td>
                        <td>{`${item.duration} ${t('hour')}`}</td>
                    </tr>
                </thead>
            </table>
        );
    });

    const urlForSvg: {
        src: string;
        width: any;
        height: any;
    } | any = urlForImage(svg)
        // .auto('format')
        // .fit('max')
        // .url();

    return (
        <div
            className={styles.panel}
            role="tabpanel"
            aria-expanded={activeTab === index}
            id={`panel-${index}`}
        >
            <div className={styles.panel_box}>
                <div className={styles.column}>
                    <p className={styles.panel__label} role='tab'>
                        {name}
                    </p>
                    <button onClick={activateTab} style={{ transform: activeTab !== index ? 'rotate(178deg)' : 'rotate(0deg)' }} className={styles.button_tab}>
                        <AccordionArrow width={size.width > 767 ? 50 : 25} height={size.width > 767 ? 50 : 25} fill='white' />
                    </button>
                </div>
                <div>
                    <img src={urlForSvg.src} alt={alt} className={styles.svg_icon}/>
                </div>
            </div>
            <div className={styles.panel__inner} style={innerStyle} aria-hidden={!activeTab === index}>
                <div className={styles.panel__content}>{table}</div>
            </div>
        </div>
    );
};


export default memo(Panel);