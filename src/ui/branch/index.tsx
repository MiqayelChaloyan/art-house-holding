import { memo } from 'react';

import Link from 'next/link';

import { urlFor } from '../../../../sanity/imageUrlBuilder';

import { ArianAMU, inter } from '@/constants/font';

import styles from './styles.module.sass';



interface BranchProps {
    item: {
        company_name: string;
        words: string;
        web_site_url: string;
        website_logo_front: string;
        website_logo_back: string;
    };
};



const Branch: React.FC<BranchProps> = ({ item }) => {
    const { company_name, words, web_site_url, website_logo_front, website_logo_back } = item;
    
    const urlForImageFront = urlFor(website_logo_front)
        .auto('format')
        .fit('max')
        .url();

    const urlForImageBack = urlFor(website_logo_back)
        .auto('format')
        .fit('max')
        .url();

    const wordsArray = words.split(' ');

    const titlesFront = wordsArray.map((word: string, index: number) => <p key={index} className={`${styles.title_front} ${inter.className}`} >{word}</p>);
    const titlesBack = wordsArray.map((word: string, index: number) => <p key={index} className={`${styles.title_back} ${inter.className}`} >{word}</p>);

    return (
        <Link href={`${web_site_url}`} aria-label={`${web_site_url}`} id='card'>
            <div className={styles.card_container}>
                <div className={styles.card}>
                    <div className={styles.front}>
                        <div className={styles.logo_front}>
                            <img src={urlForImageFront} alt={company_name} className={styles.logo} />
                        </div>
                        <div className={styles.words}>
                            <p className={`${styles.title_front} ${ArianAMU.className}`}>{company_name}</p>
                            {titlesFront}
                        </div>
                    </div>
                    <div className={styles.back}>
                        <div className={styles.logo_back}>
                            <img src={urlForImageBack} alt={company_name} className={styles.logo} />
                        </div>
                        <div className={styles.words}>
                            <p className={`${styles.title_back} ${ArianAMU.className}`}>{company_name}</p>
                            {titlesBack}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default memo(Branch);

