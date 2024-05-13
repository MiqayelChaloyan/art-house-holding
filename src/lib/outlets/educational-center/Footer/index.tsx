import React from 'react';

import Link from 'next/link';

import { useLocale, useTranslations } from 'next-intl';

import GoogleMaps from '@/components/components/google-map';
import FormAppointment from '@/components/components/forms';
import FormHeader from '@/components/components/form-header';

import Logo from '@/lib/icons/educational-center/Logo';
import Email from '@/lib/icons/educational-center/Email';
import Phone from '@/lib/icons/educational-center/Phone';
import { Pages } from '@/lib/constants/pages';

import { COURSES, HOSTS, LESSONS } from '../../../../../sanity/sanity-queries/educational-center';

// import { MapProvider } from '@/lib/providers';

import styles from './styles.module.sass';


type Props = {
    courses: COURSES[]
    socialData: HOSTS
    lessons: LESSONS[]
    lessonsArmenian: LESSONS[]
};

const group = {
    ['margin']: '0 auto'
};

const Footer = ({
    courses,
    socialData,
    lessons,
    lessonsArmenian
}: Readonly<Props>) => {
    const tel = 'tel:' + socialData?.phone_number.replace(/\s/g, '');
    const t = useTranslations();
    const locale = useLocale();

    const matrix = courses.reduce((acc: any, item: any, index: number) => {
        const rowIndex = Math.floor(index / 6);
        if (!acc[rowIndex]) {
            acc[rowIndex] = [];
        }
        acc[rowIndex].push(item);
        return acc;
    }, []);

    const links = matrix.map((row: any, rowIndex: string) => (
        <div key={rowIndex} className={styles.row}>
            {
                row.map((course: any) => (
                    <Link key={course.slug} href={`/${locale}${Pages.EDUCATIONAL_HOME}/${course.slug}`} aria-label={course.course_name} className={styles.link}>
                        <p className={styles.copyright}>{course.course_name}</p>
                    </Link>
                ))
            }
        </div>
    ));

    return (
        <footer id='footer' className={styles.footer}>
            <div>
                <div id='contact' className={styles.box}>
                    <div className={styles.contact}>
                        <FormAppointment width='30%' lessons={lessons[0]?.course_name} lessonsArmenian={lessonsArmenian[0]?.course_name}>
                            <FormHeader
                                display='grid'
                                color='white'
                                justifyContent='center'
                                alignItems='center'
                                title={t('contact-us-form.title')}
                                fill='white'
                                group={group}
                                social_links={socialData?.social_links}
                            />
                        </FormAppointment>
                    </div>
                </div>
                <div className={styles.google_map}>
                    {/* <MapProvider> */}
                    <GoogleMaps width='100%' height='100%' />
                    {/* </MapProvider> */}
                    <p className={styles.address}>
                        {t('address.address')}
                    </p>
                </div>
                <div className={styles.links}>
                    <div className={styles.courses_links}>
                        {links}
                    </div>
                    <div className={styles.contain}>
                        <div className={styles.art_center_logo}>
                            <Logo
                                width='162'
                                height='44'
                                fill='#111111'
                            />
                        </div>
                        <Link
                            href={tel}
                            aria-label='Phone'
                            className={styles.icon}
                        >
                            <Phone
                                width='20'
                                height='20'
                                fill='white'
                            />
                            <p className={styles.info_web}>
                                {t('contact.tell')} {socialData?.phone_number}
                            </p>
                        </Link>
                        <Link
                            href={`mailto:${socialData?.email}`}
                            aria-label='Email'
                            className={styles.icon}
                        >
                            <Email
                                width='20'
                                height='20'
                                fill='white'
                            />
                            <p className={styles.info_web}>
                                {t('contact.email')} {socialData?.email}
                            </p>
                        </Link>
                        <p className={styles.info_web}>
                            {t('address.street')}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;