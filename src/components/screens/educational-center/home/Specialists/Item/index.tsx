'use client'

import React from 'react';

import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

import Button from '@/lib/ui/Button';
import { ArianAMU } from '@/lib/constants/font';

import { UrlType } from '@/types/educational-center';

import { queryId } from '../../../../../../../sanity/services/educational-center-service/courses';
import { client } from '../../../../../../../sanity/client';
import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';
import { Asset } from '../../../../../../../sanity/sanity-queries/educational-center';

import cn from 'classnames';

import styles from './style.module.sass';


type Props = {
    images: Asset[]
};

const Images = ({ images }: Readonly<Props>) => {
    const firstDivImages = images.slice(0, Math.ceil(images.length / 2));
    const secondDivImages = images.slice(Math.ceil(images.length / 2));

    return (
        <div>
            <div className={styles.gallery_row}>
                {firstDivImages?.map((image: any) => {
                    const path: UrlType | any = urlForImage(image);

                    return (
                        <Image
                            key={image._key}
                            src={path?.src}
                            alt={image.alt}
                            priority
                            className={styles.image_gallery}
                            width={0}
                            height={0}
                            sizes='100vw'
                            style={{ objectFit: 'cover' }}
                        />
                    )
                })}
            </div>
            <div className={styles.gallery_row}>
                {secondDivImages?.map((image: any) => {
                    const path: UrlType | any = urlForImage(image);

                    return (
                        <Image
                            key={image._key}
                            src={path?.src}
                            alt={image.alt}
                            priority
                            className={styles.image_gallery}
                            width={0}
                            height={0}
                            sizes='100vw'
                            style={{ objectFit: 'cover' }}
                        />
                    )
                })}
            </div>
        </div>
    );
};

const Item = ({ item }: any) => {
    const router = useRouter();
    const localActive = useLocale();
    const path: UrlType | any = urlForImage(item.specialists_section_image);

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
        <div key={item._key} className={styles.slide}>
            <div className={styles.right}>
                <Image
                    key={item._key}
                    src={path?.src}
                    alt={item.specialists_section_image.alt}
                    priority
                    className={styles.img}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ objectFit: 'contain' }}
                />
            </div>
            <div className={styles.left}>
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
                    {Images({ images: item.specialists_section_images })}
                </div>
            </div>
        </div>
    );
};

export default React.memo(Item);