'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import useWindowSize from '@/src/hooks/useWindowSize';

import AccordionArrow from '@/src/lib/icons/educational-center/AccordionArrow';
import { Arial } from '@/src/constants/font';

import { ImagePath } from '@/src/types/general';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import colors from '@/src/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    name: string;
    list: PRICE_LIST[];
    svg: string;
    alt: string | undefined;
    activeTab: boolean;
    index: boolean;
    activateTab: () => void;
};

const Panel = ({ name, list, svg, alt, activeTab, index, activateTab }: Readonly<Props>) => {
    const size = useWindowSize();
    const t = useTranslations('price-list');
    const pathSvg: ImagePath = urlForImage(svg);

    const innerStyle = { height: activeTab === index ? 'max-content' : '0px' };

    const table = list?.map((item: PRICE_LIST) => (
        <table key={item?._key} className={Arial.className}>
            <thead>
                <tr>
                    <td>{item?.course_title}</td>
                    <td>{item?.amount} AMD</td>
                    <td>{item?.duration}</td>
                    <td>{`${item?.duration_of_class} ${t('hour')}`}</td>
                </tr>
            </thead>
        </table>
    ));

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
                            width={size.width <= 767 ? 25 : 50}
                            height={size.width  <= 767 ? 25 : 50}
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