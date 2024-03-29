import React, { memo } from 'react';

import { useTranslations } from 'next-intl';

import { Arial } from '@/lib/constants/font';

import styles from './styles.module.sass';


interface Props {
    slug: string;
    language_type: string;
    private_lessons: string;
    duration: string;
}

interface EnglishLanguageClassesProps {
    data: Props[];
}

const EnglishLanguageClasses: React.FC<EnglishLanguageClassesProps> = ({ data }) => {
    const t = useTranslations();

    const tableRows = data?.map((item: Props, index: number) => {
        return (
            <tr key={item?.slug || index}>
                <td>{item.language_type}</td>
                <td>{item.private_lessons}</td>
                <td>{item.duration}</td>
            </tr>
        );
    });


    return (
        <div className={Arial.className}>
            <h1 className={styles.title}>{t('titles.english-language-lessons')}</h1>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th rowSpan={2} colSpan={1}>
                                {t('tables-titles.english')}
                            </th>
                            <th rowSpan={1} colSpan={1}>
                                {t('tables-titles.private-lessons')}
                            </th>
                            <th rowSpan={2} colSpan={1}>
                                {t('tables-titles.duration')}
                            </th>
                        </tr>
                        <tr>
                            <th>
                                {t('tables-titles.three-days-week')}
                            </th>
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

export default memo(EnglishLanguageClasses);