'use client'

import React from 'react';

import Portfolio from '@/lib/ui/portfolio';

import { UrlType } from '@/types/design';

import { COURSE, PORTFOLIO } from '../../../../sanity/sanity-queries/design';
import { urlForImage } from '../../../../sanity/imageUrlBuilder';

import styles from './styles.module.sass';


type Props = {
    category: COURSE[],
};

const Gallery = ({ category }: Readonly<Props>) => {
    const gallery: React.JSX.Element[]  = category.flatMap((item: COURSE, index: number) => {
        return item.portfolio.map((elem: PORTFOLIO) => {
            const path: UrlType | any = urlForImage(elem.image);

            return (
                <Portfolio
                    key={elem._key || index}
                    src={path?.src}
                    alt={elem.image.alt}
                    author={elem.author}
                    course_name={item.course_name}
                />
            );
        });
    });

    return (
        <div className={styles.portfolios}>
            {gallery}
        </div>
    );
};

export default React.memo(Gallery);