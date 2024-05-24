'use client'

import { Arial } from '@/lib/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


const OurTeam = () => {

    return (
        <div className={styles.container}>
            <div className={styles.titles}>
                <h2 className={cn(styles['title-back'], Arial.className)}>OUR TEAM</h2>
                <h1 className={cn(styles.title, Arial.className)}>ՄԵՐ ԹԻՄԸ</h1>
            </div>
        </div>
    )
};

export default OurTeam;