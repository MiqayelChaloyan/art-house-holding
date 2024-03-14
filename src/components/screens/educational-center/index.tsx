import Link from 'next/link';

import { useLocale, useTranslations } from 'next-intl';

// import Footer from '@/components/footer';
// import Header from '@/components/header';

import { EDUCATIONAL_CENTER_DEFAULT } from '../../../../sanity/sanity-queries/educational-center';


interface RootProps {
    data: EDUCATIONAL_CENTER_DEFAULT[]
}


export default function Home({ data }: Readonly<RootProps>) {
    const t = useTranslations('navigation');
    const localActive = useLocale();


    return (
        <div  style={{backgroundColor: 'red'}}>
            <header>
                <Link href={`/`}>home</Link>
                <Link href={`/${localActive}/language`}>language</Link>
                {/* <Header/> */}
            </header>
            <h1>educational</h1>
            <h1 className='text-4xl mb-4 font-semibold'>{t('about')}</h1>
            <p>{t('about')}</p>
            <footer>Custom footer art educational</footer>
        </div>
    );
}
