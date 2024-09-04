'use client'

import Link from 'next/link';
import Image from 'next/image';

import Fancybox from '@/components/components/fancybox';

import { Image as Asset, ImagePath } from '@/types/general';
import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';

import styles from './styles.module.sass';


const options = {
    compact: false,
    hideScrollbar: false,
    Toolbar: {
        display: {
            left: [
                "infobar",
            ],
            middle: [],
            right: [
                "close",
                "fullScreen"
            ],
        }
    },
    Images: {
        zoom: false,
    },
};


interface Props {
    image: Asset;
};

const ImageBlock = ({ image }: Readonly<Props>) => {
    const path: ImagePath = urlForImage(image);

    return path?.src && (
        <Fancybox options={options}>
            <Link
                className={styles['image-block']}
                data-fancybox="gallery"
                href={path?.src}
            >
                <Image
                    src={path?.src}
                    alt={image?.alt}
                    className={styles.picture}
                    width={500}
                    height={500}
                    priority
                />
            </Link>
        </Fancybox>
    )
};

export default ImageBlock;