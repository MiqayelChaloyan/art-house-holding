'use client';

import Link from 'next/link';

import Container from '@/components/components/container';

import { ArianAMU } from '@/lib/constants/font';

import '@/styles/globals.sass';

import styles from './styles.module.sass';


export default function NotFound() {

    return (
        <html lang='en'>
            <body className={`${styles.link} ${ArianAMU.className}`}>
                <Container>
                    <div className={styles.not_found}>
                        <div className={styles.left}>
                            <h2 className={styles.title}> 404 </h2>
                            <h2 className={styles.subtitle}>
                                <span> Lost </span>in Space
                            </h2>
                            <p className={styles.warning}>
                                You have reached the edge of the universe. the page you requested could not be found. Don`&apos;`t worry and return to the previous page.
                            </p>
                            <div>
                                <Link href='/' className={styles.button}>GO HOME</Link>
                            </div>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.astronautas} />
                        </div>
                    </div>
                </Container>
            </body>
        </html>
    );
};