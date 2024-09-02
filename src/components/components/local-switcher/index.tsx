'use client'

import { useEffect, useRef, useState, useTransition } from 'react';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import useWindowSize from '@/hooks/useWindowSize';

import Planet from '@/lib/icons/it-m/Planet';
import { ImagePaths } from '@/constants';
import { ArianAMU, MMArmenU } from '@/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


const localeStrings: {
  [key: string]: string;
} = {
  am: 'Հայ',
  ru: 'Рус',
  en: 'Eng',
};

const localeImages: {
  [key: string]: any;
} = {
  am: ImagePaths.DESIGN.amURL,
  ru: ImagePaths.DESIGN.ruURL,
  en: ImagePaths.DESIGN.enURL
};

const keySwithcerDesign = '/design';
const keySwithcerIT_M = '/it-m'

export default function LocalSwitcher({ activeColor = '#B21B1B', color = 'black' }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const componentRef = useRef<HTMLUListElement>(null);
  const windowSize = useWindowSize();

  const onSelectChange = (locale: string) => {
    let pathParts = '';

    if (pathname) {
      pathParts = pathname.slice(3);
    }

    startTransition(() => {
      router.replace(`/${locale}${pathParts}`, { scroll: false });
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(!isOpen)
  };


  if (pathname.includes(keySwithcerIT_M)) {
    return (
      <div>
        {windowSize.width <= 991 ? (
          <div className={styles['mobile-switcher']}>
              <div>
              <Planet width={25} height={25} fill="white" />
              </div>
             <div>
             <ul className={styles['mobile-locales']}>
                {Object.keys(localeStrings).map((key) => (
                  <li
                    key={key}
                    className={cn(
                      { [styles.active]: localActive === key },
                      MMArmenU.className
                    )}
                    style={{
                      color: localActive === key ? activeColor : color,
                    }}
                    onClick={() => onSelectChange(key)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = activeColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color =
                        localActive === key ? activeColor : color;
                    }}
                  >
                    <p className={styles['mobile-value']}>
                      {localeStrings[key]}
                    </p>
                  </li>
                ))}
              </ul>
             </div>
          </div>
        ) : (
          <>
            <button className={styles.button} onClick={handleOpen}>
              <Planet width={25} height={25} fill="#5B5B5B" />
            </button>
            {isOpen && (
              <ul ref={componentRef} className={cn(styles['menu-toggle'], isOpen ? styles.open : "")}>
                {Object.keys(localeStrings).map((key) => (
                  <li
                    key={key}
                    className={cn(
                      { [styles.active]: localActive === key },
                      MMArmenU.className
                    )}
                    style={{
                      color: localActive === key ? activeColor : color,
                    }}
                    onClick={() => onSelectChange(key)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = activeColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color =
                        localActive === key ? activeColor : color;
                    }}
                  >
                    <span className={styles.value}>
                      {localeStrings[key]}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    );
  };

  if (pathname.includes(keySwithcerDesign)) {
    return pathname.includes(keySwithcerDesign) && (
      <div className={styles.switcher}>
        {Object.keys(localeImages).map((key, index) => (
          <div
            key={key}
            className={cn(
              styles.language,
              { [styles.active]: localActive === key },
              ArianAMU.className
            )}
            onClick={() => onSelectChange(key)}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = activeColor
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = localActive === key ? activeColor : color
            }}
          >
            <img
              className={styles.option}
              src={localeImages[key].default.src}
              alt={key}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.switcher}>
      {Object.keys(localeStrings).map((key, index) => (
        <div
          key={key}
          className={cn(
            styles.language,
            { [styles.active]: localActive === key },
            ArianAMU.className
          )}
          style={{
            color: localActive === key ? activeColor : color,
            borderRight: index !== Object.keys(localeStrings).length - 1 ? `2px solid ${color}` : 'none'
          }}
          onClick={() => onSelectChange(key)}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = activeColor
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = localActive === key ? activeColor : color
          }}
        >
          <span className={styles.option}>
            {localeStrings[key]}
          </span>
        </div>
      ))}
    </div>
  );
};
