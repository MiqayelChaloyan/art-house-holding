'use client'

import Container from '@/components/components/container';
import styles from './styles.module.sass';
import cn from 'classnames';
import { Calibri, MMArmenU } from "@/constants/font";
import Link from 'next/link';
import Form from './Form';

const tmpSocial = [
    {
        socialName: 'WhatsApp',
        number: '+374 (96) 200 408'
    },
    {
        socialName: 'Viber',
        number: '+374 (96) 200 408'
    },
];

const address = 'Ք․ Երևան, Կենտրոն, \n Աբովյան 33/6, 0019'

const phoneNum = ['+374 (77) 520 604', '+374 (96) 200 408']

const Contacts = () => {
    return (
        <section id='contacts' className={MMArmenU.className}>
            <Container className='container'>
                <div className={styles.block}>
                    <div className={styles.left}>
                        <h2 className={styles.title}>Կապ մեզ հետ</h2>
                        <div className={styles.contacts}>
                            <div className={styles.box}>
                                {tmpSocial.map((soc, index) => (
                                    <div key={index} className={styles.social}>
                                        <span className={styles.contactName}>{soc.socialName}:</span>
                                        <Link
                                            href={`tel:${soc?.number}`}
                                            aria-label={soc?.number}
                                            className={cn(styles.contact, Calibri.className)}
                                            prefetch={true}
                                            passHref
                                        >
                                            <span>{soc?.number}</span>
                                        </Link>
                                    </div>
                                ))}
                                <div className={styles.social}>
                                    <span className={styles.contactName}>
                                        Հասցե:
                                    </span>
                                    <p className={cn(styles.address, Calibri.className)}> {address}</p>
                                </div>
                            </div>
                            <div className={styles.box}>
                                {phoneNum.map((num, index) => (
                                    <div key={index} className={styles.social}>
                                        <span className={styles.contactName}>Հեռախոս  {index + 1}:</span>
                                        <Link
                                            href={`tel:${num}`}
                                            aria-label={num}
                                            className={cn(styles.contact, Calibri.className)}
                                            prefetch={true}
                                            passHref
                                        >
                                            <span>{num}</span>
                                        </Link>
                                    </div>
                                ))}

                                <div>
                                    <span className={styles.contactName}>Այլ հարթակներ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <h2 className={styles.title}>Ուղարկել հայտ</h2>
                        <Form />
                    </div>
                </div>
            </Container>
        </section>
    )
};

export default Contacts;