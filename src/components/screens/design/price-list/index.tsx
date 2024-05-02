'use client'

import React from 'react';

import styles from './styles.module.sass';


// type Props = {
//     data:  PRICE_LIST_LANGUAGE[] | any
// }

const Home= () => {
    return (
        <section id='price-list' className={styles.container}>
          <h1>price list</h1>
        </section>
    );
}

export default React.memo(Home);