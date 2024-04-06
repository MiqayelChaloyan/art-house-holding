'use client'

import { useEffect } from 'react';

import { useTranslations } from 'next-intl';

// import { useAppDispatch } from '@/hooks/useStore';
// import { closeModal } from '@/store/stateModalSlice';

import Image from 'next/image';

import Container from '@/components/components/container';

import { Inter } from '@/lib/constants/font';

import { urlForImage } from '../../../../../sanity/imageUrlBuilder';
import { PARTNERS } from '../../../../../sanity/sanity-queries/generic';

import styles from './styles.module.sass';


interface Props {
	data: PARTNERS[]
};

const CoWorkers = ({ data }: Props) => {
	const t = useTranslations('sections');
	// const dispatch = useAppDispatch();

	// useEffect(() => {
	// 	dispatch(closeModal());
	// }, []);

	const workers = data?.map((item: any) => {
		const path: { src: string, width: number, height: number } | any = urlForImage(item.logo);

		return (
			<div key={item._id} className={styles.co_worker}>
				<div className={styles.image_container}>
					<img src={path?.src} className={styles.image} />
				</div>
				<p className={`${styles.text} ${Inter.className}`}>{item.company_name}</p>
				<p className={`${styles.text} ${Inter.className}`}>{item.cooperation}</p>
				<p className={`${styles.text} ${Inter.className}`}>{item.implemented_projects}</p>
			</div>
		);
	});

	return (
		<section id='co-workers' className={styles.container}>
			<Container>
				<h1 className={`${styles.title} ${Inter.className}`}>{t('co-worker')}</h1>
				<div className={styles.workers}>
					{workers}
				</div>
			</Container>
		</section>
	);
};

export default CoWorkers;