// 'use client';

// import { useLocale } from 'next-intl';
// import { usePathname, useRouter } from 'next/navigation';
// import { ChangeEvent, useTransition } from 'react';

// export default function LocalSwitcher() {
//   const [isPending, startTransition] = useTransition();
//   const router = useRouter();
//   const localActive = useLocale();
//   const pathname = usePathname();


//   const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     const nextLocale = e.target.value;

//     let pathParts = '';

//     if (pathname) {
//       pathParts = pathname.slice(3);
//     }

//     startTransition(() => {
//       router.replace(`/${nextLocale}${pathParts}`, { scroll: false });
//     });
//   };


//   return (
//     // <label className='border-2 rounded'>
//     //   <select
//     //     defaultValue={localActive}
//     //     className='bg-transparent py-2'
//     //     onChange={onSelectChange}
//     //     disabled={isPending}
//     //   >
//     //     <option value='en'>English</option>
//     //     <option value='am'>Armenian</option>
//     //     <option value='ru'>Russian</option>
//     //   </select>
//     // </label>
//   );
// }


'use client'


import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

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
      </div>

      {/* {isPending ? <p>loading...</p> : <p>no load</p>} */}
    </div>
  );
}

