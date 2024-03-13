import Link from 'next/link';

import { useLocale, useTranslations } from 'next-intl';

// import Footer from '@/components/footer';
import Header from '@/components/header';


export default function Home() {
    const t = useTranslations('navigation');
    const localActive = useLocale();


    return (
        <div  style={{backgroundColor: 'blue'}}>
            <header>
                <Link href={`/`}>home</Link>
                <Link href={`/${localActive}/educational-center`}>educational-center</Link>
                <Header/>
            </header>
            <h1>language</h1>
            <h1 className='text-4xl mb-4 font-semibold'>{t('about')}</h1>
            <p>{t('about')}</p>
            <footer>Custom footer language</footer>
        </div>
    );
}
