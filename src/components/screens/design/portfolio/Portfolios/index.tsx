'use client'

import React, { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import Gallery from '@/components/components/gallery';

import { Arial } from '@/lib/constants/font';

import { COURSE } from '../../../../../../sanity/sanity-queries/design';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
  courses: COURSE[],
};

const defaultSearchParam = 'All';

const Portfolios = ({ courses }: Readonly<Props>) => {
  const t = useTranslations();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const property: string | null = searchParams.get('name');
  const [category, setCategory] = useState<COURSE[]>(courses);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const navigationEntries = window.performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const filteredCourses = property && property !== defaultSearchParam ? courses.filter((elem: COURSE) => elem.name === property) : courses;
    setCategory(filteredCourses);
  }, [property, courses]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  );

  const navbar: React.JSX.Element[] = courses?.map(({ course_name, _id, name }: COURSE, index: number) => (
    <Link
      key={_id}
      href={pathname + '?' + createQueryString('name', name)}
      scroll={false}
      className={cn(styles.link, styles.line, property === name ? styles.active : '', Arial.className)}
    >
      <span>
        {course_name}
      </span>
    </Link>
  ));

  return (
    <section id='portfolio' className={styles.container}>
      <div className={styles.navigation}>
        <Link
          href={pathname + '?' + createQueryString('name', defaultSearchParam)}
          scroll={false}
          className={cn(styles.link, styles.line, !property || property === defaultSearchParam ? styles.active : '', Arial.className)}
        >
          <span>
            {t('buttons.view-all')}
          </span>
        </Link>
        {navbar}
      </div>
      <div className={styles.titles}>
        <h2 className={cn(styles['title-back'], Arial.className)}>PORTFOLIO</h2>
        <h1 className={cn(styles.title, Arial.className)}>
          {t('navigation.portfolio')}
        </h1>
      </div>
      <div className={styles.gallery}>
        {loading ?
          <div className={styles['loader-card']} />
           :
          <Gallery projects={category} />
        }
      </div>
    </section>
  );
};

export default React.memo(Portfolios);
