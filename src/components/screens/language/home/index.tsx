import Link from 'next/link';

import { useLocale, useTranslations } from 'next-intl';
import Main from './Main';
import About from './About';
import Promotions from './Promotions';
import OurDailyLife from './OurDailyLife';


// import Footer from '@/components/footer';
// import Header from '@/components/header';
import styles from './styles.module.sass'
import Partners from './Partners';

export default function Home({locale}: any) {
    // const t = useTranslations('navigation');
    // const localActive = useLocale();


    return (
        <div className={styles.container}>
            <Main/>
            {/* <About/>
            <Promotions/> */}
           {/* <Main/>
           <About/>
           <Promotions/>
           <OurDailyLife/>
           <Partners/> */}
           {/* <div style={{backgroundColor: 'red', height: '400px', width: '100%'}}></div>  */}
           {/* mobile 70px */}

        </div>
    );
}
