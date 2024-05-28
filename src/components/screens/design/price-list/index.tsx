'use client'

import React from 'react';

import { Arial } from '@/lib/constants/font';

import { PRICE_LIST } from '../../../../../sanity/sanity-queries/design';

import cn from 'classnames';

import styles from './styles.module.sass';
import Promotions from './Promotions';
import PriceList from './PriceList';


type Props = {
  data: PRICE_LIST
}

const Home = ({ data }: Readonly<Props>) => {
  return (
    <div className={styles.container}>
      <Promotions
        informatie={data?.informatie}
        our_advantages={data?.our_advantages}
      />
      <PriceList data={data?.price_list} />
    </div>
  );
}

export default React.memo(Home);