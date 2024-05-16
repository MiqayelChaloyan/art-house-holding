'use client'

import React, { FormEvent, useState } from 'react';

import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';
import Snackbar from '@/components/components/snackbar';

import Select from '@/lib/ui/select';
import InputField from '@/lib/ui/InputField';
import InputNumber from '@/lib/ui/InputNumber';
import { Arial } from '@/lib/constants/font';

import { COURSE_NAME, COURSE_TYPE, FORM, WEEK_NUMBER_LESSONS, COURSES } from '../../../../../sanity/sanity-queries/language';

import { sendRequest } from '@/api';
import { FormLarge } from '@/types/language';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
    data: FORM | any,
    courses: COURSES[] | any,
};

type FormProps = {
    isLoading: boolean,
    error: boolean,
    values: FormLarge
};

const Form = ({ data, courses }: Readonly<Props>) => {
    const t = useTranslations();
    const [isClear, setIsClear] = useState(false);
    const [open, setOpen] = useState(false);
    const [info, setInfo] = useState({
        status: 'success',
        content: t('texts.send-message-success')
    });

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

    const initState = { isLoading: false, error: false, values: initValues };

    const [state, setState] = useState<FormProps>(initState);
    const [course, setCourse] = useState<string>('');

    const { values, isLoading } = state;

    const handleChange = ({ target }: any) => {
        setState((prev: FormProps) => ({
            ...prev,
            values: {
                ...prev.values,
                [target.name]: target.value,
            },
        }));
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const course_type = data.course_type.filter((item: COURSE_TYPE) => item.course_type === state.values.course_type);
        const week_number_of_lessons = data.week_number_of_lessons.filter((item: WEEK_NUMBER_LESSONS) => item.week_number_of_lessons === state.values.week_number_of_lessons);

        const formData = {
            first_name: state.values.first_name,
            last_name: state.values.last_name,
            phone: state.values.phone,
            email: state.values.email,
            training_center: 44,
            course_name: course,
            week_number_of_lessons: week_number_of_lessons[0].slug,
            course_type: course_type[0].slug,
        };

        try {
            if (
                formData.course_name !== t('contact-us-form.select-course') ||
                formData.week_number_of_lessons !== t('contact-us-form.select-quantity') ||
                formData.course_type !== t('contact-us-form.select-course-type')
            ) {
                setState((prev: FormProps) => ({
                    ...prev,
                    isLoading: true,
                }));

                const res: { status: number } | any = await sendRequest(formData);

                if (res?.status !== 200) {
                    setOpen(true);
                    setInfo({
                        status: 'info',
                        content: t('texts.send-message-failure')
                    });
                    setState((prev: FormProps) => ({
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
                    error: false,
                }));

                setIsClear(true);
            }
        } catch (error: any) {
            setState((prev: FormProps) => ({
                ...prev,
                isLoading: false,
                error: true,
            }));

            setOpen(true);
            setInfo({
                status: 'info',
                content: t('texts.send-message-failure')
            });
        }
    };

    const handleClose = () => setOpen(false);

    const getValueToSlug = (valueName: string, slug: number) => {
        const course = valueName === 'course_name' && courses.course_name.find((item: COURSE_NAME) => {
            return item.slug === slug;
        });

        if (course.course_name) {
            return setCourse(course.course_name);
        }
    };

    return (
        <div className={styles.container}>
            <Snackbar open={open} handleChange={handleClose} info={info} />
            <div className={styles.arrow_left} />
            <Container className='container'>
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
                                    getValueToSlug={getValueToSlug}
                                />
                                <Select
                                    data={data.week_number_of_lessons}
                                    valueName='week_number_of_lessons'
                                    handleChange={setState}
                                    state={state}
                                    classNameProperty='small'
                                    isClear={isClear}
                                    getValueToSlug={getValueToSlug}
                                />
                                <Select
                                    data={data.course_type}
                                    valueName='course_type'
                                    handleChange={setState}
                                    state={state}
                                    classNameProperty='small'
                                    isClear={isClear}
                                    getValueToSlug={getValueToSlug}
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