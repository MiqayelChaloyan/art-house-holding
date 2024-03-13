import { useTranslations } from 'next-intl';
import Footer from '@/components/footer';
import Header from '@/components/header';



export default function Home() {
    const t = useTranslations('navigation');

    return (
        <div>
            <h1>Custom Header</h1>
            <h1 className='text-4xl mb-4 font-semibold'>{t('courses')}</h1>
            <p>{t('courses')}</p>
            <h1>Custom Footer</h1>
        </div>
    );
}


