'use client';

import { ImgHTMLAttributes } from 'react';
import Image from 'next/image';

interface NextImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    width: number;
    height: number;
};

const NextImage = ({ src, alt= 'Image', width, height, className, ...rest }: NextImageProps) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            quality={100}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            {...rest}
        />
    );
};

export default NextImage;
