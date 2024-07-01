'use client'

import React from 'react';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

import { ArianAMU } from '@/lib/constants/font';
import Button from '@/lib/ui/Button';

import { client } from '../../../../../../../../sanity/client';
import { queryId } from '../../../../../../../../sanity/services/educational-center-service/courses';
import { urlForImage } from '../../../../../../../../sanity/imageUrlBuilder';

import { ImagePath } from '@/types/general';
import { Course } from '@/types/educational-center';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: Course;
};

const TeacherWithWorksImages = ({ item }: Readonly<Props & any>) => {
    const router = useRouter();
    const localActive = useLocale();
    const path: ImagePath = urlForImage(item.specialists_section_image);

    const imageGallery = item?.specialists_section_images.map((image: any, index: number) => {
        const path: ImagePath = urlForImage(image);

        return (
            <Image
                key={image._key}
                src={path?.src}
                alt={image._key}
                priority
                className={styles.work}
                width={0}
                height={0}
                sizes='100vw'
                style={{ objectFit: 'cover' }}
            />
        );
    });

    const getResources = async () => {
        const _id = item.categories._ref;

        try {
            const data = await client.fetch(queryId, { _id, language: localActive }, { cache: 'no-store' });
            router.push(`educational-center/${data.slug}`);
        } catch (error) {
            notFound()
        }
    };

    return (
        <div className={styles['teacher-with-works-images']}>
            <div className={styles.column}>
                <Image
                    key={item._key}
                    src={path?.src}
                    alt={item.specialists_section_image.alt}
                    priority
                    className={styles.image}
                    width={0}
                    height={0}
                    sizes='100vw'
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className={styles.column}>
                <div className={styles.header}>
                    <div className={styles.point} />
                    <h2 className={cn(styles.teacher, ArianAMU.className)}>
                        {item.title}
                    </h2>
                </div>
                <Button
                    className={cn(styles.button, ArianAMU.className)}
                    text={item.course_name}
                    onClick={getResources}
                />
                <div className={styles.gallery}>
                    {imageGallery}
                </div>
            </div>
        </div>
    );
};

export default React.memo(TeacherWithWorksImages);
