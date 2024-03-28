"use client"

import Link from 'next/link';

import { useLocale, useTranslations } from 'next-intl';
import Panel from './Panel';
import PrivateLessons from './PrivateLessons';
import EnglishLanguageClasses from './EnglishLanguageClasses';



// import Footer from '@/components/footer';
// import Header from '@/components/header';
// import styles from './styles.module.sass'

export default function Home({ data }: any) {
    // const t = useTranslations('navigation');
    // const localActive = useLocale();

    return (
        <section id='price-list'>
            <Panel data={data[0].price_list}/>
            <PrivateLessons data={data[0].private_lessons}/>
            <EnglishLanguageClasses data={data[0].english_courses}/>
        </section>
    );
}
