import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('navigation');

  return (
    <div className='my-10 text-center'>
      <p>{t('about')}</p>
    </div>
  );
}
