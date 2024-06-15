'use client'

import Fancybox from '../fancybox';
import WorkImage from './workImage';

import { Arial } from '@/lib/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    works: any
};

const options = {
    compact: false,
    hideScrollbar: false,
    Toolbar: {
        display: {
            left: [
                "infobar",
            ],
            middle: [],
            right: [
                "close",
                "fullScreen"
            ],
        }
    },
    Images: {
        zoom: false,
    },
};


const WorksGallery = ({ works }: Readonly<Props>) => {
    const gallery = works?.images.map((image: any) => <WorkImage key={image._key} image={image} />);

    return (
        <div className={styles.works}>
            <h3 className={cn(styles.title, Arial.className)}>
                {works.title}
            </h3>
            <div className={styles.gallery}>
                <Fancybox options={options}>
                    {gallery}
                </Fancybox>
            </div>
        </div>
    )
};

export default WorksGallery;