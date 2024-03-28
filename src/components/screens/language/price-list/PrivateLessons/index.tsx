import React, { memo } from 'react';

import { Arial } from '@/lib/constants/font';

import styles from './styles.module.sass';


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
            <h1 className={styles.title}>Անհատական դասեր {'\n'} օտարերկրացիների համար</h1>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th rowSpan={2} colSpan={1}>
                                Դասավանդվող {'\n'} լեզուներ
                            </th>
                            <th rowSpan={1} colSpan={2}>
                                Անհատական դասեր {'\n'} 1 ամսվա արժեք
                            </th>
                        </tr>
                        <tr>
                            <th>Շաբաթական 3 օր</th>
                            <th>Շաբաթական 2 օր</th>
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