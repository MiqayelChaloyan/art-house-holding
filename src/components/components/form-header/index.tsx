"use client"

import Link from 'next/link';

import Instagram from '@/lib/icons/educational-center/Instagram';
import Google from '@/lib/icons/educational-center/Google';
import Facebook from '@/lib/icons/educational-center/Facebook';

import { Hosts } from '@/lib/constants/hosts';

import useWindowSize from '@/hooks/useWindowSize';

import styles from './styles.module.sass';


interface Props {
    display?: string,
    color?: string
    justifyContent?: string
    title?: string
    fill?: string
    group?: object
    fontSize?: string
};


const FormHeader: React.FC<Props> = ({ display, color, justifyContent, fontSize, title, fill, group }) => {
    const window = useWindowSize();

    return (
        <div className={styles.containerForm} style={{ display, justifyContent }}>
            <div style={{ ...group }}>
                <h1 className={styles.title} style={{ color }}>{title}</h1>
            </div>
            <div style={{ ...group }}>
                <Link href={Hosts.facebook} aria-label='Facebook' className={styles.icon} target="_blank">
                    <Facebook
                        width={window.width > 1000 ? 23 : 15}
                        height={window.width > 1000 ? 23 : 15}
                        fill={fill}
                    />
                </Link>
                <Link href={Hosts.instagram} aria-label='Instagram' className={styles.icon} target="_blank">
                    <Instagram
                        width={window.width > 1000 ? 23 : 15}
                        height={window.width > 1000 ? 23 : 15}
                        fill={fill}
                    />
                </Link>
                <Link href={Hosts.google} aria-label='Google' className={styles.icon} target="_blank">
                    <Google
                        width={window.width > 1000 ? 23 : 15}
                        height={window.width > 1000 ? 23 : 15}
                        fill={fill}
                    />
                </Link>
            </div>
        </div>
    );
};

export default FormHeader;