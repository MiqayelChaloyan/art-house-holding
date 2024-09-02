'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import useWindowSize from '@/hooks/useWindowSize';

import TableList from './TableList';
import AccordionList from './AccordionList';

import { MMArmenU } from '@/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: PRICE_LIST_QUERYResult;
};

const Prices = ({ data }: Readonly<Props>) => {
    const t = useTranslations('sections');
    const windowSize = useWindowSize();

    return (
        <section id='price-list'>
            <h1 className={cn(styles.title, MMArmenU)}>{t('price-list')}</h1>
            <div>
                {windowSize.width < 600 ?
                    <AccordionList data={data?.price_list} /> :
                    <TableList data={data?.price_list} />
                }
            </div>
        </section>
    )
};

export default React.memo(Prices);