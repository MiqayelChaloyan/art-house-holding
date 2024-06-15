'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import OrderForm from './Form';
import OrdersGallery from './OrdersGallery';

import { Arial } from '@/lib/constants/font';

import { COURSE, ORDER } from '../../../../../sanity/sanity-queries/design';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
  courses: COURSE[];
  orders: ORDER[];
  ordersArmenian: ORDER[];
};

const Home = ({ courses, orders, ordersArmenian }: Readonly<Props>) => {
  const t = useTranslations('sections');

  return (
    <section id='orders' className={styles.container}>
      <div className={styles.titles}>
        <h2 className={cn(styles['title-back'], Arial.className)}>ORDERS</h2>
        <h1 className={cn(styles.title, Arial.className)}>{t('orders')}</h1>
      </div>
      <OrdersGallery courses={courses}/>
      <OrderForm orders={orders} ordersArmenian={ordersArmenian}/>
    </section>
  );
};

export default React.memo(Home);