'use client'

import React from 'react';

import { Arial } from '@/lib/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';
import OrderForm from './Form';
import OrdersGallery from './OrdersGallery';
import { ORDER } from '../../../../../sanity/sanity-queries/design';



interface Props {
  orders: ORDER[],
  ordersArmenian: ORDER[]
};

const Home = ({ orders, ordersArmenian }: Readonly<Props>) => {
  return (
    <section id='orders' className={styles.container}>
      <div className={styles.titles}>
        <h2 className={cn(styles['title-back'], Arial.className)}>ORDERS</h2>
        <h1 className={cn(styles.title, Arial.className)}>ՊԱՏՎԵՐՆԵՐ</h1>
      </div>

      <OrdersGallery />
      <OrderForm orders={orders} ordersArmenian={ordersArmenian}/>
    </section>
  );
}

export default React.memo(Home);