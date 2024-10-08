'use client'

import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import WorksGallery from '@/src/components/components/worksGallery';

import HoneyCombLoader from '@/src/lib/ui/rotatingLines';
import { Arial } from '@/src/constants/font';

import { urlForImage } from '@/sanity/imageUrlBuilder';
import { ImagePath } from '@/src/types/general';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: COURSES_DESIGN_QUERYResult;
};

const Home = ({ data }: Readonly<Props>) => {
    const searchParams = useSearchParams();
    const [portfolio, setPortfolio] = useState<PORTFOLIO[]>([]);
    const [path, setPath] = useState<ImagePath | null>(null);

    const handleSearch = (term: string | null) => {
        const params = new URLSearchParams(window.location.search);

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        const newUrl = `${window.location.pathname}?${params.toString()}`;

        window.history.pushState({}, '', newUrl);
    };

    useEffect(() => {
        let nameFromParams: string | null = searchParams.get('name');

        if (!nameFromParams) {
            nameFromParams = localStorage.getItem('name');
            handleSearch(nameFromParams)
        }

        localStorage.setItem('name', nameFromParams || '');

        const filteredPortfolio = data.portfolios?.filter((item: PORTFOLIO) => item._key === nameFromParams) || [];
        setPortfolio(filteredPortfolio);


        if (filteredPortfolio.length > 0) {
            const imagePath = urlForImage(filteredPortfolio[0]?.background_image);
            setPath(imagePath);
        }

    }, [searchParams, data.portfolios]);

    if (portfolio.length === 0) {
        return (
            <div className={styles.loader}>
                <HoneyCombLoader />
            </div>
        );
    }

    const { author } = portfolio[0];


    return (
        <div>
            <div className={styles.article} style={{ backgroundImage: `url(${path?.src})` }}>
                <div className={styles.titles}>
                    <h1 className={cn(styles.course_name, Arial.className)}>{data.course_name}</h1>
                    <h2 className={cn(styles.author, Arial.className)}>{author}</h2>
                </div>
            </div>
            {portfolio[0]?.title_images_array.map((works: WORK) => (
                <WorksGallery key={works._key} works={works} />
            ))}
        </div>
    );
};

export default Home;

