'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import ContactUsForm from '@/components/components/form-design';

import { Arial } from '@/lib/constants/font';
import { Titles } from '@/lib/constants';

import { LESSONS } from '../../../../../sanity/sanity-queries/design';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
  lessons: LESSONS[];
  lessonsArmenian: LESSONS[];
};

const Home = ({ lessons, lessonsArmenian }: Readonly<Props>) => {
  const t = useTranslations('sections');

  return (
    <section id='contact' className={styles.container}>
      <div className={styles.titles}>
        <div>
          <div className={cn(styles['title-line'], styles['back-line'])} />
          <h2 className={cn(styles['title-back'], Arial.className)}>{Titles.contactUs}</h2>
        </div>
        <div className={styles['bottom-title']}>
          <h1 className={cn(styles.title, Arial.className)}>{t('contact-us')}</h1>
          <div className={cn(styles['title-line'], styles['bottom-line'])} />
        </div>
      </div>
      <div>
        <ContactUsForm
          lessons={lessons}
          lessonsArmenian={lessonsArmenian}
          classNameProperty='large'
        />
      </div>
    </section>
  );
};

export default React.memo(Home);