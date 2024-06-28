'use client'

import { useSearchParams } from 'next/navigation';

import WorksGallery from '@/components/components/worksGallery';

import RotatingLines from '@/lib/ui/rotatingLines';
import { Arial } from '@/lib/constants/font';

import { UrlType } from '@/types/design';

import { urlForImage } from '../../../../../sanity/imageUrlBuilder';
import { COURSE } from '../../../../../sanity/sanity-queries/design';

import cn from 'classnames';

import styles from './styles.module.sass';
import { useEffect, useState } from 'react';


interface Props {
    data: COURSE[] | any
};

const Home = ({ data }: Readonly<Props>) => {
    const searchParams = useSearchParams();
    const name: string | null = searchParams.get('name');
    // const order = data.orders?.filter((item: any) => item._key === name);
    const [order, setOrder] = useState<any[]>([]);

    useEffect(() => {
        if (name) {
            const filteredOrders = data.orders?.filter((item: any) => item._key === name);
            setOrder(filteredOrders || []);
        } else {
            setOrder([]);
        }
    }, [name, data.orders]);

    const path: string | undefined = urlForImage(order[0]?.background_image)?.src;

    const worksGallery = order[0]?.title_images_array.map((works: any) => <WorksGallery key={works._key} works={works} />)

    // console.log(order)

    return (
        <>
            {order.length ? (
                <>
                    <div className={styles.image} style={{ backgroundImage: `url(${path})` }} >
                        <div className={styles.titles}>
                            <h1 className={cn(styles.course_name, Arial.className)}>{data.course_name}</h1>
                            <h2 className={cn(styles.author, Arial.className)}>{order[0].author}</h2>
                        </div>
                    </div>
                    {worksGallery}
                </>
            ) : (
                <div className={styles.loader}>
                    <RotatingLines />
                </div>
            )}
        </>
    )
};

export default Home;