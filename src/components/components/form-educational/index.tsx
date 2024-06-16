'use client'

import React, { useState, FormEvent } from 'react';

import { useTranslations } from 'next-intl';

import Snackbar from '@/components/components/snackbar';

import InputField from '@/lib/ui/InputField';
import InputNumber from '@/lib/ui/InputNumber';
import Select from '@/lib/ui/select';
import { Arial } from '@/lib/constants/font';

import { sendContactUsEducational } from '@/api';

import { Form } from '@/types/educational-center';

import { LESSON, LESSONS } from '../../../../sanity/sanity-queries/educational-center';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
	className?: string,
	width?: string,
	children: React.ReactNode,
	lessons: LESSON[] | any,
	lessonsArmenian: LESSON[] | any
};

type FormProps = {
	isLoading: boolean,
	error: boolean,
	values: Form
};

const FormAppointment = ({
	className,
	width,
	children,
	lessons,
	lessonsArmenian
}: Readonly<Props>) => {
	const [course, setCourse] = useState<string>('');
	const [open, setOpen] = useState(false);
	const t = useTranslations();
	const [info, setInfo] = useState({
		status: 'success',
		content: t('texts.send-message-success')
	});

	const initValues = { full_name: '', email: '', phone: '', training_center: 46, course_name: t('contact-us-form.select-course'), };
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
			training_center: 46
		};

		try {
			if (formData.course_name !== t('contact-us-form.select-course')) {
				setState((prev: FormProps) => ({
					...prev,
					isLoading: true,
				}))
			};

			const res: { status: number } | any = await sendContactUsEducational(formData);

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

	const getValueToSlug = (valueName: string, slug: string | number | undefined) => {
		const course = valueName === 'course_name' && lessonsArmenian?.find((lesson: LESSON) => {
			return lesson?.slug == slug;
		});

		if (course.course_name) {
			return setCourse(course.course_name);
		}
	};

	return (
		<form
			className={cn(className, styles.box)}
			onSubmit={handleSubmit}
		>
			<Snackbar open={open} handleChange={handleClose} info={info} />
			<div className={styles.contact_us_header}>
				{children}
			</div>
			<div className={styles.fields}>
				<InputField
					className={cn(styles.input, Arial.className)}
					name='full_name'
					type='full_name'
					placeholder={t('contact-us-form.name')}
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
					data={lessons}
					valueName='course_name'
					handleChange={setState}
					state={state}
					classNameProperty='large-educational'
					isClear={false}
					getValueToSlug={getValueToSlug}
				/>
			</div>
			<button className={`${styles.submit}`} style={{ width }}>
				{isLoading ?
					`${t('contact-us-form.loading')}...`
					:
					<span>
						{t('contact-us-form.send')}
					</span>
				}
			</button>
		</form>
	);
};

export default React.memo(FormAppointment);