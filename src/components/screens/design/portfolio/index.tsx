'use client'

import { useSearchParams } from 'next/navigation';

import WorksGallery from '@/components/components/worksGallery';

import HoneyCombLoader from '@/lib/ui/rotatingLines';
import { Arial } from '@/lib/constants/font';

import { UrlType } from '@/types/design';

import { urlForImage } from '../../../../../sanity/imageUrlBuilder';
import { COURSE } from '../../../../../sanity/sanity-queries/design';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: COURSE[] | any
};

const Home = ({ data }: Readonly<Props>) => {
    const searchParams = useSearchParams();
    const name: string | null = searchParams.get('name');
    const portfolio = data.portfolios?.filter((item: any) => item._key === name);
    const path: UrlType | any = urlForImage(portfolio[0]?.background_image);

    const { author } = portfolio[0];
    const worksGallery = portfolio[0]?.title_images_array.map((works: any) => <WorksGallery key={works._key} works={works} />)

    return (
        <div>
            {portfolio[0] ? (
                <>
                    <div className={styles.article} style={{ backgroundImage: `url(${path?.src})` }} >
                        <div className={styles.titles}>
                            <h1 className={cn(styles.course_name, Arial.className)}>{data.course_name}</h1>
                            <h2 className={cn(styles.author, Arial.className)}>{author}</h2>
                        </div>
                    </div>
                    {worksGallery}
                </>
            ) : (
                <div className={styles.loader}>
                    <HoneyCombLoader />
                </div>
            )}
        </div>
    )
};

export default Home;