'use client'

import { memo } from 'react';

import Image from 'next/image';
import styles from './styles.module.sass';
import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';


type Image = {
    _type: string
    alt: string
    _key: string
    asset: {
        _ref: string
        _type: string
    };
}

const rows = (array: Image[], chunkSize: number) =>
    Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, index) =>
        array.slice(index * chunkSize, (index + 1) * chunkSize)
    );

const Teachers = ({teachers}: any) => {
    const teachersRow = rows(teachers, 4).map((row, rowIndex) => (
        <div key={rowIndex} className={styles.teacher_row}>
            {row.map((item: any) => {
                const path: { src: string, width: number, height: number } | any = urlForImage(item.teacher_image);

                return (
                    <div key={item.slug.current} className={styles.teacher_column}>
                        <Image
                            src={path?.src}
                            alt={item?.teacher_image.alt}
                            priority
                            className={styles.teacher}
                            width={0}
                            height={0}
                            sizes='100vw'
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

export default memo(Teachers);