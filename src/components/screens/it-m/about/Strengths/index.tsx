'use client'

import Image from 'next/image';

import { PortableText } from '@portabletext/react';
import components from '@/utils/PortableTextComponents';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import { ImagePath } from '@/types/general';

import styles from './styles.module.sass';


interface Props {
    data: STRENGTHS[];
};

const Strengths = ({ data }: Readonly<Props>) => {

    const strengths = data?.map(strength => (
        <div key={strength._key}>
            <h1>{strength.title}</h1>
            <div className={styles.content}>
                <PortableText
                    value={strength.content}
                    components={components}
                />
            </div>
            {strength.showImage &&
                (<div>
                    {strength.images?.map((image, index) => {
                        const path: ImagePath = urlForImage(image);

                        return (
                            <div key={index}>
                                <Image
                                    src={path?.src}
                                    alt={image?.alt}
                                    className={styles.image}
                                    width={500}
                                    height={500}
                                    priority
                                />
                            </div>
                        )
                    })}
                </div>)}
        </div>
    ))

    return (
        <section id='strengths'>
            {strengths}
        </section>
    )
};

export default Strengths;