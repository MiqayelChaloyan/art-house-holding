'use client'

import { useEffect } from 'react';

import { useTranslations } from 'next-intl';

// import { useAppDispatch } from '@/hooks/useStore';
// import { closeModal } from '@/store/stateModalSlice';

import Container from '@/components/components/container';

import Accordion from './Accordion';

// import { Courses } from '../../../../../sanity/sanity-queries/courses';

import { Inter } from '@/lib/constants/font';

import { EDUCATIONAL_CENTER_COURSES } from '../../../../../sanity/sanity-queries/educational-center';

import styles from './styles.module.sass';


interface Props {
	data: EDUCATIONAL_CENTER_COURSES[]
}

const PriceList = ({ data }: Props) => {
	const t = useTranslations('sections');
	// const dispatch = useAppDispatch();

	// useEffect(() => {
	// 	dispatch(closeModal());
	// }, []);

	return (
		<section id='price-list' className={styles.container}>
			<Container>
				<h1 className={`${styles.title} ${Inter.className}`}>{t('price-list')}</h1>
				<Accordion courses={data} />
			</Container>
		</section>
	);
};

export default PriceList;











