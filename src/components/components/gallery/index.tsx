'use client'

import React from 'react';

import Portfolio from '@/lib/ui/portfolio-card';

import { COURSE, PORTFOLIO } from '../../../../sanity/sanity-queries/design';

import styles from './styles.module.sass';


interface Props {
    projects: COURSE[];
    type: keyof COURSE;
};

const generateGalleryItems = (projects: COURSE[], type: keyof COURSE) => {
    return projects.reduce((acc: JSX.Element[], project: COURSE) => {
        const elements = project[type] as PORTFOLIO[];

        elements.forEach((elem: PORTFOLIO) => {
            const uniqueKey = `${elem._key}-${Math.random()}`;

            const cardElement = (
                <Portfolio
                    key={uniqueKey}
                    project={elem}
                    course_name={project.course_name}
                    slug={project.slug}
                    type={type}
                />
            );

            acc.push(cardElement);
        });

        return acc;
    }, []);
};

const Gallery = ({ projects, type }: Readonly<Props>) => {
    const desktopCards = generateGalleryItems(projects, type);

    return (
        <div className={styles.projects}>
            {desktopCards}
        </div>
    );
};

export default React.memo(Gallery);
