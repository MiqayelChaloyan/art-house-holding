'use client';

import { ChangeEvent, useTransition } from 'react';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

import { locales } from '@/navigation';


const localeStrings: {
  am: string
  ru: string
  en: string
  [key: string]: string
} = {
  am: 'Հայ',
  ru: 'Рус',
  en: 'Eng',
};


export default function LocalSwitcher() {

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const pathname = usePathname();


  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;

    let pathParts = '';

    if (pathname) {
      pathParts = pathname.slice(3);
    }

    startTransition(() => {
      router.replace(`/${nextLocale}${pathParts}`, { scroll: false });
    });
  };


  return (
    <label className='border-2 rounded'>
      <select
        defaultValue={localActive}
        className='bg-transparent py-2'
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value='am'>Armenian</option>
        <option value='en'>English</option>
        <option value='ru'>Russian</option>
      </select>
    </label>
  );
}