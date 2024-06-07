'use client'

import React from 'react';

import Image from 'next/image';

import { Arial } from '@/lib/constants/font';

import { UrlType } from '@/types/design';

import { PORTFOLIOS } from '../../../../sanity/sanity-queries/design';
import { urlForImage } from '../../../../sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';
import Link from 'next/link';


interface Props {
    project: PORTFOLIOS,
    course_name: string,
    slug: string
};

const PortfolioImageCard = ({ project, course_name, slug }: Readonly<Props>) => {
    const cardImagePath: UrlType | any = urlForImage(project.image);
    const { author, image: { alt } } = project;
    let modifiedQuery = author.replace(/ /g, '_');

    return (
        <Link
            href={{
                pathname: `/en/design/portfolios/${slug}`,
                query: { author: modifiedQuery },
            }}
        >
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