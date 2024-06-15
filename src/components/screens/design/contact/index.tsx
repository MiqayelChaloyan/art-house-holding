'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import ContactUsForm from '@/components/components/form-design';

import { Arial } from '@/lib/constants/font';

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
        <h2 className={cn(styles['title-back'], Arial.className)}>CONTACT US</h2>
        <h1 className={cn(styles.title, Arial.className)}>{t('contact-us')}</h1>
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