import React, { memo } from 'react';

import { Arial } from '@/lib/constants/font';

import styles from './styles.module.sass';
import { useTranslations } from 'next-intl';


interface PrivateLessons {
    three_week: string;
    two_week: string;
}

interface Props {
    slug: string;
    teaching_language: string;
    group_lessons: string;
    private_lessons: PrivateLessons;
}

interface PrivateLessonsProps {
    data: Props[];
}

const PrivateLessons: React.FC<PrivateLessonsProps> = ({ data }) => {
    const t = useTranslations();

    const tableRows = data?.map((item: Props, index: number) => {
        return (
            <tr key={item?.slug || index}>
                <td>{item.teaching_language}</td>
                <td>{item.private_lessons.three_week}</td>
                <td>{item.private_lessons.two_week}</td>
            </tr>
        );
    });


    return (
        <div className={Arial.className}>
            <h1 className={styles.title}>{t('titles.private-lessons')}</h1>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th rowSpan={2} colSpan={1}>
                                {t('tables-titles.languages-taught')}
                            </th>
                            <th rowSpan={1} colSpan={2}>
                                {t('tables-titles.private-lessons')}
                            </th>
                        </tr>
                        <tr>
                            <th>{t('tables-titles.three-days-week')}</th>
                            <th>{t('tables-titles.two-days-week')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default memo(PrivateLessons);