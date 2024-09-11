'use client'

import React from 'react';

import Portfolio from '@/lib/ui/portfolio-card';

import styles from './styles.module.sass';


interface Props {
    projects: any;
    type: string;
};

const generateGalleryItems = (projects: COURSES_DESIGN_QUERYResult[], type: string) => {
    return projects.reduce((acc: JSX.Element[], project: any) => {
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
