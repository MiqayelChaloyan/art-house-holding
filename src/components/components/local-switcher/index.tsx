'use client'

import { useTransition } from 'react';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import { ImagePaths } from '@/lib/constants';
import { ArianAMU } from '@/lib/constants/font';

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

const keySwithcer = '/design';

export default function LocalSwitcher({ activeColor = '#B21B1B', color = 'black' }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const pathname = usePathname();

  const onSelectChange = (locale: string) => {
    let pathParts = '';

    if (pathname) {
      pathParts = pathname.slice(3);
    }

    startTransition(() => {
      router.replace(`/${locale}${pathParts}`, { scroll: false });
    });
  };

  return (
    <div>
      <div className={styles.switcher}>
        {pathname.includes(keySwithcer) ? (
          <>
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
                <img className={styles.option} src={localeImages[key].default.src} alt={key} />
              </div>
            ))}
          </>
        ) : (
          <>
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
                <span className={styles.option}>{localeStrings[key]}</span>
              </div>
            ))}
          </>
        )}
      </div>
      {/* {isPending ? <p>loading...</p> : <p>no load</p>} */}
    </div>
  );
}