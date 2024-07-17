'use client'

import React, { useState, FormEvent } from 'react';

import { useTranslations } from 'next-intl';

import Link from 'next/link';

import Snackbar from '@/components/components/snackbar';

import useWindowSize from '@/hooks/useWindowSize';

import InputField from '@/lib/ui/InputField';
import InputNumber from '@/lib/ui/InputNumber';
import Select from '@/lib/ui/select';
import { Arial } from '@/lib/constants/font';
import { TRAINING_CENTERS } from '@/lib/constants';

import Instagram from '@/lib/icons/educational-center/Instagram';
import Google from '@/lib/icons/educational-center/Google';
import Facebook from '@/lib/icons/educational-center/Facebook';

import { sendContactUsEducational } from '@/api';

import { Form } from '@/types/educational-center';
import { socialNetwork } from '@/types/educational-center';

import { LESSON, Social_Links } from '../../../../sanity/sanity-queries/educational-center';

import colors from '@/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


const socialNetworkComponents: socialNetwork = {
	facebook: Facebook,
	instagram: Instagram,
	google: Google,
};

interface Props {
	lessons: LESSON[];
	lessonsArmenian: LESSON[];
	social_links: Social_Links[];
	theme: string;
};

interface FormProps {
	isLoading: boolean;
	error: boolean;
	values: Form;
};

const FormAppointment = ({
	social_links,
	lessons,
	lessonsArmenian,
	theme
}: Readonly<Props>) => {
	const [course, setCourse] = useState<string>('');
	const [open, setOpen] = useState<boolean>(false);
	const windowSize = useWindowSize();
	const t = useTranslations();

	const [info, setInfo] = useState({
		status: 'success',
		content: t('texts.send-message-success')
	});


	const hosts = social_links?.map((host: Social_Links) => {
		const socialName = host?.social_name.toLowerCase();
		const SocialIcon = (socialNetworkComponents as any)[socialName];
		if (!SocialIcon) return null;

		return (
			<Link
				key={host._key}
				href={host?.social_link}
				aria-label={host?.social_name}
				className={styles.icon}
				target='_blank'
			>
				<SocialIcon
					width={windowSize.width < 1000 ? 12 : 23}
					height={windowSize.width < 1000 ? 12 : 23}
					fill={theme}
				/>
			</Link>
		)
	});

	const initValues = {
		full_name: '',
		email: '',
		phone: '',
		training_center: TRAINING_CENTERS.educational_school,
		course_name: t('contact-us-form.select-course')
	};

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
			training_center: TRAINING_CENTERS.educational_school
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

	const getValueToSlug = (valueName: string, slug: string | number) => {
		const course = valueName === 'course_name' && lessonsArmenian?.find((lesson: LESSON) => {
			return lesson?.slug == slug;
		});

		if (course && course?.course_name) {
			return setCourse(course.course_name);
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles.fields}>
			<div className={styles.hosts}>
				<div>
					<h2 className={cn(styles.title, Arial.className)} style={{color: theme}}>
						{t('contact-us-form.title')}
					</h2>
				</div>
				<div>
					{hosts}
				</div>
			</div>
			<Snackbar
				open={open}
				handleChange={handleClose}
				info={info}
			/>
			<div>
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
			<button className={cn(styles.submit, Arial.className)}>
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