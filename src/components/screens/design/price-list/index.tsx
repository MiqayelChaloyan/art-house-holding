'use client'

import React from 'react';

import useWindowSize from '@/hooks/useWindowSize';

import Promotions from './Promotions';
import PriceList from './price-lists/PriceList';

import { PRICE_LIST } from '../../../../../sanity/sanity-queries/design';

import styles from './styles.module.sass';


interface Props {
  data: PRICE_LIST,
};

const Home = ({ data }: Readonly<Props>) => (
  <div className={styles.container}>
    <Promotions
      informatie={data?.informatie}
      our_advantages={data?.our_advantages}
    />
    <PriceList data={data?.price_list} />
  </div>
);

export default React.memo(Home);