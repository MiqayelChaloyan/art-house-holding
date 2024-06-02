'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import useWindowSize from '@/hooks/useWindowSize';

import TableList from '../TableList';
import AccordionList from '../AccordionList';

import { Arial } from '@/lib/constants/font';

import { PRICES } from '../../../../../../../sanity/sanity-queries/design';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: PRICES[],
};

const PriceList = ({ data }: Readonly<Props>) => {
    const t = useTranslations('sections');
    const windowSize = useWindowSize();

    return (
        <section id='price-list' className={styles.container}>
            <div className={styles.titles}>
                <h2 className={cn(styles['title-back'], Arial.className)}>PRICE LIST</h2>
                <h1 className={cn(styles.title, Arial.className)}>{t('price-list')}</h1>
            </div>
            <div>
                {windowSize.width < 600 ?
                    <AccordionList data={data} /> :
                    <TableList data={data} /> 
                }
            </div>
        </section>
    )
};

export default React.memo(PriceList);