'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';

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
      <p className='sr-only'>change language</p>
      <select
        defaultValue={localActive}
        className='bg-transparent py-2'
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value='en'>English</option>
        <option value='am'>Armenian</option>
        <option value='ru'>Russian</option>
      </select>
    </label>
  );
}
