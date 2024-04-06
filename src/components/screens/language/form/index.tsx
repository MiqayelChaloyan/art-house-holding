"use client"

import { FC, FormEvent, memo, useState } from 'react';

import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import Select from '@/lib/ui/select';
import InputField from '@/lib/ui/InputField';
import InputNumber from '@/lib/ui/InputNumber';

// import { LANGUAGE } from '../../../../../sanity/sanity-queries/language';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: any
};


const Form: FC<Props> = ({ data }) => {
    const t = useTranslations();

    const initValues = {
        firstName: '',
        phone: '',
        lastName: '',
        email: '',
        course: t('contact-us-form.select-course'),
        quantity: t('contact-us-form.select-quantity'),
        duration: t('contact-us-form.select-duration'),
    };

    const initState = { isLoading: false, error: '', values: initValues };

    const [state, setState] = useState<any>(initState);

    const { values, isLoading, error } = state;


    const handleChange = ({ target }: any) => {
        setState((prev: any) => ({
            ...prev,
            values: {
                ...prev.values,
                [target.name]: target.value,
            },
        }));
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = {
            firstName: state.values.firstName,
            phone: state.values.phone,
            lastName: state.values.lastName,
            email: state.values.email,
            course: state.values.course,
            quantity: state.values.quantity,
            duration: state.values.duration
        };

        try {
            if (
                formData.course !== t('contact-us-form.select-course') ||
                formData.quantity !== t('contact-us-form.select-quantity') ||
                formData.duration !== t('contact-us-form.select-duration')
            ) {
                setState((prev: any) => ({
                    ...prev,
                    isLoading: true,
                }));

                const res = await fetch('/api/select-request', {
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

    return (
        <div className={styles.container}>
            <div className={styles.arrow_left}/>
            <Container>
                <div className={styles.form}>
                    <form
                        className={styles.box}
                        onSubmit={handleSubmit}
                    >
                        <h2 className={styles.title}>{t('contact-us-form.form-title-language')}</h2>
                        <div className={styles.fields}>
                            <div className={styles.row}>
                                <InputField
                                    className={cn(`${styles.input}`)}
                                    name='firstName'
                                    type='name'
                                    placeholder={t('contact-us-form.name')}
                                    requiredField={true}
                                    value={values.firstName}
                                    onChange={handleChange}
                                />
                                <InputNumber
                                    className={cn(`${styles.input}`)}
                                    name='phone'
                                    type='phone'
                                    placeholder={t('contact-us-form.phone-number')}
                                    maskNumber='+374 99 99 99 99'
                                    requiredField={true}
                                    value={values.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.row}>
                                <InputField
                                    className={cn(`${styles.input}`)}
                                    name='lastName'
                                    type='name'
                                    placeholder={t('contact-us-form.last-name')}
                                    requiredField={true}
                                    value={values.lastName}
                                    onChange={handleChange}
                                />
                                <InputField
                                    className={cn(`${styles.input}`)}
                                    name='email'
                                    type='email'
                                    placeholder={t('contact-us-form.email')}
                                    requiredField={true}
                                    value={values.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={styles.row}>
                                <Select
                                    data={data.languages}
                                    valueName='course'
                                    handleChange={setState}
                                    state={state}
                                    classNameProperty='small'
                                />
                                <Select
                                    data={data.quantity_lessons}
                                    valueName='quantity'
                                    handleChange={setState}
                                    state={state}
                                    classNameProperty='small'
                                />
                                <Select
                                    data={data.class_duration}
                                    valueName='duration'
                                    handleChange={setState}
                                    state={state}
                                    classNameProperty='small'
                                />
                            </div>
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
            </Container>
            <div className={styles.arrow_right}/>
        </div>
    )
}

export default memo(Form);