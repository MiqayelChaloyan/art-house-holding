'use client'

import Link from 'next/link';

import { Pages } from '@/lib/constants/pages';
import { Arial } from '@/lib/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
    theme: string,
    locale: string
};

const GoBack = ({ theme, locale }: Readonly<Props>) => (
    <Link
        href={`/${locale}${Pages.HOME}`}
        aria-label={Pages.HOME}
        className={cn(styles.btn, styles['book-now'], Arial.className)}
        style={{ background: theme }}
    >
        Home
    </Link>
);

export default GoBack;