'use client';

import Link from 'next/link';
import { Inter } from 'next/font/google';

import styles from './styles.module.sass';


const inter = Inter({ subsets: ['latin'] });


export default function NotFound() {

    return (
        <html lang='en'>
            <body className={inter.className}>
                <div className={styles.box}>
                    <img className={styles.img} src="/assets/gif/not-found.gif" alt="error-404" />
                    <h1 className={styles.title}>Oups!</h1>
                    <p className={styles.warning}>We can’t find the page you are looking for. Here are some helpful links instead.</p>
                    <Link href='/' className={styles.button}>Go back</Link>
                </div>
            </body>
        </html>
    );
};