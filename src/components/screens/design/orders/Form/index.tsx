'use client'

import React, { FormEvent, useState } from 'react';

import { useTranslations } from 'next-intl';

import Snackbar from '@/components/components/snackbar';

import InputField from '@/lib/ui/InputField';
import InputNumber from '@/lib/ui/InputNumber';
import TextareaField from '@/lib/ui/TextareaField';

import { Arial, Calibri } from '@/lib/constants/font';

import { sendOrderDesign } from '@/api';
import { FormOrder } from '@/types/design';

import { ORDER } from '../../../../../../sanity/sanity-queries/design';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    orders: ORDER[],
    ordersArmenian: ORDER[]
};

type FormProps = {
    isLoading: boolean,
    error: boolean,
    values: FormOrder
};

const OrderForm = ({ orders, ordersArmenian }: Readonly<Props>) => {
    const t = useTranslations();
    const [orderValue, setOrderValue] = useState<ORDER | null>(null);

    const [open, setOpen] = useState(false);
    const [info, setInfo] = useState({
        status: 'success',
        content: t('texts.send-message-success')
    });

    const initValues = { full_name: '', email: '', phone: '', order: '', message: '', training_center: 44, };
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
            order: orderValue?.order_name,
            message: state.values.message,
            training_center: 44,
        };

        try {
            if (orderValue) {
                setState((prev: FormProps) => ({
                    ...prev,
                    isLoading: true,
                }));

                const res: { status: number } | any = await sendOrderDesign(formData);

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

                setOrderValue(null);
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
            };
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

    const getValueToSlug = (slug: number | string) => {
        const order: ORDER | any = ordersArmenian?.find((item: ORDER) => {
            return item.slug === slug;
        });

        if (order.order_name) {
            return setOrderValue(order);
        }
    };

    const ordersButtons = orders.map((order: ORDER) => (
        <button
            key={order.slug}
            className={cn(styles['order-button'], Calibri.className, orderValue?.slug === order.slug && styles.disabled)}
            onClick={() => getValueToSlug(order.slug)}
            type='button'
            disabled={orderValue?.slug === order.slug}
        >
            {order.order_name}
        </button>
    )
    );


    return (
        <div className={styles.container}>
            <Snackbar open={open} handleChange={handleClose} info={info} />
            <div className={styles.contact}>
                <div className={cn(styles.contact_us)}>  
                {/* styles.line */}
                    <h2 className={cn(styles.form_title, Arial.className)}>
                        {t('contact-us-form.form-title-order')}
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
                                <div className={styles.orders}>
                                    {ordersButtons}
                                </div>
                                <TextareaField
                                    className={cn(styles.textarea, Arial.className)}
                                    name='message'
                                    placeholder={t('contact-us-form.message')}
                                    requiredField={true}
                                    value={values.message}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type='submit' className={styles.button}>
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
            </div>
        </div>
    )
};

export default OrderForm;