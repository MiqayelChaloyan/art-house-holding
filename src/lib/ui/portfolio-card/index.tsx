'use client'

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';

import { Arial } from '@/constants/font';

import { urlForImage } from '../../../../sanity/imageUrlBuilder';

import { ImagePath } from '@/types/general';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    project: PORTFOLIO;
    course_name: string | any;
    slug: string | any;
    type?: string;
};

const PortfolioImageCard = ({
    project,
    course_name,
    slug,
    type
}: Readonly<Props>) => {
    const cardImagePath: ImagePath = urlForImage(project.image);
    const activeLocale = useLocale();
    const { _key, author, image: { alt } } = project;

    console.log(type)

    return (
        <Link href={{ pathname: `/${activeLocale}/design/${type}/${encodeURIComponent(slug)}`, query: { name: _key } }}>
            <figure className={styles.figure}>
                <Image
                    priority
                    src={cardImagePath?.src}
                    height={500}
                    width={500}
                    alt={alt}
                    className={styles.image}
                />
                <div className={styles.overlay}>
                    <div className={styles.items} />
                    <div className={cn(styles.author, styles.items)}>
                        <p className={Arial.className}>{author}</p>
                        <hr />
                    </div>
                    <div className={cn(styles['course-name'], styles.items)}>
                        <p className={Arial.className}>{course_name}</p>
                    </div>
                </div>
            </figure>
        </Link>
    );
};

export default React.memo(PortfolioImageCard);