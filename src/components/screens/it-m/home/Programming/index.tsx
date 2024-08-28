'use client'

import styles from './styles.module.sass';

import { ImagePaths } from "@/constants";
import Image from "next/image";

import Container from "@/components/components/container";
import cn from 'classnames';
import { MMArmenU } from "@/constants/font";

const Programming = () => {
    return (
        <section id='programming' className={cn(styles.container, MMArmenU.className)}>
            <Container className="container">
                <div className={styles.box}>
                    <div className={styles.newsletter}>
                        <Image
                            src={ImagePaths.ITM.programmingURL}
                            alt='programming'
                            width={500}
                            height={500}
                            priority
                        />
                    </div>
                    <div className={styles.programs}>
                        <h2 className={styles.title}>
                            WEB Ծրագրավորում
                        </h2>

                        <div>
                            <p className={styles.program}>Ծրագիր 1-HTML5, CSS3, Bootstrap5-2 ամիս</p>
                            <p className={styles.program}>Ծրագիր 1-HTML5, CSS3, Bootstrap5-2 ամիս</p>
                            <p className={styles.program}>Ծրագիր 1-HTML5, CSS3, Bootstrap5-2 ամիս</p>
                        </div>

                        <div className={styles.button}>
                            <button className={styles['more-btn']}>
                                Ավելին
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
};

export default Programming;