'use client'

import React from 'react';

import { Arial } from '@/lib/constants/font';

import { ImagePath } from '@/types/general';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import { PORTFOLIOS } from '../../../../../../sanity/sanity-queries/design';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: PORTFOLIOS;
};

const Header = ({ data }: Readonly<Props>) => {
    const path: ImagePath = urlForImage(data.image);
    const list = data?.advantages.map((elem: string, index: number) => <li key={index}>{elem}</li>);

    return (
        <div>
            <div className={styles.image} style={{ backgroundImage: `url(${path?.src})` }} />
            <div className={cn(styles.list, Arial.className)}>
                <ul>
                    {list}
                </ul>
            </div>
        </div>
    );
};

export default Header;
