'use client'

import React, { FormEvent, useState } from 'react';

import InputField from '@/lib/ui/InputField';
import styles from './styles.module.sass';
import { useTranslations } from 'next-intl';

import cn from 'classnames';
import { Calibri, MMArmenU } from "@/constants/font";
import { FormContact } from '@/types/it-m';
import InputNumber from '@/lib/ui/InputNumber';
import TextareaField from '@/lib/ui/TextareaField';




type FormProps = {
    isLoading: boolean,
    error: boolean,
    values: FormContact
};

const Form = () => {
    const t = useTranslations();
    const [course, setCourse] = useState<string>('');

    const [open, setOpen] = useState(false);
    const [info, setInfo] = useState({
        status: 'success',
        content: t('texts.send-message-success')
    });

    const initValues = { email: '', phone: '', course_name: t('contact-us-form.select-course'), message: '', training_center: 0, }; //TRAINING_CENTERS.design_school
    const initState = { isLoading: false, error: false, values: initValues };

    const [state, setState] = useState<FormProps>(initState);
    const { values, isLoading, error } = state;


    const handleChange = ({ target }: any) =>
        setState((prev: FormProps) => ({
            ...prev,
            values: {
                ...prev.values,
                [target.name]: target.value,
            },
        }));

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = {
            email: state.values.email,
            phone: state.values.phone,
            course_name: course,
            message: state.values.message,
            training_center: 0 //TRAINING_CENTERS.design_school,
        };

        console.log(formData)
        
        // try {
        //     if (formData.course_name === '') {
        //         return
        //     }

        //     const res: ContactUsResponse = await sendContactUsDesign(formData);

        //     if (res.status !== 200) {
        //         throw new Error('Failed to send message');
        //     }

        //     // Success case
        //     setOpen(true);
        //     setInfo({
        //         status: 'success',
        //         content: t('texts.send-message-success'),
        //     });

        //     setState(() => ({
        //         ...initState,
        //         isLoading: false,
        //         error: false,
        //     }));
        // } catch (error) {    
        //     // setOpen(true);
        //     setInfo({
        //         status: 'info',
        //         content: t('texts.send-message-failure'),
        //     });

        //     setState((prev: FormProps) => ({
        //         ...prev,
        //         isLoading: false,
        //         error: true,
        //     }));
        // }
    };


    // const getValueToSlug = (valueName: string, slug: number | string) => {
    //     const course: LESSON | any = valueName === 'course_name' && lessonsArmenian[0]?.course_name.find((item: LESSON) => {
    //         return item.slug === slug;
    //     });

    //     if (course.course_name) {
    //         return setCourse(course.course_name);
    //     }
    // };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <InputField
                className={cn(styles.input, MMArmenU.className)}
                name='email'
                type='email'
                placeholder={t('contact-us-form.email')}
                requiredField={true}
                value={values.email}
                onChange={handleChange}
            />
            <InputNumber
                className={cn(styles.input, MMArmenU.className)}
                name='phone'
                type='phone'
                placeholder={t('contact-us-form.phone-number')}
                maskNumber='+374 99 99 99 99'
                requiredField={true}
                value={values.phone}
                onChange={handleChange}
            />

            <TextareaField
                className={cn(styles.textarea, MMArmenU.className)}
                name='message'
                placeholder={t('contact-us-form.message')}
                requiredField={true}
                value={values.message}
                onChange={handleChange}
            />


            <button type='submit' className={styles.button}>
                {isLoading ?
                    <span className={MMArmenU.className}>
                        {`${t('contact-us-form.loading')}...`}
                    </span>
                    :
                    <span className={MMArmenU.className}>
                        {t('contact-us-form.send')}
                    </span>
                }
            </button>
        </form>
    )
};

export default Form;