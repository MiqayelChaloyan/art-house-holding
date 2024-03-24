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
           {/* <Main/>
           <About/>
           <Promotions/>
           <OurDailyLife/>
           <Partners/> */}
           <div style={{backgroundColor: 'white', height: '400px', width: '100%', marginTop: '250px'}}></div> 
           {/* mobile 70px */}
           <div style={{backgroundColor: 'green', height: '500px', width: '100%'}}></div>
           <div style={{backgroundColor: 'black', height: '200px', width: '100%'}}></div>
           <div style={{backgroundColor: 'yellow', height: '300px', width: '100%'}}></div>
           <div style={{backgroundColor: 'black', height: '500px', width: '100%'}}></div>

        </div>
    );
}
