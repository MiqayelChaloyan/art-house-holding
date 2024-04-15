"use client"

import { FC, FormEvent, memo, useState } from 'react';

import { useTranslations } from 'next-intl';

import Link from 'next/link';

import Container from '@/components/components/container';
import Section from '@/components/components/section';

import Gmail from '@/lib/icons/language/Gmail';
import Instagram from '@/lib/icons/language/Instagram';
import Facebook from '@/lib/icons/language/Facebook';

import Select from '@/lib/ui/select';
import InputField from '@/lib/ui/InputField';
import InputNumber from '@/lib/ui/InputNumber';

import { Hosts } from '@/lib/constants/hosts';
import { Inter, Vrdznagir } from '@/lib/constants/font';

import useWindowSize from '@/hooks/useWindowSize';

import { LANGUAGE } from '../../../../../sanity/sanity-queries/language';

import cn from 'classnames';

import styles from './styles.module.sass';
import { usePathname } from 'next/navigation';


interface Props {
    courses: LANGUAGE[]
};


const ContactUs: FC<Props> = ({ courses }) => {
    const t = useTranslations();
    const pathname = usePathname();
    const isOpen = pathname?.includes('/form')

    const initValues = { fullName: '', email: '', phone: '', course: t('contact-us-form.select-course') };
    const initState = { isLoading: false, error: '', values: initValues };

    const [state, setState] = useState<any>(initState);
    const windowSize = useWindowSize();

    const { values, isLoading, error } = state;


    const handleChange = ({ target }: any) =>
        setState((prev: any) => ({
            ...prev,
            values: {
                ...prev.values,
                [target.name]: target.value,
            },
        }));


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = {
            fullName: state.values.fullName,
            email: state.values.email,
            phone: state.values.phone,
            course: state.values.course
        };

        try {
            if (formData.course !== t('contact-us-form.select-course')) {
                setState((prev: any) => ({
                    ...prev,
                    isLoading: true,
                }));

                const res = await fetch('/api/select-course', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const { error } = await res.json();

                if (error) {
                    console.log('Error !!');
                    return;
                };

                setState(() => ({
                    ...initState,
                    isLoading: false,
                    error: error.message,
                }));
            }
        } catch (error: any) {
            setState((prev: any) => ({
                ...prev,
                isLoading: false,
                error: error.message,
            }));
        }
    };


    return !isOpen && (
        <div className={styles.container}>
            <Container>
                <div className={styles.contact}>
                    {/* <Section direction='right'> */}
                    <div className={styles.box}>
                        <h1 className={`${styles.title}  ${Vrdznagir.className}`}>{t('texts.contact-us')}</h1>
                        <div className={styles.connection} />
                    </div>
                    {/* </Section> */}
                    {/* <Section direction='left'> */}
                    <div className={styles.contact_us}>
                        <div className={styles.hosts}>
                            <Link href={Hosts.gmail} aria-label='Gmail' className={styles.social_network} target="_blank">
                                <Gmail width={windowSize.width <= 1280 ? 20 : 30} height={windowSize.width <= 1280 ? 20 : 30} fill='#F9CC48' />
                            </Link>
                            <Link href={Hosts.instagram} aria-label='Instagram' className={styles.social_network} target="_blank">
                                <Instagram width={windowSize.width <= 1280 ? 20 : 30} height={windowSize.width <= 1280 ? 20 : 30} fill='#F9CC48' />
                            </Link>
                            <Link href={Hosts.facebook} aria-label='Facebook' className={styles.social_network} target="_blank">
                                <Facebook width={windowSize.width <= 1280 ? 20 : 30} height={windowSize.width <= 1280 ? 20 : 30} fill='#F9CC48' />
                            </Link>
                        </div>
                        <div className={styles.form}>
                            <form
                                className={styles.box}
                                onSubmit={handleSubmit}
                            >
                                <h2 className={styles.form_title}>{t('contact-us-form.form-title-language')}</h2>
                                <div className={styles.fields}>
                                    <InputField
                                        className={cn(styles.input, Inter.className)}
                                        name='fullName'
                                        type='name'
                                        placeholder={t('contact-us-form.full-name')}
                                        requiredField={true}
                                        value={values.fullName}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        className={cn(styles.input, Inter.className)}
                                        name='email'
                                        type='email'
                                        placeholder={t('contact-us-form.email')}
                                        requiredField={true}
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                    <InputNumber
                                        className={cn(styles.input, Inter.className)}
                                        name='phone'
                                        type='phone'
                                        placeholder={t('contact-us-form.phone-number')}
                                        maskNumber='+374 99 99 99 99'
                                        requiredField={true}
                                        value={values.phone}
                                        onChange={handleChange}
                                    />
                                    <Select
                                        data={courses}
                                        valueName='course'
                                        handleChange={setState}
                                        state={state}
                                        classNameProperty='large'
                                        isClear={false}
                                    />
                                </div>
                                <button type='submit' className={styles.submit}>
                                    {isLoading ?
                                        <span>
                                            {`${t('contact-us-form.loading')}...`}
                                        </span>
                                        :
                                        <span>
                                            {t('contact-us-form.send')}
                                        </span>
                                    }
                                </button>
                            </form>
                        </div>
                    </div>
                    {/* </Section> */}
                </div>
            </Container>
        </div>
    )
}

export default memo(ContactUs);