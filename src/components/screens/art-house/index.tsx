import Footer from '@/components/footer';
import Header from '@/components/header';
import { useTranslations } from 'next-intl';

export default function Home() {
    const t = useTranslations('navigation');

    return (
        <div>
            <Header />
            <h1 className='text-4xl mb-4 font-semibold'>{t('about')}</h1>
            <p>{t('about')}</p>
            <Footer />
        </div>
    );
}
