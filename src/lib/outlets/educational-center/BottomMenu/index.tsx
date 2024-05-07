'use client'

import React from 'react';

import Link from 'next/link';

import { usePathname } from 'next/navigation'

// import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';
import { openModal } from '@/store/modal_reducer';

import Home from '@/lib/icons/educational-center/Home';
import Courses from '@/lib/icons/educational-center/Courses';
import PriceList from '@/lib/icons/educational-center/PriceList';
import CoWorkers from '@/lib/icons/educational-center/CoWorkers';
import Contact from '@/lib/icons/educational-center/Contact';

import { Pages } from '@/lib/constants/pages';

import { HOSTS } from '../../../../../sanity/sanity-queries/educational-center';

import styles from './styles.module.sass';


interface Props {
	socialData: HOSTS
	locale: string
};

const BottomMenu = ({ locale, socialData }: Props) => {
	const tel = 'tel:' + socialData?.phone_number.replace(/\s/g, '');
	const dispatch = useDispatch();
	const pathname = usePathname();

	return (
		<div className={styles.nav_menu}>
			<div className={styles.nav_list}>
				<Link
					className={`${pathname === `/${locale}${Pages.EDUCATIONAL_HOME}` ? `${styles.linkActive}` : ''} ${styles.nav__link}`}
					href={`/${locale}${Pages.EDUCATIONAL_HOME}`}
					aria-label='Home'
					title='Home'
				>
					<Home width={22} height={22} fill='white' />
				</Link>
				<button
					className={styles.nav__link}
					onClick={() => setTimeout(() => dispatch(openModal(true)), 500)}
					title='Courses'
				>
					<Courses width={22} height={22} fill='white' />
				</button>
				<Link
					className={`${pathname === `/${locale}${Pages.EDUCATIONAL_PRICE_LIST}` ? `${styles.linkActive}` : ''} ${styles.nav__link}`}
					href={`/${locale}${Pages.EDUCATIONAL_PRICE_LIST}`}
					aria-label='Price List'
					title='Price List'
				>
					<PriceList width={22} height={22} fill='white' />
				</Link>
				<Link
					className={`${pathname === `/${locale}${Pages.EDUCATIONAL_PARTNERS}` ? `${styles.linkActive}` : ''} ${styles.nav__link}`}
					href={`/${locale}${Pages.EDUCATIONAL_PARTNERS}`}
					aria-label='Partners'
					title='Partners'
				>
					<CoWorkers width={25} height={22} fill='white' />
				</Link>
				<Link
					className={styles.nav__link}
					href={tel}
					aria-label='Contact us'
					title='Contact us'
				>
					<Contact width={22} height={22} fill='white' />
				</Link>
			</div>
		</div>
	);
};

export default BottomMenu;