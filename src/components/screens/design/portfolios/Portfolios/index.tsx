'use client'

import React, { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import Gallery from '@/components/components/gallery';
import { Arial } from '@/constants/font';
import { Titles } from '@/constants';

import { COURSE } from '../../../../../../sanity/sanity-queries/design';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
  courses: COURSE[];
};

const defaultSearchParam = 'All';

const Portfolios = ({ courses }: Readonly<Props>) => {
  const t = useTranslations();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const property: string | null = searchParams.get('name');
  const [allCourses, setAllCourses] = useState<COURSE[]>(courses);
  const [category, setCategory] = useState<COURSE[]>([]);

  useEffect(() => {
    const filteredCourses = property && property !== defaultSearchParam
      ? allCourses?.filter((elem: COURSE) => elem.name === property)
      : allCourses;
    setCategory(filteredCourses);
  }, [property, courses]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const navbar: React.JSX.Element[] = allCourses?.map(({ course_name, _id, name }: COURSE) => (
    <Link
      key={_id}
      href={`${pathname}?${createQueryString('name', name)}`}
      scroll={false}
      className={cn(styles.link, styles.line, property === name ? styles.active : '', Arial.className)}
    >
      <span>{course_name}</span>
    </Link>
  ));

  return (
    <section id='portfolio' className={styles.container}>
      <div className={styles.navigation}>
        <Link
          href={`${pathname}?${createQueryString('name', defaultSearchParam)}`}
          scroll={false}
          className={cn(styles.link, styles.line, !property || property === defaultSearchParam ? styles.active : '', Arial.className)}
        >
          <span>{t('buttons.view-all')}</span>
        </Link>
        {navbar}
      </div>
      <div className={styles.titles}>
        <div>
          <div className={cn(styles['title-line'], styles['back-line'])} />
          <h2 className={cn(styles['title-back'], Arial.className)}>{Titles.portfolio}</h2>
        </div>
        <div className={styles['bottom-title']}>
          <h1 className={cn(styles.title, Arial.className)}>{t('navigation.portfolios')}</h1>
          <div className={cn(styles['title-line'], styles['bottom-line'])} />
        </div>
      </div>
      <div className={styles.gallery}>
        {category.length === 0 ? (
          <div className={styles.loader}>
            <div className={styles['loader-card']} />
          </div>
        ) : (
          <div className='projects'>
            <Gallery projects={category} type='portfolios' />
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(Portfolios);
