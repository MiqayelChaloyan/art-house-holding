import React, { memo } from 'react';

import { Arial } from '@/lib/constants/font';

import styles from './styles.module.sass';


// interface PrivateLessons {
//     three_week: string;
//     two_week: string;
// }

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
            <h1 className={styles.title}>Անգլերեն լեզվի {'\n'} խորացված դասեր</h1>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th rowSpan={2} colSpan={1}>
                            Անգլերեն
                            </th>
                            <th rowSpan={1} colSpan={1}>
                                Անհատական դասեր {'\n'} 1 ամսվա արժեք
                            </th>
                            <th rowSpan={1} colSpan={1}>
                            Տևողությունը
                            </th>
                        </tr>
                        {/* <tr>
                            <th>Շաբաթական 3 օր</th>
                            <th>Շաբաթական 2 օր</th>
                        </tr> */}
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