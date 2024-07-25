'use client'

import { Link as ScrollLink } from 'react-scroll';

import { IoIosArrowDown } from 'react-icons/io';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

import { ImagePath } from '@/types/general';

import colors from '@/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


const Header = ({ primaryTitle, secondaryTitle, bgImage }: any) => {
  const path: ImagePath = urlForImage(bgImage);

  return (
    <section className={styles.box}>
      <header className={styles.header}
        style={{
          backgroundImage: `linear-gradient(to left bottom, rgba(183, 222, 233, 0.7), #B21B1B), url(${path?.src})`
        }}
      >
        <div className={styles['text-box']}>
          <h1 className={styles['heading-primary']}>
            <span className={styles['heading-primary-main']}>
              {primaryTitle}
            </span>
            <span className={styles['heading-primary-sub']}>
              {secondaryTitle}
            </span>
          </h1>
          <ScrollLink
            to='about'
            offset={-40}
            smooth={false}
            duration={500}
            className={cn(styles['scroll-down'])}
          >
            <IoIosArrowDown size={40} color={colors.white} />
          </ScrollLink>
        </div>
      </header>
    </section>
  )
};

export default Header;