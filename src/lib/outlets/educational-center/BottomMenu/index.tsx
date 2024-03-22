"use client"

import React from 'react';

import Link from 'next/link';

import { usePathname } from 'next/navigation'

// import { useRouter } from 'next/router';

// import { useAppDispatch } from '@/hooks/useStore';
// import { openModal } from '@/store/stateModalSlice';

import Home from '@/lib/icons/educational-center/Home';
import Courses from '@/lib/icons/educational-center/Courses';
import PriceList from '@/lib/icons/educational-center/PriceList';
import CoWorkers from '@/lib/icons/educational-center/CoWorkers';
import Contact from '@/lib/icons/educational-center/Contact';

import { Pages } from '@/lib/constants/pages';

import styles from './styles.module.sass';


type Props = {
	locale: string
};


const BottomMenu = ({ locale }: Props) => {
	// const dispatch = useAppDispatch();
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
					// onClick={() => setTimeout(() => dispatch(openModal()), 500)}
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
					className={`${pathname === `/${locale}${Pages.EDUCATIONAL_CO_WORKER}` ? `${styles.linkActive}` : ''} ${styles.nav__link}`}
					href={`/${locale}${Pages.EDUCATIONAL_CO_WORKER}`}
					aria-label='Co Worker'
					title='Co Worker'
				>
					<CoWorkers width={25} height={22} fill='white' />
				</Link>
				<Link
					className={styles.nav__link}
					href='tel:+37477111111'
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