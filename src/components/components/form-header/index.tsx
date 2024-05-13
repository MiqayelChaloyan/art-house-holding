'use client'

import React from 'react';

import Link from 'next/link';

import Instagram from '@/lib/icons/educational-center/Instagram';
import Google from '@/lib/icons/educational-center/Google';
import Facebook from '@/lib/icons/educational-center/Facebook';

import useWindowSize from '@/hooks/useWindowSize';

import { socialNetwork } from '@/types/educational-center';

import { Social_Links } from '../../../../sanity/sanity-queries/educational-center';

import styles from './styles.module.sass';


const socialNetworkComponents: socialNetwork = {
    facebook: Facebook,
    instagram: Instagram,
    google: Google,
};

interface Props {
    display?: string,
    color?: string
    justifyContent?: string
    alignItems?: string,
    title?: string
    fill?: string
    group?: object
    fontSize?: string
    social_links?: Social_Links[]
};

const FormHeader = ({
    display,
    color,
    justifyContent,
    alignItems,
    fontSize,
    title,
    fill,
    group,
    social_links
}: Props) => {
    const windowSize = useWindowSize();

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
                target="_blank"
            >
                <SocialIcon
                    width={windowSize.width < 1000 ? 15 : 23}
                    height={windowSize.width < 1000 ? 15 : 23}
                    fill={fill}
                />
            </Link>
        )
    });

    return (
        <div className={styles.containerForm} style={{ display, justifyContent, alignItems }}>
            <div style={{ ...group }}>
                <h1 className={styles.title} style={{ color }}>{title}</h1>
            </div>
            <div style={{ ...group }}>
               {hosts}
            </div>
        </div>
    );
};

export default React.memo(FormHeader);