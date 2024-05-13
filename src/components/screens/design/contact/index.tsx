'use client'

import React from 'react';

import { Arial } from '@/lib/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


const Home = () => {
  return (
    <section id='contact' className={styles.container}>
      <div className={styles.titles}>
        <h2 className={cn(styles['title-back'], Arial.className)}>CONTACT US</h2>
        <h1 className={cn(styles.title, Arial.className)}>ԿԱՊ ՄԵԶ ՀԵՏ</h1>
      </div>
    </section>
  );
}

export default React.memo(Home);