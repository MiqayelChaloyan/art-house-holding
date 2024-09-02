'use client'

import Image from 'next/image';
import Link from 'next/link';

import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';

import { Image as Asset, ImagePath } from '@/types/general';

import styles from './styles.module.sass';


interface Props {
    image: Asset;
};

const ImageBlock = ({ image }: Readonly<Props>) => {
    const path: ImagePath = urlForImage(image);

    return (
        <Link
            className={styles.box}
            data-fancybox="gallery"
            href={path?.src}
        >
            <Image
                src={path?.src}
                alt={image?.alt}
                className={styles.image}
                width={500}
                height={500}
                priority
            />
        </Link>
    )
};

export default ImageBlock;