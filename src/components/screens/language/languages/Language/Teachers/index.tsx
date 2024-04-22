'use client'

import React from 'react';

import Image from 'next/image';

import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';

import { ImageType, Teachers as TeachersType, UrlType } from '@/types/language';

import styles from './styles.module.sass';


type Props = {
    teachers: TeachersType[] | any
}

const rows = (array: ImageType[], chunkSize: number) =>
    Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, index) =>
        array.slice(index * chunkSize, (index + 1) * chunkSize)
    );

const Teachers = ({ teachers }: Props) => {
    const teachersRow = rows(teachers, 4).map((row, rowIndex) => (
        <div key={rowIndex} className={styles.teacher_row}>
            {row.map((item: any) => {
                const path: UrlType | any = urlForImage(item.teacher_image);

                return (
                    <div
                        key={item.slug.current}
                        className={styles.teacher_column}
                    >
                        <Image
                            src={path?.src}
                            alt={item?.teacher_image.alt}
                            className={styles.teacher}
                            width={500}
                            height={500}
                            priority
                        />
                        <div className={styles.fullName}>
                            <h2>{item.fullName}</h2>
                        </div>
                    </div>
                );
            })}
        </div>
    ));

    return (
        <div className={styles.row_four}>
            {teachersRow}
        </div>
    )
};

export default React.memo(Teachers);