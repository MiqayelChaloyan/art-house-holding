"use client"

import { memo } from 'react';
// import { useTranslation } from 'react-i18next';

// import { useRouter } from 'next/router';
import Image from 'next/image';

import Button from '@/lib/ui/Button';

import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';
import { getCourseById } from '../../../../../../../sanity/services/educational-center-service/courses';

import { ArianAMU } from '@/lib/constants/font';

import styles from './style.module.sass';


const Images = ({ images }: any) => {
    const firstDivImages = images.slice(0, Math.ceil(images.length / 2));
    const secondDivImages = images.slice(Math.ceil(images.length / 2));

    return (
        <div>
            <div className={styles.gallery_row}>
                {firstDivImages.map((image: any) => {
                    const urlForImageOne = urlForImage(image)
                        // .auto('format')
                        // .fit('max')
                        // .url();

                    return (
                        <Image
                            key={image._key}
                            src={urlForImageOne?.src}
                            alt={image.alt}
                            priority
                            className={styles.image_gallery}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ objectFit: 'cover' }}
                        />
                    );
                })}
            </div>
            <div className={styles.gallery_row}>
                {secondDivImages.map((image: any) => {
                    const urlForImageOne = urlForImage(image)
                        // .auto('format')
                        // .fit('max')
                        // .url();

                    return (
                        <Image
                            key={image._key}
                            src={urlForImageOne?.src}
                            alt={image.alt}
                            priority
                            className={styles.image_gallery}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ objectFit: 'cover' }}
                        />
                    );
                })}
            </div>
        </div>
    );
};


const Item = ({ item }: any) => {
    // const router = useRouter();
    // const { i18n } = useTranslation();

    const urlFor = urlForImage(item.specialists_section_image)
        // .auto('format')
        // .fit('max')
        // .url();

    // const goCoursePage = async () => {
    //     const data = await getCourseById(item.categories._ref, i18n.language);
    //     return router.push(`${i18n.language}/courses/${data.slug}`);
    // };

    return (
        <div key={item._key} className={styles.slide}>
            <div className={styles.right}>
                <Image
                    key={item._key}
                    src={urlFor?.src}
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
                    <h2 className={`${styles.teacher} ${ArianAMU.className}`}>{item.title}</h2>
                </div>
                <Button
                    className={`${styles.button} ${ArianAMU.className}`}
                    text={item.course_name}
                    onClick={() => console.log('goCoursePage')
                    }
                />
                <div className={styles.gallery}>
                    {Images({ images: item.specialists_section_images })}
                </div>
            </div>
        </div>
    );
};

export default memo(Item);