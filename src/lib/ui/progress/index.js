import { memo, useEffect, useState } from 'react';

import { ArianAMU } from '@/lib/constants/font';

import styles from './styles.module.sass';


const ProgressItem = ({ value = 0, quantity }) => {
    const [percent, setPercent] = useState(value);

    useEffect(() => {
        if (percent < quantity) {
            setTimeout(() => setPercent(newval => newval + 1), 20);
        }
    }, [percent]);


    return <p className={`${styles.percent} ${ArianAMU.className}`}>{percent}</p>;
};


export default memo(ProgressItem);