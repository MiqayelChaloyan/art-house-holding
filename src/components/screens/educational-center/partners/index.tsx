'use client'

import { useEffect } from 'react';

import { useTranslations } from 'next-intl';

import { useDispatch } from 'react-redux';
import { closeModal } from '@/store/modal_reducer';

import Container from '@/components/components/container';

import { Inter } from '@/lib/constants/font';

import { UrlType } from '@/types/educational-center';

import { urlForImage } from '../../../../../sanity/imageUrlBuilder';
import { PARTNER } from '../../../../../sanity/sanity-queries/generic';

import styles from './styles.module.sass';


type Props = {
	data: PARTNER[]
};

const Partners = ({ data }: Props) => {
	const t = useTranslations('sections');
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => dispatch(closeModal(false)), 1);
    }, [data]);

	const partners = data?.map((item: PARTNER) => {
		const path: UrlType | any = urlForImage(item.logo);

		return (
			<div key={item._id} className={styles.partner}>
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
		<section id='partners' className={styles.container}>
			<Container className='container'>
				<h1 className={`${styles.title} ${Inter.className}`}>{t('partners')}</h1>
				<div className={styles.partners}>
					{partners}
				</div>
			</Container>
		</section>
	);
};

export default Partners;