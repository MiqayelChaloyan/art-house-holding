import { FC } from 'react';

import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import { EDUCATIONAL_CENTER_COURSES } from '../../../../../../sanity/sanity-queries/educational-center';

import styles from './style.module.sass';


type PriceListProps = {
    course: EDUCATIONAL_CENTER_COURSES | any
};

function daysBetweenDates(dateStr1: any, dateStr2: any) {
    const startDate = new Date(dateStr1);
    const endDate = new Date(dateStr2);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    return daysDifference;
};

const PriceList: FC<PriceListProps> = ({ course }) => {
    const t = useTranslations();

    const table = course[0].price_list && course[0].price_list.map((item: any) => {
        const result = daysBetweenDates(item.startDate, item.endDate);
        return (
            <table key={item.slug} className={styles.price_list_table}>
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
                <h1 className={styles.title}>{t('sections.price-list')}</h1>
            </Container>
            <div className={styles.table}>
                {table}
            </div>
        </section>
    );
};

export default PriceList;