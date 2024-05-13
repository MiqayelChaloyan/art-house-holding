'use client'

import React from 'react';

import styles from './styles.module.sass';


const Home = () => {
  return (
    <section id='orders' className={styles.container}>
      <h1>orders</h1>
    </section>
  );
}

export default React.memo(Home);