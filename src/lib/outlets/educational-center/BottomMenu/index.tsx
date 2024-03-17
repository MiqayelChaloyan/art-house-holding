"use client"

import React from 'react';

import Link from 'next/link';
// import { useRouter } from 'next/router';

// import { useAppDispatch } from '@/hooks/useStore';
// import { openModal } from '@/store/stateModalSlice';

import Home from '@/lib/icons/educational-center/Home';
import Courses from '@/lib/icons/educational-center/Courses';
import PriceList from '@/lib/icons/educational-center/PriceList';
import CoWorkers from '@/lib/icons/educational-center/CoWorkers';
import Contact from '@/lib/icons/educational-center/Contact';

import styles from './styles.module.sass';
import { usePathname } from 'next/navigation'

const BottomMenu = () => {
	// const dispatch = useAppDispatch();
	const pathname = usePathname();

	return (
		<div className={styles.nav_menu}>
			<div className={styles.nav_list}>
				<Link
					className={`${pathname === '/' ? `${styles.linkActive}` : ''} ${styles.nav__link}`}
					href='/'
					aria-label='Home'
					title='Home'
				>
					<Home width={25} height={25} fill='white' />
				</Link>
				<button
					className={styles.nav__link}
					// onClick={() => setTimeout(() => dispatch(openModal()), 500)}
					title='Courses'
				>
					<Courses width={25} height={25} fill='white' />
				</button>
				<Link
					className={`${pathname === '/price_list' ? `${styles.linkActive}` : ''} ${styles.nav__link}`}
					href='/price_list'
					aria-label='Price List'
					title='Price List'
				>
					<PriceList width={25} height={25} fill='white' />
				</Link>
				<Link
					className={`${pathname === '/co_workers' ? `${styles.linkActive}` : ''} ${styles.nav__link}`}
					href='/co_workers'
					aria-label='Co Worker'
					title='Co Worker'
				>
					<CoWorkers width={30} height={25} fill='white' />
				</Link>
				<Link
					className={styles.nav__link}
					href='tel:+37477111111'
					aria-label='Contact us'
					title='Contact us'
				>
					<Contact width={25} height={25} fill='white' />
				</Link>
			</div>
		</div>
	);
};

export default BottomMenu;