'use client'

import React, { FormEvent, useState } from 'react';

import { useTranslations } from 'next-intl';

import Snackbars from '@/components/components/snackbar';
import Select from '@/lib/ui/select';
import InputField from '@/lib/ui/InputField';
import InputNumber from '@/lib/ui/InputNumber';
import TextareaField from '@/lib/ui/TextareaField';

import { sendOrderITM } from '@/api';
import { TRAINING_CENTERS } from '@/constants';

import { MMArmenU } from "@/constants/font";
import { FormOrder } from '@/types/it-m';
import { ContactUsResponse } from '@/types/general';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Form {
    isLoading: boolean;
    error: boolean;
    values: FormOrder;
};

interface Props {
    orders: ORDER[];
    ordersArmenianKeyword: ORDER[];
    classNameProperty: 'small' | 'large';
};

const Form = ({
    orders,
    ordersArmenianKeyword,
    classNameProperty
}: Readonly<Props>) => {
    const t = useTranslations();
    const [order, setOrder] = useState<string>('');

    const [open, setOpen] = useState(false);
    const [info, setInfo] = useState({
        status: 'success',
        content: t('texts.send-message-success')
    });

    const initValues = {
        firstname: '',
        lastname: '',
        surname: '',
        email: '',
        phone: '',
        order_name: t('contact-us-form.select-field'),
        message: '',
        training_center: TRAINING_CENTERS.itm_school
    };

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
            firstname: state.values.firstname,
            lastname: state.values.lastname,
            surname: state.values.surname,
            email: state.values.email,
            phone: state.values.phone,
            order_name: order,
            message: state.values.message,
            training_center: TRAINING_CENTERS.itm_school,
        };

        try {
            if (formData.order_name === '') {
                return
            };

            const res: ContactUsResponse = await sendOrderITM(formData);

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
        const order: any = valueName === 'order_name' && ordersArmenianKeyword?.find((item: ORDER) => {
            return item.slug === slug;
        });

        if (order?.order_name) {
            return setOrder(order.order_name);
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
                <div className={styles.fields}>
                    <div className={styles.block}>
                        <InputField
                            className={cn(styles.input, MMArmenU.className)}
                            name='firstname'
                            type='string'
                            placeholder={t('contact-us-form.name')}
                            requiredField={true}
                            value={values.firstname}
                            onChange={handleChange}
                        />
                        <InputField
                            className={cn(styles.input, MMArmenU.className)}
                            name='lastname'
                            type='string'
                            placeholder={t('contact-us-form.last-name')}
                            requiredField={true}
                            value={values.lastname}
                            onChange={handleChange}
                        />
                        <InputField
                            className={cn(styles.input, MMArmenU.className)}
                            name='surname'
                            type='string'
                            placeholder={t('contact-us-form.surname')}
                            requiredField={true}
                            value={values.surname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.block}>
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
                            data={orders}
                            valueName='order_name'
                            handleChange={setState}
                            state={state}
                            classNameProperty={`${classNameProperty}-itm`}
                            isClear={false}
                            getValueToSlug={getValueToSlug}
                        />
                    </div>
                </div>
                <div className={styles.field}>
                    <TextareaField
                        className={cn(styles.textarea, MMArmenU.className)}
                        name='message'
                        placeholder={t('contact-us-form.message')}
                        requiredField={true}
                        value={values.message}
                        onChange={handleChange}
                    />
                </div>
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