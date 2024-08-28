'use client'

import Image from 'next/image';

import { ImagePath } from '@/types/general';

import { ArianAMU } from '@/constants/font';

import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


const Testimonial = ({ review }: any) => {
    const path: ImagePath = urlForImage(review.user_image);

    return (
        <div className={cn(styles.slide)}>
            <div className={styles.box}>
                <Image
                    priority
                    src={path?.src}
                    height={500}
                    width={500}
                    alt={review.user_image.alt}
                    className={styles.image}
                />
            </div>
            <p className={ArianAMU.className}>{review.user_feedback}</p>
            <div className={styles.details}>
                <span className={cn(styles.name, ArianAMU.className)}>
                    {review.user_name}
                </span>
            </div>
        </div>
    )
};

export default Testimonial;