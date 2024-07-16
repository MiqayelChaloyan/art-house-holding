'use client'

import React, { useState } from 'react';

import Panel from '../AccordionItem';

import { PRICE_LIST } from '../../../../../../sanity/sanity-queries/educational-center';

import styles from './style.module.sass';


interface Props {
    courses: PRICE_LIST[];
};

const Accordion = ({ courses }: Props) => {
    const [activeTab, setActiveTab] = useState<number | null>(null);

    const activateTab = (index: number) => setActiveTab((prev) => (prev === index ? -1 : index));

    return (
        <div className={styles.accordion} role='tablist'>
            {courses?.map((panel: any, index: number) => (
                <Panel
                    key={panel._id}
                    activeTab={activeTab}
                    index={index}
                    {...panel}
                    name={panel.course_name}
                    svg={panel.svg}
                    alt={panel.svg.alt}
                    list={panel.price_list}
                    activateTab={() => activateTab(index)}
                />
            ))}
        </div>
    );
};

export default React.memo(Accordion);
