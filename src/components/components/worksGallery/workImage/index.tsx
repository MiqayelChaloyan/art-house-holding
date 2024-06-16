'use client'

import Image from 'next/image';
import Link from 'next/link';

import { ImagePath } from '@/types/general';

import { urlForImage } from '../../../../../sanity/imageUrlBuilder';

import styles from './styles.module.sass';


interface Props {
    image: any
};

const WorkImage = ({ image }: Readonly<Props>) => {
    const path: ImagePath = urlForImage(image);

    return (
        <Link data-fancybox="gallery" href={path?.src}>
            <Image
                src={path?.src}
                alt={image?.alt}
                priority
                className={styles.work_img}
                width={0}
                height={0}
                sizes='100vw'
                style={{ objectFit: 'cover' }}
            />
        </Link>
    )
};

export default WorkImage;