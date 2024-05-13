'use client'

import React from 'react';

import styles from './styles.module.sass';


const Course = () => {
  return (
    <section id='course' className={styles.container}>
      <h1>course</h1>
    </section>
  );
}

export default React.memo(Course);