'use client'

import React, { useEffect, useState } from 'react';

import { ArianAMU } from '@/lib/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


const ProgressItem = ({ value = 0, quantity }) => {
    const [percent, setPercent] = useState(value);

    useEffect(() => {
        if (percent < quantity) {
            setTimeout(() => setPercent(newval => newval + 1), 10);
        }
    }, [percent]);


    return <p className={cn(styles.percent, ArianAMU.className)}>{percent}+</p>;
};


export default React.memo(ProgressItem);






