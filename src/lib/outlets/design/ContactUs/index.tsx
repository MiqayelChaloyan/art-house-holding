'use client'

import { FormEvent, memo, useState } from 'react';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import Snackbar from '@/components/components/snackbar';

import Select from '@/lib/ui/select';
import InputField from '@/lib/ui/InputField';
import InputNumber from '@/lib/ui/InputNumber';

import { Arial } from '@/lib/constants/font';

import { sendContactUsDesign } from '@/api';
import { FormContactUs } from '@/types/design';

import { LESSON, LESSONS } from '../../../../../sanity/sanity-queries/design';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
    lessons: LESSONS[]
    lessonsArmenian: LESSONS[]
};

type FormProps = {
    isLoading: boolean,
    error: boolean,
    values: FormContactUs
};


const ContactUs = ({ lessons, lessonsArmenian }: Props) => {
    const t = useTranslations();
    const pathname = usePathname();
    const [course, setCourse] = useState<string>('');
    const isOpen = pathname?.includes('/design') 
    console.log(pathname)
        // ||
        // pathname?.includes('/design/orders') ||
        // pathname?.includes('/design/contact');
        // const isOpen = ['/design', '/design/orders', '/design/contact'].some(substring => pathname?.includes(substring));

    const [open, setOpen] = useState(false);
    const [info, setInfo] = useState({
        status: 'success',
        content: t('texts.send-message-success')
    });

    const initValues = { full_name: '', email: '', phone: '', course_name: t('contact-us-form.select-course'), training_center: 44, };
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
            full_name: state.values.full_name,
            email: state.values.email,
            phone: state.values.phone,
            course_name: course,
            training_center: 44,
        };

        try {
            if (formData.course_name !== t('contact-us-form.select-course')) {
                setState((prev: FormProps) => ({
                    ...prev,
                    isLoading: true,
                }))
            };

            const res: { status: number } | any = await sendContactUsDesign(formData);

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

    const getValueToSlug = (valueName: string, slug: number | string) => {
        const course: LESSON | any = valueName === 'course_name' && lessonsArmenian[0]?.course_name.find((item: LESSON) => {
            return item.slug === slug;
        });

        if (course.course_name) {
            return setCourse(course.course_name);
        }
    };


    return !isOpen && (
        <div className={styles.container}>
            <Snackbar open={open} handleChange={handleClose} info={info} />
            <div className={styles.contact}>
                <div className={styles.line} />
                <div className={styles.contact_us}>
                    <h2 className={cn(styles.form_title, Arial.className)}>
                        {t('contact-us-form.form-title-language')}
                    </h2>
                    <div className={styles.form}>
                        <form
                            className={styles.box}
                            onSubmit={handleSubmit}
                        >
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
                                    data={lessons[0].course_name}
                                    valueName='course_name'
                                    handleChange={setState}
                                    state={state}
                                    classNameProperty='large-design'
                                    isClear={false}
                                    getValueToSlug={getValueToSlug}
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
                <div className={styles.line} />
            </div>
        </div>
    )
};

export default memo(ContactUs);