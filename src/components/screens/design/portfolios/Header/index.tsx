'use client'

import React from 'react';

import { ImagePath } from '@/types/general';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import { PORTFOLIOS } from '../../../../../../sanity/sanity-queries/design';

import styles from './styles.module.sass';


interface Props {
    data: PORTFOLIOS;
};

const Header = ({ data }: Readonly<Props>) => {
    const path: ImagePath = urlForImage(data.image);

    return (
        <div className={styles.article} style={{ backgroundImage: `url(${path?.src})` }} />
    );
};

export default Header;
