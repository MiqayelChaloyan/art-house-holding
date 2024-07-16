'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import useWindowSize from '@/hooks/useWindowSize';

import AccordionArrow from '@/lib/icons/educational-center/AccordionArrow';
import { Arial } from '@/lib/constants/font';

import { ImagePath } from '@/types/general';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

import colors from '@/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    name: string;
    list: any;
    svg: string;
    alt: string | undefined;
    activeTab: boolean;
    index: boolean;
    activateTab: () => void;
};

function daysBetweenDates(dateStr1: number, dateStr2: number) {
    const startDate = new Date(dateStr1);
    const endDate = new Date(dateStr2);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    return daysDifference;
};

const Panel = ({ name, list, svg, alt, activeTab, index, activateTab }: Readonly<Props>) => {
    const size = useWindowSize();
    const t = useTranslations('price-list');
    const pathSvg: ImagePath = urlForImage(svg);

    const innerStyle = { height: activeTab === index ? 'max-content' : '0px' };

    const table = list?.map((item: any, index: string) => {
        const result = daysBetweenDates(item.startDate, item.endDate);

        return (
            <table key={index} className={Arial.className}>
                <thead>
                    <tr>
                        <td>{item.course_title}</td>
                        <td>{item.amount} AMD</td>
                        <td>{`${result} ${t('month')}`}</td>
                        <td>{`${item.duration} ${t('hour')}`}</td>
                    </tr>
                </thead>
            </table>
        );
    });

    return (
        <div
            className={styles.panel}
            role='tabpanel'
            aria-expanded={activeTab === index}
            id={`panel-${index}`}
        >
            <div className={styles.panel_box}>
                <div className={styles.column}>
                    <p className={cn(styles.panel__label, Arial.className)} role='tab'>
                        {name}
                    </p>
                    <button
                        onClick={activateTab}
                        style={{ transform: activeTab !== index ? 'rotate(178deg)' : 'rotate(0deg)' }}
                        className={styles.button_tab}
                    >
                        <AccordionArrow
                            width={size.width > 767 ? 50 : 25}
                            height={size.width > 767 ? 50 : 25}
                            fill={colors.white}
                        />
                    </button>
                </div>
                <div>
                    <img
                        src={pathSvg?.src}
                        alt={alt}
                        className={styles.svg_icon}
                    />
                </div>
            </div>
            <div
                className={styles.panel__inner}
                style={innerStyle}
                aria-hidden={!activeTab === index}
            >
                <div className={styles.panel__content}>
                    {table}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Panel);