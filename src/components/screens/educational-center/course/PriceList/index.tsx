'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import { Inter } from '@/lib/constants/font';

import { PRICE_LIST } from '../../../../../../sanity/sanity-queries/educational-center';

import cn from 'classnames';

import styles from './style.module.sass';


type Props = {
    price_list: PRICE_LIST[]
};

function daysBetweenDates(dateStr1: string, dateStr2: string) {
    const startDate = new Date(dateStr1);
    const endDate = new Date(dateStr2);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    return daysDifference;
};

const PriceList= ({ price_list }: Readonly<Props>) => {
    const t = useTranslations();

    const table = price_list && price_list?.map((item: PRICE_LIST) => {
        const result = daysBetweenDates(item.startDate, item.endDate);
        return (
            <table key={item._key} className={styles.price_list_table}>
                <thead>
                    <tr className={styles.list}>
                        <td>{item.course_title}</td>
                        <td>{item.amount} AMD</td>
                        <td>{`${result} ${t('price-list.days')}`}</td>
                        <td>{`${item.duration} ${t('price-list.hour')}`}</td>
                    </tr>
                </thead>
            </table>
        );
    });

    return (
        <section id='price-list' className={styles.container}>
            <Container>
                <h1 className={cn(styles.title, Inter.className)}>
                    {t('sections.price-list')}
                </h1>
            </Container>
            <div className={styles.table}>
                {table}
            </div>
        </section>
    );
};

export default React.memo(PriceList);