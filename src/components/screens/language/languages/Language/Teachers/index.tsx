'use client'

import React from 'react';

import Image from 'next/image';

import { Arial } from '@/lib/constants/font';
import { ImagePath } from '@/types/general';

import { TEACHER } from '../../../../../../../sanity/sanity-queries/language';
import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';

import styles from './styles.module.sass';


interface Props {
    teachers: TEACHER[];
};

const Teachers = ({
    teachers
}: Readonly<Props>) => (
    <div className={styles.teachers}>
        {teachers?.map((item: TEACHER) => {
            const path: ImagePath = urlForImage(item.teacher_image);
            return (
                <div key={item._key} className={styles['about-teacher']} >
                    <Image
                        src={path?.src}
                        alt={item?.teacher_image.alt}
                        className={styles.teacher}
                        width={500}
                        height={500}
                        priority
                    />
                    <div className={styles.fullName}>
                        <h3 className={Arial.className}>{item.fullName}</h3>
                    </div>
                </div>
            );
        })}
    </div>
);

export default React.memo(Teachers);