'use client';

import styles from './styles.module.sass';

interface Props {
    width?: string;
    height?: string;
    borderRadius?: number;
};

export default function GoogleMaps({
    width = '100%',
    height = '400px',
    borderRadius = 10
}: Props) {
    return (
        <iframe
            title="GoogleMaps"
            src={process.env.NEXT_PUBLIC_MAP_URL}
            width={width}
            height={height}
            className={styles.iframe}
            style={{ borderRadius }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        />
    );
};
