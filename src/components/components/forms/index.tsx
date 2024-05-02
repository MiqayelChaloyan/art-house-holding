'use client'

import React, { useState, FormEvent } from 'react';

import { useTranslations } from 'next-intl';

import InputField from '@/lib/ui/InputField';
import InputNumber from '@/lib/ui/InputNumber';
import TextareaField from '@/lib/ui/TextareaField';

import { sendContactUsEducational } from '@/api';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
	className?: string
	width?: string
	children: React.ReactNode
};

const initValues = { full_name: '', email: '', phone: '', training_center: 46, message: '' };
const initState = { isLoading: false, error: '', values: initValues };

const FormAppointment: React.FC<Props> = ({ className, width, children }) => {
	const [state, setState] = useState<any>(initState);
	const { values, isLoading, error } = state;
	const t = useTranslations('contact-us-form');

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
			training_center: 46,
			message: `${state.values.message}`
		};

		try {

			setState((prev: any) => ({
				...prev,
				isLoading: true,
			}));

			const res: { status: number } | any = await sendContactUsEducational(formData);

			if (res?.status !== 200) {
				return;
			};

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
		}
	};

	return (
		<form
			className={cn(className, styles.box)}
			onSubmit={handleSubmit}
		>
			<div className={styles.contact_us_header}>
				{children}
			</div>
			<div className={styles.fields}>
				<InputField
					className={cn(`${styles.input}`)}
					name='full_name'
					type='full_name'
					placeholder={t('name')}
					requiredField={true}
					value={values.full_name}
					onChange={handleChange}
				/>
				<InputField
					className={cn(`${styles.input}`)}
					name='email'
					type='email'
					placeholder={t('email')}
					requiredField={true}
					value={values.email}
					onChange={handleChange}
				/>
				<InputNumber
					className={cn(`${styles.input}`)}
					name='phone'
					type='phone'
					placeholder={t('phone-number')}
					maskNumber='+374 99 99 99 99'
					requiredField={true}
					value={values.phone}
					onChange={handleChange}
				/>
				<TextareaField
					className={cn(`${styles.textarea}`)}
					name='message'
					placeholder={t('message')}
					requiredField={false}
					value={values.message}
					onChange={handleChange}
				/>
			</div>
			<button className={`${styles.submit}`} style={{ width }}>
				{isLoading ?
					`${t('loading')}...`
					:
					<span>
						{t('send')}
					</span>
				}
			</button>
		</form>
	);
};

export default FormAppointment;