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
    const [path, setPath] = useState<ImagePath | null>(null);
    const [order, setOrder] = useState<ORDER[]>([]);

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

        const filteredOrder = data.orders?.filter((item: PORTFOLIO) => item._key === nameFromParams) || [];
        setOrder(filteredOrder);


        if (filteredOrder.length > 0) {
            const imagePath = urlForImage(filteredOrder[0]?.background_image);
            setPath(imagePath);
        }

    }, [searchParams, data.portfolios]);

    if (order.length === 0) {
        return (
            <div className={styles.loader}>
                <HoneyCombLoader />
            </div>
        );
    }

    const { author } = order[0];


    return (
        <div>
            <div className={styles.article} style={{ backgroundImage: `url(${path})` }} >
                <div className={styles.titles}>
                    <h1 className={cn(styles.course_name, Arial.className)}>{data.course_name}</h1>
                    <h2 className={cn(styles.author, Arial.className)}>{author}</h2>
                </div>
            </div>
            {order[0]?.title_images_array.map((works: WORK) => (
                <WorksGallery key={works._key} works={works} />
            ))}
        </div>
    )
};

export default Home;