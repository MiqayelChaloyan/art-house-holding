"use client"

import Panel from './Panel';
import PrivateLessons from './PrivateLessons';
import EnglishLanguageClasses from './EnglishLanguageClasses';

import styles from './styles.module.sass';
import { PRICE_LIST_LANGUAGE } from '../../../../../sanity/sanity-queries/language';

interface Props {
    data:  PRICE_LIST_LANGUAGE[] | any
}

const Home: React.FC<Props> = ({ data }) => {
    return (
        <section id='price-list' className={styles.container}>
            <Panel data={data[0].price_list}/>
            <PrivateLessons data={data[0].private_lessons}/>
            <EnglishLanguageClasses data={data[0].english_courses}/>
        </section>
    );
}

export default Home