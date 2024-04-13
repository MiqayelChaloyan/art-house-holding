import React, { useEffect, useState } from 'react';

import styles from './styles.module.sass';


const ProgressLine = ({
    backgroundColor = "#e5e5e5",
    visualParts = [
        {
            percentage: "0%",
            color: "white"
        }
    ]
}: any) => {
    const [widths, setWidths] = useState(
        visualParts.map(() => {
            return 0;
        })
    );

    useEffect(() => {
        requestAnimationFrame(() => {
            setWidths(
                visualParts.map((item: any) => {
                    return item.percentage;
                })
            );
        });
    }, [visualParts]);

    return (
        <div
            className={styles.progress_visual_full}
            style={{
                backgroundColor
            }}
        >
            {visualParts.map((item: any, index: number) => {
                return (
                    <div
                        key={index}
                        style={{
                            width: widths[index],
                            backgroundColor: item.color
                        }}
                        className={styles.progress_visual_part}
                    />
                );
            })}
        </div>
    );
};

export default ProgressLine;
