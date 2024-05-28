

'use client'

import React from 'react';
import { useTranslations } from 'next-intl';

import { Arial } from '@/lib/constants/font';

import { PRICES } from '../../../../../../sanity/sanity-queries/design';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
    data: PRICES[]
}

const PriceList = ({ data }: Readonly<Props>) => {
    const t = useTranslations('tables-titles');

    const tableRows: JSX.Element[] = data?.map((item: any) => {
        return (
            <tr key={item._key}>
                <td className={styles.course}>{item.course}</td>
                <td className={styles['horizontal-line']} />
                <td className={cn(styles.hex)}>{item.group_lessons}</td>
                <td className={styles['vertical-line']} />
                <td className={styles['horizontal-line']} />
                <td className={cn(styles.hex)}>{item.personal_lessons}</td>
                <td className={styles['vertical-line']} />
                <td className={styles['horizontal-line']} />
                <td className={cn(styles.hex)}>{item.duration}</td>
                <td className={styles['vertical-line']} />
                <td className={styles['horizontal-line']} />
                <td className={cn(styles.hex)}>{item.hours_lessons}</td>
                <td className={styles['vertical-line']} />
            </tr>
        );
    });

    return (
        <section id='price-list' className={styles.container}>
            {/* <div className={styles.titles}>
                <h2 className={cn(styles['title-back'], Arial.className)}>PRICE LIST</h2>
                <h1 className={cn(styles.title, Arial.className)}>ԳՆԱՑՈՒՑԱԿ</h1>
            </div> */}


            <div className={cn(styles.table, Arial.className)}>
                <table>
                    <thead>
                        <tr>
                            <th rowSpan={1} colSpan={1}>{t('course')}</th>
                            <td className={styles['horizontal-line-row']} />
                            <th rowSpan={1} colSpan={1}>{t('group')}</th>
                            <td className={styles['horizontal-line-row']} />
                            <th rowSpan={1} colSpan={1}>{t('individual')}</th>
                            <td className={styles['horizontal-line-row']} />
                            <th rowSpan={1} colSpan={1}>{t('duration-all')}</th>
                            <td className={styles['horizontal-line-row']} />
                            <th rowSpan={1} colSpan={1}>{t('hours-all')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        </section>
    )
};

export default PriceList;