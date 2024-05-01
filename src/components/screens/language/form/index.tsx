'use client'

import React, { FormEvent, useState } from 'react';

import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import Select from '@/lib/ui/select';
import InputField from '@/lib/ui/InputField';
import InputNumber from '@/lib/ui/InputNumber';

import { LANGUAGE } from '../../../../../sanity/sanity-queries/language';
import { Arial } from '@/lib/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';

// TODO from api
import { sendRequest } from '@/api';


type Props = {
    data: LANGUAGE[] | any
};

const Form = ({ data }: Props) => {
    const t = useTranslations();
    const [isClear, setIsClear] = useState(false);

    // 'first_name' => 'Name', 
    //         'last_name' => 'Last Name', 
    //         'phone' => '+374 00 000 000', 
    //         'email' => 'test@gmail.com', 
    //         'training_center' => 44, 
    //         'course_name' => 'Չինարեն', 
    //         'week_number_of_lessons' => 2, 
    //         'course_type' => 98, 
    //         'time_schedule' => 650,

    const initValues = {
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        training_center: 44,
        course_name: t('contact-us-form.select-course'),
        week_number_of_lessons: t('contact-us-form.select-quantity'),
        course_type: t('contact-us-form.select-course-type'),
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

        const course_type = data.course_type.filter((item: any) => item.course_type === state.values.course_type);
        const week_number_of_lessons = data.week_number_of_lessons.filter((item: any) => item.week_number_of_lessons === state.values.week_number_of_lessons);

        const formData = {
            first_name: state.values.first_name,
            last_name: state.values.last_name,
            phone: state.values.phone,
            email: state.values.email,
            training_center: 44,
            course_name: state.values.course_name,
            week_number_of_lessons: week_number_of_lessons[0].slug,
            course_type: course_type[0].slug,
        };

        try {
            if (
                formData.course_name !== t('contact-us-form.select-course') ||
                formData.week_number_of_lessons !== t('contact-us-form.select-quantity') ||
                formData.course_type !== t('contact-us-form.select-course-type')
            ) {
                setState((prev: any) => ({
                    ...prev,
                    isLoading: true,
                }));

                const res = await sendRequest(formData);
                console.log(res)

                // const res = await fetch('/api/select-request', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify(formData),
                // });

                // const { error } = await res.json();

                if (res?.status !== 200) {
                    console.log('Error !!');
                    return;
                };

                setState(() => ({
                    ...initState,
                    isLoading: false,
                    error: '',
                }));

                setIsClear(true);
            }
        } catch (error: any) {
            setState((prev: any) => ({
                ...prev,
                isLoading: false,
                error: error.message,
            }));
        }

        // try {
        //     if (
        //         formData.course !== t('contact-us-form.select-course') ||
        //         formData.quantity !== t('contact-us-form.select-quantity') ||
        //         formData.duration !== t('contact-us-form.select-duration')
        //     ) {
        //         setState((prev: any) => ({
        //             ...prev,
        //             isLoading: true,
        //         }));

        //         const res = await fetch('/api/select-request', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify(formData),
        //         });

        //         const { error } = await res.json();

        //         if (error) {
        //             console.log('Error !!');
        //             return;
        //         };

        //         setState(() => ({
        //             ...initState,
        //             isLoading: false,
        //             error: error.message,
        //         }));

        //         setIsClear(true);
        //     }
        // } catch (error: any) {
        //     setState((prev: any) => ({
        //         ...prev,
        //         isLoading: false,
        //         error: error.message,
        //     }));
        // }
    };



    return (
        <div className={styles.container}>
            <div className={styles.arrow_left} />
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
                                    className={cn(styles.input, Arial.className)}
                                    name='first_name'
                                    type='name'
                                    placeholder={t('contact-us-form.name')}
                                    requiredField={true}
                                    value={values.first_name}
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
                            </div>
                            <div className={styles.row}>
                                <InputField
                                    className={cn(styles.input, Arial.className)}
                                    name='last_name'
                                    type='name'
                                    placeholder={t('contact-us-form.last-name')}
                                    requiredField={true}
                                    value={values.last_name}
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
                            </div>
                            <div className={styles.row}>
                                <Select
                                    data={data.course_name}
                                    valueName='course_name'
                                    handleChange={setState}
                                    state={state}
                                    classNameProperty='small'
                                    isClear={isClear}
                                />
                                <Select
                                    data={data.week_number_of_lessons}
                                    valueName='week_number_of_lessons'
                                    handleChange={setState}
                                    state={state}
                                    classNameProperty='small'
                                    isClear={isClear}
                                />
                                <Select
                                    data={data.course_type}
                                    valueName='course_type'
                                    handleChange={setState}
                                    state={state}
                                    classNameProperty='small'
                                    isClear={isClear}
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
            <div className={styles.arrow_right} />
        </div>
    )
};

export default React.memo(Form);