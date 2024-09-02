'use client'

import React, { FormEvent, useState } from 'react';

import { useTranslations } from 'next-intl';

import Snackbars from '@/components/components/snackbar';
import Select from '@/lib/ui/select';
import InputField from '@/lib/ui/InputField';
import InputNumber from '@/lib/ui/InputNumber';
import TextareaField from '@/lib/ui/TextareaField';

import { sendContactUsITM } from '@/api';
import { TRAINING_CENTERS } from '@/constants';

import { MMArmenU } from "@/constants/font";
import { FormContact } from '@/types/it-m';
import { ContactUsResponse } from '@/types/general';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Form {
    isLoading: boolean;
    error: boolean;
    values: FormContact;
};

interface Props {
    lessons: LESSON[];
    lessonsArmenianKeyword: LESSON[];
    classNameProperty: 'small' | 'large';
};

const Form = ({
    lessons,
    lessonsArmenianKeyword,
    classNameProperty
}: Readonly<Props>) => {
    const t = useTranslations();
    const [course, setCourse] = useState<string>('');

    const [open, setOpen] = useState(false);
    const [info, setInfo] = useState({
        status: 'success',
        content: t('texts.send-message-success')
    });

    const initValues = { email: '', phone: '', course_name: t('contact-us-form.select-course'), message: '', training_center: TRAINING_CENTERS.itm_school, };
    const initState = { isLoading: false, error: false, values: initValues };

    const [state, setState] = useState<Form>(initState);
    const { values, isLoading, error } = state;


    const handleChange = ({ target }: any) =>
        setState((prev: Form) => ({
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
            training_center: TRAINING_CENTERS.itm_school,
        };

        try {
            if (formData.course_name === '') {
                return
            };

            const res: ContactUsResponse = await sendContactUsITM(formData);

            if (res.status !== 200) {
                throw new Error('Failed to send message');
            }

            // Success case
            setOpen(true);
            setInfo({
                status: 'success',
                content: t('texts.send-message-success'),
            });

            setState(() => ({
                ...initState,
                isLoading: false,
                error: false,
            }));
        } catch (error) {
            setOpen(true);
            setInfo({
                status: 'info',
                content: t('texts.send-message-failure'),
            });

            setState((prev: Form) => ({
                ...prev,
                isLoading: false,
                error: true,
            }));
        }
    };

    const getValueToSlug = (valueName: string, slug: number | string) => {
        const course: LESSON | any = valueName === 'course_name' && lessonsArmenianKeyword?.find((item: LESSON) => {
            return item.slug === slug;
        });

        if (course.course_name) {
            return setCourse(course.course_name);
        }
    };

    const handleClose = () => setOpen(false);


    return (
        <>
            <Snackbars
                open={open}
                handleChange={handleClose}
                info={info}
            />
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
                <Select
                    data={lessons}
                    valueName='course_name'
                    handleChange={setState}
                    state={state}
                    classNameProperty={`${classNameProperty}-itm`}
                    isClear={false}
                    getValueToSlug={getValueToSlug}
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
        </>
    )
};

export default Form;