"use client"

import React, { useRef } from "react";
import { useInView } from 'framer-motion'

import useWindowSize from "@/hooks/useWindowSize";


interface Props {
    children: JSX.Element
    direction?: "left" | "right"
}

const Section = ({ children, direction }: Props) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const style = { [direction === 'left' ? 'left' : 'right']: isInView ? '0px' : '150px' };

    const windowSize = useWindowSize();

    return (
        <div ref={ref}>
            {windowSize.width > 600 ? (
                <div
                    style={{
                        ...style,
                        position: 'relative',
                        opacity: isInView ? 1 : 0,
                        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                    }}
                >
                    {children}
                </div>
            ) : (
                children
            )}
        </div>
    )
};

export default Section;
