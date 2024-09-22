'use client'

import NextImage from '@/src/components/components/image';

import { ImagePath } from '@/src/types/general';
import { ArianAMU } from '@/src/constants/font';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    review: OUR_RATING;
};

const Testimonial = ({ review }: Readonly<Props>) => {
    const path: ImagePath = urlForImage(review?.user_image);

    return (
        <div className={cn(styles.slide)}>
            <div className={styles.box}>
                <NextImage
                    src={path?.src}
                    alt={review?.user_image.alt}
                    className={styles.image}
                    width={500}
                    height={500}
                />
            </div>
            <p className={ArianAMU.className}>
                {review?.user_feedback}
            </p>
            <div className={styles.details}>
                <span className={cn(styles.name, ArianAMU.className)}>
                    {review?.user_name}
                </span>
            </div>
        </div>
    )
};

export default Testimonial;