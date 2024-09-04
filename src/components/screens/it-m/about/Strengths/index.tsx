'use client'

import Image from 'next/image';

import { PortableText } from '@portabletext/react';
import components from '@/utils/PortableTextComponents';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import { ImagePath } from '@/types/general';

import cn from 'classnames';

import styles from './styles.module.sass';
import Link from 'next/link';
import Fancybox from '@/components/components/fancybox';
import { MMArmenU } from '@/constants/font';
import Container from '@/components/components/container';


interface Props {
    data: STRENGTHS[];
};


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

const Strengths = ({ data }: Readonly<Props>) => {

    const strengths = data?.map((strength, index) => (
        <div key={strength._key} className={cn(strength.showImage ? styles.block : styles['full-block'])}>
            <div className={cn(strength.showImage ? styles.right : styles['full'], data.length - 1 === index && styles['last-element'])}>
                <h1 className={styles.title}>
                    {strength.title}
                </h1>
                <div className={styles.content}>
                    <PortableText
                        value={strength.content}
                        components={components}
                    />
                </div>
            </div>
            {strength?.showImage &&
                (<div className={styles.left}>
                    <Fancybox options={options}>
                        {strength.images?.map((image, index) => {
                            const path: ImagePath = urlForImage(image);

                            return (
                                <Link
                                    key={index}
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
                            )
                        })}
                    </Fancybox>
                </div>)}
        </div>
    ))

    return (
        <section id='strengths'>
            <Container className='container'>
                <div className={cn(styles.section, MMArmenU.className)}>
                    {strengths}
                </div>
            </Container>
        </section>
    )
};

export default Strengths;