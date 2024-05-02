'use client'

import { FormEvent, memo, useState } from 'react';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import Container from '@/components/components/container';
// import Section from '@/components/components/section';
import Snackbar from '@/components/components/snackbar';

import Gmail from '@/lib/icons/language/Gmail';
import Instagram from '@/lib/icons/language/Instagram';
import Facebook from '@/lib/icons/language/Facebook';

import Select from '@/lib/ui/select';
import InputField from '@/lib/ui/InputField';
import InputNumber from '@/lib/ui/InputNumber';

import { Hosts } from '@/lib/constants/hosts';
import { Arial, Vrdznagir } from '@/lib/constants/font';

import useWindowSize from '@/hooks/useWindowSize';

import { LANGUAGE } from '../../../../../sanity/sanity-queries/language';

import { sendContactUsLanguage } from '@/api';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    courses: LANGUAGE[]
};

const ContactUs = ({ courses }: Props) => {
    const t = useTranslations();
    const pathname = usePathname();
    const isOpen = pathname?.includes('/form')
    const [open, setOpen] = useState(false);
    const [info, setInfo] = useState({
        status: 'success',
        content: t('texts.send-message-success')
    });

    const initValues = { full_name: '', email: '', phone: '', course_name: t('contact-us-form.select-course'), training_center: 44, };
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
            full_name: state.values.full_name,
            email: state.values.email,
            phone: state.values.phone,
            course_name: state.values.course_name,
            training_center: 44,
        };

        try {
            if (formData.course_name !== t('contact-us-form.select-course')) {
                setState((prev: any) => ({
                    ...prev,
                    isLoading: true,
                }))
            };

            const res: { status: number } | any = await sendContactUsLanguage(formData);

            if (res?.status !== 200) {
                setOpen(true);
                setInfo({
                    status: 'info',
                    content: t('texts.send-message-failure')
                });
                setState((prev: any) => ({
                    ...prev,
                    isLoading: false,
                }))
                return;
            };

            setOpen(true);

            setInfo({
                status: 'success',
                content: t('texts.send-message-success')
            });

            setState(() => ({
                ...initState,
                isLoading: false,
                error: '',
            }));
        } catch (error: any) {
            setState((prev: any) => ({
                ...prev,
                isLoading: false,
                error: error.message,
            }));

            setOpen(true);
            setInfo({
                status: 'info',
                content: t('texts.send-message-failure')
            });
        }
    };

    const handleClose = () => setOpen(false);

    return !isOpen && (
        <div className={styles.container}>
            <Snackbar open={open} handleChange={handleClose} info={info}/>
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
                                <Gmail width={windowSize.width <= 1280 ? 20 : 30} height={windowSize.width <= 1280 ? 20 : 30} fill='' />
                            </Link>
                            <Link href={Hosts.instagram} aria-label='Instagram' className={styles.social_network} target="_blank">
                                <Instagram width={windowSize.width <= 1280 ? 20 : 30} height={windowSize.width <= 1280 ? 20 : 30} fill='' />
                            </Link>
                            <Link href={Hosts.facebook} aria-label='Facebook' className={styles.social_network} target="_blank">
                                <Facebook width={windowSize.width <= 1280 ? 20 : 30} height={windowSize.width <= 1280 ? 20 : 30} fill='' />
                            </Link>
                        </div>
                        <div className={styles.form}>
                            <form
                                className={styles.box}
                                onSubmit={handleSubmit}
                            >
                                <h2 className={cn(styles.form_title, Arial.className)}>{t('contact-us-form.form-title-language')}</h2>
                                <div className={styles.fields}>
                                    <InputField
                                        className={cn(styles.input, Arial.className)}
                                        name='full_name'
                                        type='name'
                                        placeholder={t('contact-us-form.full-name')}
                                        requiredField={true}
                                        value={values.full_name}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        className={cn(styles.input, Arial.className)}
                                        name='email'
                                        type='email'
                                        placeholder={t('contact-us-form.email')}
                                        requiredField={true}
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                    <InputNumber
                                        className={cn(styles.input, Arial.className)}
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
                                        valueName='course_name'
                                        handleChange={setState}
                                        state={state}
                                        classNameProperty='large'
                                        isClear={false}
                                    />
                                </div>
                                <button type='submit' className={styles.submit}>
                                    {isLoading ?
                                        <span className={Arial.className}>
                                            {`${t('contact-us-form.loading')}...`}
                                        </span>
                                        :
                                        <span className={Arial.className}>
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