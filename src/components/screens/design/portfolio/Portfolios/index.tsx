'use client'

import React, { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';
import Gallery from '@/components/components/gallery';

import { Arial } from '@/lib/constants/font';

import { COURSE } from '../../../../../../sanity/sanity-queries/design';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
  courses: COURSE[],
};

const defaultSearchParam = 'All';

const Portfolios = ({ courses }: Readonly<Props>) => {
  const t = useTranslations();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const property: string | null = searchParams.get('name');
  const [category, setCategory] = useState<COURSE[]>(courses);

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

  const navbar: React.JSX.Element[] = courses?.map(({ course_name, _id, name }: COURSE) => (
    <Link
      key={_id}
      href={pathname + '?' + createQueryString('name', name)}
      className={cn(styles.btn, styles.line)}
    >
      <div className={cn(property === name ? styles.active : styles.triangle)}>
        <aside className={styles['course-button']}>
          <span
            className={cn(styles.link, Arial.className)}
          >
            {course_name}
          </span>
        </aside>
      </div>
    </Link>
  ));

  return (
    <section id='portfolio' className={styles.container}>
      <div className={styles.navigation}>
        <Link
          href={pathname + '?' + createQueryString('name', defaultSearchParam)}
          className={cn(styles.btn)}
        >
          <div className={cn(!property || property === defaultSearchParam ? styles.active : styles.triangle)}>
            <aside className={styles['course-button']}>
              <span
                className={cn(styles.link, Arial.className)}
              >
                {t('buttons.view-all')}
              </span>
            </aside>
          </div>
        </Link>
        {navbar}
      </div>
      <div className={styles.titles}>
        <h2 className={cn(styles['title-back'], Arial.className)}>PORTFOLIO</h2>
        <h1 className={cn(styles.title, Arial.className)}>
           {t('navigation.portfolio')}
        </h1>
      </div>
      <Container className='box'>
        <Gallery category={category} />
      </Container>
    </section>
  );
};

export default React.memo(Portfolios);